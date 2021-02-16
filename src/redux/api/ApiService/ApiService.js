class ApiService {
    constructor(retry = false) {
        this._axios = require('axios').default;
        this.retryRequestCount = 0;
        this.shouldRequestRetry = retry;

        this.api = this._axios.create({
            baseURL: "/api/",
            timeout: 1000 * 5,
            withCredentials: true
        });
    }

    get = async (uri) => await this.api.get(uri);
    getIndex = async () => await this.api.get("index");
    getCategory = async (category) => await this.api.get(`category/${category}`);
    getProduct = async (category, id) => await this.api.get(`product/${category}/${id}`);
}

export default new ApiService();


