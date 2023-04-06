<template>
  <div class="d-flex justify-content-center align-items-center">
    <div class="container-fluid bg-white py-4 d-flex flex-column align-items-center">
      <h1 class="text-center mb-9" style="font-size: 2rem; font-weight: bold; font-family: Arial, sans-serif">Manage Orders</h1>
      <div class="row justify-content-center align-items-center mb-4">
        <div class="col-md-4 col-lg-3 mb-3 mb-md-0">
          <form class="row g-2">
            <div class="col-12">
              <label class="form-label fw-bold" for="auth">Auth ID*:</label>
              <input class="form-control" type="text" id="auth" v-model="auth">
            </div>
            <div class="col-12">
              <label class="form-label fw-bold" for="orderStatus">Order Status:</label>
              <select class="form-select" id="orderStatus" v-model="newOrder.order_status">
                <option value="" disabled>Select an option</option>
                <option value="NEW">NEW</option>
                <option value="PAYMENT_RECEIVED">PAYMENT_RECEIVED</option>
        <option value="PAYMENT_FAILED">PAYMENT_FAILED</option>
        <option value="IN_PROGRESS">IN_PROGRESS</option>
        <option value="COMPLETED">COMPLETED</option>
        <option value="CLOSED">CLOSED</option>
        <option value="CANCELED">CANCELED</option>
              </select>
            </div>
            <div class="col-12">
              <label class="form-label fw-bold"  for="dStatus">Delivery Status:</label>
              <select class="form-select" id="dStatus" v-model="newOrder.delivery_status">
                <option value="" disabled>Select an option</option>
                <option value="" disabled>Select an option</option>
        <option value="PROCESSING">PROCESSING</option>
        <option value="SHIPPED">SHIPPED</option>
        <option value="IN_TRANSIT">IN_TRANSIT</option>
        <option value="DELIVERED">DELIVERED</option>
              </select>
            </div>
            <div class="col-12">
              <label class="form-label fw-bold" for="description">Delivery Method ID:</label>
              <input class="form-control" type="text" id="auth" idd="description" v-model="newOrder.delivery_method_id">
            </div>
            </form>
            </div>
            <div class="col-md-4 col-lg-3 mb-3 mb-md-0">
          <form class="row g-2">
            <div class="col-12">
              <label class="form-label fw-bold" for="auth">Payment Method ID:</label>
              <input class="form-control" type="text" id="auth" v-model="newOrder.payment_method_id">
            </div>
            <div class="col-12">
              <label class="form-label fw-bold" for="auth">Delivery Tracking Number:</label>
              <input class="form-control" type="text" id="auth" v-model="newOrder.delivery_tracking_number">
            </div>
            <div class="col-12">
              <label class="form-label fw-bold" for="auth">Delivery Price:</label>
              <input class="form-control" type="text" id="auth" v-model="newOrder.delivery_price">
            </div>
            <div class="col-12">
              <label class="form-label fw-bold" for="auth">Delivery Address:</label>
              <input class="form-control" type="text" id="auth"  v-model="newOrder.delivery_address">
            </div>
          </form>
          </div>
            <div class="col-md-4 col-lg-3 mb-3 mb-md-0">
          <form class="row g-2">
            <div class="col-12">
              <label class="form-label fw-bold" for="auth">Payment Link:</label>
              <input class="form-control" type="text" id="auth" v-model="newOrder.payment_link">
            </div>
            <div class="col-12">
              <label class="form-label fw-bold" for="auth">Payment Reciept:</label>
              <input class="form-control" type="text" id="auth" v-model="newOrder.payment_receipt">
            </div>
            <div class="col-12">
              <label class="form-label fw-bold" for="auth">Order Price:</label>
              <input class="form-control" type="text" id="auth" v-model="newOrder.order_price">
            </div>
            <div class="col-12">
              <label class="form-label fw-bold" for="auth">Comment:</label>
              <input class="form-control" type="text" id="auth"  v-model="newOrder.comment">
            </div>

            </form>
            </div>
        
        <div class="col-md-8 col-lg-9">
          <form class="row g-2">
            <div class="col-12 col-lg-4">
              <label class="form-label fw-bold" for="idd">Search Filter:</label>
              <input class="form-control" type="text" id="idd" v-model="idd">
            </div>
            
            </form>
            <div class="col-12 col-lg-8 d-flex flex-wrap justify-content-start justify-content-lg-end align-items-center">
              <button class="btn btn-black mb-2 me-md-2" @click="addOrder(auth)">Add Order</button>
              <button class="btn btn-outline-black mb-2 me-md-2" @click="getOrderById">By ID</button>
              <button class="btn btn-outline-black mb-2 me-md-2" @click="getOrderByAuth">By Auth</button>
              <button class="btn btn-outline-black mb-2 me-md-2" @click.prevent="getOrders">Refresh</button>


            </div>
            <div v-if="message" class="alert alert-danger">{{ message }}</div>

            <div class="col-md-8 col-lg-9 table-responsive tt">
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
                  <button class="btn btn-success me-2" @click="editOrder(order, newOrder)">Edit</button>
                  <button class="btn btn-danger" @click="deleteOrder(order)">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
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

