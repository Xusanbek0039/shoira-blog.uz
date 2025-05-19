import axios from "axios"

// API URL - backend server manzili
const API_URL = "http://localhost:5000"

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
})

// Add request interceptor to add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token")
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Error handling helper
const handleError = (error: any) => {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    throw new Error(error.response.data.message || "Server xatosi")
  } else if (error.request) {
    // The request was made but no response was received
    throw new Error("Serverga ulanib bo'lmadi")
  } else {
    // Something happened in setting up the request that triggered an Error
    throw new Error("So'rov yuborishda xatolik")
  }
}

// Authentication API calls
export const loginUser = async (credentials: { email: string; password: string }) => {
  try {
    const response = await api.post("/api/users/login", credentials)
    return response.data
  } catch (error) {
    handleError(error)
    throw error
  }
}

export const registerUser = async (userData: {
  name: string
  email: string
  password: string
}) => {
  try {
    const response = await api.post("/api/users/register", userData)
    return response.data
  } catch (error) {
    handleError(error)
    throw error
  }
}

// Articles API calls
export const fetchArticles = async () => {
  try {
    const response = await api.get("/api/articles")
    return response.data
  } catch (error) {
    handleError(error)
    throw error
  }
}

export const fetchArticleById = async (id: string) => {
  try {
    const response = await api.get(`/api/articles/${id}`)
    return response.data
  } catch (error) {
    handleError(error)
    throw error
  }
}

export const createArticle = async (articleData: {
  title: string
  content: string
  image?: string
}) => {
  try {
    const response = await api.post("/api/articles", articleData)
    return response.data
  } catch (error) {
    handleError(error)
    throw error
  }
}

export const deleteArticle = async (id: string) => {
  try {
    const response = await api.delete(`/api/articles/${id}`)
    return response.data
  } catch (error) {
    handleError(error)
    throw error
  }
}

// Function to set up real API connection when backend is ready
export const setupRealApiConnection = (apiUrl: string, mongoDbUrl: string) => {
  console.log("Setting up real API connection to:", apiUrl)
  console.log("Using MongoDB connection:", mongoDbUrl)

  // This is just a placeholder function to show how you would set up
  // the real API connection when your backend is ready

  // In a real implementation, you would:
  // 1. Create an axios instance with the API URL
  // 2. Set up interceptors for authentication
  // 3. Replace the mock functions with real API calls

  const api = axios.create({
    baseURL: apiUrl,
  })

  api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token")
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  })

  return api
}
