"use client";
import { IProduct } from "@/Types";
import Link from "next/link";

const Card: React.FC<IProduct> = ({
  name,
  price,
  description,
  image,
  id,
  discount,
}) => {
  const discountedPrice = price - (price * (discount ?? 0)) / 100;
  const hasDiscount = (discount ?? 0) > 0;

  return (
    <div className="bg-white border border-[#E8E8ED] rounded-2xl overflow-hidden hover:shadow-md transition-shadow flex flex-col">
      {/* Imagen + Badge */}
      <div className="relative">
        <div className="bg-[#F5F5F7] h-48 flex items-center justify-center p-4">
          <img src={image} alt={name} className="h-full object-contain" />
        </div>

        {hasDiscount && (
          <span className="absolute top-3 left-3 bg-[#0071E3] text-white text-xs font-semibold px-2 py-1 rounded-lg">
            -{discount}%
          </span>
        )}
      </div>

      {/* Contenido */}
      <div className="p-4 flex flex-col flex-1">
        <h2 className="text-[#1D1D1F] text-sm font-semibold mb-1">{name}</h2>

        <p className="text-[#6E6E73] text-xs leading-relaxed line-clamp-2 mb-3">
          {description}
        </p>

        {/* Precio */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-[#0071E3] text-base font-semibold">
            ${hasDiscount ? discountedPrice.toFixed(2) : price}
          </span>

          {hasDiscount && (
            <span className="text-[#6E6E73] text-xs line-through">
              ${price}
            </span>
          )}
        </div>

        <Link
          href={`/product/${id}`}
          className="mt-auto block w-full bg-[#0071E3] hover:bg-[#0077ED] transition-colors text-white text-sm font-medium text-center py-2 rounded-lg"
        >
          Ver producto
        </Link>
      </div>
    </div>
  );
};
export default Card;
