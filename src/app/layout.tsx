import { Toaster } from "react-hot-toast";
import "./globals.css"
import { Metadata } from "next"
import { AuthProvider } from "@/lib/auth-context";

export const metadata: Metadata = {
  title: {
    default: "Super Store | E-commerce Project",
    template: "%s | E-commerce Project"
  },
  description: "Super Store Best Value Sell No.1 Online Store",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html lang="en">
      <body className="">
        <AuthProvider>
          {children}
          <Toaster position="bottom-right" reverseOrder={false} />
        </AuthProvider>
      </body>
    </html>
  )
}
export default RootLayout