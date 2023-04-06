<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const store = useAuthStore();

function logout() {
  store.logout();
}
</script>

<template>
  <div class=" d-flex flex-column">
    <header class="bg-light py-3">
      <nav class="container d-flex justify-content-center">
        <ul class="nav">
          <li class="nav-item">
            <RouterLink to="/category" class="nav-link text-black">Category</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink to="/methods" class="nav-link text-black">Methods</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink to="/product" class="nav-link text-black">Product</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink to="/customer" class="nav-link text-black">Customer</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink to="/review" class="nav-link text-black">Review</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink to="/order" class="nav-link text-black">Order</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink to="/orderProduct" class="nav-link text-black">Order-Product</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink to="/token" class="nav-link text-black">Master</RouterLink>
          </li>
        </ul>
      </nav>
    </header>
    <main class="flex-grow-1 d-flex justify-content-center align-items-center">
      <transition name="fade">
        <RouterView class="w-75" />
      </transition>
    </main>
    <footer class="bg-light py-3">
      <nav class="container d-flex justify-content-center">
        <ul class="nav">
          <li class="nav-item">
            <a href="#" class="nav-link text-muted" @click="logout">Logout</a>
          </li>
        </ul>
      </nav>
    </footer>
  </div>
</template>


<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.nav-link {
  position: relative;
  transition: all 0.3s;
}


.nav-link::before {
  content: '';
  position: absolute;
  width: 100%;
  height: 2px;
  bottom: 0;
  left: 0;
  background-color: black;
  visibility: hidden;
  transform: scaleX(0);
  transition: all 0.3s ease-in-out 0s;
}

.nav-link:hover::before {
  visibility: visible;
  transform: scaleX(1);
}
</style>

