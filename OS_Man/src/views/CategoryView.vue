<template>
  <div class="d-flex justify-content-center align-items-center">
    <div class="container-fluid bg-white py-4 d-flex flex-column align-items-center">
      <h1 class="text-center mb-9" style="font-size: 2rem; font-weight: bold; font-family: Arial, sans-serif">Manage Categories</h1>
      <div class="row justify-content-center align-items-center mb-4">
        <div class="col-md-4 col-lg-3 mb-3 mb-md-0">
          <form class="row g-2">
            <div class="col-12">
              <label class="form-label fw-bold" for="name">Name/ID*:</label>
              <input class="form-control" type="text" id="name"  v-model="newCategory.name">
            </div>
            <div class="col-12">
              <label class="form-label fw-bold" for="description">Description*:</label>
              <input class="form-control" type="text" id="description" v-model="newCategory.description">
            </div>
            <div class="col-12 d-flex flex-wrap justify-content-center">
              <button class="btn btn-black mb-2 me-md-2" @click.prevent="addCategory">Add Category</button>
              <button class="btn btn-outline-black mb-2 me-md-2" @click.prevent="filterCategories">Filter</button>
              <button class="btn btn-outline-black mb-2 me-md-2" @click.prevent="getCategoryById(newCategory.name)">By ID</button>
              <button class="btn btn-outline-black mb-2" @click.prevent="getCategories">Refresh</button>
            </div>
          </form>
          <div v-if="message" class="alert alert-danger">{{ message }}</div>
        </div>
        <div class="col-md-8 col-lg-9">
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
              <tr v-for="category in categories" :key="category.category_id">
                <td>{{ category.category_id }}</td>
                <td>{{ category.name }}</td>
                <td>{{ category.description }}</td>
                <td>
                  <button class="btn btn-sm btn-success me-2 minimalist-button animate__animated animate__fadeIn" @click="editCategory(category,newCategory)">Edit</button>
                  <button class="btn btn-sm btn-danger minimalist-button animate__animated animate__fadeIn" @click="deleteCategory(category)">Delete</button>
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
import '@/assets/style.css'


export default defineComponent({
  setup() {
    
    interface Category {
  category_id: number;
  name: string;
  description: string;
}

const categories = ref<Category[]>([]);
const newCategory = ref({ name: null, description: null });
const store = useAuthStore();
const token = store.token;
const message = ref('');

    const getCategories = async () => {
      try {
        const response = await fetch('https://localhost:8443/store/api/admin/category/getAll', {
          headers: { Authorization: 'Bearer ' + token },
        });
        const data = await response.json();
        categories.value = data;
        message.value = '';
        newCategory.value.name = null;
        newCategory.value.description = null;
      } catch (error) {
        console.log(error);
      }
    };

    const filterCategories = async () => {
      if (!newCategory.value.name) {
        message.value = 'The entry can not be empty';
    return;
  }
      try {
        const response = await fetch('https://localhost:8443/store/api/admin/category/filter', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + token },
          body: JSON.stringify(newCategory.value),
        });
        const data = await response.json();
        categories.value = data.content;
        message.value = '';
        newCategory.value.name = null;
        newCategory.value.description = null;
      } catch (error) {
        console.log(error);
      }
    };

    const getCategoryById = async (id: any) => {
      try {
        const response = await fetch( `https://localhost:8443/store/api/admin/category/getById?id=${id}`, {
          headers: { Authorization: 'Bearer ' + token },
        });
        const data = await response.json();
        categories.value = [data];
        message.value = '';
        newCategory.value.name = null;
        newCategory.value.description = null;
      } catch (error) {
        console.log(error);
      }
    };

    const addCategory = async () => {
      if (!newCategory.value.name || !newCategory.value.description) {
        message.value = 'The empty entry can not be added';
    return;
  }
      try {
        const response = await fetch('https://localhost:8443/store/api/admin/category/insert-one', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + token },
          body: JSON.stringify(newCategory.value),
        });
        const data = await response.json();
        categories.value.push(data);
        newCategory.value.name = null;
        newCategory.value.description = null;
        message.value = '';
      } catch (error) {
        console.log(error);
      }
    };

    const editCategory = async (category: any,newCategory: any) => {
     
      try {
        if (!newCategory.name || !newCategory.description) {
        message.value = 'The empty entry can not be added';
    return;
  }

  const requestBody: any = { category_id: category.category_id};
    for (const [key, value] of Object.entries(newCategory)) {
      if (value) {
        requestBody[key] = value;
      }
    }
        const response = await fetch('https://localhost:8443/store/api/admin/category/update-one', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + token },
          body: JSON.stringify(requestBody),
        });
        const data = await response.json();
        const index = categories.value.findIndex((c) => c.category_id === category.category_id);
        categories.value.splice(index, 1, data);
        message.value = '';
        newCategory.name = null;
        newCategory.description = null;
      } catch (error) {
        console.log(error);
      }
    };

    const deleteCategory = async (category: any) => {
      try {
        const response = await fetch(
          `https://localhost:8443/store/api/admin/category/deleteById?id=${category.category_id}`,
          {
            method: 'POST',
            headers: { Authorization: 'Bearer ' + token },
          }
        );
        const index = categories.value.findIndex((c) => c.category_id === category.category_id);
        categories.value.splice(index, 1);
        message.value = '';
      } catch (error) {
        console.log(error);
      }
    };

    onBeforeMount(() => {
      getCategories();
    });

    return {
      message,
      newCategory,
      categories,
      getCategories,
      addCategory,
      editCategory,
      deleteCategory,
      filterCategories,
      getCategoryById
    };
  },
});
</script>