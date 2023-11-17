import axios from "axios"
export const config = {
    api: {
      responseLimit: '8mb',
    },
  }
export const api = axios.create({
    baseURL: "http://localhost:3000/api",
})