<template>
  <div class="d-flex justify-content-center align-items-center">
    <div class="container-fluid bg-white py-4 d-flex flex-column align-items-center">
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
                  <button class="btn btn-sm btn-danger minimalist-button animate__animated animate__fadeIn" @click="deleteCategory(category)">Delete</button>
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
import '@/assets/style.css'


export default defineComponent({
  setup() {
    
    interface Category {
  category_id: number;
  name: string;
  description: string;
}

const route = useRoute()
const router = useRouter()
const categories = ref<Category[]>([]);
const newCategory = ref({ name: null, description: null });
const store = useAuthStore();
const token = store.token;

   

    const getCategoryById = async (id:any) => {
      try {
        const response = await fetch( `https://localhost:8443/store/api/admin/category/getById?id=${id}`, {
          headers: { Authorization: 'Bearer ' + token },
        });
        const data = await response.json();
        categories.value = [data];
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
      } catch (error) {
        console.log(error);
      }
    };

   

    onBeforeMount(() => {
      getCategoryById(route.params.id);
    });

    return {
      newCategory,
      categories,
      getCategoryById,
      deleteCategory
    };
  },
});
</script>