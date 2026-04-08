"use client";

import { useEffect, useState } from "react";
import Card from "./Card";
import { fetchProducts } from "@/helpers/fetchProducts";
import { IProduct } from "@/Types";
import { useSearchParams } from "next/navigation";

const CardList = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);

  const searchParams = useSearchParams();
  const categoryId = searchParams.get("categoryId");

  useEffect(() => {
    fetchProducts()
      .then((data) => setProducts(data))
      .finally(() => setLoading(false));
  }, [categoryId]);

  if (loading) {
    return (
      <div className="text-center py-20 text-[#6E6E73] text-sm">
        Cargando productos...
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-6 p-8">
      {products.map((product) => (
        <Card key={product.id} {...product} />
      ))}
    </div>
  );
};

export default CardList;
