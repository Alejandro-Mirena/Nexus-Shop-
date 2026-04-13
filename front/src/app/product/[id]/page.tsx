"use client";

import { useEffect, useState, use } from "react";
import { fetchProductById } from "@/helpers/fetchProducts";
import { IProduct } from "@/Types";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";

const ProductDetailPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);
  const router = useRouter();
  const { addToCart } = useCart(); // 👈 CONTEXTO

  const [product, setProduct] = useState<IProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    fetchProductById(Number(id)).then((data) => {
      setProduct(data);
      setLoading(false);
    });
  }, [id]);

  // 🔥 FUNCIÓN CORREGIDA
  const handleAddToCart = () => {
    const token = localStorage.getItem("token");

    // ❌ NO AUTENTICADO
    if (!token) {
      alert("Debes iniciar sesión para agregar productos al carrito");
      router.push("/login");
      return;
    }

    if (!product) return;

    addToCart(
      {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
      },
      quantity,
    );

    alert("Producto agregado al carrito 🛒");
  };

  if (loading) {
    return (
      <div className="text-center py-20 text-[#6E6E73] text-sm">
        Cargando producto...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center py-20">
        <h1 className="text-[#1D1D1F] text-2xl font-semibold mb-4">
          Producto no encontrado
        </h1>
        <Link href="/" className="text-[#0071E3] text-sm hover:underline">
          Volver al inicio
        </Link>
      </div>
    );
  }

  return (
    <div className="px-8 py-12 max-w-5xl mx-auto">
      <Link
        href="/products"
        className="text-[#0071E3] text-sm hover:underline mb-8 inline-block"
      >
        ← Volver
      </Link>

      <div className="grid grid-cols-2 gap-12">
        <div className="bg-[#F5F5F7] rounded-2xl flex items-center justify-center p-10 h-96">
          <img
            src={product.image}
            alt={product.name}
            className="h-full object-contain"
          />
        </div>

        <div className="flex flex-col justify-center">
          <h1 className="text-[#1D1D1F] text-3xl font-semibold mb-3">
            {product.name}
          </h1>

          <p className="text-[#0071E3] text-2xl font-semibold mb-4">
            ${product.price}
          </p>

          <p className="text-[#6E6E73] text-sm mb-6">{product.description}</p>

          <p className="text-xs text-[#6E6E73] mb-4">
            Stock disponible:
            <span className="text-[#34C759] ml-1">
              {product.stock} unidades
            </span>
          </p>

          {/* Cantidad */}
          <div className="flex items-center gap-4 mb-6">
            <span className="text-sm font-medium">Cantidad:</span>

            <div className="flex border rounded-lg overflow-hidden">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="px-4 py-2 hover:bg-gray-100"
              >
                -
              </button>

              <span className="px-4 py-2 border-x">{quantity}</span>

              <button
                onClick={() =>
                  setQuantity((q) => Math.min(product.stock, q + 1))
                }
                className="px-4 py-2 hover:bg-gray-100"
              >
                +
              </button>
            </div>
          </div>

          {/* BOTÓN */}
          <button
            onClick={handleAddToCart}
            className="bg-[#0071E3] hover:bg-[#0077ED] text-white py-3 rounded-xl cursor-pointer font-medium transition-colors"
          >
            Agregar al carrito — ${(product.price * quantity).toLocaleString()}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
