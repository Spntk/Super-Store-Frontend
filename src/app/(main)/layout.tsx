import Navbar from "@/components/headers/navbar";

interface MainLayoutProps {
    children: React.ReactNode;
}

const MainLayout = ({ children }:MainLayoutProps) => {
  return (
    <div className="min-h-svh flex flex-col">
            <Navbar />
            <main className="pt-16">
                {children}
            </main>
    </div>
  )
}
export default MainLayout