const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export const fetchRegister = async (values: {
  name: string;
  email: string;
  password: string;
  address: string;
  phone: string;
}) => {
  const response = await fetch(`${API_URL}/users/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  });

  const data = await response.json();
  return data;
};
