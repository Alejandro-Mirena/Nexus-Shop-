import { productsToPreLoad } from "@/libraries/mockedupProducts"
import Card from "./Card"

const CardList = () =>{
    return(
        <div>
            {
                productsToPreLoad.map((product )=>{
                    return(
                        <Card key={product.id} {...product}/>
                    )
                })
            }
        </div>
    )
}
export default CardList