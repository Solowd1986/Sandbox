class ApiService {
    constructor() {
        this._axios = require('axios').default;

        this.api = this._axios.create({
            baseURL: "/api/",
            timeout: 1000 * 5,
            withCredentials: true
        });
    }
}

export default new ApiService().api;


