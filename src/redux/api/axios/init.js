const axios = require('axios').default;

const api = axios.create({
    baseURL: "/api/",
    timeout: 1000 * 5,
    withCredentials: true
});

export default api;



