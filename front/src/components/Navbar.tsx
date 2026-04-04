import Link from "next/link"

const Navbar = () => {
  return (
    <header>
      <nav style={{ borderBottom: "1px solid #E8E8ED" }} className="bg-white px-8 py-4 flex items-center justify-between">

        <Link href="/" className="text-[#1D1D1F] text-lg font-semibold tracking-tight">
          Nexus Shop
        </Link>

        <div className="flex items-center gap-8">
          <Link href="/" className="text-[#1D1D1F] text-sm font-medium">
            Inicio
          </Link>
          <Link href="/products" className="text-[#6E6E73] hover:text-[#1D1D1F] transition-colors text-sm">
            Productos
          </Link>
          <Link href="/dashboard" className="text-[#6E6E73] hover:text-[#1D1D1F] transition-colors text-sm">
            Categorías
          </Link>
          <Link href="/dashboard" className="text-[#6E6E73] hover:text-[#1D1D1F] transition-colors text-sm">
            Ofertas
          </Link>
        </div>

        <div className="flex items-center gap-5">
          {/* Buscar */}
          <button className="text-[#1D1D1F] hover:text-[#0071E3] transition-colors">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
              <circle cx="11" cy="11" r="8"/>
              <path d="m21 21-4.35-4.35"/>
            </svg>
          </button>

          {/* Carrito */}
          <Link href="/cart" className="relative text-[#1D1D1F] hover:text-[#0071E3] transition-colors">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 0 1-8 0"/>
            </svg>
            <span className="absolute -top-2 -right-2 bg-[#0071E3] text-white text-[10px] font-semibold w-4 h-4 rounded-full flex items-center justify-center">
              3
            </span>
          </Link>

          {/* Avatar */}
          <Link href="/dashboard" className="w-8 h-8 rounded-full bg-[#0071E3] flex items-center justify-center text-white text-xs font-semibold">
            JD
          </Link>
        </div>

      </nav>
    </header>
  )
}

export default Navbar