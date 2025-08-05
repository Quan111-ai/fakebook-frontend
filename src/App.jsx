import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import PostDetail from "./pages/PostDetail"; // Trang bài viết chi tiết
import Information from "./pages/Information";
import AdminLogin from "./admin/AdminLogin"; // Trang đăng nhập admin
import AdminRegister from "./admin/AdminRegister"; // Trang đăng ký admin
import AdminDashboard from "./admin/AdminDashboard"; // Trang quản lý admin
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/posts/:id" element={<PostDetail />} />
        <Route path="/information" element={<Information />} />
        <Route path="/upload" element={<Information />} />
        <Route path="/image" element={<Information />} />
        {/* <Route path="/admin" element={<Admin />} /> */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/register" element={<AdminRegister />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        
      </Routes>
    </Router>
  );
}

export default App;
