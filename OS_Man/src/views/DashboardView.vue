<script lang="ts" setup>
import { useAuthStore } from '@/stores/auth';
import { onMounted, ref } from 'vue';

const store = useAuthStore();
const token = store.token;
const data = ref('');

onMounted(async () => {
  const response = await fetch('https://localhost:8443/store/api/account/getDetails', {
    headers: {
      Authorization: `Bearer ` + token,
    },
  });
  data.value = await response.text();
});

</script>

<template>
  <h1 class="text-3xl mb-8">Dashboard</h1>
  <p>{{ data }}</p>
</template>
