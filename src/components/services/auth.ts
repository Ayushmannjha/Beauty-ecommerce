// src/services/auth-api.ts
export const API_BASE = "http://localhost:8080";
 

export interface User {
  id?: string|undefined;
  name: string;
  email: string;
  phone?: string;
  password?: string|undefined;
  state?: string;
  city?: string;
  address?: string;
  pincode?: number;
  
}

export const registerCustomer = async (user: User): Promise<{ token: string; role: string }> => {
  

  const response = await fetch(`${API_BASE}/auth/register-user`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || "Failed to register user");
  }

  // parse JSON from backend
  const data = await response.json(); // now data.token and data.role exist
  localStorage.setItem("token", data.token);
  localStorage.setItem("role", data.role);

 
  return data;
};


export const loginCustomer = async (email: string, password: string): Promise<string> => {
  const params = new URLSearchParams({ email, password });
  const response = await fetch(`${API_BASE}/auth/login?${params.toString()}`, {
    method: "POST",
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || "Failed to login");
  }

  // Parse JSON instead of text
  const data = await response.json(); // data = { token: "JWT_STRING", role: "USER" }
  localStorage.setItem("token", data.token); // store only JWT
  localStorage.setItem("role", data.role);   // optionally store role separately
  console.log("Token stored in localStorage:", data.token);
  return data.token;
};


// Optional: get current user ID from token
export const getUserIdFromToken = (): string | null => {
  const token = localStorage.getItem("token");
  console.log("Decoding token:", token);
  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    console.log("Decoding token:", payload.User?.id);
    return payload.User?.id || payload.Costumer?.id || null;
  } catch (err) {
    console.error("Failed to decode token", err);
    return null;
  }
};

export const isLoggedIn = (): boolean => {
  return localStorage.getItem("token") !== null;
};
