import React from "react";
import { Link } from "react-router-dom";
import "./PostItem.css";

const PostItem = ({ post }) => {
  // Nếu post.image là đường dẫn tương đối, nối thêm host
  const imageUrl =
    post.image && !post.image.startsWith("http")
      ? `http://localhost:3000${post.image}`
      : post.image;

  console.log("Ảnh bài viết:", imageUrl); // Kiểm tra URL ảnh trong console

  return (
    <div className="post-item">
      <div className="post-left">
        {imageUrl ? (
          <img src={imageUrl} alt={post.title} />
        ) : (
          <div className="no-image">No Image</div>
        )}
      </div>

      <div className="post-right">
        <h2 className="post-title">{post.title}</h2>
        <Link to={`/posts/${post._id}`} className="read-more-button">
          Xem chi tiết
        </Link>
      </div>
    </div>
  );
};

export default PostItem;
