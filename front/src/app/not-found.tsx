import Link from "next/link";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-[#F5F5F7] flex flex-col items-center justify-center px-4 text-center">
      {/* Número 404 grande */}
      <h1 className="text-[120px] md:text-[180px] font-semibold text-[#E8E8ED] leading-none select-none">
        404
      </h1>

      {/* Contenido */}
      <div className="-mt-6 md:-mt-10 flex flex-col items-center">
        <h2 className="text-[#1D1D1F] text-2xl md:text-3xl font-semibold tracking-tight mb-3">
          Página no encontrada
        </h2>
        <p className="text-[#6E6E73] text-sm md:text-base max-w-sm mb-8">
          La página que buscás no existe o fue movida a otra dirección.
        </p>

        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/"
            className="bg-[#0071E3] hover:bg-[#0077ED] transition-colors text-white px-6 py-3 rounded-lg text-sm font-medium"
          >
            Volver al inicio
          </Link>
          <Link
            href="/products"
            className="bg-white border border-[#E8E8ED] hover:border-[#0071E3] hover:text-[#0071E3] transition-colors text-[#1D1D1F] px-6 py-3 rounded-lg text-sm font-medium"
          >
            Ver productos
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
