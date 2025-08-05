import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { checkLoginStatus } from "../utils/auth";
import { fetchPosts } from "../api/posts";
import PostItem from "../components/PostItem";
import CreatePost from "../components/CreatePost";
import "./Home.css";

import { AccountCircle, Search } from "@mui/icons-material";
import { CircularProgress, Button } from "@mui/material"; // 🟢 Import Button từ Material UI
import SearchByTags from "../components/SearchByTags";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { jwtDecode } from "jwt-decode";



const brownTheme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#795548" },
    secondary: { main: "#6D4C41" },
    background: { default: "#F5E6CA", paper: "#D7CCC8" },
    text: { primary: "#4E342E", secondary: "#5D4037" },
  },
});

const categories = [
  { id: "64a1bf9b05f37f91eb2fdd19", name: "Công nghệ" },
  { id: "64a1bf9b05f37f91eb2fdd20", name: "Du lịch" },
  { id: "64a1bf9b05f37f91eb2fdd21", name: "Ẩm thực" },
];

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = checkLoginStatus();
    if (!currentUser) {
      handleLogout(); // 🔴 Nếu không có user, tự động logout
      return;
    }
    setUser(currentUser);
    checkTokenExpiration();
    loadPosts();
  }, [navigate]);

  const checkTokenExpiration = () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        if (decodedToken.exp * 1000 < Date.now()) {
          handleLogout(); // 🔴 Nếu token hết hạn, logout ngay
        }
      } catch (error) {
        console.error("Lỗi khi kiểm tra token:", error);
        handleLogout();
      }
    }
  };

  const loadPosts = async () => {
    try {
      const data = await fetchPosts();
      setPosts(Array.isArray(data.posts) ? data.posts : []);
    } catch (error) {
      console.error("❌ Lỗi khi lấy bài viết:", error);
      setPosts([]);
    } finally {
      setIsLoading(false);
    }
  };

  const updatePosts = (postId, changes) => {
    setPosts(posts.map(post => (post._id === postId ? { ...post, ...changes } : post)));
  };

  const addNewPost = (newPostResponse) => {
    const newPost = newPostResponse.post || newPostResponse;
    setPosts([newPost, ...posts]);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
    window.location.reload();
  };

  const filteredPosts = posts.filter(post => 
    post.title && post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <ThemeProvider theme={brownTheme}>
      <div className="home-container">
        <nav className="navbar">
          
          <Button 
            variant="contained" 
            color="primary" 
            onClick={() => window.location.reload()} 
            className="logo-button"
            >
            BistreBond
          </Button>
        
         
          <div className="search-bar-container">
            <div className="search-bar">
              <Search className="search-icon" />
              <input
                type="text"
                placeholder="Tìm kiếm bài viết..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <SearchByTags />
          </div>
          <div className="nav-links">
            {user ? (
              <>
                <Link to="/information" className="nav-user"> 
                  <AccountCircle fontSize="large" style={{marginRight: "8px"}} />
                  {user.email}
                </Link>
                <Button variant="contained" color="secondary" onClick={handleLogout}>
                  Đăng xuất
                </Button>
              </>
            ) : (
              <>
                <Link to="/login" className="nav-button">Đăng nhập</Link>
                <Link to="/register" className="nav-button">Đăng ký</Link>
              </>
            )}
            <button className="menu-button">☰</button>
          </div>
        </nav>
       
        <div className="category-list">
          {categories.map(category => (
            <Link key={category.id} to={`/category/${category.id}`} className="category-link">
              {category.name}
            </Link>
          ))}
        </div>

        {user && <CreatePost addNewPost={addNewPost} />}

        <div className="content">
          {isLoading ? (
            <div className="loading-container">
              <CircularProgress size={60} thickness={5} color="primary" />
              <p className="loading-text">Đang tải dữ liệu...</p>
            </div>
          ) : filteredPosts.length > 0 ? (
            filteredPosts.map(post => (
              <PostItem key={post._id} post={post} updatePosts={updatePosts} />
            ))
          ) : (
            <p className="no-posts-text">😢 Không có bài viết nào.</p>
          )}
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Home;
