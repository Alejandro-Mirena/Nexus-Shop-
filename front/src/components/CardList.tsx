import { productsToPreLoad } from "@/libraries/mockedupProducts"
import Card from "./Card"

const CardList = () => {
  return (
   
    <div className="grid grid-cols-3 gap-6 p-8">
   
      {productsToPreLoad.map((product) => (
        <Card key={product.id} {...product} />
      ))}
    </div>
  )
}

export default CardList