"use client";

import { useEffect, useState, use } from "react";
import { fetchProducts } from "@/helpers/fetchProducts";
import { IProduct } from "@/Types";
import Card from "@/components/Card";

const CategoryPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);

  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts(Number(id)).then((data) => {
      setProducts(data);
      setLoading(false);
    });
  }, [id]);

  if (loading) {
    return <div className="text-center py-20">Cargando...</div>;
  }

  return (
    <div>
      {products.map((product) => (
        <Card key={product.id} {...product} />
      ))}
    </div>
  );
};

export default CategoryPage;
