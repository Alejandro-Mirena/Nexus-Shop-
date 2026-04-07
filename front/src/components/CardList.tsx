"use client";

import { useEffect, useState } from "react";
import Card from "./Card";
import { fetchProducts } from "@/helpers/fetchProducts";
import { IProduct } from "@/Types";

const CardList = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts().then((data) => {
      setProducts(data);
      setLoading(false);
    });
  }, []);

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
