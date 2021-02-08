const axios = require('axios').default;

const api = axios.create({
    baseURL: "/api/",
    timeout: 1000 * 5,
    withCredentials: true
});

const onSuccess = (success) => success;

const onFail = (error) => {
    if (error.response.status === 403) {

    }
    return error;
};

api.interceptors.response.use(onSuccess, onFail);

export default api;



