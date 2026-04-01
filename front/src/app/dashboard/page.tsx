const DashboardPage = () => {
  return (
    <div style={{ padding: "2rem" }}>
      <h1>Mi cuenta</h1>
      <div style={{ display: "flex", gap: "2rem" }}>
        <div>
          <h2>Datos personales</h2>
          <p>Nombre: Usuario</p>
          <p>Email: usuario@email.com</p>
        </div>
        <div>
          <h2>Mis órdenes</h2>
          <p>No hay órdenes aún</p>
        </div>
      </div>
    </div>
  )
}

export default DashboardPage