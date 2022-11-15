import axios from 'axios';

//base axios instance ca
const api = axios.create({
    baseURL: 'https://api.github.com/'
})

export default api;
