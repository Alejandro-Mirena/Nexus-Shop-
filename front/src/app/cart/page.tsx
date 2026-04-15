"use client";

import { useEffect, useState } from "react";
import { isAuthenticated } from "@/helpers/fetchAuth";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";

const CartPage = () => {
  const [mounted, setMounted] = useState(false);
  const { cart, removeFromCart, clearCart } = useCart();
  const [orderSuccess, setOrderSuccess] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

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

  if (cart.length === 0 && !orderSuccess) {
    return (
      <div className="text-center py-20">
        <h1 className="text-2xl font-semibold mb-4">
          Tu carrito está vacío 🛒
        </h1>
        <Link href="/products" className="text-[#0071E3] hover:underline">
          Ir a comprar
        </Link>
      </div>
    );
  }

  // Pantalla de éxito
  if (orderSuccess) {
    return (
      <div className="text-center py-20 px-4">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#34C759"
            strokeWidth={2}
          >
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </div>
        <h1 className="text-[#1D1D1F] text-2xl font-semibold mb-2">
          ¡Compra realizada!
        </h1>
        <p className="text-[#6E6E73] text-sm mb-8">
          Tu pedido fue procesado correctamente.
        </p>
        <Link
          href="/products"
          className="bg-[#0071E3] hover:bg-[#0077ED] transition-colors text-white px-6 py-3 rounded-lg text-sm font-medium"
        >
          Seguir comprando
        </Link>
      </div>
    );
  }

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleCheckout = async () => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    if (!token || !user) return;

    const { id: userId } = JSON.parse(user);

    const response = await fetch("http://localhost:3001/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // formato Bearer TOKEN
      },
      body: JSON.stringify({
        userId,
        products: cart.map((item) => item.id), //  array de ids
      }),
    });

    if (response.ok) {
      clearCart();
      setOrderSuccess(true);
    }
  };
  return (
    <div className="px-4 sm:px-6 md:px-10 py-8 md:py-10 max-w-5xl mx-auto">
      <h1 className="text-2xl md:text-3xl font-semibold mb-6 md:mb-8 text-center md:text-left">
        Carrito de compras
      </h1>

      <div className="flex flex-col gap-4 md:gap-6">
        {cart.map((item) => (
          <div
            key={item.id}
            className="flex flex-col sm:flex-row items-center gap-4 md:gap-6 border border-[#E8E8ED] rounded-xl p-4"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-20 h-20 sm:w-24 sm:h-24 object-contain bg-[#F5F5F7] rounded-lg"
            />

            <div className="flex-1 text-center sm:text-left">
              <h2 className="font-semibold text-[#1D1D1F] text-sm md:text-base">
                {item.name}
              </h2>
              <p className="text-xs md:text-sm text-[#6E6E73]">
                Cantidad: {item.quantity}
              </p>
            </div>

            <p className="font-semibold text-[#0071E3] text-sm md:text-base">
              ${(item.price * item.quantity).toFixed(2)}
            </p>

            <button
              onClick={() => removeFromCart(item.id)}
              className="text-[#6E6E73] hover:text-red-500 transition-colors cursor-pointer p-2 rounded-lg hover:bg-red-50"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.8}
              >
                <path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" />
              </svg>
            </button>
          </div>
        ))}
      </div>

      {/* Total */}
      <div className="mt-8 md:mt-10 flex flex-col sm:flex-row justify-between items-center gap-3 border-t border-[#E8E8ED] pt-6">
        <h2 className="text-lg md:text-xl font-semibold text-[#1D1D1F]">
          Total
        </h2>
        <p className="text-xl md:text-2xl font-bold text-[#0071E3]">
          ${total.toFixed(2)}
        </p>
      </div>

      {/* Botones */}
      <div className="flex flex-col sm:flex-row gap-3 mt-6">
        <button
          onClick={clearCart}
          className="flex-1 border border-[#E8E8ED] hover:border-red-400 hover:text-red-500 text-[#6E6E73] cursor-pointer py-3 rounded-xl text-sm md:text-base font-medium transition-colors"
        >
          Vaciar carrito
        </button>

        <button
          onClick={handleCheckout}
          className="flex-1 bg-[#0071E3] hover:bg-[#0077ED] text-white cursor-pointer py-3 rounded-xl text-base md:text-lg font-medium transition-colors"
        >
          Finalizar compra
        </button>
      </div>
    </div>
  );
};

export default CartPage;
