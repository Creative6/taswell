import axios from "axios";
import qs from "querystring";
// import codeMessage from "./codeMessage";

let DOMAIN = "";
if (process.env.NODE_ENV === "development") {
  DOMAIN = "http://localhost:5679";
} else if (process.env.NODE_ENV === "production") {
  DOMAIN = "http://47.99.97.247:5679";
}

axios.defaults.baseURL = DOMAIN + "/blog";

axios.defaults.timeout = 10000;

axios.interceptors.request.use(config => {
  const token = 'Cookies.get("token")';
  token && (config.headers.Authorization = token);
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
    return Promise.reject({ error });
  }
);

export function get(url: any, params: any) {
  console.log({ url, params });
  return new Promise((resolve, reject) => {
    axios
      .get(url, {
        params: params
      })
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject({ err });
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
        reject({ err });
      });
  });
}
