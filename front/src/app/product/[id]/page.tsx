"use client";

import { useEffect, useState, use } from "react";
import { fetchProductById } from "@/helpers/fetchProducts";
import { IProduct } from "@/Types";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { toast } from "react-hot-toast";

const ProductDetailPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);

  const router = useRouter();
  const { addToCart } = useCart();

  const [product, setProduct] = useState<IProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    fetchProductById(Number(id))
      .then(setProduct)
      .catch(() => toast.error("Error al cargar producto"))
      .finally(() => setLoading(false));
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
      toast.error("Debes iniciar sesión");
      router.push("/auth");
      return;
    }

    setAdding(true);

    addToCart(
      {
        id: product.id,
        name: product.name,
        price: finalPrice,
        image: product.image,
      },
      quantity,
    );

    toast.success("Producto agregado 🛒");

    setTimeout(() => setAdding(false), 500);
  };

  return (
    <div className="px-4 sm:px-6 md:px-8 py-8 md:py-12 max-w-6xl mx-auto">
      <Link
        href="/products"
        className="text-sm hover:underline font-medium block text-[#0071E3] mb-8"
      >
        ← Volver
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        <div className="bg-[#F5F5F7] rounded-2xl flex items-center justify-center p-6 md:p-10 h-64 md:h-96">
          <img
            src={product.image}
            alt={product.name}
            className="h-full object-contain"
          />
        </div>

        <div className="flex flex-col justify-center">
          <h1 className="text-xl md:text-3xl font-semibold mb-3">
            {product.name}
          </h1>

          <div className="flex items-center gap-3 mb-4">
            <span className="text-xl md:text-2xl font-semibold text-[#0071E3]">
              ${finalPrice.toFixed(2)}
            </span>

            {hasDiscount && (
              <span className="text-sm line-through text-gray-500">
                ${product.price}
              </span>
            )}
          </div>

          <p className="text-sm text-gray-500 mb-6">{product.description}</p>

          <div className="flex items-center gap-4 mb-6">
            <span className="text-sm">Cantidad:</span>

            <div className="flex border rounded-lg  overflow-hidden">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="px-3 py-2 cursor-pointer"
              >
                -
              </button>

              <span className="px-3 py-2  border-x">{quantity}</span>

              <button
                onClick={() =>
                  setQuantity((q) => Math.min(product.stock, q + 1))
                }
                className="px-3 py-2 cursor-pointer"
              >
                +
              </button>
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={adding}
            className="bg-[#0071E3] hover:bg-[#0077ED] cursor-pointer disabled:opacity-60 text-white py-3 rounded-xl"
          >
            {adding
              ? "Agregando..."
              : `Agregar — $${(finalPrice * quantity).toFixed(2)}`}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
