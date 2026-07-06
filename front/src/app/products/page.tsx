import { Suspense } from "react";
import ProductsView from "@/views/ProductsPage";

const ProductsPage = () => {
  return (
    <Suspense fallback={<div className="text-center py-20 text-[#6E6E73]">Cargando productos...</div>}>
      <ProductsView />
    </Suspense>
  );
};

export default ProductsPage;
