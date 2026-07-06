import { Suspense } from "react";
import Hero from "@/components/Hero";
import WhyUs from "@/components/WhyUs";
import Categories from "@/components/Categories";
import ReviewsCarrusel from "@/components/ReviewsCarrusel";

const HomePage = () => {
  return (
    <div>
      <Hero />

      <Suspense fallback={<div className="h-64" />}>
        <Categories variant="hero" />
      </Suspense>

      <WhyUs />
      <ReviewsCarrusel />
    </div>
  );
};
export default HomePage;
