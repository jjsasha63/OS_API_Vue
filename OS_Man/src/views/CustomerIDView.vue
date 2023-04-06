<template>
   <div class="d-flex justify-content-center align-items-center">
    <div class="container-fluid bg-white py-4 d-flex flex-column align-items-center">
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
                  <button class="btn btn-sm btn-danger minimalist-button animate__animated animate__fadeIn" @click="deleteCustomer(customer)">Delete</button>
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
import { useRoute, useRouter } from 'vue-router';


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


const route = useRoute()
const customers = ref<Customer[]>([]);
const newCustomer = ref({ auth_id: '', shipping_address: '' , billing_address: '', preferred_payment_method: '', preferred_delivery_method: ''});
const store = useAuthStore();
const token = store.token;


  

    const getCustomerByAuth = async (id:any) => {
      try {
        const response = await fetch( `https://localhost:8443/store/api/admin/customer/getByAuth?auth=${id}`, {
          headers: { Authorization: 'Bearer ' + token },
        });
        const data = await response.json();
        console.log(data);
         customers.value = data;
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
      } catch (error) {
        console.log(error);
      }
    };

    onBeforeMount(() => {
      getCustomerByAuth(route.params.id);
    });

    return {
      newCustomer,
      customers,
      deleteCustomer,
      getCustomerByAuth
    };
  },
});
</script>