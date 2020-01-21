import axios from "axios";
import qs from "querystring";
// import codeMessage from "./codeMessage";
import Cookies from 'js-cookie'

let DOMAIN = "";
if (process.env.NODE_ENV === "development") {
    DOMAIN = "http://localhost:5679";
} else if (process.env.NODE_ENV === "production") {
    DOMAIN = "http://api.taswell.cn";
}

axios.defaults.baseURL = DOMAIN + "/blog";

axios.defaults.timeout = 10000;

axios.interceptors.request.use(config => {
    const authorization = Cookies.get("twa");
    authorization && (config.headers.Authorization = authorization);
    return config;
});

axios.interceptors.response.use(
    response => {
        if (response.status === 200) {
            return Promise.resolve(response);
        } else {
            return Promise.reject(response);
        }
    },
    error => {
        console.log({error})
        const {response} = error
        const {status} = response
        if (status === 401) {
            Cookies.remove('twa', {path: '/', domain: '.taswell.cn'})
            window.location.replace('/')
            window.location.reload()
        }
        return Promise.reject({error});
    }
);

export function get(url: any, params: any) {
    console.log({url, params});
    return new Promise((resolve, reject) => {
        axios
            .get(url, {
                params: params
            })
            .then(res => {
                resolve(res.data);
            })
            .catch(err => {
                reject({err});
            });
    });
}

export function post(url: any, params: any) {
    return new Promise((resolve, reject) => {
        axios
            .post(url, qs.stringify(params))
            .then(res => {
                resolve(res.data);
            })
            .catch(err => {
                reject({err});
            });
    });
}

export function fileUpload(url: any, params: any) {
    return new Promise((resolve, reject) => {
        let config = {headers: {'Content-Type': 'multipart/form-data'}}
        axios.post(url, params, config)
            .then(res => {
                resolve(res.data);
            })
            .catch(err => {
                reject({err});
            });
    });
}
