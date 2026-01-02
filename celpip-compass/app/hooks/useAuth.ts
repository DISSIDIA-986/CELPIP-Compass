import { useState, useEffect, createContext, useContext, ReactNode, createElement } from 'react'

interface User {
  id: string
  email: string
  name: string
  role: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  register: (email: string, password: string, name: string) => Promise<boolean>
  logout: () => void
  isLoading: boolean
  error: string | null
  clearError: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Wrap in async function to avoid synchronous setState in effect
    const initAuth = async () => {
      // Check if user is logged in on mount
      const token = localStorage.getItem('accessToken')
      if (token) {
        // Verify token and get user info
        // For now, just clear loading state
        setIsLoading(false)
      } else {
        setIsLoading(false)
      }
    }
    initAuth()
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setError(null)
      // Mock login - in real app, this would be an API call
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      if (response.ok) {
        const data = await response.json()
        localStorage.setItem('accessToken', data.accessToken)
        setUser(data.user)
        return true
      } else {
        setError('Login failed')
        return false
      }
    } catch (error) {
      console.error('Login error:', error)
      setError('An error occurred during login')
      return false
    }
  }

  const logout = () => {
    localStorage.removeItem('accessToken')
    setUser(null)
    setError(null)
  }

  const clearError = () => {
    setError(null)
  }

  const register = async (email: string, password: string, name: string): Promise<boolean> => {
    try {
      setError(null)
      // Mock register - in real app, this would be an API call
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, name }),
      })

      if (response.ok) {
        const data = await response.json()
        localStorage.setItem('accessToken', data.accessToken)
        setUser(data.user)
        return true
      } else {
        setError('Registration failed')
        return false
      }
    } catch (error) {
      console.error('Registration error:', error)
      setError('An error occurred during registration')
      return false
    }
  }

  const authValue: AuthContextType = {
    user,
    login,
    register,
    logout,
    isLoading,
    error,
    clearError,
  }

  return createElement(AuthContext.Provider, { value: authValue }, children)
}