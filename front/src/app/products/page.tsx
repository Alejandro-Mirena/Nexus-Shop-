"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { fetchProducts } from "@/helpers/fetchProducts";
import Card from "@/components/Card";
import { IProduct } from "@/Types";
import Categories from "@/components/Categories";

const ProductsPage = () => {
  const searchParams = useSearchParams();
  const categoryId = searchParams.get("categoryId");

  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts(categoryId ? Number(categoryId) : undefined).then((data) => {
      setProducts(data);
      setLoading(false);
    });
  }, [categoryId]);

  if (loading) {
    return <div className="text-center py-20">Cargando...</div>;
  }

  return (
    <div className="px-4 sm:px-6 md:px-8 py-6">
      <Categories />

      <div
        className="
        grid 
        grid-cols-1 
        sm:grid-cols-2 
        md:grid-cols-3 
        lg:grid-cols-4 
        gap-4 md:gap-6
      "
      >
        {products.map((product) => (
          <Card key={product.id} {...product} />
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;
