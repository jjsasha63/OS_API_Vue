<template>
  <div class="d-flex justify-content-center align-items-center">
    <div class="container-fluid bg-white py-4 d-flex flex-column align-items-center">
        <div class="col-md-8 col-lg-9">
    <table class="table table-borderless table-hover shadow rounded">
            <thead>
        <tr>
          <th >#ID</th>
          <th >Name</th>
          <th >Description</th>
          <th >Price</th>
          <th >Quantity</th>
          <th >Category</th>
          <th >Picture</th>
          <th >Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in products" :key="product.product_id">
          <td >{{ product.product_id }}</td>
          <td >{{ product.product_name }}</td>
          <td >{{ product.description }}</td>
          <td >{{ product.price }}</td>
          <td >{{ product.quantity }}</td>
          <td ><a :href="'/category/' + product.category_id">{{ product.category_id }}</a></td>
          <td >{{ product.picture }}</td>
                <td>
                  <button class="btn btn-sm btn-danger minimalist-button animate__animated animate__fadeIn" @click="deleteProduct(product)">Delete</button>
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
import router from '@/router';
import { useRoute, useRouter } from 'vue-router'


export default defineComponent({
 
  setup() {
    
    interface Product {
  product_id: number;
  product_name: string;
  description: string;
  price: number;
  picture: string;
  quantity: number;
  category_id: number;
}

const route = useRoute()
const products = ref<Product[]>([]);
const newProduct = ref({ product_name: null, description: null, price: null, picture: null, quantity: null, category_id: null});
const newSearch = ref({ product_name: null,category: null, price_min: null, max_price: null});
const store = useAuthStore();
const token = store.token;


  

    const getProductById = async (id:any) => {
      try {
        const response = await fetch( `https://localhost:8443/store/api/admin/product/getById?id=${id}`, {
          headers: { Authorization: 'Bearer ' + token },
        });
        const data = await response.json();
        products.value = [data];
      } catch (error) {
        console.log(error);
      }
    };

   

    const deleteProduct = async (product: any) => {
      try {
        const response = await fetch(
          `https://localhost:8443/store/api/admin/product/deleteById?id=${product.product_id}`,
          {
            method: 'POST',
            headers: { Authorization: 'Bearer ' + token },
          }
        );
        const index = products.value.findIndex((c) => c.product_id === product.product_id);
        products.value.splice(index, 1);
      } catch (error) {
        console.log(error);
      }
    };

    onBeforeMount(() => {
      getProductById(route.params.id);
    });

    return {
      newProduct,
      products,
      newSearch,
      deleteProduct,
      getProductById
        };
  },
});
</script>