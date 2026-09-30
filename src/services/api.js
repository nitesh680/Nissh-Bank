import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080",
});

// =========================
// LOGIN
// =========================
export const loginUser = async (username, password) => {
  const response = await api.post(
    "/api/auth/login",
    {
      username,
      password,
    }
  );

  return response.data;
};

// =========================
// TRANSFER MONEY
// =========================
export const transferMoney = async (
  recipientAccountNumber,
  amount
) => {
  const token = localStorage.getItem("token");

  const response = await api.post(
    "/api/account/transfer",
    {
      recipientAccountNumber,
      amount,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export default api;