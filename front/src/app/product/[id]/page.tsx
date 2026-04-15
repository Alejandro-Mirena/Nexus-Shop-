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
  const { addToCart } = useCart();

  const [product, setProduct] = useState<IProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    fetchProductById(Number(id)).then((data) => {
      setProduct(data);
      setLoading(false);
    });
  }, [id]);

  if (loading) {
    return (
      <div className="text-center py-20 text-sm">Cargando producto...</div>
    );
  }

  if (!product) {
    return <div className="text-center py-20">Producto no encontrado</div>;
  }

  const hasDiscount = (product.discount ?? 0) > 0;
  const discountedPrice =
    product.price - (product.price * (product.discount ?? 0)) / 100;

  const finalPrice = hasDiscount ? discountedPrice : product.price;

  const handleAddToCart = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Debes iniciar sesión");
      router.push("/auth");
      return;
    }

    addToCart(
      {
        id: product.id,
        name: product.name,
        price: finalPrice,
        image: product.image,
      },
      quantity,
    );

    alert("Producto agregado 🛒");
  };

  return (
    <div className="px-4 sm:px-6 md:px-8 py-8 md:py-12 max-w-6xl mx-auto">
      <Link
        href="/products"
        className="text-sm hover:underline font-medium block text-[#0071E3] mb-8 "
      >
        ← Volver
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        {/* Imagen */}
        <div className="bg-[#F5F5F7] rounded-2xl flex items-center justify-center p-6 sm:p-8 md:p-10 h-64 sm:h-80 md:h-96">
          <img
            src={product.image}
            alt={product.name}
            className="h-full object-contain"
          />
        </div>

        {/* Info */}
        <div className="flex flex-col justify-center">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-2 md:mb-3">
            {product.name}
          </h1>

          <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
            <span className="text-lg sm:text-xl md:text-2xl font-semibold text-[#0071E3]">
              ${finalPrice.toFixed(2)}
            </span>

            {hasDiscount && (
              <span className="text-xs sm:text-sm line-through text-gray-500">
                ${product.price}
              </span>
            )}
          </div>

          <p className="text-xs sm:text-sm text-gray-500 mb-4 md:mb-6">
            {product.description}
          </p>

          <p className="text-xs text-[#6E6E73] mb-4">
            {" "}
            Stock disponible:{" "}
            <span className="text-[#34C759] ml-1 font-medium font-size-sm">
              {" "}
              {product.stock} unidades{" "}
            </span>{" "}
          </p>

          {/* Cantidad */}
          <div className="flex items-center gap-3 md:gap-4 mb-5 md:mb-6">
            <span className="text-sm">Cantidad:</span>

            <div className="flex border rounded-lg overflow-hidden">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="px-3 py-2"
              >
                -
              </button>

              <span className="px-3 py-2 border-x">{quantity}</span>

              <button
                onClick={() =>
                  setQuantity((q) => Math.min(product.stock, q + 1))
                }
                className="px-3 py-2"
              >
                +
              </button>
            </div>
          </div>

          {/* Botón */}
          <button
            onClick={handleAddToCart}
            className="bg-[#0071E3] text-white py-3 rounded-xl text-sm sm:text-base"
          >
            Agregar — ${(finalPrice * quantity).toLocaleString()}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
