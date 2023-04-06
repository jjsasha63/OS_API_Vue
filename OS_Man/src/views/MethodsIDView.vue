<template>
  <div class="d-flex justify-content-center align-items-center">
    <div class="container-fluid bg-white py-4 d-flex flex-column align-items-center">
        <div class="col-md-8 col-lg-9">
          <h1 class="text-center mb-9" style="font-size: 1rem; font-weight: bold; font-family: Arial, sans-serif">Payment Methods</h1>
          <table class="table table-borderless table-hover shadow rounded">
            <thead>
        <tr>
          <th >#ID</th>
          <th >Name</th>
          <th >Description</th>
          <th >Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="payment in payments" :key="payment.payment_method_id">
          <td >{{ payment.payment_method_id }}</td>
          <td >{{ payment.name }}</td>
          <td >{{ payment.description }}</td>
          <td>
                  <button class="btn btn-sm btn-danger minimalist-button animate__animated animate__fadeIn" @click="deletePayment(payment)">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
          <h1 class="text-center mb-9" style="font-size: 1rem; font-weight: bold; font-family: Arial, sans-serif">Delivery Methods</h1>
          <table class="table table-borderless table-hover shadow rounded">
            <thead>
        <tr>
          <th >#ID</th>
          <th >Name</th>
          <th >Description</th>
          <th >Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="delivery in deliveries" :key="delivery.delivery_method_id">
          <td >{{ delivery.delivery_method_id }}</td>
          <td>{{ delivery.name }}</td>
          <td >{{ delivery.description }}</td>
          <td >
                  <button class="btn btn-sm btn-danger minimalist-button animate__animated animate__fadeIn" @click="deleteDelivery(delivery)">Delete</button>
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
import { useRoute, useRouter } from 'vue-router'


export default defineComponent({

  
  setup() {
    
    interface Payment {
  payment_method_id: number;
  name: string;
  description: string;
}

interface Delivery {
  delivery_method_id: number;
  name: string;
  description: string;
}

const route = useRoute()
const payments = ref<Payment[]>([]);
const deliveries = ref<Delivery[]>([]);
const newp = ref({ name: null, description: null });
const store = useAuthStore();
const token = store.token;



    const getPaymentMById = async (id:any) => {
      try {
        const response = await fetch( `https://localhost:8443/store/api/admin/paymentMethod/getById?id=${id}`, {
          headers: { Authorization: 'Bearer ' + token },
        });
        const data = await response.json();
        payments.value = [data];
      } catch (error) {
        console.log(error);
      }
    };

    

    const getDeliveryMById = async (id:any) => {
      try {
        const response = await fetch( `https://localhost:8443/store/api/admin/deliveryMethod/getById?id=${id}`, {
          headers: { Authorization: 'Bearer ' + token },
        });
        const data = await response.json();
        deliveries.value = [data];
      } catch (error) {
        console.log(error);
      }
    };

  


    const deletePayment = async (payment: any) => {
      try {
        const response = await fetch(
          `https://localhost:8443/store/api/admin/paymentMethod/deleteById?id=${payment.payment_method_id}`,
          {
            method: 'POST',
            headers: { Authorization: 'Bearer ' + token },
          }
        );
        const index = payments.value.findIndex((c) => c.payment_method_id === payment.payment_method_id);
        payments.value.splice(index, 1);
      } catch (error) {
        console.log(error);
      }
    };

    const deleteDelivery = async (delivery: any) => {
      try {
        const response = await fetch(
          `https://localhost:8443/store/api/admin/deliveryMethod/deleteById?id=${delivery.delivery_method_id}`,
          {
            method: 'POST',
            headers: { Authorization: 'Bearer ' + token },
          }
        );
        const index = deliveries.value.findIndex((c) => c.delivery_method_id === delivery.delivery_method_id);
        deliveries.value.splice(index, 1);
      } catch (error) {
        console.log(error);
      }
    };


    onBeforeMount(() => {
      getDeliveryMById(route.params.id);
      getPaymentMById(route.params.id);
    });

    return {
      newp,
      payments,
      deliveries,
      deletePayment,
      deleteDelivery,
      getPaymentMById,
      getDeliveryMById,
    };
  },
});
</script>