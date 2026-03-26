import { IProduct } from "@/Types"


const Card: React.FC<IProduct>= ({name, price, description, image}) => {
    return(
        <div>
            <h2>{name}</h2>
            <p>Precio ${price}</p>
            <p>{description}</p>
            <img src={image} alt="" />
        </div>
    )
}
export default Card