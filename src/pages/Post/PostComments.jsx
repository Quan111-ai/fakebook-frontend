import React, { useState, useEffect } from "react";
import axios from "axios";
import { TextField, Button, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, CircularProgress, Typography, Paper, Divider } from "@mui/material";
import { Edit, Delete, Send } from "@mui/icons-material";
import "./PostComments.css";

function PostComments({ postId }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingContent, setEditingContent] = useState("");
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchComments = async () => {
      if (!token) return;
      try {
        const res = await axios.get(`http://localhost:3000/comments/${postId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setComments(res.data);
      } catch (error) {
        console.error("Lỗi khi tải bình luận:", error.response?.data || error.message);
      } finally {
        setLoading(false);
      }
    };
    if (postId) fetchComments();
  }, [postId, token]);

  const handleAddComment = async () => {
    if (!newComment.trim()) return;
    try {
      const res = await axios.post(
        "http://localhost:3000/comments",
        { content: newComment, postId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setComments([...comments, res.data.comment]);
      setNewComment("");
    } catch (error) {
      console.error("Lỗi khi thêm bình luận:", error.response?.data || error.message);
    }
  };

  const startEdit = (commentId, content) => {
    setEditingId(commentId);
    setEditingContent(content);
  };

  const handleEditComment = async (commentId) => {
    if (!editingContent.trim()) return;
    try {
      const res = await axios.put(
        `http://localhost:3000/comments/${commentId}`,
        { content: editingContent },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setComments(comments.map((c) => (c._id === commentId ? res.data.comment : c)));
      setEditingId(null);
      setEditingContent("");
    } catch (error) {
      console.error("Lỗi khi cập nhật bình luận:", error.response?.data || error.message);
    }
  };

  const handleDeleteComment = async (commentId) => {
    if (!window.confirm("Bạn có chắc muốn xóa bình luận này?")) return;
    try {
      await axios.delete(`http://localhost:3000/comments/${commentId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setComments(comments.filter((c) => c._id !== commentId));
    } catch (error) {
      console.error("Lỗi khi xóa bình luận:", error.response?.data || error.message);
    }
  };

  return (
    <Paper className="post-comments" elevation={3}>
      <Typography variant="h5" gutterBottom>
        Bình luận
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : comments.length > 0 ? (
        <List>
          {comments.map((comment) => (
            <ListItem key={comment._id} divider>
              {editingId === comment._id ? (
                <TextField
                  fullWidth
                  variant="outlined"
                  value={editingContent}
                  onChange={(e) => setEditingContent(e.target.value)}
                />
              ) : (
                <ListItemText primary={comment.userId?.email || "Anonymous"} secondary={comment.content} />
              )}
              <ListItemSecondaryAction>
                {editingId === comment._id ? (
                  <>
                    <IconButton edge="end" color="primary" onClick={() => handleEditComment(comment._id)}>
                      <Send />
                    </IconButton>
                    <IconButton edge="end" color="secondary" onClick={() => setEditingId(null)}>
                      <Delete />
                    </IconButton>
                  </>
                ) : (
                  <>
                    <IconButton edge="end" color="primary" onClick={() => startEdit(comment._id, comment.content)}>
                      <Edit />
                    </IconButton>
                    <IconButton edge="end" color="secondary" onClick={() => handleDeleteComment(comment._id)}>
                      <Delete />
                    </IconButton>
                  </>
                )}
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography variant="body1" color="textSecondary">
          Chưa có bình luận nào.
        </Typography>
      )}

      <Divider style={{ margin: "20px 0" }} />

      <TextField
        fullWidth
        label="Viết bình luận..."
        variant="outlined"
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        style={{ marginBottom: "10px" }}
      />
      <Button variant="contained" color="primary" fullWidth onClick={handleAddComment} startIcon={<Send />}>
        Gửi
      </Button>
    </Paper>
  );
}

export default PostComments;
