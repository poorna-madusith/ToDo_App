import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/authServices";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};
    if (!form.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!form.password) {
      newErrors.password = "Password is required";
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});
    try {
      const res = await login(form);
      localStorage.setItem("token", res.data.token);
      // Save user info if available in response
      if (res.data.user) {
        localStorage.setItem("user", JSON.stringify(res.data.user));
      } else if (res.data.username && res.data.email) {
        localStorage.setItem(
          "user",
          JSON.stringify({ username: res.data.username, email: res.data.email })
        );
      }
      setMessage("Login successful");
      navigate("/");
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setErrors({ ...newErrors, password: err.response.data.message });
      } else {
        setErrors({ ...newErrors, password: "Email or Password is wrong. check again." });
      }
    }
  };

  return (
    <div className="flex items-center justify-center h-full">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input name="email" value={form.email} onChange={handleChange} className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
          </div>
          <button type="submit" className="w-full py-2 px-4 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Login</button>
          <a href="/register" className="block text-sm text-center text-indigo-600 hover:underline">Dont have an account? Register</a>
          <a href="/forgot-password" className="block text-sm text-center text-blue-600 hover:underline mt-2">Forgot Password?</a>
        </form>
        {message && <div className="text-red-500 text-center">{message}</div>}
      </div>
    </div>
  );
}

export default Login;
