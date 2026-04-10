"use client";

import { fetchCategories } from "@/helpers/fetchCategory";
import { ICategory } from "@/Types";
import Link from "next/link";
import { useEffect, useState } from "react";

const Footer = () => {
  const [categories, setCategories] = useState<ICategory[]>([]);

  useEffect(() => {
    fetchCategories().then(setCategories);
  }, []);

  return (
    <footer className="bg-[#F5F5F7] border-t border-[#ede8e8] mt-16">
      <div className="max-w-6xl mx-auto px-8 py-10">
        <div className="grid  md:grid-cols-4 gap-8 mb-10">
          {/* Navegación */}
          <div>
            <h3 className="text-[#1D1D1F] text-sm font-semibold mb-3">
              Navegación
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-[#6E6E73] hover:text-[#1D1D1F]">
                  Inicio
                </Link>
              </li>
              <li>
                <Link
                  href="/products"
                  className="text-[#6E6E73] hover:text-[#1D1D1F]"
                >
                  Productos
                </Link>
              </li>
              <li>
                <Link
                  href="/offers"
                  className="text-[#6E6E73] hover:text-[#1D1D1F]"
                >
                  Ofertas
                </Link>
              </li>
            </ul>
          </div>

          {/* Categorías dinámicas desde el backend */}
          <div>
            <h3 className="text-[#1D1D1F] text-sm font-semibold mb-3">
              Categorías
            </h3>
            <ul className="space-y-2 text-sm">
              {categories.map((cat) => (
                <li key={cat.id}>
                  <Link
                    href={`/products?categoryId=${cat.id}`}
                    className="text-[#6E6E73] hover:text-[#1D1D1F]"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Soporte */}
          <div>
            <h3 className="text-[#1D1D1F] text-sm font-semibold mb-3">
              Soporte
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="text-[#6E6E73] hover:text-[#1D1D1F]">
                  Contacto
                </Link>
              </li>
              <li>
                <Link href="#" className="text-[#6E6E73] hover:text-[#1D1D1F]">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="#" className="text-[#6E6E73] hover:text-[#1D1D1F]">
                  Envíos
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-[#1D1D1F] text-sm font-semibold mb-3">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="text-[#6E6E73] hover:text-[#1D1D1F]">
                  Privacidad
                </Link>
              </li>
              <li>
                <Link href="#" className="text-[#6E6E73] hover:text-[#1D1D1F]">
                  Términos
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Línea inferior */}
        <div className="border-t border-[#E8E8ED] pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[#6E6E73] text-xs">
            © {new Date().getFullYear()} Nexus Shop. Todos los derechos
            reservados.
          </p>
          <div className="flex items-center gap-4 text-xs">
            <Link href="#" className="text-[#6E6E73] hover:text-[#1D1D1F]">
              Privacidad
            </Link>
            <Link href="#" className="text-[#6E6E73] hover:text-[#1D1D1F]">
              Términos
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
