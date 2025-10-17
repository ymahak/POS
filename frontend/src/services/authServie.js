import api from "../api/axios";

export const login = async (email, password) => {
  const res = await api.post('/auth/login', { email, password });
  return res.data;
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('admin');
};

// Add this for Signup/Register
export const register = async (name, email, password) => {
  const res = await api.post('/auth/register', { name, email, password });
  return res.data;
};
