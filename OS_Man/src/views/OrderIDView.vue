<template>
    <div class="d-flex justify-content-center align-items-center">
    <div class="container-fluid bg-white py-4 d-flex flex-column align-items-center">
        <div class="col-md-8 col-lg-9">
    <table class="table table-borderless table-hover shadow rounded mt-4">
            <thead>
              <tr>
          <th >#ID</th>
          <th >Auth ID</th>
          <th >Order Date</th>
          <th >Order Status</th>
          <th >Delivery Method Id</th>
          <th >Delivery Method</th>
          <th >Delivery Status</th>
          <th >Delivery Tracking Number</th>
          <th >Delivery Price</th>
          <th >Delivery Address</th>
          <th >Payment Method Id</th>
          <th >Payment Method</th>
          <th >Payment Link</th>
          <th >Payment Reciept</th>
          <th >Order Price</th>
          <th >Comment</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="order in orders" :key="order.order_id">
          <td >{{ order.order_id }}</td>
          <td ><a :href="'/customer/' + order.auth_id">{{ order.auth_id }}</a></td>
          <td >{{ order.order_date}}</td>
          <td >{{ order.orderStatus}}</td>
          <td ><a :href="'/methods/' + order.delivery_method_id">{{ order.delivery_method_id }}</a></td>
          <td >{{ order.delivery_method }}</td>
          <td >{{ order.deliveryStatus }}</td>
          <td >{{ order.delivery_tracking_number }}</td>
          <td >{{ order.delivery_price }}</td>
          <td >{{ order.delivery_address }}</td>
          <td ><a :href="'/methods/' + order.payment_method_id">{{ order.payment_method_id }}</a></td>
          <td >{{ order.payment_method }}</td>
          <td >{{ order.payment_link }}</td>
          <td >{{ order.payment_receipt }}</td>
          <td >{{ order.order_price }}</td>
          <td >{{ order.comment }}</td>
                <td>
                  <button class="btn btn-danger" @click="deleteOrder(order)">Delete</button>
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
    
    interface Order {
      order_id: number;
      auth_id: number;
      order_date: string;
      orderStatus: string;
      delivery_method_id: number;
      delivery_method: string;
      deliveryStatus: string;
      delivery_tracking_number: string;
      delivery_price: number;
      delivery_address: string;
      payment_method_id: number;
      payment_method: string;
      payment_link: string;
      payment_receipt: string;
      order_price: number;
      comment: number;
}

const route = useRoute()
const orders = ref<Order[]>([]);
const newOrder = ref({ order_status: null, delivery_method_id: null , delivery_status: null, delivery_tracking_number: null, delivery_price: null, delivery_address: null
, payment_method_id: null , payment_link: null, payment_receipt: null, order_price: null, comment: null});
const store = useAuthStore();
const token = store.token;

   

    const getOrderById = async (id:any) => {
      try {
        const response = await fetch(`https://localhost:8443/store/api/admin/order/getById?id=${id}`, {
          headers: { Authorization: 'Bearer ' + token },
        });
        const data = await response.json()
        orders.value = [data];
      } catch (error) {
        console.log(error);
      }
    };

   

    const deleteOrder = async (order: any) => {
      try {
        const response = await fetch(
          `https://localhost:8443/store/api/admin/order/deleteById?id=${order.order_id}`,
          {
            method: 'POST',
            headers: { Authorization: 'Bearer ' + token },
          }
        );
        const index = orders.value.findIndex((c) => c.order_id === order.order_id);
        orders.value.splice(index, 1);
      } catch (error) {
        console.log(error);
      }
    };

    onBeforeMount(() => {
      getOrderById(route.params.id);
    });

    return {
      newOrder,
      orders,
      getOrderById,
      deleteOrder,
    };
  },
});
</script>