import React, { useEffect, useState } from "react";
import axios from "axios";

const GetPostImage = ({ imageId }) => {
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    const fetchImage = async () => {
      if (!imageId) return; // Nếu không có imageId, không cần fetch

      try {
        const res = await axios.get(`http://localhost:3000/api/images/${imageId}`);
        setImageUrl(`http://localhost:3000${res.data.image.path}`);
      } catch (error) {
        console.error("Lỗi khi lấy ảnh:", error);
      }
    };

    fetchImage();
  }, [imageId]);

  if (!imageUrl) return <p>Đang tải ảnh...</p>; // Hiển thị loading nếu chưa có ảnh

  return <img src={imageUrl} alt="Post" className="post-image" />;
};

export default GetPostImage;
