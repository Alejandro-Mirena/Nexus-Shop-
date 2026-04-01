import Link from "next/link"

const NotFound = () => {
  return (
    <div style={{ textAlign: "center", padding: "4rem" }}>
      <h1>404</h1>
      <h2>Página no encontrada</h2>
      <p>La página que buscás no existe.</p>
      <Link href="/">Volver al inicio</Link>
    </div>
  )
}

export default NotFound