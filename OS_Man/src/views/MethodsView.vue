<template>
  <div class="d-flex justify-content-center align-items-center">
    <div class="container-fluid bg-white py-4 d-flex flex-column align-items-center">
      <h1 class="text-center mb-9" style="font-size: 2rem; font-weight: bold; font-family: Arial, sans-serif">Manage Methods</h1>
      <div class="row justify-content-center align-items-center mb-4">
        <div class="col-md-4 col-lg-3 mb-3 mb-md-0">
          <form class="row g-2">
            <div class="col-12">
              <label class="form-label fw-bold" for="name">Name/ID*:</label>
              <input class="form-control" type="text" id="name"  v-model="newp.name">
            </div>
            <div class="col-12">
              <label class="form-label fw-bold" for="description">Description:</label>
              <input class="form-control" type="text" id="description" v-model="newp.description">
            </div>
            <div class="col-12 d-flex flex-wrap justify-content-center">
              <button class="btn btn-black mb-2 me-md-2" @click.prevent="addPayment">Add Payment</button>
              <button class="btn btn-black mb-2 me-md-2" @click.prevent="addDelivery">Add Delivery</button>
              <button class="btn btn-outline-black mb-2 me-md-2"  @click="getPaymentMById">Search Paymnet</button>
              <button class="btn btn-outline-black mb-2" @click.prevent="getDeliveryMById">Search Delivery</button>
              <button class="btn btn-outline-black mb-2" @click.prevent="reload">Refresh</button>
            </div>
          </form>
          <div v-if="message" class="alert alert-danger">{{ message }}</div>
        </div>
        <div class="col-md-8 col-lg-9">
          <h1 class="text-center mb-9" style="font-size: 1rem; font-weight: bold; font-family: Arial, sans-serif">Payment Methods</h1>
          <table class="table table-borderless table-hover shadow rounded">
            <thead>
              <tr>
                <th>#ID</th>
                <th>Name</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="payment in payments" :key="payment.payment_method_id">
          <td >{{ payment.payment_method_id }}</td>
          <td >{{ payment.name }}</td>
          <td >{{ payment.description }}</td>
          <td >
                  <button class="btn btn-sm btn-success me-2 minimalist-button animate__animated animate__fadeIn" @click="editPayment(payment,newp)">Edit</button>
                  <button class="btn btn-sm btn-danger minimalist-button animate__animated animate__fadeIn" @click="deletePayment(payment)">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
          <h1 class="text-center mb-9" style="font-size: 1rem; font-weight: bold; font-family: Arial, sans-serif">Delivery Methods</h1>
          <table class="table table-borderless table-hover shadow rounded">
            <thead>
              <tr>
                <th>#ID</th>
                <th>Name</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="delivery in deliveries" :key="delivery.delivery_method_id">
          <td >{{ delivery.delivery_method_id }}</td>
          <td >{{ delivery.name }}</td>
          <td >{{ delivery.description }}</td>
          <td >
                  <button class="btn btn-sm btn-success me-2 minimalist-button animate__animated animate__fadeIn" @click="editDelivery(delivery,newp)">Edit</button>
                  <button class="btn btn-sm btn-danger minimalist-button animate__animated animate__fadeIn" @click="deleteDelivery(delivery)">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
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
    
    interface Payment {
  payment_method_id: number;
  name: string;
  description: string;
}

interface Delivery {
  delivery_method_id: number;
  name: string;
  description: string;
}

