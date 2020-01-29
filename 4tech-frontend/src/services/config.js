import axios from 'axios'

export const axios4Tech = axios.create({ 
    baseURL: 'http://localhost:3000',
    timeout: 10000 //ms
})

axios4Tech.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');

    if(token){
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});