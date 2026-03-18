'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff, Loader2 } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import axios from "axios"
import api from "@/lib/axios"
import toast from "react-hot-toast"
import { useAuth } from "@/lib/auth-context"

const SigninPage = () => {

  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setIsLoading(true);

      try {
          const reponse = await api.post("/auth/signin", {
              email: email,
              password: password,
          })

          login(reponse.data.token);

          toast.success("Login Successful!");

          router.push("/")
            
      } catch (error: unknown) {
          if (axios.isAxiosError(error)) {
              const message = error.response?.data?.message || "Unexpected issues on the API provider's server";
              toast.error(message);
          } else {
              toast.error("An unexpected error occurred");
          }
      } finally {
          setIsLoading(false);
      }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 py-12">
      <Card className="w-full max-w-md border-border shadow-lg">
        <CardHeader className="space-y-1 pb-4 text-center">
          <h1 className="text-2xl font-bold text-foreground">Welcome Back</h1>
          <p className="text-md text-muted-foreground">
            Sign in to your account to continue shopping
          </p>
        </CardHeader>

        <CardContent>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2">
              <Label>Email</Label>
              <Input id="email" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <Label>Password</Label>
                <Link href="" className="text-xs font-medium text-primary hover:underline">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Input id="password" type={showPassword ? "text" : "password"} placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                  {showPassword ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                </button>
              </div>
            </div>


            <div className="flex items-center gap-2">
              <Checkbox />
              <Label className="text-sm font-normal text-muted-foreground">
                Remember me
              </Label>
            </div>

              <Button type="submit" className="cursor-pointer" disabled={isLoading}>{isLoading ? <span className="flex items-center animate-spin">
                <Loader2 /></span> : "Login"}
              </Button>
          </form>
        </CardContent>
        <CardFooter className="justify-center">
          <p className="text-sm text-muted-foreground">
            {"Don't have an account? "}
            <Link href="/auth/signup" className="font-medium text-primary hover:underline">
              Register
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
export default SigninPage