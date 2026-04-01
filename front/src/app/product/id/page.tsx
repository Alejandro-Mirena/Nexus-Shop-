const ProductDetailPage = ({ params }: { params: { id: string } }) => {
  return (
    <div style={{ padding: "2rem" }}>
      <h1>Detalle del Producto</h1>
      <p>ID del producto: <strong>{params.id}</strong></p>

      {/* Maquetación sin funcionalidad */}
      <div style={{ display: "flex", gap: "2rem", marginTop: "2rem" }}>
        <div style={{ width: "300px", height: "300px", background: "#eee" }}>
          [Imagen del producto]
        </div>
        <div>
          <h2>Nombre del producto</h2>
          <p>Descripción del producto...</p>
          <p><strong>Precio: $999</strong></p>
          <button>Agregar al carrito</button>
        </div>
      </div>
    </div>
  )
}

export default ProductDetailPage