import React, { useState } from "react";
import axios from "axios";
import "./CreatePost.css";

const CreatePost = ({ addNewPost }) => {
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [uploading, setUploading] = useState(false);

  const token = localStorage.getItem("token");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleCreate = async () => {
    setError("");
    setSuccess("");

    if (!title.trim() || !content.trim() || !category.trim()) {
      setError("Vui lòng nhập đầy đủ Tiêu đề, Nội dung và Category!");
      return;
    }

    if (!token) {
      setError("Bạn chưa đăng nhập!");
      return;
    }

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      formData.append("category", category);
      formData.append("tags", tags);
      if (selectedFile) {
        formData.append("image", selectedFile);
      }

      const res = await axios.post(
        "http://localhost:3000/api/posts",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setSuccess("Bài viết đã được đăng thành công!");
      console.log("Bài viết mới:", res.data.post);

      addNewPost(res.data.post);

      // Reset form
      setTitle("");
      setContent("");
      setCategory("");
      setTags("");
      setSelectedFile(null);
      setPreview(null);
      setShowForm(false);
    } catch (err) {
      console.error("Lỗi khi tạo bài viết:", err.response?.data || err.message);
      setError("Lỗi khi đăng bài hoặc upload ảnh!");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="create-post-container">
      {showForm ? (
        <>
          <h2>Tạo bài viết</h2>
          {error && <p className="error-message">{error}</p>}
          {success && <p className="success-message">{success}</p>}

          <div className="form-group">
            <label>Tiêu đề:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Nội dung:</label>
            <textarea
              rows="5"
              value={content}
onChange={(e) => setContent(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Category:</label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Tags:</label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="tag1, tag2"
            />
          </div>

          <div className="form-group">
            <label>Chọn ảnh:</label>
            <input type="file" accept="image/*" onChange={handleFileChange} />
            {preview && (
              <img src={preview} alt="Preview" className="image-preview" />
            )}
          </div>

          <button onClick={handleCreate} disabled={uploading}>
            {uploading ? "Đang xử lý..." : "Đăng bài"}
          </button>
          <button
            onClick={() => setShowForm(false)}
            style={{ marginTop: "10px", backgroundColor: "#ff4757" }}
          >
            Hủy
          </button>
        </>
      ) : (
        <button onClick={() => setShowForm(true)}>
          Tạo bài viết để chia sẻ cuộc sống của bạn ❤️
        </button>
      )}
    </div>
  );
};

export default CreatePost;