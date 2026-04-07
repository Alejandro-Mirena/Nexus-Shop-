const API_URL = "http://localhost:3001";

export const fetchProducts = async () => {
  const response = await fetch(`${API_URL}/products`);
  const data = await response.json();
  return data;
};

export const fetchProductById = async (id: number) => {
  const response = await fetch(`${API_URL}/products/${id}`);
  const data = await response.json();
  return data;
};
