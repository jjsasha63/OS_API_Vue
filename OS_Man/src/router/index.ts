import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '@/views/DashboardView.vue'
import CategoryView from '@/views/CategoryView.vue'
import { useAuthStore } from '@/stores/auth'
import MethodsView from '@/views/MethodsView.vue'
import ProductView from '@/views/ProductView.vue'
import CustomerView from '@/views/CustomerView.vue'
import ReviewView from '@/views/ReviewView.vue'
import OrderView from '@/views/OrderView.vue'
import OrderProductView from '@/views/OrderProductView.vue'
import CategoryIDView from '@/views/CategoryIDView.vue'
import MethodsIDView from '@/views/MethodsIDView.vue'
import ProductIDView from '@/views/ProductIDView.vue'
import OrderIDView from '@/views/OrderIDView.vue'
import CustomerIDView from '@/views/CustomerIDView.vue'
import TokenView from '@/views/TokenView.vue'
import { useMAuthStore } from '@/stores/authM'
import MasterView from '@/views/MasterView.vue'
import LoginFormVue from '@/components/LoginForm.vue'
import MasterLoginFormVue from '@/components/MasterLoginForm.vue'
import AdminRegister from '@/components/AdminRegister.vue'








const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/category',
      name: 'category',
      component: CategoryView
    },
    {
      path: '/register',
      name: 'register',
      component: AdminRegister
    },
    {
      path: '/loginMaster',
      name: 'loginMaster',
      component: MasterLoginFormVue   },
       {
      path: '/master',
      name: 'master',
      component: MasterView  },
    {
      path: '/category/:id',
      name: 'categortyId',
      component: CategoryIDView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginFormVue    },
    {
       path: '/methods',
       name: 'methods',
       component: MethodsView    },
       {
        path: '/methods/:id',
        name: 'methodsId',
        component: MethodsIDView    },
       {
        path: '/product',
        name: 'product',
        component: ProductView    },
        {
          path: '/product/:id',
          name: 'productId',
          component: ProductIDView   },
        {
          path: '/customer',
          name: 'customer',
          component: CustomerView    },
          {
            path: '/customer/:id',
            name: 'customerId',
            component: CustomerIDView    },
          {
            path: '/review',
            name: 'review',
            component: ReviewView    },
            {
              path: '/order',
              name: 'order',
              component: OrderView   },
              {
                path: '/order/:id',
                name: 'orderId',
                component: OrderIDView   },
              {
                path: '/orderProduct',
                name: 'orderProduct',
                component: OrderProductView   },
                {
                  path: '/token',
                  name: 'token',
                  component: TokenView   },

  ]
});

router.beforeEach(async (to) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ['/login','/loginMaster','/register'];
  const authRequired = !publicPages.includes(to.path);
  const auth = useAuthStore();
  const authM = useMAuthStore();

  
  if (authRequired && !auth.user  && !authM.user) {
      auth.returnUrl = to.fullPath;
      return '/login';
  }
});


export default router
