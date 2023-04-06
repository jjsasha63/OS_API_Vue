<template>
  <div class="d-flex justify-content-center align-items-center">
    <div class="container-fluid bg-white py-4 d-flex flex-column align-items-center">
      <h1 class="text-center mb-9" style="font-size: 2rem; font-weight: bold; font-family: Arial, sans-serif">Manage Customers</h1>

      <div class="row justify-content-center align-items-center mb-4">
        <div class="col-md-4 col-lg-3 mb-3 mb-md-0">
          <form class="row g-2">
            <div class="col-12">
              <label class="form-label fw-bold" for="name">Auth ID:</label>
              <input class="form-control" type="text" id="name" v-model="newCustomer.auth_id">
            </div>
            <div class="col-12">
              <label class="form-label fw-bold" for="description">Shipping Address:</label>
              <input class="form-control" type="text" id="description" v-model="newCustomer.shipping_address">
            </div>
            <div class="col-12">
              <label class="form-label fw-bold" for="badress">Billing Address:</label>
              <input class="form-control" type="text" id="badress" v-model="newCustomer.billing_address">
            </div>
            <div class="col-12">
              <label class="form-label fw-bold" for="pdm">Preferred Delivery Method ID:</label>
              <input class="form-control" type="text" id="pdm" v-model="newCustomer.preferred_delivery_method">
            </div>
            <div class="col-12">
              <label class="form-label fw-bold" for="ppm">Preferred Payment Method ID:</label>
              <input class="form-control" type="text" id="ppm" v-model="newCustomer.preferred_payment_method">
            </div>

            <div class="col-12 d-flex flex-wrap justify-content-center">
              <button class="btn btn-black mb-2 me-md-2" @click.prevent="addCustomer">Add Customer</button>
              <button class="btn btn-outline-black mb-2 me-md-2" @click.prevent="getCustomerById">By ID</button>
              <button class="btn btn-outline-black mb-2 me-md-2" @click.prevent="getCustomerByAuth">By Auth</button>
              <button class="btn btn-outline-black mb-2" @click.prevent="getCustomers">Refresh</button>
            </div>
          </form>
          <div v-if="message" class="alert alert-danger">{{ message }}</div>
        </div>
        <div class="col-md-8 col-lg-9">
          <table class="table table-borderless table-hover shadow rounded">
            <thead>
              <tr>
          <th >#ID</th>
          <th >Auth ID</th>
          <th >First Name</th>
          <th >Last Name</th>
          <th >Email</th>
          <th >Shipping address</th>
          <th >Billing address</th>
          <th >Preferred delivery method</th>
          <th >Preferred payment method</th>
          <th >Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="customer in customers" :key="customer.customer_id">
          <td >{{ customer.customer_id }}</td>
          <td >{{ customer.auth_id }}</td>
          <td >{{ customer.first_name }}</td>
          <td >{{ customer.last_name }}</td>
          <td >{{ customer.email }}</td>
          <td >{{ customer.shipping_address }}</td>
          <td >{{ customer.billing_address }}</td>
          <td >{{ customer.preferred_delivery_method }}</td>
          <td >{{ customer.preferred_payment_method }}</td>
                <td>
                  <button class="btn btn-sm btn-success me-2 minimalist-button animate__animated animate__fadeIn" @click="editCustomer(customer, newCustomer)">Edit</button>
                  <button class="btn btn-sm btn-danger minimalist-button animate__animated animate__fadeIn" @click="deleteCustomer(customer)">Delete</button>
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
import "@/assets/style.css"


