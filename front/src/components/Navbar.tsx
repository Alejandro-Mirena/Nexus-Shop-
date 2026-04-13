"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";

const Navbar = () => {
  const router = useRouter();
  const [user, setUser] = useState<{ name: string } | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) setUser(JSON.parse(stored));

    const handleAuthChange = () => {
      const stored = localStorage.getItem("user");
      if (stored) setUser(JSON.parse(stored));
      else setUser(null);
    };

    window.addEventListener("authChange", handleAuthChange);
    return () => window.removeEventListener("authChange", handleAuthChange);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    router.push("/");
  };
  const { cart } = useCart();

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header>
      <nav
        style={{ borderBottom: "1px solid #E8E8ED" }}
        className="bg-white px-4 md:px-8 py-4 flex items-center justify-between"
      >
        {/* Logo */}
        <Link
          href="/"
          className="text-[#1D1D1F] text-lg font-semibold tracking-tight"
        >
          Nexus Shop
        </Link>

        {/* Links — ocultos en móvil, visibles en desktop */}
        <div className="hidden md:flex items-center gap-8 font-medium">
          <Link
            href="/"
            className="text-[#6E6E73] hover:text-[#1D1D1F] text-sm"
          >
            Inicio
          </Link>
          <Link
            href="/products"
            className="text-[#6E6E73] hover:text-[#1D1D1F] transition-colors text-sm"
          >
            Productos
          </Link>
          <Link
            href="/offers"
            className="text-[#6E6E73] hover:text-[#1D1D1F] transition-colors text-sm"
          >
            Ofertas
          </Link>
        </div>

        {/* Derecha */}
        <div className="flex items-center  p-2 gap-3 md:gap-5">
          {/* Carrito */}
          <Link
            href="/cart"
            className="relative text-[#1D1D1F] hover:text-[#0071E3] transition-colors"
          >
            {/* ICONO */}
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.8}
            >
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>

            {/* 🔥 NUMERITO */}
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full font-semibold">
                {totalItems}
              </span>
            )}
          </Link>

          {/* Login o Perfil */}
          {user ? (
            <div className="flex items-center gap-4  md:gap-3">
              <Link
                href="/dashboard"
                className="text-[#1D1D1F] text-sm font-semibold hover:opacity-80 transition-opacity hidden md:block"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="icon icon-tabler icons-tabler-outline icon-tabler-user-circle"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
                  <path d="M9 10a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
                  <path d="M6.168 18.849a4 4 0 0 1 3.832 -2.849h4a4 4 0 0 1 3.834 2.855" />
                </svg>
              </Link>

              <button
                onClick={handleLogout}
                style={{ background: "#0071e3" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "#ed0000")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "#0071E3")
                }
                className="text-white px-2 md:px-3 py-2 rounded-lg text-xs md:text-sm font-medium cursor-pointer transition-colors"
              >
                Cerrar sesión
              </button>
            </div>
          ) : (
            <Link
              href="/auth"
              className="bg-[#0071E3] hover:bg-[#0077ed] transition-colors text-white px-3 py-2 rounded-lg text-xs md:text-sm font-medium"
            >
              Iniciar sesión
            </Link>
          )}

          {/* Botón hamburguesa — solo móvil */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-[#1D1D1F] hover:text-[#0071E3] transition-colors"
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.8}
            >
              {menuOpen ? (
                <path d="M18 6L6 18M6 6l12 12" />
              ) : (
                <>
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </>
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Menú móvil desplegable */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-[#E8E8ED] px-4 py-4 flex flex-col gap-4">
          <Link
            onClick={() => setMenuOpen(false)}
            href="/"
            className="text-[#6E6E73] text-sm font-medium"
          >
            Inicio
          </Link>
          <Link
            onClick={() => setMenuOpen(false)}
            href="/products"
            className="text-[#6E6E73] text-sm font-medium"
          >
            Productos
          </Link>
          <Link
            onClick={() => setMenuOpen(false)}
            href="/offers"
            className="text-[#6E6E73] text-sm font-medium"
          >
            Ofertas
          </Link>
          {user && (
            <Link
              onClick={() => setMenuOpen(false)}
              href="/dashboard"
              className="text-[#6E6E73] text-sm font-medium"
            >
              Perfil
            </Link>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
