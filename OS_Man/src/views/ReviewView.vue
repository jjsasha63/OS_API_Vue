<template>
  <div class="container-fluid py-4">
    <h1 class="text-center mb-5" style="font-size: 2rem; font-weight: bold; font-family: Arial, sans-serif">Manage Reviews</h1>
    <div class="row justify-content-center mb-4">
      <div class="col-md-4 col-lg-3 mb-3 mb-md-0">
        <form class="row g-2">
        <div class="form-group">
          <label class="form-label fw-bold" for="description">Filter Search</label>
          <input class="form-control" type="text" id="description" v-model="id">
        </div>
        <button class="btn btn-black me-2" @click.prevent="getReviews">Get Reviews</button>
        <button class="btn btn-outline-black me-2" @click.prevent="getReviewById()">Get Reviews By Id</button>
        <button class="btn btn-outline-black" @click.prevent="getReviewByAuth()">Get Reviews By Auth</button>
        <div v-if="message" class="alert alert-danger">{{ message }}</div>
        </form>
      </div>
    
      <div class="col-md-8 col-lg-9">
      <table class="table table-borderless table-hover shadow rounded">
        <thead>
          <tr>
            <th>#ID</th>
            <th>Product ID</th>
            <th>Grade</th>
            <th>Review Text</th>
            <th>Review Date</th>
            <th>Auth ID</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="review in reviews" :key="review.review_id">
            <td>{{ review.review_id}}</td>
            <td><a :href="'/product/' + review.product_id">{{ review.product_id }}</a></td>
            <td>{{ review.grade }}</td>
            <td>{{ review.review_text }}</td>
            <td>{{ review.review_date }}</td>
            <td><a :href="'/customer/' + review.auth_id">{{ review.auth_id }}</a></td>
            <td>
              <button class="btn btn-sm btn-danger minimalist-button animate__animated animate__fadeIn" @click="deleteReview(review)">Delete</button>
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
    
    interface Review {
  review_id: number;
  product_id: number;
  grade: string;
  review_text: string;
  review_date: string;
  auth_id: number;
}

const reviews = ref<Review[]>([]);
const id = ref<number>(0);
const store = useAuthStore();
const token = store.token;
const message = ref('');

    const getReviews = async () => {
      try {
        const response = await fetch('https://localhost:8443/store/api/admin/review/getAll', {
          headers: { Authorization: 'Bearer ' + token },
        });
        const data = await response.json();
        if(!data[1]) reviews.value = [data];
        reviews.value = data;
        console.log(data)
      } catch (error) {
        console.log(error);
      }
    };

    const getReviewById = async () => {
      try {
        const response = await fetch(`https://localhost:8443/store/api/admin/review/getById?id=${id.value}`, {
          headers: { Authorization: 'Bearer ' + token },
        });
        const data = await response.json()
        reviews.value = [data];
        console.log(reviews.value)
      } catch (error) {
        console.log(error);
      }
    };

    const getReviewByAuth = async () => {
      try {
        const response = await fetch(`https://localhost:8443/store/api/admin/review/getByAuth?auth=${id.value}`, {
          headers: { Authorization: 'Bearer ' + token },
        });
        const data = await response.json();
        if(!data[1]) reviews.value = [data];
        reviews.value = data;
        console.log(reviews.value)
      } catch (error) {
        console.log(error);
      }
    };

    

    const deleteReview = async (review: any) => {
      try {
        const response = await fetch(
          `https://localhost:8443/store/api/admin/review/deleteById?id=${review.review_id}`,
          {
            method: 'POST',
            headers: { Authorization: 'Bearer ' + token },
          }
        );
        const index = reviews.value.findIndex((c) => c.review_id === review.review_id);
        reviews.value.splice(index, 1);
      } catch (error) {
        console.log(error);
      }
    };

    onMounted(() => {
      getReviews();
    });

    return {
      message,
      reviews,
      id,
      getReviews,
      deleteReview,
      getReviewById,
      getReviewByAuth
    };
  },
});
</script>