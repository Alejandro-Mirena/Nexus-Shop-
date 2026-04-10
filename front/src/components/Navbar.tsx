"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Navbar = () => {
  const router = useRouter();
  const [user, setUser] = useState<{ name: string } | null>(null);

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

  // ← handleLogout tiene que estar ACÁ, fuera del useEffect
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    router.push("/");
  };

  return (
    <header>
      <nav
        style={{ borderBottom: "1px solid #E8E8ED" }}
        className="bg-white px-8 py-4 flex items-center justify-between"
      >
        <Link
          href="/"
          className="text-[#1D1D1F] text-lg font-semibold tracking-tight"
        >
          Nexus Shop
        </Link>

        <div className="flex items-center gap-8 font-medium">
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

        <div className="flex items-center gap-5">
          {/* Carrito */}
          <Link
            href="/cart"
            className="relative text-[#1D1D1F] hover:text-[#0071E3] transition-colors"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.8}
            >
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
          </Link>

          {/* Login o Perfil según si hay sesión */}
          {user ? (
            <div className="flex items-center gap-3">
              <Link
                href="/dashboard"
                className="flex items-center gap-2 hover:opacity-80 transition-opacity"
              >
                <div className="text-[#1D1D1F] text-lg font-semibold tracking-tight">
                  Perfil
                </div>
              </Link>

              {/* Botón logout */}
              <button
                onClick={handleLogout}
                style={{ background: "#0071e3" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "#ed0000")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "#0071E3")
                }
                className="text-white px-3 py-2 rounded-lg text-sm font-medium cursor-pointer transition-colors"
              >
                Cerrar Sesion
              </button>
            </div>
          ) : (
            <Link
              href="/auth"
              className="bg-[#0071E3] hover:bg-[#ed0000] transition-colors text-white px-3 py-2 rounded-lg text-sm font-medium"
            >
              Iniciar sesión
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
