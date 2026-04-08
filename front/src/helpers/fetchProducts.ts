const API_URL = "http://localhost:3001";

export const fetchProducts = async (categoryId?: number) => {
  let url = `${API_URL}/products`;

  if (categoryId) {
    url += `?categoryId=${categoryId}`;
  }

  const response = await fetch(url);
  return response.json();
};

export const fetchProductById = async (id: number) => {
  const response = await fetch(`${API_URL}/products/${id}`);
  const data = await response.json();
  return data;
};
