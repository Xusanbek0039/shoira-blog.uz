"use client"

import type React from "react"

import { createContext, useState, useEffect } from "react"

type User = {
  id: string
  name: string
  email: string
} | null

type AuthContextType = {
  user: User
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  login: async () => {},
  register: async () => {},
  logout: () => {},
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in from localStorage
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    try {
      // This would normally be an API call
      // For demo purposes, we'll simulate a successful login
      if (!email || !password) {
        return Promise.reject(new Error("Email va parol kiritilishi shart"))
      }

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 800))

      const mockUser = {
        id: "1",
        name: "Shoira",
        email: email,
      }

      setUser(mockUser)
      localStorage.setItem("user", JSON.stringify(mockUser))
      return Promise.resolve()
    } catch (error) {
      return Promise.reject(error)
    }
  }

  const register = async (name: string, email: string, password: string) => {
    try {
      // This would normally be an API call
      // For demo purposes, we'll simulate a successful registration
      if (!name || !email || !password) {
        return Promise.reject(new Error("Barcha maydonlar to'ldirilishi shart"))
      }

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 800))

      const mockUser = {
        id: "1",
        name: name,
        email: email,
      }

      setUser(mockUser)
      localStorage.setItem("user", JSON.stringify(mockUser))
      return Promise.resolve()
    } catch (error) {
      return Promise.reject(error)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
  }

  return <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>{children}</AuthContext.Provider>
}

export { AuthContext }
