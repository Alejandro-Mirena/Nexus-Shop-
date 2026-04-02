import Link from "next/link"

const Navbar = () => {
  return (
    <header>

      {/* Barra de anuncios */}
      <div className="bg-[#0EA5E9] text-white text-center text-xs py-2 font-medium tracking-wide">
        Envío gratis en compras mayores a $100 — Solo por tiempo limitado
      </div>

      {/* Navbar principal */}
      <nav className="bg-[#0F172A] px-8 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="text-[#38BDF8] text-xl font-semibold">
          Nexus Shop
        </Link>

        {/* Links del centro */}
        <div className="flex items-center gap-8">
          <Link href="/" className="text-[#94A3B8] hover:text-white transition-colors text-sm font-medium">
            Inicio
          </Link>
          <Link href="/products" className="text-[#94A3B8] hover:text-white transition-colors text-sm font-medium">
            Productos
          </Link>
          <Link href="/dashboard" className="text-[#94A3B8] hover:text-white transition-colors text-sm font-medium">
            Mi cuenta
          </Link>
        </div>

        {/* Iconos de la derecha */}
        <div className="flex items-center gap-4">

          {/* Carrito con badge */}
          <Link href="/cart" className="relative text-[#94A3B8] hover:text-white transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c.51 0 .955-.343 1.087-.835l1.386-5.203A1.125 1.125 0 0 0 19.8 8.25H7.106M7.5 14.25 5.106 5.272M7.5 14.25l-1.5 1.5" />
            </svg>
            <span className="absolute -top-2 -right-2 bg-[#0EA5E9] text-white text-[10px] font-semibold w-4 h-4 rounded-full flex items-center justify-center">
              3
            </span>
          </Link>

          {/* Avatar usuario */}
          <Link href="/dashboard" className="w-8 h-8 rounded-full bg-[#0EA5E9] flex items-center justify-center text-white text-xs font-semibold">
            JD
          </Link>

        </div>

      </nav>

    </header>
  )
}

export default Navbar