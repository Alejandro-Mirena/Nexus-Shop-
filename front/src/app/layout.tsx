import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CartProvider } from "@/context/CartContext";
import ScrollToTop from "@/components/ScrollToTop";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        <CartProvider>
          <Navbar />
          <main>{children}</main>
          <ScrollToTop />
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
