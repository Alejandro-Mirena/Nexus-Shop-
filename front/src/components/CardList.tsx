import { IProduct } from "@/Types";
import Card from "./Card";

interface Props {
  products: IProduct[];
}

const CardList = ({ products }: Props) => {
  if (products.length === 0) {
    return (
      <p className="text-[#6E6E73] text-center">
        No hay productos en esta categoría.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {products.map((product) => (
        <Card key={product.id} {...product} />
      ))}
    </div>
  );
};

export default CardList;
