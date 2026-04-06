"use client"

import { productsToPreLoad } from "@/libraries/mockedupProducts"
import { useState, use } from "react"
import Link from "next/link"

const ProductDetailPage = ({ params }: { params: Promise<{ id: string }> }) => {

  const { id } = use(params)

  const product = productsToPreLoad.find(
    (p) => p.id === Number(id)
  )

  const [quantity, setQuantity] = useState(1)

  if (!product) {
    return (
      <div className="text-center py-20">
        <h1 className="text-[#1D1D1F] text-2xl font-semibold mb-4">Producto no encontrado</h1>
        <Link href="/" className="text-[#0071E3] text-sm hover:underline bg-[#0071E3] hover:bg-[#4992db] transition-colors text-white px-6 py-3 rounded-lg text-sm font-medium">Volver al inicio</Link>
      </div>
    )
  }

  return (
    <div className="px-8 py-12 max-w-5xl mx-auto">

      <Link href="/" className="text-[#0071E3] text-sm hover:underline mb-8 inline-block">
        ← Volver
      </Link>

      <div className="grid grid-cols-2 gap-12">

        <div className="bg-[#F5F5F7] rounded-2xl flex items-center justify-center p-10 h-96">
          <img src={product.image} alt={product.name} className="h-full object-contain" />
        </div>

        <div className="flex flex-col justify-center">

          <h1 className="text-[#1D1D1F] text-3xl font-semibold tracking-tight mb-3">
            {product.name}
          </h1>

          <p className="text-[#0071E3] text-2xl font-semibold mb-4">
            ${product.price}
          </p>

          <p className="text-[#6E6E73] text-sm leading-relaxed mb-6">
            {product.description}
          </p>

          <p className="text-xs text-[#6E6E73] mb-4">
            Stock disponible:
            <span className="text-[#34C759] font-medium ml-1">{product.stock} unidades</span>
          </p>

          <div className="flex items-center gap-4 mb-6">
            <span className="text-[#1D1D1F] text-sm font-medium">Cantidad:</span>
            <div className="flex items-center border border-[#E8E8ED] rounded-lg overflow-hidden">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="px-4 py-2 text-[#1D1D1F] hover:bg-[#F5F5F7] transition-colors text-lg"
              >
                -
              </button>
              <span className="px-4 py-2 text-[#1D1D1F] text-sm font-medium border-x border-[#E8E8ED]">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                className="px-4 py-2 text-[#1D1D1F] hover:bg-[#F5F5F7] transition-colors text-lg"
              >
                +
              </button>
            </div>
          </div>

          <button className="bg-[#0071E3] hover:bg-[#0077ED] transition-colors text-white py-3 rounded-xl text-sm font-medium cursor-pointer ">
            Agregar al carrito — ${(product.price * quantity).toLocaleString()}
          </button>

        </div>
      </div>
    </div>
  )
}

export default ProductDetailPage