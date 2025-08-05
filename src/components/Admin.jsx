// // src/components/Admin.jsx
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Button, TextField, Typography } from '@mui/material';
// import axios from 'axios';

// const Admin = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [isRegister, setIsRegister] = useState(true);
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const url = isRegister ? '/api/admin/register' : '/api/admin/login';
    
//     try {
//       const response = await axios.post(url, { email, password });
//       alert(response.data.message);
//       if (!isRegister) {
//         localStorage.setItem("token", response.data.token);
//         navigate('/dashboard'); // Điều hướng tới trang dashboard
//       }
//     } catch (error) {
//       alert(error.response.data.message);
//     }
//   };

//   return (
//     <div style={{ padding: '20px' }}>
//       <Typography variant="h4">{isRegister ? "Đăng ký" : "Đăng nhập"}</Typography>
//       <form onSubmit={handleSubmit}>
//         <TextField
//           label="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           fullWidth
//           required
//           margin="normal"
//         />
//         <TextField
//           label="Mật khẩu"
//           type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           fullWidth
//           required
//           margin="normal"
//         />
//         <Button type="submit" variant="contained" color="primary" fullWidth>
//           {isRegister ? "Đăng ký" : "Đăng nhập"}
//         </Button>
//         <Button
//           onClick={() => setIsRegister(!isRegister)}
//           color="secondary"
//           fullWidth
//           style={{ marginTop: '10px' }}
//         >
//           {isRegister ? "Đã có tài khoản? Đăng nhập" : "Chưa có tài khoản? Đăng ký"}
//         </Button>
//       </form>
//     </div>
//   );
// };

// export default Admin;