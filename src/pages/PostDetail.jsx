import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import PostComments from "./Post/PostComments";
import "./PostDetail.css";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CircularProgress,
  Container,
  Paper,
  Button,
  TextField,
  Snackbar,
  Alert
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";

function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false); // Trạng thái sửa bài viết
  const [editedPost, setEditedPost] = useState({});
  const [openSnackbar, setOpenSnackbar] = useState(false); // Trạng thái mở Snackbar
  const [snackbarMessage, setSnackbarMessage] = useState(""); // Nội dung thông báo
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/posts/${id}`, {
          headers: { Authorization: token ? `Bearer ${token}` : "" },
        });
        setPost(res.data.post);
        setEditedPost(res.data.post); // Lưu dữ liệu vào state để chỉnh sửa
      } catch (error) {
        console.error("Lỗi khi tải bài viết:", error.response?.data || error.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchPost();
    }
  }, [id, token]);

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleSaveEdit = async () => {
    try {
      const res = await axios.put(
        `http://localhost:3000/api/posts/${id}`,
        editedPost,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setPost(res.data.post); // Cập nhật bài viết mới vào state
      setEditing(false);
    } catch (error) {
      if (error.response && error.response.status === 403) {
        // Nếu lỗi do quyền truy cập, hiển thị thông báo
        setSnackbarMessage("Bạn không có quyền sửa bài viết này.");
        setOpenSnackbar(true);
      } else {
        console.error("Lỗi khi cập nhật bài viết:", error.response?.data || error.message);
      }
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <CircularProgress size={60} thickness={5} color="primary" />
        <Typography variant="h6" className="loading-text">
          Đang tải bài viết...
        </Typography>
      </div>
    );
  }

  if (!post) {
    return <Typography variant="h5" className="loading-text">Bài viết không tồn tại.</Typography>;
  }

  return (
    <Container maxWidth="lg" className="post-detail-container">
      <Button
        variant="contained"
        color="secondary"
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate("/")}
        style={{ marginBottom: "20px" }}
      >
        Quay lại Trang chủ
      </Button>

      <Paper elevation={6} className="post-detail">
        <Card className="post-card">
          {post.image && (
            <CardMedia
              component="img"
              className="post-image"
              image={post.image}
              alt="Ảnh bài viết"
              style={{ objectFit: "contain", maxHeight: "600px", width: "100%", backgroundColor: "#3E2723" }}
            />
          )}
          <CardContent>
            {/* Nếu đang sửa, hiển thị ô nhập; nếu không, hiển thị văn bản */}
            {editing ? (
              <TextField
                fullWidth
                variant="outlined"
                label="Tiêu đề"
                value={editedPost.title || ""}
                onChange={(e) => setEditedPost({ ...editedPost, title: e.target.value })}
                style={{ marginBottom: "10px" }}
              />
            ) : (
              <Typography variant="h3" className="post-title" gutterBottom>
                {post.title || "Chưa có tiêu đề"}
              </Typography>
            )}

            <Typography variant="body1" className="post-meta" color="textSecondary">
              Tác giả: {post.author?.email || "Chưa rõ"} | Ngày đăng: {new Date(post.createdAt).toLocaleString()}
            </Typography>

            {editing ? (
              <TextField
                fullWidth
                variant="outlined"
                label="Thể loại"
                value={editedPost.category || ""}
                onChange={(e) => setEditedPost({ ...editedPost, category: e.target.value })}
                style={{ marginBottom: "10px" }}
              />
            ) : (
              <Typography variant="body2" className="post-category">
                Thể loại: {post.category || "Chưa có thể loại"}
              </Typography>
            )}

            {editing ? (
              <TextField
                fullWidth
                variant="outlined"
                label="Nội dung"
                multiline
                rows={6}
                value={editedPost.content || ""}
                onChange={(e) => setEditedPost({ ...editedPost, content: e.target.value })}
                style={{ marginBottom: "10px" }}
              />
            ) : (
              <Typography variant="body1" className="post-content" component="p" style={{ fontSize: "1.3rem", lineHeight: "2" }}>
                {post.content || "Chưa có nội dung"}
              </Typography>
            )}

            {/* Nút sửa/chỉnh sửa bài viết (luôn hiển thị) */}
            <div style={{ marginTop: "10px" }}>
              {editing ? (
                <Button variant="contained" color="primary" startIcon={<SaveIcon />} onClick={handleSaveEdit}>
                  Lưu chỉnh sửa
                </Button>
              ) : (
                <Button variant="contained" color="secondary" startIcon={<EditIcon />} onClick={handleEditClick}>
                  Sửa bài viết
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </Paper>

      <div className="post-comments-section">
        <PostComments postId={id} />
      </div>

      {/* Snackbar thông báo lỗi quyền truy cập */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default PostDetail;
