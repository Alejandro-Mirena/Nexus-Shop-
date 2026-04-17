"use client";

import { useEffect, useState } from "react";
import { fetchProducts } from "@/helpers/fetchProducts";
import { fetchCategories } from "@/helpers/fetchCategory";
import { IProduct, ICategory } from "@/Types";
import { useSearchParams, useRouter } from "next/navigation";
import CardList from "@/components/CardList";

const ProductsView = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [loading, setLoading] = useState(true);

  const searchParams = useSearchParams();
  const router = useRouter();
  const categoryId = searchParams.get("categoryId");

  useEffect(() => {
    const fetchData = async () => {
      const [productsData, categoriesData] = await Promise.all([
        fetchProducts(),
        fetchCategories(),
      ]);

      setCategories(categoriesData);

      if (categoryId) {
        const filtered = productsData.filter(
          (p: { categoryId: any }) => String(p.categoryId) === categoryId,
        );
        setProducts(filtered);
      } else {
        setProducts(productsData);
      }

      setLoading(false);
    };

    fetchData();
  }, [categoryId]);

  const handleFilter = (id: string | null) => {
    if (id) {
      router.push(`/products?categoryId=${id}`);
    } else {
      router.push("/products");
    }
  };

  if (loading) {
    return (
      <div className="text-center py-20 text-[#6E6E73]">
        Cargando productos...
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-6 md:px-10 text-center py-8 max-w-6xl mx-auto">
      {/* HEADER */}
      <h1 className="text-2xl md:text-3xl font-semibold mb-6 text-[#1D1D1F]">
        Nuestros productos
      </h1>
      <p className="text-sm text-[#6E6E73] mb-8">
        Explora nuestra variedad de productos y encuentra lo que necesitas.
      </p>

      {/*  CATEGORÍAS */}
      <div className="flex gap-3 overflow-x-auto mb-8 pb-2">
        <button
          onClick={() => handleFilter(null)}
          className={`px-4 py-2 rounded-full text-sm border transition ${
            !categoryId
              ? "bg-[#0071E3] text-white"
              : "text-[#6E6E73] border-[#0b0b0c]"
          }`}
        >
          Todos
        </button>

        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => handleFilter(String(cat.id))}
            className={`px-4 py-2 rounded-full text-sm border transition ${
              categoryId === String(cat.id)
                ? "bg-[#0071E3] text-white"
                : "text-[#6E6E73] border-[#E8E8ED] hover:border-[#0071E3]"
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      <CardList products={products} />
    </div>
  );
};

export default ProductsView;
