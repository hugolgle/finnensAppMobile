import axios from "axios";
const API_URL_ = `http://192.168.0.100:8000`;
const api = axios.create({
  baseURL: API_URL_,
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (!error.response) {
      return Promise.reject({
        response: {
          data: {
            code: "SERVER_UNREACHABLE",
            message: "Le serveur est indisponible.",
          },
        },
      });
    }

    if (
      error.response?.status === 401 &&
      !originalRequest?._retry &&
      !originalRequest?.url.includes("/user/login") &&
      !originalRequest?.url.includes("/user/refresh-token")
    ) {
      originalRequest._retry = true;

      try {
        const res = await api.post("/user/refresh-token");
        api.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${res.data.accessToken}`;
        originalRequest.headers[
          "Authorization"
        ] = `Bearer ${res.data.accessToken}`;
        return api(originalRequest);
      } catch (err) {
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
