import Hero from "@/components/Hero";
import WhyUs from "@/components/WhyUs";
import Categories from "@/components/Categories";
import ReviewsCarrusel from "@/components/ReviewsCarrusel";

const HomePage = () => {
  return (
    <div>
      <Hero />

      <Categories variant="hero" />

      <WhyUs />
      <ReviewsCarrusel />
    </div>
  );
};
export default HomePage;
