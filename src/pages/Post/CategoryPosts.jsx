import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import PostItem from "./PostItem";
import "./CategoryPosts.css";

const CategoryPosts = () => {
  const { categoryId } = useParams(); // 🟢 Lấy ID category từ URL
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPostsByCategory = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/categories/${categoryId}/posts`);
        setPosts(res.data.posts);
      } catch (error) {
        console.error("Lỗi khi lấy bài viết theo category:", error);
      } finally {
        setLoading(false);
      }
    };

    if (categoryId) {
      fetchPostsByCategory();
    }
  }, [categoryId]);

  if (loading) return <p className="loading-text">Đang tải bài viết...</p>;

  return (
    <div className="category-posts-container">
      <h2 className="category-title">Bài viết trong danh mục</h2>
      <div className="posts-list">
        {posts.length > 0 ? posts.map((post) => <PostItem key={post._id} post={post} />) : <p>Không có bài viết nào.</p>}
      </div>
    </div>
  );
};

export default CategoryPosts;
