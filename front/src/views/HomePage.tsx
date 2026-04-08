import Hero from "@/components/Hero";
import WhyUs from "@/components/WhyUs";
import Categories from "@/components/Categories";

const HomePage = () => {
  return (
    <div>
      <Hero />
      <div>
        <h2 className="text-xl font-bold text-[#374151]">Categorías</h2>
        <Categories />
      </div>
      <WhyUs />
    </div>
  );
};
export default HomePage;
