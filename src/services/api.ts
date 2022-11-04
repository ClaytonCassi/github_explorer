import axios from 'axios';

//base axios instance call
const api = axios.create({
    baseURL: 'https://api.github.com/'
})

export default api;
