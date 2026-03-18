'use client'

import { jwtDecode } from "jwt-decode"
import { createContext, ReactNode, useContext, useEffect, useState } from "react"
import Cookies from "js-cookie"

interface JWTPayload {
    role: string
    name: string
    sub: string
    iat: number
    exp: number
}

interface AuthContextType {
    token: string | null
    user: {
        name: string | null
        role: string | null
        email: string | null
    } | null
    login: (token: string) => void
    logout: () => void
    isAuthenticated: boolean
    isAdmin: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children } : { children: ReactNode }) => {

    const [token, setToken] = useState<string | null>(null)
    const [user, setUser] = useState<AuthContextType['user']>(null)
    const [isLoading, setIsLoading] = useState(true)

    const decodeAndSetUser = (token: string) => {
        try {
            const decode = jwtDecode<JWTPayload>(token)

            const currentTime = Date.now() / 1000
            if (decode.exp < currentTime) {
                logout()
                return
            }

            setUser({
                name: decode.name,
                role: decode.role,
                email: decode.sub
            })
        } catch (error) {
            logout()
        }
    }

    useEffect(() => {
        const storedToken = localStorage.getItem("token")
        if (storedToken) {
            setToken(storedToken)
            decodeAndSetUser(storedToken)
        }
        setIsLoading(false)
    },[])

    const login = (newToken: string) => {
        localStorage.setItem("token", newToken)
        Cookies.set("token", newToken, {expires: 1})
        setToken(newToken)
        decodeAndSetUser(newToken)
    }

    const logout = () => {
        localStorage.removeItem("token")
        Cookies.remove("token")
        setToken(null)
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{
            token,
            user,
            login,
            logout,
            isAuthenticated: !!token,
            isAdmin: user?.role === 'ADMIN'
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider')
        
    }
    return context
}

