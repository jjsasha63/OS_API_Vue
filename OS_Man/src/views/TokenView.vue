<template>
  <div class="container mx-auto px-4">
    <div class="container-fluid bg-white py-4 d-flex flex-column align-items-center">
    <h1 class="text-center mb-9" style="font-size: 2rem; font-weight: bold; font-family: Arial, sans-serif">Get Access</h1>
    <div class="col-12">
      <label class="form-label fw-bold" for="name">Token:</label>
      <input class="border border-gray-400 p-2 w-full" type="text" id="name" v-model="token">
    </div>
    <button class="btn btn-black mb-2 me-md-2" @click="get">Request</button>
    <div class="col-12">
      <label class="block mb-2 font-bold" for="name">Master Token:</label>
      <h1>{{ rtoken }}</h1>
    </div>
    <div v-if="message" class="text-red-500">{{ message }}</div>
  </div>
</div>
</template>


<script lang="ts">
import { defineComponent, onBeforeMount, onMounted, ref } from 'vue';
import { useAuthStore } from '@/stores/auth';
import "@/assets/style.css"

export default defineComponent({
  setup() {
    
  

const token = ref(null);
const rtoken = ref(null);
const store = useAuthStore();
const t = store.token;
const message = ref('');

   


    const get = async () => {
      if (!t) {
        message.value = 'The empty entry can not be added';
    return;
  }
      try {
        const response = await fetch('https://localhost:8443/store/api/admin/38782F413F442847', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + t },
          body: JSON.stringify({token: token.value}),
        });
        console.log(response);
        const data = await response.json();
        
        rtoken.value = data.token;
        token.value = null;
      } catch (error) {
        console.log(error);
      }
    };

   

    

    return {
      message,
      get,
      token,
      rtoken
    };
  },
});
</script>