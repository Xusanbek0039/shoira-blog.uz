"use client"

import type React from "react"

import { Component, type ReactNode } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { XCircle } from "lucide-react"

interface ErrorBoundaryProps {
  children: ReactNode
  fallback?: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.error("Error caught by ErrorBoundary:", error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div className="flex min-h-[400px] items-center justify-center p-4">
          <Card className="mx-auto max-w-md">
            <CardHeader>
              <CardTitle className="flex items-center text-xl text-red-600">
                <XCircle className="mr-2 h-5 w-5" />
                An error occurred.
              </CardTitle>
              <CardDescription>
              An unexpected error occurred in the application. Please refresh the page or try again later.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md bg-red-50 p-4 dark:bg-red-900/10">
                <p className="text-sm text-red-800 dark:text-red-200">
                  {this.state.error?.message || "Noma'lum xatolik"}
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={() => window.location.reload()} className="w-full">
              Refresh page
              </Button>
            </CardFooter>
          </Card>
        </div>
      )
    }

    return this.props.children
  }
}
