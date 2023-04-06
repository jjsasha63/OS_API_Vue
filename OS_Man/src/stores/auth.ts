import { defineStore } from 'pinia';
import router from '@/router';

export const useAuthStore = defineStore({
  id: 'auth',
  state: () => {
    return {
      user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : null,
      token: localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')!) : null,
      role: localStorage.getItem('role') ? JSON.parse(localStorage.getItem('role')!) : null,
      returnUrl: '/category'
    }
  },
  actions: {
    async login(email: string, password: string) {
      const response = await fetch('https://localhost:8443/store/api/auth/authenticate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      if (response.status === 200) {
        var data = await response.json();
        if(data.role!='ADMIN') throw new Error('Invalid Authorization');
        localStorage.setItem('user', JSON.stringify(email));
        localStorage.setItem('token', JSON.stringify(data.token));
        localStorage.setItem('role', JSON.stringify(data.role));
        this.user = email;
        this.token = data.token;
        this.role = data.role;
        router.push(this.returnUrl || '/');
      } else {
        throw new Error('Invalid credentials');
      }

    },

    logout() { 
      fetch('https://localhost:8443/store/api/logout', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    }
  }).then(response => {
    if (response.status === 200) {
      this.user = '';
      this.token = '';
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      router.push('/login');
    } else {
      throw new Error('Failed to clean token');
    }
  }).catch(error => {
    console.log(error);
    router.push('/login');
  });
      
      
    }
  }
});
