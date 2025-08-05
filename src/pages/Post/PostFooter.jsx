import React, { useState } from "react";
import axios from "axios";
import "./PostFooter.css";

const PostFooter = ({ postId, likes, onLikeUpdate }) => {
  const [showLikes, setShowLikes] = useState(false);
  const [likeUsers, setLikeUsers] = useState([]);
  const token = localStorage.getItem("token");

  // Hàm toggle like (thêm hoặc huỷ like)
  const handleLike = async () => {
    try {
      await axios.post(
        `http://localhost:3000/likes/${postId}`,
        {},
        { headers: { Authorization: token ? `Bearer ${token}` : "" } }
      );
      // Gọi callback để cập nhật lượt thích từ component cha
      if (onLikeUpdate) onLikeUpdate();
    } catch (error) {
      console.error(
        "Lỗi khi thực hiện thao tác like:",
        error.response?.data || error.message
      );
    }
  };

  // Hàm lấy danh sách người đã like và toggle hiển thị
  const handleViewLikes = async () => {
    if (!showLikes) {
      try {
        const res = await axios.get(`http://localhost:3000/likes/${postId}/users`, {
          headers: { Authorization: token ? `Bearer ${token}` : "" },
        });
        setLikeUsers(res.data);
      } catch (error) {
        console.error(
          "Lỗi khi lấy danh sách người dùng đã like:",
          error.response?.data || error.message
        );
      }
    }
    setShowLikes((prev) => !prev);
  };

  return (
    <div className="post-footer">
      <button className="like-button" onClick={handleLike}>
        👍 Thích ({likes})
      </button>
      <button className="view-likes-button" onClick={handleViewLikes}>
        {showLikes ? "Ẩn người thích" : "Xem người thích"}
      </button>
      {showLikes && (
        <div className="likes-list">
          {likeUsers.length > 0 ? (
            <ul>
              {likeUsers.map((userLike) => (
                <li key={userLike._id}>
                  {userLike.user && userLike.user.email
                    ? userLike.user.email
                    : "Anonymous"}
                </li>
              ))}
            </ul>
          ) : (
            <p>Chưa có ai thích bài viết này.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default PostFooter;
