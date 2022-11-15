import axios from 'axios';

//base axios instance cal
const api = axios.create({
    baseURL: 'https://api.github.com/'
})

export default api;
