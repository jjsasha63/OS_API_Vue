<template>
  <div class="container-fluid py-4">
    <h1 class="text-center mb-9" style="font-size: 2rem; font-weight: bold; font-family: Arial, sans-serif">Manage Order-Product</h1>
    <div class="row justify-content-center align-items-center mb-4">
      <div class="col-md-4 col-lg-3 mb-3 mb-md-0">
        <form>
          <div class="mb-3">
            <label class="form-label fw-bold" for="order-id">Order ID:</label>
            <input class="form-control" type="text" id="order-id" v-model="newOP.order_id">
          </div>
          <div class="mb-3">
            <label class="form-label fw-bold" for="product-id">Product ID:</label>
            <input class="form-control" type="text" id="product-id" v-model="newOP.product_id">
          </div>
          <div class="mb-3">
            <label class="form-label fw-bold" for="product-price">Product price:</label>
            <input class="form-control" type="text" id="product-price" v-model="newOP.product_price">
          </div>
          <div class="mb-3">
            <label class="form-label fw-bold" for="quantity">Quantity:</label>
            <input class="form-control" type="text" id="quantity" v-model="newOP.quantity">
          </div>
          
        </form>
        <div class="col-12 col-lg-8 d-flex flex-wrap justify-content-start justify-content-lg-end align-items-center">
            <button class="btn btn-black mb-2 me-md-2" @click="addOP">Add</button>
            <button class="btn btn-outline-black mb-2 me-md-2" @click="getOPs">Search</button>
            <button class="btn btn-outline-black mb-2 me-md-2" @click="getOPsById">Search By ID</button>
            <button class="btn btn-outline-black mb-2 me-md-2" @click="getOPsByProduct">Search By Product</button>
            <button class="btn btn-outline-black mb-2 me-md-2" @click="getOPsByIdAndProduct">Search By ID and Product</button>
          </div>
      </div>
      <div class="col-md-8 col-lg-9">
        <table class="table table-borderless table-hover shadow rounded">
          <thead>
            <tr>
              <th scope="col">Order ID</th>
              <th scope="col">Product ID</th>
              <th scope="col">Quantity</th>
              <th scope="col">Product Price</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="op in ops" :key="`${op.order_id}-${op.product_id}`">
              <td ><a :href="'/order/' + op.order_id">{{ op.order_id }}</a></td>
              <td ><a :href="'/product/' + op.product_id">{{ op.product_id }}</a></td>
              <td >{{ op.quantity }}</td>
              <td >{{ op.product_price }}</td>
              <td >
                <button class="btn btn-success me-2" @click="editOP(op,newOP)">Edit</button>
                <button class="btn btn-danger" @click="deleteOP(op)">Delete</button>
              </td>
        </tr>
      </tbody>
    </table>
  </div>
    </div>
  </div>
</template>


<script lang="ts">
import { defineComponent, onBeforeMount, onMounted, ref } from 'vue';
import { useAuthStore } from '@/stores/auth';
import "@/assets/style.css"


export default defineComponent({
  setup() {
    
interface OP {
  order_id: number;
  product_id: null;
  product_price: number;
  quantity: number;
}

const ops = ref<OP[]>([]);
const newOP = ref({ order_id: null, product_id: null , product_price: null, picture: '', quantity: null});
const store = useAuthStore();
const token = store.token;
const message = ref('');

    const getOPs = async () => {
      try {
        const response = await fetch('https://localhost:8443/store/api/admin/orderProduct/getAll', {
          headers: { Authorization: 'Bearer ' + token },
        });
        const data = await response.json();
        ops.value = data;
        newOP.value.order_id = null;
        newOP.value.product_id = null;
        newOP.value.product_price = null;
        newOP.value.quantity = null;
        message.value = '';
      } catch (error) {
        console.log(error);
      }
    };

    const getOPsById = async () => {
      try {
        const response = await fetch(`https://localhost:8443/store/api/admin/orderProduct/getById?id=${newOP.value.order_id}`, {
          headers: { Authorization: 'Bearer ' + token },
        });
        const data = await response.json()
        if(!data[1]) ops.value = [data];
        ops.value = data;
        message.value = '';

      } catch (error) {
        console.log(error);
      }
    };

    const getOPsByIdAndProduct = async () => {
      try {
        const response = await fetch(`https://localhost:8443/store/api/admin/orderProduct/getByIdAndProduct?id=${newOP.value.order_id}&product=${newOP.value.product_id}`, {
          headers: { Authorization: 'Bearer ' + token },
        });
        const data = await response.json()
        ops.value = [data];
        message.value = '';

      } catch (error) {
        console.log(error);
      }
    };

    const getOPsByProduct = async () => {
      try {
        const response = await fetch(`https://localhost:8443/store/api/admin/orderProduct/getByProduct?product=${newOP.value.product_id}`, {
          headers: { Authorization: 'Bearer ' + token },
        });
        const data = await response.json();
        if(!data[1]) ops.value = [data];
        ops.value = data;
        message.value = '';
      } catch (error) {
        console.log(error);
      }
    };

    const addOP = async () => {
      if (!newOP.value.order_id || !newOP.value.product_id || !newOP.value.product_price || !newOP.value.quantity) {
        message.value = 'The empty entry can not be added';
    return;
  }
      try {
        const response = await fetch('https://localhost:8443/store/api/admin/orderProduct/insert-one', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + token },
          body: JSON.stringify(newOP.value),
        });
        const data = await response.json();
        ops.value.push(data);
        newOP.value.order_id = null;
        newOP.value.product_id = null;
        newOP.value.product_price = null;
        newOP.value.quantity = null;
        message.value = '';
      } catch (error) {
        console.log(error);
      }
    };

    const editOP = async (op: any,newOP: any) => {
     
      try {

        const requestBody: any = { order_id:op.order_id,product_id:op.product_id };
    for (const [key, value] of Object.entries(newOP)) {
      if (value) {
        requestBody[key] = value;
      }
    }

        const response = await fetch('https://localhost:8443/store/api/admin/orderProduct/update-one', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + token },
          body: JSON.stringify(requestBody),
        });
        const data = await response.json();
        const index = ops.value.findIndex((c) => c.order_id === op.order_id && c.product_id === op.product_id);
                ops.value.splice(index, 1, data);
        newOP.order_id = null;
        newOP.product_id = null;
        newOP.product_price = null;
        newOP.quantity = null;
        message.value = '';
      } catch (error) {
        console.log(error);
      }
    };

    const deleteOP = async (op: any) => {
      try {
        const response = await fetch(
          `https://localhost:8443/store/api/admin/orderProduct/deleteByIdAndProduct?id=${op.order_id}&product=${op.product_id}`,
          {
            method: 'POST',
            headers: { Authorization: 'Bearer ' + token },
          }
        );
        const index = ops.value.findIndex((c) => c.order_id === op.order_id && c.product_id === op.product_id);
                ops.value.splice(index, 1);
               
        message.value = '';
      } catch (error) {
        console.log(error);
      }
    };

    onBeforeMount(() => {
      getOPs();
    });

    return {
      message,
      newOP,
      ops,
      getOPsById,
      getOPsByProduct,
      getOPs,
      addOP,
      editOP,
      deleteOP,
      getOPsByIdAndProduct
    };
  },
});
</script>