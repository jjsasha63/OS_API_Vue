import { defineStore } from 'pinia';
import router from '@/router';

export const useMAuthStore = defineStore({
  id: 'authM',
  state: () => {
    return {
      user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : null,
      token1: localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')!) : null,
      role: localStorage.getItem('role') ? JSON.parse(localStorage.getItem('role')!) : null,
      returnUrl: '/master'
    }
  },
  actions: {
    async login(email: string, password: string, token: string) {
      const response = await fetch('https://localhost:8443/store/api/auth/6D5A713374367739', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password, token })
      });

      if (response.status === 200) {
        var data = await response.json();
        if(data.role!='MASTER') throw new Error('Invalid Authorization');
        localStorage.setItem('user', JSON.stringify(email));
        localStorage.setItem('token', JSON.stringify(data.token));
        localStorage.setItem('role', JSON.stringify(data.role));
        this.user = email;
        this.token1 = data.token;
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
      'Authorization': `Bearer ${this.token1}`
    }
  }).then(response => {
    if (response.status === 200) {
      this.user = '';
      this.token1 = '';
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
