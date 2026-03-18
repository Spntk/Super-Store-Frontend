import Navbar from "@/components/headers/navbar";

interface AuthLayoutProps {
    children: React.ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="min-h-svh flex flex-col">
        <Navbar />
        <main className="pt-16">
            {children}
        </main>
    </div>
  )
}
export default AuthLayout