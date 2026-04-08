const API_URL = "http://localhost:3001";

export const fetchCategories = async () => {
  const response = await fetch(`${API_URL}/categories`);

  if (!response.ok) {
    throw new Error("Failed to fetch categories");
  }
  return response.json();
};
