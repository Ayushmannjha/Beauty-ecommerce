import { API_BASE } from "./auth";

// ============================
// User Interfaces
// ============================
export interface User {
  id: string;
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
 
  state?: string;
  passcode?: string;
}

// ============================
// Order Interfaces
// ============================

// Matches backend OrderDao
export interface OrderItemRequest {
  productId: string;
  quantity: number;
}

export interface OrderRequest {
  userId: string;
  products: OrderItemRequest[]; // ✅ changed from productIds: string[]
  address: string;
  pincode: number;
  price: number;
  phone: string;
  paymentMethod?: string; // optional if you want to include payment method
}

// Matches backend OrderResponse
export interface OrderResponse {
  products: { [productName: string]: number }; // name → quantity
  totalPrice: number;
  address: string;
  phone: string;
  status: number;
  orderTime: string;
}


// ============================
// Helper: Auth Headers
// ============================
const getAuthHeaders = (): HeadersInit => {
  const token = localStorage.getItem("token");
  return token
    ? {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      }
    : { "Content-Type": "application/json" };
};

// ============================
// User Profile Management
// ============================

// Fetch user profile
export const fetchUserProfile = async (userId: string|undefined): Promise<User> => {
  const res = await fetch(`${API_BASE}/user/profile?id=${userId}`, {
    method: "GET",
    headers: getAuthHeaders(),
  });

  if (!res.ok) {
    throw new Error("Failed to fetch user profile");
  }

  const token = await res.text(); // backend returns JWT
  const payload = JSON.parse(atob(token.split(".")[1]));
  return payload.User;
};

// Update user profile
export const updateUserProfile = async (
  userId: string,
  updates: Partial<User>
): Promise<User> => {
  const res = await fetch(`${API_BASE}/user/update-profile?id=${userId}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(updates),
  });

  if (!res.ok) throw new Error("Failed to update user profile");

  const token = await res.text(); // backend returns new JWT
  localStorage.setItem("token", token); // update token
  const payload = JSON.parse(atob(token.split(".")[1]));
  return payload.User;
};

// ============================
// Order Management
// ============================

// Place new order
export const placeOrder = async (
  order: OrderRequest,
  latitude: number,
  longitude: number
): Promise<string> => {
  const res = await fetch(
    `${API_BASE}/user/place-order?latitude=${latitude}&longitude=${longitude}`,
    {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(order),
    }
  );

  if (!res.ok) {
    throw new Error("Failed to place order");
  }
console.log(order);
  return await res.text(); // e.g. "your order is placed"
};

// Fetch all orders of a user
export const fetchOrders = async (userId: string): Promise<OrderResponse[]> => {
  const res = await fetch(`${API_BASE}/user/your-order?id=${userId}`, {
    method: "GET",
    headers: getAuthHeaders(),
  });

  if (!res.ok) {
    const text = await res.text(); // get actual response (in case of HTML/error)
    console.error("Failed to fetch orders, response:", text);
    throw new Error(`Failed to fetch orders. Status: ${res.status}`);
  }

  const data = await res.json(); // read JSON once
  console.log("Fetched orders response:", data);
  return data; // return the JSON directly
};

