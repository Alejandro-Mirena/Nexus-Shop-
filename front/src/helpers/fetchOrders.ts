const API_URL = "http://localhost:3001";

export const fetchOrders = async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    console.warn("No hay token");
    return [];
  }

  const res = await fetch(`${API_URL}/orders`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    console.error("Error en orders:", res.status);
    return [];
  }

  return await res.json();
};
