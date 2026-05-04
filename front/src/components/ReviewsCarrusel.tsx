"use client";

import { useRef } from "react";
import ReviewCard from "@/components/ReviewsCard";

const reviews = [
  {
    id: 1,
    name: "Carlos",
    comment: "Increíble experiencia, todo llegó perfecto.",
    rating: 5,
  },
  {
    id: 2,
    name: "Ana",
    comment: "Muy buena calidad, definitivamente volvería a comprar.",
    rating: 5,
  },
  {
    id: 3,
    name: "Luis",
    comment: "Entrega rápida y producto excelente.",
    rating: 4,
  },
  {
    id: 4,
    name: "María",
    comment: "Superó mis expectativas totalmente.",
    rating: 5,
  },
  {
    id: 5,
    name: "Javier",
    comment: "El producto es bueno, pero el envío tardó más de lo esperado.",
    rating: 3,
  },
  {
    id: 6,
    name: "Lucía",
    comment:
      "Cumple con lo que promete, aunque esperaba un poco más por el precio.",
    rating: 3,
  },
  {
    id: 7,
    name: "Pedro",
    comment: "La calidad está bien, pero el empaque llegó un poco dañado.",
    rating: 3,
  },
  {
    id: 8,
    name: "Sofía",
    comment: "No me convenció del todo, funciona pero hay mejores opciones.",
    rating: 2,
  },
  {
    id: 9,
    name: "Diego",
    comment: "El producto llegó defectuoso, tuve que solicitar cambio.",
    rating: 2,
  },
  {
    id: 10,
    name: "Valentina",
    comment:
      "Excelente atención al cliente, me resolvieron rápido un problema.",
    rating: 5,
  },
  {
    id: 11,
    name: "Andrés",
    comment: "Buen producto, aunque el precio es un poco alto.",
    rating: 4,
  },
  {
    id: 12,
    name: "Camila",
    comment: "Todo bien en general, pero el envío podría ser más rápido.",
    rating: 4,
  },
  {
    id: 13,
    name: "Fernando",
    comment: "No era lo que esperaba, la descripción puede mejorar.",
    rating: 2,
  },
  {
    id: 14,
    name: "Elena",
    comment: "Me encantó, lo uso todos los días.",
    rating: 5,
  },
];

const ReviewCarousel = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!containerRef.current) return;

    const scrollAmount = 320;

    containerRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section className="py-10 md:py-14">
      <h2 className="text-xl md:text-3xl font-semibold text-center mb-8 md:mb-10">
        Lo que dicen nuestros clientes
      </h2>

      <div className="relative">
        <button
          onClick={() => scroll("left")}
          className="hidden md:flex absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white border border-[#E8E8ED] rounded-full p-2 shadow hover:scale-105 transition cursor-pointer"
        >
          ←
        </button>

        <div
          ref={containerRef}
          className="overflow-x-auto scroll-smooth snap-x snap-mandatory no-scrollbar px-4 md:px-16"
        >
          <div className="flex gap-4 md:gap-8">
            {reviews.map((review) => (
              <ReviewCard key={review.id} {...review} />
            ))}
          </div>
        </div>

        <button
          onClick={() => scroll("right")}
          className="hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white border border-[#E8E8ED] rounded-full p-2 shadow hover:scale-105 transition cursor-pointer"
        >
          →
        </button>
      </div>
    </section>
  );
};

export default ReviewCarousel;
