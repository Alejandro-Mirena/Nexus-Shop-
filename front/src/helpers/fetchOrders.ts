const API_URL = "http://localhost:3001";

export const fetchOrders = async () => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API_URL}/orders`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    console.error("Error en orders:", res.status);
    return [];
  }

  const data = await res.json();
  return data;
};
