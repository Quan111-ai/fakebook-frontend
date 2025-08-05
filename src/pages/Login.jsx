import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Container, Paper, Typography, TextField, Button } from "@mui/material";
import "./Auth.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("http://localhost:3000/auth/login", { email, password });
      
      console.log("Phản hồi từ backend:", response.data);
      
      let token = response.data.token || (response.data.data && response.data.data.token);
      let userData = response.data.user || (response.data.data && response.data.data.user);

      if (!token) {
        throw new Error("Không nhận được token từ backend");
      }

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(response.data.author));
      navigate("/");
    } catch (err) {
      console.error("Lỗi khi đăng nhập:", err.response?.data || err.message);
      setError(err.response?.data?.message || err.message || "Đăng nhập thất bại!");
    }
  };

  return (
    <Container maxWidth="sm" className="auth-container">
      <Paper elevation={6} className="auth-box">
      <Typography variant="h3" className="app-title" gutterBottom>
        BISTREBOND
      </Typography>

        <Typography variant="h4" gutterBottom>
          Đăng Nhập
        </Typography>
        {error && <Typography color="error">{error}</Typography>}
        <form onSubmit={handleLogin}>
          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            fullWidth
            label="Mật khẩu"
            type="password"
            variant="outlined"
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Đăng Nhập
          </Button>
        </form>
        <Typography variant="body2" className="switch-auth">
          Chưa có tài khoản? <a href="/register">Đăng ký ngay</a>
        </Typography>
      </Paper>
    </Container>
  );
};

export default Login;
