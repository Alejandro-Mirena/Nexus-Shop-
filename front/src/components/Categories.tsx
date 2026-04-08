"use client";

import { fetchCategories } from "@/helpers/fetchCategory";
import { ICategory } from "@/Types";
import Link from "next/link";
import { useEffect, useState } from "react";

const Categories = () => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  useEffect(() => {
    fetchCategories().then(setCategories);
  }, []);

  return (
    <div className="flex gap-6 px-8 py-4 border-b border-[#E8E8ED]">
      {categories.map((cat) => (
        <Link
          key={cat.id}
          href={`/products?categoryId=${cat.id}`}
          className="text-lg font-medium text-[#6B7280] hover:text-[#3B82F6]"
        >
          {cat.name}
        </Link>
      ))}
    </div>
  );
};

export default Categories;
