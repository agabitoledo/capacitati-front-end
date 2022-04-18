import axios from 'axios';

const api = axios.create({
    baseURL: "https://hitss-on-gabrielle.herokuapp.com",
})

export default api;