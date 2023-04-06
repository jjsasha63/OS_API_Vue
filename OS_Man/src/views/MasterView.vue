<template>
   <div class="d-flex justify-content-center align-items-center">
    <div class="container-fluid bg-white py-4 d-flex flex-column align-items-center">
      <h1 class="text-center mb-9" style="font-size: 2rem; font-weight: bold; font-family: Arial, sans-serif">Manage Customers</h1>
      <div class="row justify-content-center align-items-center mb-4">
        <div class="col-md-4 col-lg-3 mb-3 mb-md-0">
          <form class="row g-2">
          <div class="col-12">
            <label class="form-label fw-bold" for="name">First Name:</label>
            <input class="form-control" type="text" id="name"  v-model="newUser.first_name">
          </div>
          <div class="col-12">
            <label class="form-label fw-bold" for="description">Last Name:</label>
            <input class="form-control" type="text" id="description" v-model="newUser.last_name">
          </div>
          <div class="col-12">
            <label class="form-label fw-bold" for="description">Email:</label>
            <input class="form-control" type="text" id="description" v-model="newUser.email">
          </div>
        
          <div class="col-12">
            <label class="form-label fw-bold" for="password">Password:</label>
            <input type="password" id="password" placeholder="Password" v-model="newUser.password" class="form-control">
          </div>
          <div class="col-12">
            <label class="form-label fw-bold" for="orderStatus">Role:</label>
            <select class="form-select" id="orderStatus" v-model="newUser.role">
              <option value="" disabled>Select an option</option>
              <option value="MASTER">MASTER</option>
              <option value="ADMIN">ADMIN</option>
              <option value="CUSTOMER">CUSTOMER</option>
            </select>
          </div>
          <div class="d-flex justify-content-center">
            <button class="btn btn-black mb-2 me-md-2" @click.prevent="addUser">Register</button>
            <button class="btn btn-black mb-2 me-md-2" @click.prevent="getUsers">Refresh</button>
          </div>
          </form>
          <div v-if="message" class="text-red-500">{{ message }}</div>
      </div>

      
      <div class="table-responsive col-md-8 col-lg-9">
        <table class="table table-borderless table-hover shadow rounded">
          <thead>
            <tr>
              <th >Auth ID</th>
              <th >First Name</th>
              <th >Last Name</th>
              <th >Email</th>
              <th >Role</th>
              <th >Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in users" :key="user.auth_id">
              <td >{{ user.auth_id }}</td>
              <td >{{ user.first_name }}</td>
              <td >{{ user.last_name }}</td>
              <td >{{ user.email }}</td>
              <td >{{ user.role }}</td>
              <td >
            <button class="btn btn-sm btn-success me-2 minimalist-button animate__animated animate__fadeIn" @click="editUsers(user,newUser)">Edit</button>
            <button class="btn btn-sm btn-danger minimalist-button animate__animated animate__fadeIn" @click="deleteUser(user)">Delete</button>
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
import { useMAuthStore } from '@/stores/authM';
import "@/assets/style.css"


export default defineComponent({
  setup() {
    
    interface User {
      auth_id: number;
  first_name: string;
  last_name: string;
  role: string;
  email: string;
}

const users = ref<User[]>([]);
const newUser = ref({first_name: null, last_name: null , email: null, password: null, role: null});
const store = useMAuthStore();
const token = store.token1;
const message = ref('');

    const getUsers = async () => {
      try {
        const response = await fetch('https://localhost:8443/store/api/master/getAll', {
          headers: { Authorization: 'Bearer ' + token },
        });
        const data = await response.json();
        users.value = data;
        newUser.value.email = null;
        newUser.value.first_name =null;
        newUser.value.last_name = null;
        newUser.value.password = null;
        newUser.value.role = null;
        message.value = '';
      } catch (error) {
        console.log(error);
      }
    };

    


    const addUser = async () => {
      if (!newUser.value.email|| !newUser.value.first_name || !newUser.value.last_name|| !newUser.value.password || !newUser.value.role) {
        message.value = 'The empty entry can not be added';
    return;
  }
      try {
        const response = await fetch('https://localhost:8443/store/api/master/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + token },
          body: JSON.stringify(newUser.value),
        });
        const data = await response.json();
        users.value.push(data);
        newUser.value.email = null;
        newUser.value.first_name =null;
        newUser.value.last_name = null;
        newUser.value.password = null;
        newUser.value.role = null;
        message.value = '';
      } catch (error) {
        console.log(error);
      }
    };

    const editUsers = async (user: any,newUser: any) => {
     
      try {
        const requestBody: any = { auth_id: user.auth_id };
    for (const [key, value] of Object.entries(newUser)) {
      if (value) {
        requestBody[key] = value;
      }
    }

        const response = await fetch('https://localhost:8443/store/api/master/update', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + token },
          body: JSON.stringify(requestBody),
        });
        const data = await response.json();
        const index = users.value.findIndex((c) => c.auth_id === user.auth_id);
        users.value.splice(index, 1, data);
        newUser.email = null;
        newUser.first_name =null;
        newUser.last_name = null;
        newUser.password = null;
        newUser.role = null;
        message.value = '';
      } catch (error) {
        console.log(error);
      }
    };

    const deleteUser = async (user: any) => {
      try {
        const response = await fetch(
          `https://localhost:8443/store/api/master/deleteById?id=${user.auth_id}`,
          {
            method: 'POST',
            headers: { Authorization: 'Bearer ' + token },
          }
        );
        const index = users.value.findIndex((c) => c.auth_id === user.auth_id);
        users.value.splice(index, 1);
        message.value = '';
      } catch (error) {
        console.log(error);
      }
    };

    onBeforeMount(() => {
      getUsers();
    });

    return {
      message,
      newUser,
      users,
      getUsers,
      addUser,
      editUsers,
      deleteUser,
    };
  },
});
</script>