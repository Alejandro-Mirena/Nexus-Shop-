import Link from "next/link"

const NotFound = () => {
  return (
    <div style={{ textAlign: "center", padding: "4rem" }}>
      <h1>404</h1>
      <h2>Página no encontrada</h2>
      <p>La página que buscás no existe.</p>
      <Link href="/" className="bg-[#0071E3] hover:bg-[#4992db] transition-colors text-white px-6 py-3 rounded-lg text-sm font-medium">Volver al inicio</Link>
    </div>
  )
}

export default NotFound