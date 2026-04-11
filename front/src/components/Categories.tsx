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
    <div className="px-4 md:px-8 py-6 border-b border-[#E8E8ED]">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={`/products?categoryId=${cat.id}`}
            className="bg-[#F5F5F7] hover:bg-[#E8F0FE] border border-[#E8E8ED] hover:border-[#0071E3] transition-colors rounded-xl px-4 py-3 flex items-center justify-center text-center"
          >
            <span className="text-sm font-medium text-[#6B7280] hover:text-[#0071E3]">
              {cat.name}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Categories;
