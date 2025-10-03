import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { login } = useContext(AuthContext);
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${import.meta.env.VITE_APIURL}/api/auth/login`, form);
      login(res.data.user, res.data.token);
      toast.success("Login successful!");
       navigate('/home');
    } catch (err) {
      console.error(err);
      toast.error("Login failed!");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <form onSubmit={handleSubmit} className="p-6 border rounded shadow-md">
        <h2 className="text-xl font-bold mb-4">Login</h2>
        <input type="email" name="email" value={form.email} onChange={handleChange}
          placeholder="Email" className="border p-2 w-full mb-2" />
        <input type="password" name="password" value={form.password} onChange={handleChange}
          placeholder="Password" className="border p-2 w-full mb-2" />
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">Login</button>
      </form>
    </div>
  );
};

export default Login;

