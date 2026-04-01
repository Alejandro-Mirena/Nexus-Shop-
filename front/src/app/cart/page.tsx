const CartPage = () => {
  return (
    <div style={{ padding: "2rem" }}>
      <h1>Carrito de compras</h1>
      <p>No hay productos en el carrito</p>
      <div style={{ marginTop: "1rem", padding: "1rem", border: "1px solid #ccc" }}>
        <p>Subtotal: $0</p>
        <button>Finalizar compra</button>
      </div>
    </div>
  )
}

export default CartPage