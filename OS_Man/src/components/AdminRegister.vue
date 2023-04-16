<script lang="ts">
import { reactive, ref , defineComponent} from 'vue';
import { useMAuthStore } from '@/stores/authM';
import router from '@/router';


export default defineComponent({
  setup() {


  const user = ref({
  email: null,
  first_name: null,
  last_name: null,
  password: null,
  token: null
});

const message = ref('');

const register = async () => {
  console.log(user.value);
  if (!user.value.email && !user.value.first_name && !user.value.last_name && !user.value.password && !user.value.token) {
        message.value = 'The empty entry can not be added';
    return;
  }

    try {
        const response = await fetch('https://localhost:8443/store/api/auth/32FDSAAFE3231F1', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json'},
          body: JSON.stringify(user.value),
        });
        console.log(response);
        message.value = '';
        router.push('/login');
      } catch (error) {
        console.log(error);
      }
};

    return {
     user,
     message,
     register
    };
  },
});







</script>

<template>
  <div class="d-flex justify-content-center align-items-center">
    <div class="container-fluid bg-white py-4 d-flex flex-column align-items-center">
      <h1 class="text-center mb-9" style="font-size: 2rem; font-weight: bold; font-family: Arial, sans-serif">
        Register
      </h1>
      <form class="row g-3" >
        <div class="col-12">
          <label class="form-label fw-bold" for="email">Email</label>
          <input type="text" id="email" class="form-control" placeholder="email" v-model="user.email">
        </div>
        <div class="col-12">
          <label class="form-label fw-bold" for="first_name">First Name</label>
          <input type="text" id="fName" class="form-control" placeholder="first_name" v-model="user.first_name">
        </div>
        <div class="col-12">
          <label class="form-label fw-bold" for="last_name">Last Name</label>
          <input type="text" id="Lname" class="form-control" placeholder="last_name" v-model="user.last_name">
        </div>
        <div class="col-12">
          <label class="form-label fw-bold" for="password">Password</label>
          <input type="password" id="password" class="form-control" placeholder="Password" v-model="user.password">
        </div>
        <div class="col-12">
          <label class="form-label fw-bold" for="password">Token</label>
          <input type="password" id="token" class="form-control" placeholder="Token" v-model="user.token">
        </div>
        <div class="col-12 d-flex justify-content-center">
          <button class="btn btn-outline-black mb-2 me-md-2" type="submit" @click.prevent="register">Register</button>
        </div>
      </form>
      <div v-if="message" class="alert alert-danger">{{ message }}</div>
    </div>
  </div>
</template>