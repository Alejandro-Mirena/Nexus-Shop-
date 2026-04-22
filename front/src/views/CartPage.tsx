"use client";

import { useEffect, useState } from "react";
import { isAuthenticated } from "@/helpers/fetchAuth";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

const CartPage = () => {
  const [mounted, setMounted] = useState(false);
  const { cart, removeFromCart, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isAuth = isAuthenticated();

  //  Usuario no autenticado
  if (!isAuth) {
    return (
      <div className="text-center py-20">
        <h1 className="text-[#1D1D1F] text-2xl font-semibold mb-4">
          Tu carrito está vacío 😓
        </h1>
        <p className="text-[#6E6E73] text-sm mb-6">
          Debes iniciar sesión para comprar.
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

  //  Carrito vacío
  if (cart.length === 0) {
    return (
      <div className="text-center py-20">
        <h1 className="text-2xl font-semibold mb-4">
          Tu carrito está vacío 😓
        </h1>
        <p className="text-sm text-[#6E6E73] mb-6">
          Agrega productos para verlos aquí.
        </p>
        <Link
          href="/products"
          className="bg-[#0071E3] hover:bg-[#0077ed] transition-colors text-white px-4 py-2 rounded-lg text-sm font-medium"
        >
          Ir a comprar
        </Link>
      </div>
    );
  }

  //  Total
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  //  Checkout
  const handleCheckout = async () => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    if (!token || !user) {
      toast.error("Debes iniciar sesión");
      return;
    }

    const { id: userId } = JSON.parse(user);

    try {
      setLoading(true);

      const response = await fetch("http://localhost:3001/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          userId,
          products: cart.map((item) => ({
            id: item.id,
            quantity: item.quantity,
            price: item.price,
          })),
        }),
      });

      if (!response.ok) throw new Error();

      clearCart();

      toast.success("¡Compra realizada con éxito! 🎉");

      setTimeout(() => {
        router.push("/dashboard");
      }, 1200);
    } catch (error) {
      toast.error("Error al procesar la compra 🚨");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-4 sm:px-6 md:px-10 py-8 md:py-10 max-w-5xl mx-auto">
      <h1 className="text-2xl md:text-3xl font-semibold mb-6 md:mb-8 text-center md:text-left">
        Carrito de compras
      </h1>

      {/*  Lista */}
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
              ✕
            </button>
          </div>
        ))}
      </div>

      {/*  Total */}
      <div className="mt-8 md:mt-10 flex flex-col sm:flex-row justify-between items-center gap-3 border-t border-[#E8E8ED] pt-6">
        <h2 className="text-lg md:text-xl font-semibold text-[#1D1D1F]">
          Total
        </h2>
        <p className="text-xl md:text-2xl font-bold text-[#0071E3]">
          ${total.toFixed(2)}
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mt-6">
        <button
          onClick={clearCart}
          disabled={loading}
          className="flex-1 border border-[#E8E8ED] cursor-pointer hover:border-red-400 hover:text-red-500 text-[#6E6E73] py-3 rounded-xl text-sm md:text-base font-medium transition-colors disabled:opacity-50"
        >
          Vaciar carrito
        </button>

        <button
          onClick={handleCheckout}
          disabled={loading}
          className="flex-1 bg-[#0071E3] hover:bg-[#0077ED] cursor-pointer text-white py-3 rounded-xl text-base md:text-lg font-medium transition-colors disabled:opacity-50"
        >
          {loading ? "Procesando..." : "Finalizar compra"}
        </button>
      </div>
    </div>
  );
};

export default CartPage;
