import React from "react";
import { Link } from "react-router-dom";
import { IconButton, Typography, Chip } from "@mui/material";
import { Delete, Favorite, FavoriteBorder, LocalOffer } from "@mui/icons-material";
import axios from "axios";
import useLike from "../hooks/uselike"; // 🟢 Import custom hook
import "./PostItem.css";

const PostItem = ({ post, updatePosts }) => {
  const imageUrl = post.image || null;
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId"); // Lấy ID người dùng đã đăng nhập
  const { likes, liked, toggleLike } = useLike(post._id, token);

  const handleDeletePost = async () => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa bài viết này?")) return;

    try {
      await axios.delete(`http://localhost:3000/api/posts/${post._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      updatePosts(post._id, { deleted: true });
      window.location.reload();
    } catch (error) {
      console.error("❌ Lỗi khi xóa bài viết:", error.response?.data || error.message);
      alert("Xóa bài viết thất bại!");
    }
  };

  return (
    <div className="post-item">
      {/* 🔴 Nút xóa luôn hiển thị */}
      <IconButton color="error" onClick={handleDeletePost} className="delete-button">
        <Delete />
      </IconButton>

      <div className="post-left">
        {imageUrl ? (
          <img src={imageUrl} alt={post.title} className="post-image" />
        ) : (
          <div className="no-image">No Image</div>
        )}
      </div>

      <div className="post-right">
        <h2 className="post-title">{post.title}</h2>

        {/* 🏷️ Hiển thị danh sách Tags */}
        <div className="post-tags">
          <LocalOffer className="tag-icon" />
          {post.tags && post.tags.length > 0 ? (
            post.tags.map((tag, index) => (
              <Chip key={index} label={tag} className="tag" />
            ))
          ) : (
            <Typography variant="body2" color="textSecondary">
              Không có tags
            </Typography>
          )}
        </div>

        {/* ❤️ Hiển thị số lượt thích */}
        <div className="like-info">
          <IconButton onClick={toggleLike} color={liked ? "error" : "default"}>
            {liked ? <Favorite /> : <FavoriteBorder />}
          </IconButton>
          <Typography variant="body1">{likes} lượt thích</Typography>
        </div>

        <Link to={`/posts/${post._id}`} className="read-more-button">
          Xem chi tiết
        </Link>
      </div>
    </div>
  );
};

export default PostItem;
