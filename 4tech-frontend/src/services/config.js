import axios from 'axios'

export const axios4Tech = axios.create({ 
    baseURL: 'http://localhost:3000',
    timeout: 10000 //ms
})