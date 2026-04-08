const API_URL = "http://localhost:3001";

export const fetchProducts = async (categoryId?: number) => {
  const url = categoryId
    ? `${API_URL}/products?categoryId=${categoryId}`
    : `${API_URL}/products`;

  const response = await fetch(url);
  const data = await response.json();
  return data;
};

export const fetchProductById = async (id: number) => {
  const response = await fetch(`${API_URL}/products/${id}`);
  const data = await response.json();
  return data;
};
