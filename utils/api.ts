import axios from "axios"

// API URL - backend server manzili
const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://shoira-blog-uz-api.onrender.com"

console.log("Using API URL:", API_URL)

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  timeout: 10000, // 10 seconds timeout
})

// Add request interceptor to add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token")
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// Add response interceptor for better error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error)

    // Check if error is a network error
    if (error.message === "Network Error") {
      console.error("Network error - API server might be down")
      return Promise.reject(new Error("Serverga ulanib bo'lmadi. Internet aloqangizni tekshiring."))
    }

    // Check if error has response
    if (error.response) {
      console.error("API Error Response:", error.response.status, error.response.data)
      return Promise.reject(new Error(error.response.data.message || "Server xatosi"))
    }

    return Promise.reject(error)
  },
)

// Error handling helper
const handleError = (error: any) => {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    throw new Error(error.response.data.message || "Server xatosi")
  } else if (error.request) {
    // The request was made but no response was received
    throw new Error("Serverga ulanib bo'lmadi. Internet aloqangizni tekshiring.")
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

export const updateUserProfile = async (userData: {
  name: string
  email: string
}) => {
  try {
    const response = await api.put("/api/users/profile", userData)
    return response.data
  } catch (error) {
    handleError(error)
    throw error
  }
}

export const changePassword = async (passwordData: {
  currentPassword: string
  newPassword: string
}) => {
  try {
    const response = await api.put("/api/users/password", passwordData)
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

export const getUserArticles = async () => {
  try {
    const response = await api.get("/api/articles/user")
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

export const updateArticle = async (
  id: string,
  articleData: {
    title: string
    content: string
    image?: string
  },
) => {
  try {
    const response = await api.put(`/api/articles/${id}`, articleData)
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

// Check API connection
export const checkApiConnection = async () => {
  try {
    // First try the root endpoint
    await api.get("/")
    return true
  } catch (rootError) {
    try {
      // If root fails, try the health endpoint
      await api.get("/api/health")
      return true
    } catch (healthError) {
      console.error("API connection check failed:", healthError)
      return false
    }
  }
}
