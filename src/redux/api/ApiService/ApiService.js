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

    fetchData = (params) => {
        const { match: { path: route, params: data }, history } = params;
        const apiRoute =
            !Object.keys(data).length
                ? "index"
                : route.match(/\/([a-z]*)\/\:/)[1] + "/" + Object.values(data).join("/");

        return this.api.get(apiRoute)
            .then(response => {
                if (response.data.error) history.push("/404");
                return response;
            })
            .catch(error => {
                if (error.code === "ECONNABORTED" || /50[0-9]/.test(error.response.status.toString())) {
                    console.log('fst fail');
                    return this.api.get(apiRoute)
                        .then(result => result)
                        .catch(error => {
                            if (error.code === "ECONNABORTED" || /50[0-9]/.test(error.response.status.toString())) {
                                console.log('second fail');
                                return this.api.get(apiRoute)
                                    .then(result => result)
                                    .catch(error => {
                                        if (error.code === "ECONNABORTED" || /50[0-9]/.test(error.response.status.toString())) {
                                            console.log('third fail');
                                            return this.api.get(apiRoute)
                                                .then(result => result)
                                        }
                                    })

                            }
                        })
                }
            });
    };

}


//export default new ApiService().api;
export default new ApiService();


