import React, { useState } from 'react';
import axios from 'axios';

const LoginPage = ({ onLogin, setToken, setUserEmail, setUserRoles }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) return;

    try {
      const response = await axios.post('http://localhost:5001/api/auth/login', {
        email,
        password
      });

      const { token, email: returnedEmail, roles } = response.data;

      if (!token) {
        alert('❌ Login failed: No token received');
        return;
      }

      // 🧠 Store token, email, roles
      localStorage.setItem('token', token);
      localStorage.setItem('email', returnedEmail);
      localStorage.setItem('roles', JSON.stringify(roles));

      // 🧠 Update state
      setToken(token);
      setUserEmail(returnedEmail);
      setUserRoles(roles);

      alert('✅ Login Successful');
      onLogin(); // Navigate or switch tab
    } catch (err) {
      const message =
        err.response?.data?.message ||
        err.message ||
        'An unknown error occurred';
      console.error('Login error:', message);
      alert(`❌ Login Failed: ${message}`);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-slate-800 p-8 rounded-xl shadow-lg border border-slate-700">
      <h2 className="text-2xl font-bold text-center mb-6 text-blue-400">Welcome Back</h2>
      <form onSubmit={handleSubmit}>
        <label className="block mb-2">Email</label>
        <input
          type="email"
          className="w-full mb-4 p-2 rounded-md bg-slate-700 text-white border border-slate-600"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label className="block mb-2">Password</label>
        <input
          type="password"
          className="w-full mb-6 p-2 rounded-md bg-slate-700 text-white border border-slate-600"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full py-2 bg-gradient-to-r from-blue-600 to-emerald-600 text-white rounded-md hover:from-blue-500 hover:to-emerald-500 transition"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;