const axios = require('axios').default;
//import axiosRetry from 'axios-retry';


const api = axios.create({
    baseURL: "/api/",
    timeout: 1000 * 5,
    withCredentials: true
});


const onSuccess = (success) => success;

const onFail = error => {
    //console.log('fail');

    // if (error.response.status === 403) {
    //
    // }

    console.dir(error);
    console.log('----------------------');

    console.dir('fail responce', error);

    //console.log('fail responce', error);
    //throw new Error(error);
    //return error;
};

//api.interceptors.response.use(onSuccess, onFail);

export default api;



