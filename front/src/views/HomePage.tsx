import CardList from "@/components/CardList"
import Category from "@/components/category"
import Hero from "@/components/Hero"
import WhyUs from "@/components/WhyUs"


const HomePage = () => {
    return(
        <div>
            <Hero/>
            <div>

            <h1></h1>
            <CardList/>
            </div>
            <Category/>
            <WhyUs/>
        </div>
    )
}
export default HomePage