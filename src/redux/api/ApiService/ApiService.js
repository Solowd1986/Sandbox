class ApiService {
    constructor() {
        this._axios = require('axios').default;

        this.api = this._axios.create({
            baseURL: "/api/",
            timeout: 1000 * 5,
            withCredentials: true,
            headers: {
                'Authorization': `Bearer ${JSON.parse(decodeURIComponent(localStorage.getItem("token")))}`,
            },
        });
    }
}

export default new ApiService().api;


