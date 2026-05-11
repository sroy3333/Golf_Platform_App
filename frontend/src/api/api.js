import axios from "axios";

const API = axios.create({
  baseURL: "import.meta.env.VITE_API_URL"
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  console.log("TOKEN:", token);

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
    console.log("TOKEN:", token);
  }

  return req;
});


API.interceptors.response.use(
  res => res,
  err => {
    if (err.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(err);
  }
);

export const verifyWinner = (winnerId, status) => {
  return API.patch("/winner/verify", { winnerId, status });
};

export default API;
