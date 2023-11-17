import axios from "axios"
export const config = {
    api: {
      responseLimit: '8mb',
    },
  }
export const api = axios.create({
    baseURL: process.env.API_URL,
})