"use client";

import { useEffect, useState } from "react";
import { isAuthenticated } from "@/helpers/fetchAuth";
import Link from "next/link";

const CartPage = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // evita hydration error

  const isAuth = isAuthenticated();

  if (!isAuth) {
    return (
      <div className="text-center py-20">
        <h1 className="text-[#1D1D1F] text-2xl font-semibold mb-4">
          Tu carrito está vacío
        </h1>

        <p className="text-[#6E6E73] text-sm mb-6">
          Debes iniciar sesión para agregar productos al carrito.
        </p>

        <Link
          href="/auth"
          className="bg-[#0071E3] text-white px-6 py-3 rounded-lg text-sm font-medium hover:bg-[#0077ED]"
        >
          Iniciar sesión
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h1>Carrito de compras</h1>
      {/* carrito real */}
    </div>
  );
};

export default CartPage;
