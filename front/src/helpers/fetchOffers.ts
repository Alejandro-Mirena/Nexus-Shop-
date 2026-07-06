const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export const fetchOffers = async () => {
  const response = await fetch(`${API_URL}/products/onsale`);
  const data = await response.json();
  return data;
};
