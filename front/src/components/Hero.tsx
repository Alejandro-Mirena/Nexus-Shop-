import Link from "next/link";

const Hero = () => {
  return (
    <section className="bg-[#F5F5F7] px-8 py-20 flex flex-col items-center text-center">
      <span className="text-[#0071E3] text-xs font-semibold uppercase tracking-widest mb-4">
        Nuevo — iPhone 17 Pro disponible
      </span>

      <h1 className="text-[#1D1D1F] text-5xl font-semibold tracking-tight leading-tight max-w-2xl mb-4">
        Lo mejor en tecnología, al alcance de tu mano.
      </h1>

      <p className="text-[#6E6E73] text-base max-w-lg mb-8">
        Productos Apple y más, con envío rápido y garantía oficial.
      </p>

      <div className="flex gap-4">
        <Link
          href="/products"
          className="bg-[#0071E3] hover:bg-[#0077ED] transition-colors text-white px-6 py-3 rounded-lg text-sm font-medium"
        >
          Ver productos
        </Link>
      </div>
    </section>
  );
};

export default Hero;
