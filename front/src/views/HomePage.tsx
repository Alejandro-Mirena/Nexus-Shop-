import Hero from "@/components/Hero";
import WhyUs from "@/components/WhyUs";
import Categories from "@/components/Categories";

const HomePage = () => {
  return (
    <div>
      <Hero />
      <div>
        <h2 className="text-xl font-bold text-center py-2 text-[#1d1d1f]">
          Explora nuestras categorías
        </h2>
        <Categories />
      </div>
      <WhyUs />
    </div>
  );
};
export default HomePage;
