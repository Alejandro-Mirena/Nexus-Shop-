import Hero from "@/components/Hero";
import WhyUs from "@/components/WhyUs";
import Categories from "@/components/Categories";

const HomePage = () => {
  return (
    <div>
      <Hero />

      <Categories variant="hero" />

      <WhyUs />
    </div>
  );
};
export default HomePage;
