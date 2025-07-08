import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/authServices";

function Login({ onLogin }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
      if (onLogin) onLogin();
      navigate("/");
    } catch (err) {
      setMessage("Login failed");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input name="email" value={form.email} onChange={handleChange} />
        </div>
        <div>
          <label>Password</label>
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Login</button>
        <a href="/register">Dont have an account? Register</a>
      </form>
      <div>{message}</div>
    </div>
  );
}

export default Login;
