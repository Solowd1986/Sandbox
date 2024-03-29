import axiosRetry from 'axios-retry';

const req = require('axios').default;
axiosRetry(req, { retries: 3 });

class ApiService {
    constructor() {
        this._axios = require('axios').default;
        this.axr = req;

        this._decodeRecord = (recordName) => JSON.parse(decodeURIComponent(localStorage.getItem(recordName)));

        this.api = this._axios.create({
            baseURL: "/api/",
            timeout: 1000 * 5,
            withCredentials: true,
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("auth") && this._decodeRecord("auth").auth.token}`,
            },
        });
    }

    axrReq = (path) => this.axr.get(path);

    get = (uri) => this.api.get(uri);
    post = (uri, opt = {}) => this.api.post(uri, opt);

    /**
     * Этот вызов должен оборачиватсья в try/catch (пример action-db), с перехватом оишбок, редиректом и запретом dispatch
     * Если пришла ошибка от сервера, то редирект на 404 и возвращаем ответ выше.
     * Если таймер истек или от сервера 50-х ошибка, то retry 3 раза, на последний раз не перехватываем ошибку, она
     * всплываеет выше, и ловится, например, в catch, с редиректом на 500.
     */
    fetchData = (routeData, raw = false) => {
        let uri = routeData;
        if (!raw) {
            const { match: { path: route, params: data }, history } = routeData;
            const isThatIndexPage = !Object.keys(data).length;
            uri = isThatIndexPage ? "index" : route.match(/\/([a-z]*)\/\:/)[1] + "/" + Object.values(data).join("/");
        }

        return this.api.get(uri)
            .then(response => {
                //console.dir(response);
                if (response.data.error) history.push("/404");
                return response;
            })
            .catch(error => {
                if (error.code === "ECONNABORTED" || /50[0-9]/.test(error.response.status.toString())) {
                    //console.log('fst fail');
                    return this.api.get(uri)
                        .then(result => result)
                        .catch(error => {
                            if (error.code === "ECONNABORTED" || /50[0-9]/.test(error.response.status.toString())) {
                                //console.log('second fail');
                                return this.api.get(uri)
                                    .then(result => result)
                                    .catch(error => {
                                        if (error.code === "ECONNABORTED" || /50[0-9]/.test(error.response.status.toString())) {
                                            //console.log('third fail');
                                            return this.api.get(uri)
                                                .then(result => result)
                                        }
                                    })

                            }
                        })
                }
            });
    };

}

export default new ApiService();


