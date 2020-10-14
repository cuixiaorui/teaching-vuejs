const BASE_URL = "http://localhost:8081";
const myAxios = axios.create({ baseURL: BASE_URL });

myAxios.interceptors.request.use(config => {
  const token = localStorage.getItem("token");
  config.headers.Authorization = "Bearer " + token;
  return config;
});

myAxios.interceptors.response.use(
  res => {
    return res;
  },
  err => {
    if (err.response.status === 401) {
      location.href = "/login.html";
    }
  }
);

export default myAxios;
