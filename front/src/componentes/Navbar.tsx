import Link from "next/link"

const Navbar = () => {
  return (
    <nav style={{ background: "#333", padding: "1rem", display: "flex", gap: "1rem" }}>
      <Link href="/" style={{ color: "white" }}>Inicio</Link>
      <Link href="/cart" style={{ color: "white" }}>Carrito</Link>
      <Link href="/orders" style={{ color: "white" }}>¿?</Link>
      <Link href="/dashboard" style={{ color: "white" }}>Mi cuenta</Link>
    </nav>
  )
}

export default Navbar