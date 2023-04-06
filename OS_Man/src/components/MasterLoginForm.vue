<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { useMAuthStore } from '@/stores/authM';

const user = reactive({
  email: '',
  password: '',
  token: ''
});

function onSubmit() {
  console.log(user);
  if (user.email != '' && user.password != ''&& user.token != '') {
    useMAuthStore().login(user.email, user.password,user.token);
  }
}
</script>

<template>
  <div class="d-flex justify-content-center align-items-center">
    <div class="container-fluid bg-white py-4 d-flex flex-column align-items-center">
      <h1 class="text-center mb-9" style="font-size: 2rem; font-weight: bold; font-family: Arial, sans-serif">
        Sign In
      </h1>
      <form class="row g-3" @submit.prevent="onSubmit">
        <div class="col-12">
          <label class="form-label fw-bold" for="email">Username</label>
          <input type="text" id="email" class="form-control" placeholder="Username" v-model="user.email">
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
          <button class="btn btn-outline-black mb-2 me-md-2" type="submit">Sign In</button>
        </div>
      </form>
    </div>
  </div>
</template>