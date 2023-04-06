<template>
  <div class="d-flex justify-content-center align-items-center">
    <div class="container-fluid bg-white py-4 d-flex flex-column align-items-center">
      <h1 class="text-center mb-9" style="font-size: 2rem; font-weight: bold; font-family: Arial, sans-serif">Manage Products</h1>
      <div class="row justify-content-center align-items-center mb-4">
        <div class="col-md-4 col-lg-3 mb-9 ">
          <form class="row g-2">
            <div class="col-12">
              <label class="form-label fw-bold" for="name">Name:</label>
              <input class="form-control" type="text" id="name"  v-model="newProduct.product_name">
            </div>
            <div class="col-12">
              <label class="form-label fw-bold" for="price">Price:</label>
              <input class="form-control" type="text" id="price"  v-model="newProduct.price">
            </div>
            <div class="col-12">
              <label class="form-label fw-bold" for="quantity">Quantity:</label>
              <input class="form-control" type="text" id="quantity"  v-model="newProduct.quantity">
            </div>
            <div class="col-12">
              <label class="form-label fw-bold" for="description">Description:</label>
              <input class="form-control" type="text" id="description" v-model="newProduct.description">
            </div>
            <div class="col-12">
              <label class="form-label fw-bold" for="category">Category ID:</label>
              <input class="form-control" type="text" id="category"  v-model="newProduct.category_id">
            </div>
            <div class="col-12">
              <label class="form-label fw-bold" for="picture">Picture:</label>
              <input class="form-control" type="text" id="picture" v-model="newProduct.picture">
            </div>
           
          </form>
        </div>

        
        <div class="col-md-4 col-lg-3 mb-3 mb-md-0">
          <form class="row g-2">
            <div class="col-12">
              <label class="form-label fw-bold" for="name">Name/ID:</label>
              <input class="form-control" type="text" id="name"  v-model="newSearch.product_name">
            </div>
            <div class="col-12">
              <label class="form-label fw-bold" for="category_name">Categoty Name:</label>
              <input class="form-control" type="text" id="category_name" v-model="newSearch.category">
            </div>
            <div class="col-12">
              <label class="form-label fw-bold" for="max">Max Price:</label>
              <input class="form-control" type="text" id="max"  v-model="newSearch.price_max">
            </div>
            <div class="col-12">
              <label class="form-label fw-bold" for="min">Min Price:</label>
              <input class="form-control" type="text" id="min" v-model="newSearch.price_min">
            </div>
            
          </form>
        </div>

        <div class="col-12 d-flex flex-wrap justify-content-center">
          <button class="btn btn-black mb-2 me-md-2" @click.prevent="addProduct">Add Product</button>
              <button class="btn btn-outline-black mb-2 me-md-2" @click="filterProducts">Filter</button>
              <button class="btn btn-outline-black mb-2 me-md-2" @click.prevent="getProductById">By ID</button>
              <button class="btn btn-outline-black mb-2" @click.prevent="getProducts">Refresh</button>
            </div>
        <div v-if="message" class="alert alert-danger">{{ message }}</div>

        
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
                  <button class="btn btn-sm btn-success me-2 minimalist-button animate__animated animate__fadeIn" @click="editProduct(product,newProduct)">Edit</button>
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
import '@/assets/style.css'


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

const products = ref<Product[]>([]);
const newProduct = ref({ product_name: null, description: null, price: null, picture: null, quantity: null, category_id: null});
const newSearch = ref({ product_name: null,category: null, price_min: null, price_max: null});
const store = useAuthStore();
const token = store.token;
const message = ref('');

    const getProducts = async () => {
      try {
        const response = await fetch('https://localhost:8443/store/api/admin/product/getAll', {
          headers: { Authorization: 'Bearer ' + token },
        });
        const data = await response.json();
        products.value = data;
        newProduct.value.product_name = null;
        newProduct.value.description = null;
        newProduct.value.category_id = null;
        newProduct.value.picture = null;
        newProduct.value.quantity = null;
        newProduct.value.price = null;
        newSearch.value.product_name = null;
        newSearch.value.category = null;
        newSearch.value.price_max = null;
        newSearch.value.price_min = null;
        message.value ='';
      } catch (error) {
        console.log(error);
      }
    };


    const getProductById = async () => {
      try {
        const response = await fetch( `https://localhost:8443/store/api/admin/product/getById?id=${newSearch.value.product_name}`, {
          headers: { Authorization: 'Bearer ' + token },
        });
        const data = await response.json();
        products.value = [data];
        newSearch.value.product_name = null;
        newSearch.value.category = null;
        newSearch.value.price_max = null;
        newSearch.value.price_min = null;
    
        message.value ='';
      } catch (error) {
        console.log(error);
      }
    };

    const filterProducts = async () => {
      if (!newSearch.value) {
        message.value = 'The empty entry can not be added';
    return;
  }
      try {
        const response = await fetch('https://localhost:8443/store/api/admin/product/filter', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + token },
          body: JSON.stringify(newSearch.value),
        });
        const data = await response.json();
        products.value = data.content;
        newSearch.value.product_name = null;
        newSearch.value.category = null;
        newSearch.value.price_max = null;
        newSearch.value.price_min = null;
        message.value ='';
      } catch (error) {
        console.log(error);
      }
    };


    const addProduct = async () => {
      if (!newProduct.value.category_id || !newProduct.value.price || !newProduct.value.product_name || !newProduct.value.quantity) {
        message.value = 'The empty entry can not be added';
    return;
  }
      try {
        const response = await fetch('https://localhost:8443/store/api/admin/product/insert-one', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + token },
          body: JSON.stringify(newProduct.value),
        });
        const data = await response.json();
        products.value.push(data);
        newProduct.value.product_name = null;
        newProduct.value.description = null;
        newProduct.value.category_id = null;
        newProduct.value.picture = null;
        newProduct.value.quantity = null;
        newProduct.value.price = null;
        message.value ='';
      } catch (error) {
        console.log(error);
      }
    };

    const editProduct = async (product: any,newProduct: any) => {
     
      try {

        const requestBody: any = { product_id: product.product_id };
    for (const [key, value] of Object.entries(newProduct)) {
      if (value) {
        requestBody[key] = value;
      }
    }

        const response = await fetch('https://localhost:8443/store/api/admin/product/update-one', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + token },
          body: JSON.stringify(requestBody),
        });
        const data = await response.json();
        const index = products.value.findIndex((c) => c.product_id === product.product_id);
        products.value.splice(index, 1, data);
        newProduct.product_name = null;
        newProduct.description = null;
        newProduct.category_id = null;
        newProduct.picture = null;
        newProduct.quantity = null;
        newProduct.price = null;
        message.value ='';
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
        newProduct.value.product_name = null;
        newProduct.value.description = null;
        newProduct.value.category_id = null;
        newProduct.value.picture = null;
        newProduct.value.quantity = null;
        newProduct.value.price = null;
        message.value ='';
      } catch (error) {
        console.log(error);
      }
    };

    onBeforeMount(() => {
      getProducts();
    });

    return {
      message,
      newProduct,
      products,
      newSearch,
      getProducts,
      addProduct,
      editProduct,
      deleteProduct,
      getProductById,
      filterProducts,
    };
  },
});
</script>