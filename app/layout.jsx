import Navbar from "@/components/Navbar";
import "./globals.css";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/toaster";

export const metadata = {
  title: "Ecommerce",
  description: "Get all products of all kind",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-[#eef2f7] flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Toaster />
        <Footer />
      </body>
    </html>
  );
}
