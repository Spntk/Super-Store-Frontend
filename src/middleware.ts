import { jwtDecode } from "jwt-decode"
import { NextRequest, NextResponse } from "next/server"


interface JWTPayload {
    role: string
    exp: number
}

export function middleware(request: NextRequest) {
    const token = request.cookies.get('token')?.value
    const { pathname } = request.nextUrl

    if (pathname.startsWith('/admin')) {
        if (!token) {
            return NextResponse.redirect(new URL('/auth/signin', request.url))
        }

        try {
            const decoded = jwtDecode<JWTPayload>(token)

            if (decoded.role !== 'ADMIN') {
                return NextResponse.redirect(new URL('/', request.url))
            }
        } catch (error) {
            return NextResponse.redirect(new URL('/auth/signin', request.url))
        }
    }

    if (token && (pathname.startsWith('/auth/signin') || pathname.startsWith("/auth/signup"))) {
        return NextResponse.redirect(new URL('/', request.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        '/admin/:path*',
        '/auth/:path*'
    ]
}