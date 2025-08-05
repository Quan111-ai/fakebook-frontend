import React from "react";
import "./PostHeader.css";

const PostHeader = ({ title, date, likes }) => {
  const formattedDate = date ? new Date(date).toLocaleString() : "Chưa cập nhật";
  return (
    <div className="post-header">
      <h1 className="post-header-title">{title}</h1>
      <p className="post-header-meta">
        Ngày đăng: {formattedDate} | ❤️ {likes} lượt thích
      </p>
    </div>
  );
};

export default PostHeader;
