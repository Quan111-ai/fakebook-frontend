import { useState, useEffect } from "react";
import axios from "axios";

const useLike = (postId, token) => {
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const fetchLikes = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/likes/${postId}/count`);
        setLikes(res.data.likeCount);
      } catch (error) {
        console.error("Lỗi khi lấy số lượng like:", error.response?.data || error.message);
      }
    };

    const checkUserLike = async () => {
      if (!token) return;
      try {
        const res = await axios.get(`http://localhost:3000/likes/${postId}/users`);
        const userId = JSON.parse(atob(token.split(".")[1])).id;
        setLiked(res.data.some(like => like.user._id === userId));
      } catch (error) {
        console.error("Lỗi khi kiểm tra like:", error.response?.data || error.message);
      }
    };

    fetchLikes();
    checkUserLike();
  }, [postId, token]);

  const toggleLike = async () => {
    if (!token) {
      alert("Bạn cần đăng nhập để like bài viết!");
      return;
    }

    try {
      const res = await axios.post(`http://localhost:3000/likes/${postId}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setLiked(!liked);
      setLikes(prev => (liked ? prev - 1 : prev + 1));
    } catch (error) {
      console.error("Lỗi khi like bài viết:", error.response?.data || error.message);
    }
  };

  return { likes, liked, toggleLike };
};

export default useLike;
