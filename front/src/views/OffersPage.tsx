"use client";

import { useEffect, useState } from "react";
import { fetchOffers } from "@/helpers/fetchOffers";
import { IProduct } from "@/Types";
import Link from "next/link";

const OffersPage = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOffers().then((data) => {
      setProducts(data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="text-center py-20 text-[#6E6E73] text-sm">
        Cargando ofertas...
      </div>
    );
  }

  return (
    <div className="px-4 md:px-8 py-10">
      {/* Header */}
      <div className="mb-8">
        <span className="text-[#0071E3] text-xs font-semibold uppercase tracking-widest">
          Tiempo limitado
        </span>
        <h1 className="text-[#1D1D1F] text-3xl md:text-4xl font-semibold tracking-tight mt-1">
          Ofertas especiales
        </h1>
        <p className="text-[#6E6E73] text-sm mt-2">
          Los mejores productos con descuentos exclusivos.
        </p>
      </div>

      {/* Grid de productos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => {
          const discountedPrice =
            product.price - (product.price * (product.discount ?? 0)) / 100;

          return (
            <Link
              key={product.id}
              href={`/product/${product.id}`}
              className="bg-white border border-[#E8E8ED] rounded-2xl overflow-hidden hover:shadow-md transition-shadow"
            >
              {/* Badge de descuento */}
              <div className="relative">
                <div className="bg-[#F5F5F7] h-48 flex items-center justify-center p-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full object-contain"
                  />
                </div>
                {(product.discount ?? 0) > 0 && (
                  <span className="absolute top-3 left-3 bg-[#0071E3] text-white text-xs font-semibold px-2 py-1 rounded-lg">
                    -{product.discount}%
                  </span>
                )}
              </div>

              {/* Info */}
              <div className="p-4">
                <h2 className="text-[#1D1D1F] text-sm font-semibold mb-2">
                  {product.name}
                </h2>
                <p className="text-[#6E6E73] text-xs leading-relaxed line-clamp-2 mb-3">
                  {product.description}
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-[#0071E3] text-base font-semibold">
                    {(product.discount ?? 0) > 0
                      ? `$${discountedPrice.toFixed(2)}`
                      : `$${product.price}`}
                  </span>

                  {(product.discount ?? 0) > 0 && (
                    <span className="text-[#6E6E73] text-xs line-through">
                      ${product.price}
                    </span>
                  )}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default OffersPage;