const payments = ref<Payment[]>([]);
const deliveries = ref<Delivery[]>([]);
const newp = ref({ name: null, description: null });
const store = useAuthStore();
const token = store.token;
const message = ref('');



    const getPaymentM = async () => {
      try {
        const response = await fetch('https://localhost:8443/store/api/admin/paymentMethod/getAll', {
          headers: { Authorization: 'Bearer ' + token },
        });
        const data = await response.json();
        console.log(response);
        payments.value = data;
        newp.value.name = null;
        newp.value.description = null;
        message.value = '';
      } catch (error) {
        console.log(error);
      }
    };

    const getPaymentMById = async () => {
      try {
        const response = await fetch( `https://localhost:8443/store/api/admin/paymentMethod/getById?id=${newp.value.name}`, {
          headers: { Authorization: 'Bearer ' + token },
        });
        const data = await response.json();
        payments.value = [data];
        newp.value.name = null;
        newp.value.description = null;
        message.value = '';
      } catch (error) {
        console.log(error);
      }
    };

    

    const getDeliveryMById = async () => {
      try {
        const response = await fetch( `https://localhost:8443/store/api/admin/deliveryMethod/getById?id=${newp.value.name}`, {
          headers: { Authorization: 'Bearer ' + token },
        });
        const data = await response.json();
        deliveries.value = [data];
        newp.value.name = null;
        newp.value.description = null;
        message.value = '';
      } catch (error) {
        console.log(error);
      }
    };

  

    const getDeliveryM = async () => {
      try {
        const response = await fetch('https://localhost:8443/store/api/admin/deliveryMethod/getAll', {
          headers: { Authorization: 'Bearer ' + token },
        });
        const data = await response.json();
        console.log(response);
        deliveries.value = data;
        newp.value.name = null;
        newp.value.description = null;
        message.value = '';
      } catch (error) {
        console.log(error);
      }
    };

    const addPayment = async () => {
      if (!newp.value.name || !newp.value.description) {
        message.value = 'The empty entry can not be added';
    return;
  }

      try {
        const response = await fetch('https://localhost:8443/store/api/admin/paymentMethod/insert-one', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + token },
          body: JSON.stringify(newp.value),
        });
        const data = await response.json();
        payments.value.push(data);
        newp.value.name = null;
        newp.value.description = null;
        message.value = '';
      } catch (error) {
        console.log(error);
      }
    };

    const addDelivery = async () => {
      if (!newp.value.name || !newp.value.description) {
        message.value = 'The empty entry can not be added';
    return;
  }
      try {
        const response = await fetch('https://localhost:8443/store/api/admin/deliveryMethod/insert-one', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + token },
          body: JSON.stringify(newp.value),
        });
        const data = await response.json();
        deliveries.value.push(data);
        newp.value.name = null;
        newp.value.description = null;
        message.value = '';
      } catch (error) {
        console.log(error);
      }
    };

    const editPayment = async (payment: any,newp: any) => {
      try {
        const requestBody: any = { payment_method_id: payment.payment_method_id };
    for (const [key, value] of Object.entries(newp)) {
      if (value) {
        requestBody[key] = value;
      }
    }
        const response = await fetch('https://localhost:8443/store/api/admin/paymentMethod/update-one', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + token },
          body: JSON.stringify(requestBody),
        });
        const data = await response.json();
        const index = payments.value.findIndex((c) => c.payment_method_id === payment.payment_method_id);
        payments.value.splice(index, 1, data);
        newp.name = null;
        newp.description = null;
        message.value = '';
      } catch (error) {
        console.log(error);
      }
    };

    const editDelivery = async (delivery: any,newp: any) => {
      
      try {

        const requestBody: any = { delivery_method_id: delivery.delivery_method_id};
    for (const [key, value] of Object.entries(newp)) {
      if (value) {
        requestBody[key] = value;
      }
    }
        const response = await fetch('https://localhost:8443/store/api/admin/deliveryMethod/update-one', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + token },
          body: JSON.stringify(requestBody),
        });
        const data = await response.json();
        const index = deliveries.value.findIndex((c) => c.delivery_method_id === delivery.delivery_method_id);
        deliveries.value.splice(index, 1, data);
        newp.name = null;
        newp.description = null;
        message.value = '';
      } catch (error) {
        console.log(error);
      }
    };

    const deletePayment = async (payment: any) => {
      try {
        const response = await fetch(
          `https://localhost:8443/store/api/admin/paymentMethod/deleteById?id=${payment.payment_method_id}`,
          {
            method: 'POST',
            headers: { Authorization: 'Bearer ' + token },
          }
        );
        const index = payments.value.findIndex((c) => c.payment_method_id === payment.payment_method_id);
        payments.value.splice(index, 1);
        newp.value.name = null;
        newp.value.description = null;
        message.value = '';
      } catch (error) {
        console.log(error);
      }
    };

    const deleteDelivery = async (delivery: any) => {
      try {
        const response = await fetch(
          `https://localhost:8443/store/api/admin/deliveryMethod/deleteById?id=${delivery.delivery_method_id}`,
          {
            method: 'POST',
            headers: { Authorization: 'Bearer ' + token },
          }
        );
        const index = deliveries.value.findIndex((c) => c.delivery_method_id === delivery.delivery_method_id);
        deliveries.value.splice(index, 1);
        newp.value.name = null;
        newp.value.description = null;
        message.value = '';
      } catch (error) {
        console.log(error);
      }
    };

    const reload = async () => {
      getDeliveryM();
      getPaymentM();
    };

    onBeforeMount(() => {
      getDeliveryM();
      getPaymentM();
    });

    return {
      newp,
      payments,
      deliveries,
      message,
      getPaymentM,
      addPayment,
      editPayment,
      deletePayment,
      getDeliveryM,
      addDelivery,
      editDelivery,
      deleteDelivery,
      getPaymentMById,
      getDeliveryMById,
      reload
    };
  },
});
</script>