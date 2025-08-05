// src/utils/imageUtils.js

export const getFullImageUrl = (relativePath) => {
    if (!relativePath) return null;
    // Nếu relativePath không bắt đầu bằng "http", nối thêm host
    return relativePath.startsWith("http")
      ? relativePath
      : `http://localhost:3000${relativePath}`;
  };
  