export default defineComponent({
  setup() {
    
    interface Customer {
  customer_id: number;
  first_name: string;
  last_name: string;
  shipping_address: string;
  billing_address: string;
  preferred_payment_method: string;
  preferred_delivery_method: string;
  email: string;
  auth_id: number;
}

const customers = ref<Customer[]>([]);
const newCustomer = ref({ auth_id: null, shipping_address: null , billing_address: null, preferred_payment_method: null, preferred_delivery_method: null});
const store = useAuthStore();
const token = store.token;
const message = ref('');

    const getCustomers = async () => {
      try {
        const response = await fetch('https://localhost:8443/store/api/admin/customer/getAll', {
          headers: { Authorization: 'Bearer ' + token },
        });
        const data = await response.json();
        customers.value = data;
        newCustomer.value.auth_id = null;
        newCustomer.value.billing_address = null;
        newCustomer.value.shipping_address = null;
        newCustomer.value.preferred_delivery_method = null;
        newCustomer.value.preferred_payment_method = null;
        message.value = '';
      } catch (error) {
        console.log(error);
      }
    };

    const getCustomerById = async () => {
      try {
        const response = await fetch( `https://localhost:8443/store/api/admin/customer/getById?id=${newCustomer.value.auth_id}`, {
          headers: { Authorization: 'Bearer ' + token },
        });
        const data = await response.json();
        if(!data[1]) customers.value = [data];
        else customers.value = data;
        newCustomer.value.auth_id = null;
        newCustomer.value.billing_address = null;
        newCustomer.value.shipping_address = null;
        newCustomer.value.preferred_delivery_method = null;
        newCustomer.value.preferred_payment_method = null;
        message.value = '';
      } catch (error) {
        console.log(error);
      }
    };

    const getCustomerByAuth = async () => {
      try {
        const response = await fetch( `https://localhost:8443/store/api/admin/customer/getByAuth?auth=${newCustomer.value.auth_id}`, {
          headers: { Authorization: 'Bearer ' + token },
        });
        const data = await response.json();
        console.log(data);
         customers.value = data;
         newCustomer.value.auth_id = null;
        newCustomer.value.billing_address = null;
        newCustomer.value.shipping_address = null;
        newCustomer.value.preferred_delivery_method = null;
        newCustomer.value.preferred_payment_method = null;
        message.value = '';
      } catch (error) {
        console.log(error);
      }
    };

    const addCustomer = async () => {
      if (!newCustomer.value.auth_id|| !newCustomer.value.preferred_payment_method || !newCustomer.value.preferred_delivery_method) {
        message.value = 'The entry can not be empty';
    return;
  }
      try {
        const response = await fetch('https://localhost:8443/store/api/admin/customer/insert-one', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + token },
          body: JSON.stringify(newCustomer.value),
        });
        const data = await response.json();
        customers.value.push(data);
        newCustomer.value.auth_id = null;
        newCustomer.value.billing_address = null;
        newCustomer.value.shipping_address = null;
        newCustomer.value.preferred_delivery_method = null;
        newCustomer.value.preferred_payment_method = null;
        message.value = '';
      } catch (error) {
        console.log(error);
      }
    };

    const editCustomer = async (customer: any,newCustomer: any) => {
     
      try {
        const requestBody: any = { customer_id: customer.customer_id };
    for (const [key, value] of Object.entries(newCustomer)) {
      if (value) {
        requestBody[key] = value;
      }
    }

        const response = await fetch('https://localhost:8443/store/api/admin/customer/update-one', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + token },
          body: JSON.stringify(requestBody),
        });
        const data = await response.json();
        const index = customers.value.findIndex((c) => c.customer_id === customer.customer_id);
        customers.value.splice(index, 1, data);
        newCustomer.auth_id = null;
        newCustomer.billing_address = null;
        newCustomer.shipping_address = null;
        newCustomer.preferred_delivery_method = null;
        newCustomer.preferred_payment_method = null;
        message.value = '';
      } catch (error) {
        console.log(error);
      }
    };

    const deleteCustomer = async (customer: any) => {
      try {
        const response = await fetch(
          `https://localhost:8443/store/api/admin/customer/deleteById?id=${customer.customer_id}`,
          {
            method: 'POST',
            headers: { Authorization: 'Bearer ' + token },
          }
        );
        const index = customers.value.findIndex((c) => c.customer_id === customer.customer_id);
        customers.value.splice(index, 1);
        message.value = '';
      } catch (error) {
        console.log(error);
      }
    };

    onBeforeMount(() => {
      getCustomers();
    });

    return {
      message,
      newCustomer,
      customers,
      getCustomers,
      addCustomer,
      editCustomer,
      deleteCustomer,
      getCustomerById,
      getCustomerByAuth
    };
  },
});
</script>