const orders = ref<Order[]>([]);
const newOrder = ref({ order_status: null, delivery_method_id: null , delivery_status: null, delivery_tracking_number: null, delivery_price: null, delivery_address: null
, payment_method_id: null , payment_link: null, payment_receipt: null, order_price: null, comment: null});
const idd = ref<number>(0);
const auth = ref<number>(0);
const store = useAuthStore();
const token = store.token;
const message = ref('');

    const getOrders = async () => {
      try {
        const response = await fetch('https://localhost:8443/store/api/admin/order/getAll', {
          headers: { Authorization: 'Bearer ' + token },
        });
        const data = await response.json();
        orders.value = data;
        newOrder.value.delivery_address = null;
        newOrder.value.delivery_method_id = null;
        newOrder.value.delivery_price = null
        newOrder.value.delivery_status = null
        newOrder.value.delivery_tracking_number = null;
        newOrder.value.order_price = null;
        newOrder.value.order_status = null
        newOrder.value.payment_link = null
        newOrder.value.payment_method_id = null
        newOrder.value.payment_receipt = null
        message.value = "";
      } catch (error) {
        console.log(error);
      }
    };

    const getOrderById = async () => {
      try {
        const response = await fetch(`https://localhost:8443/store/api/admin/order/getById?id=${idd.value}`, {
          headers: { Authorization: 'Bearer ' + token },
        });
        const data = await response.json()
        orders.value = [data];
        idd.value =0;
        message.value = "";
      } catch (error) {
        console.log(error);
      }
    };

    const getOrderByAuth = async () => {
      try {
        const response = await fetch(`https://localhost:8443/store/api/admin/order/getByAuth?auth=${idd.value}`, {
          headers: { Authorization: 'Bearer ' + token },
        });
        const data = await response.json();
        if(!data[1]) orders.value = [data];
        orders.value = data;
        idd.value =0;
        message.value = "";
      } catch (error) {
        console.log(error);
      }
    };

    const addOrder = async (auth: number) => {
      if (!auth || !newOrder.value.delivery_method_id || !newOrder.value.payment_method_id || !newOrder.value.delivery_address) {
        message.value = 'The empty entry can not be added';
    return;
  }
      try {
        const response = await fetch(`https://localhost:8443/store/api/admin/order/insert-one?auth=${auth}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + token },
          body: JSON.stringify(newOrder.value),
        });
        console.log(response)
        const data = await response.json();
        orders.value.push(data);
        auth =0;
        newOrder.value.delivery_address = null;
        newOrder.value.delivery_method_id = null;
        newOrder.value.delivery_price = null
        newOrder.value.delivery_status = null
        newOrder.value.delivery_tracking_number = null;
        newOrder.value.order_price = null;
        newOrder.value.order_status = null
        newOrder.value.payment_link = null
        newOrder.value.payment_method_id = null
        newOrder.value.payment_receipt = null
        message.value = "";
      } catch (error) {
        console.log(error);
      }
    };

    const editOrder = async (order: any,newOrder: any) => {
     
      try {

        const requestBody: any = { order_id: order.order_id };
    for (const [key, value] of Object.entries(newOrder)) {
      if (value) {
        requestBody[key] = value;
      }
    }

        const response = await fetch(`https://localhost:8443/store/api/admin/order/update-one?id=${order.order_id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + token },
          body: JSON.stringify(requestBody),
        });
        const data = await response.json();
        const index = orders.value.findIndex((c) => c.order_id === order.order_id);
        orders.value.splice(index, 1, data);
        newOrder.delivery_address = null;
        newOrder.delivery_method_id = null;
        newOrder.delivery_price = null
        newOrder.delivery_status = null
        newOrder.delivery_tracking_number = null;
        newOrder.order_price = null;
        newOrder.order_status = null
        newOrder.payment_link = null
        newOrder.payment_method_id = null
        newOrder.payment_receipt = null
        message.value = "";
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
        message.value = "";

      } catch (error) {
        console.log(error);
      }
    };

    onBeforeMount(() => {
      getOrders();
    });

    return {
      message,
      newOrder,
      orders,
      idd,
      auth,
      getOrders,
      getOrderById,
      getOrderByAuth,
      addOrder,
      editOrder,
      deleteOrder,
    };
  },
});
</script>