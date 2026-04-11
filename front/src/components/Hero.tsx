import Link from "next/link";

const Hero = () => {
  return (
    <section className="bg-[#F5F5F7] px-4 py-12 md:px-8 md:py-20 flex flex-col items-center text-center">
      <span className="text-[#0071E3] text-xs font-semibold uppercase tracking-widest mb-4 animate-bounce">
        Nuevo — iPhone 17 Pro disponible
      </span>

      <h1 className="text-[#1D1D1F] text-3xl md:text-5xl font-semibold tracking-tight leading-tight max-w-2xl mb-4">
        Lo mejor en tecnología, al alcance de tu mano.
      </h1>

      <p className="text-[#6E6E73] text-sm md:text-base max-w-lg mb-8">
        Productos Apple y más, con envío rápido y garantía oficial.
      </p>

      <div className="flex flex-col md:flex-row gap-3 md:gap-4 w-full md:w-auto">
        <Link
          href="/products"
          className="bg-[#0071E3] hover:bg-[#0077ED] transition-colors text-white px-6 py-3 rounded-lg text-sm font-medium text-center"
        >
          Ver productos
        </Link>
      </div>
    </section>
  );
};

export default Hero;
