import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Container, Paper, Typography, TextField, Button } from "@mui/material";
import "./Auth.css";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("http://localhost:3000/auth/register", { name, email, password });

      console.log("Phản hồi từ backend:", response.data);

      navigate("/login");
    } catch (err) {
      console.error("Lỗi khi đăng ký:", err.response?.data || err.message);
      setError(err.response?.data?.message || err.message || "Đăng ký thất bại!");
    }
  };

  return (
    <Container maxWidth="sm" className="auth-container">
      <Typography className="app-title">BISTREBOND</Typography>
      <Paper elevation={6} className="auth-box">
        <Typography variant="h4" gutterBottom>
          Đăng Ký
        </Typography>
        {error && <Typography color="error">{error}</Typography>}
        <form onSubmit={handleRegister}>
          <TextField
            fullWidth
            label="Tên người dùng"
            variant="outlined"
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
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
            Đăng Ký
          </Button>
        </form>
        <Typography variant="body2" className="switch-auth">
          Đã có tài khoản? <a href="/login">Đăng nhập ngay</a>
        </Typography>
      </Paper>
    </Container>
  );
};

export default Register;
