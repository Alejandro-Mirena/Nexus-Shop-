"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { fetchCategories } from "@/helpers/fetchCategory";
import { ICategory } from "@/Types";
import Image from "next/image";

interface Props {
  variant?: "hero" | "products";
}

const Categories = ({ variant = "products" }: Props) => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const router = useRouter();
  const searchParams = useSearchParams();

  const activeCategory = searchParams.get("categoryId");

  useEffect(() => {
    fetchCategories().then(setCategories);
  }, []);

  const handleClick = (id?: number) => {
    if (!id) {
      router.push("/products");
    } else {
      router.push(`/products?categoryId=${id}`);
    }
  };

  const categoryImages: Record<string, string> = {
    Smartphones: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9",
    Laptops: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8",
    Tablets:
      "https://www.apple.com/assets-www/en_WW/ipad/03_product_tile/large/ipad_pro_30558c612_2x.png",
    Headphones:
      "https://www.apple.com/v/airpods-4/g/images/overview/bento-gallery/bento_case_open__63kccmu775u6_xlarge_2x.jpg",
    Cameras:
      "https://m.media-amazon.com/images/I/71fwaCdTjYL._AC_UY327_FMwebp_QL65_.jpg",
    Printers: "https://images.unsplash.com/photo-1587614382346-4ec70e388b28",
    Monitors: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf",
    Storage: "https://images.unsplash.com/photo-1580894908361-967195033215",
    Accessories:
      "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/HSFV2?wid=532&hei=582&fmt=png-alpha&.v=TEZKUU03MnBSZ09TemQ4RWc3KzF4Z0hqc0NvK2RZTVd5TWVhUDFuQlo0MGpzeDF5V25rNUlnU2xNeTJWa0Ntd09OR0NBZTI3bmRmMUdPUHlZenBIb2c",
  };
  const isLoading = categories.length === 0;
  return (
    <div className="mb-10 px-4 md:px-8">
      {variant === "hero" && (
        <>
          <h2 className="text-2xl md:text-4xl font-semibold text-center mb-4 tracking-tight">
            Explora nuestras categorías
          </h2>

          <p className="text-[#6B6B6B] text-sm md:text-base text-center mb-6 max-w-xl mx-auto">
            Descubre nuestra amplia selección de productos por categorías
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 gap-4 md:gap-6">
            {isLoading &&
              Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="h-32 sm:h-36 md:h-44 lg:h-48 rounded-2xl bg-gray-200 animate-pulse"
                />
              ))}

            {/*  REAL CONTENT */}
            {!isLoading &&
              categories.map((cat) => (
                <div
                  key={cat.id}
                  onClick={() => handleClick(cat.id)}
                  className="relative h-32 sm:h-36 md:h-44 lg:h-48 rounded-2xl overflow-hidden cursor-pointer group"
                >
                  <Image
                    src={categoryImages[cat.name]}
                    alt={cat.name}
                    fill
                    className="object-cover"
                    unoptimized
                  />

                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors duration-300" />

                  <div className="relative z-10 h-full flex items-end p-3 md:p-4">
                    <span className="text-white text-xs sm:text-sm md:text-base font-medium">
                      {cat.name}
                    </span>
                  </div>

                  <div className="absolute inset-0 rounded-2xl ring-0 group-hover:ring-2 ring-white/20 transition-all duration-300" />

                  <div className="absolute inset-0 rounded-2xl shadow-md group-hover:shadow-lg transition-shadow duration-300" />
                </div>
              ))}
          </div>
        </>
      )}

      {/* PRODUCTS */}
      {variant === "products" && (
        <>
          <h2 className="text-xl md:text-2xl text-center font-semibold mb-4">
            Explora nuestros productos
          </h2>

          <div className="flex gap-2 md:gap-3 overflow-x-auto pb-2 scrollbar-hide text-center justify-center">
            <button
              onClick={() => handleClick()}
              className={`px-3 md:px-4 py-2 rounded-lg text-xs md:text-sm whitespace-nowrap transition ${
                !activeCategory
                  ? "bg-[#0071E3] text-white"
                  : "border border-[#E8E8ED] hover:bg-gray-100"
              }`}
            >
              Todos
            </button>

            {categories.map((cat) => {
              const isActive = activeCategory === String(cat.id);

              return (
                <button
                  key={cat.id}
                  onClick={() => handleClick(cat.id)}
                  className={`px-3 md:px-4 py-2 rounded-lg text-xs md:text-sm whitespace-nowrap transition ${
                    isActive
                      ? "bg-[#0071E3] text-white"
                      : "border border-[#E8E8ED] hover:bg-gray-100"
                  }`}
                >
                  {cat.name}
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};
export default Categories;
