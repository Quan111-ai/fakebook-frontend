// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { TextField, Button, Typography, CircularProgress } from "@mui/material";
// import { useAuth}  from "D:/femont3/my-app/src/hooks/useAuth";  // Hook để lấy thông tin người dùng

// function EditPost() {
//   const { id } = useParams();
//   const [post, setPost] = useState(null);
//   const [title, setTitle] = useState("");
//   const [content, setContent] = useState("");
//   const [tags, setTags] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const { token } = useAuth(); // Hook lấy token người dùng đã đăng nhập
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchPost = async () => {
//       try {
//         const res = await axios.get(`http://localhost:3000/api/posts/${id}`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setPost(res.data.post);
//         setTitle(res.data.post.title);
//         setContent(res.data.post.content);
//         setTags(res.data.post.tags.join(", "));
//       } catch (err) {
//         setError("Không tìm thấy bài viết hoặc có lỗi khi tải bài viết.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPost();
//   }, [id, token]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.put(
//         `http://localhost:3000/api/posts/${id}`,
//         { title, content, tags },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       navigate(`/posts/${id}`);  // Sau khi sửa xong, chuyển hướng đến trang chi tiết bài viết
//     } catch (err) {
//       setError("Có lỗi xảy ra khi cập nhật bài viết.");
//     }
//   };

//   if (loading) {
//     return <CircularProgress />;
//   }

//   if (error) {
//     return <Typography color="error">{error}</Typography>;
//   }

//   return (
//     <div className="edit-post-form">
//       <Typography variant="h4">Chỉnh sửa bài viết</Typography>
//       <form onSubmit={handleSubmit}>
//         <TextField
//           label="Tiêu đề"
//           variant="outlined"
//           fullWidth
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           margin="normal"
//         />
//         <TextField
//           label="Nội dung"
//           variant="outlined"
//           fullWidth
//           multiline
//           rows={4}
//           value={content}
//           onChange={(e) => setContent(e.target.value)}
//           margin="normal"
//         />
//         <TextField
//           label="Tags (cách nhau bởi dấu phẩy)"
//           variant="outlined"
//           fullWidth
//           value={tags}
//           onChange={(e) => setTags(e.target.value)}
//           margin="normal"
//         />
//         <Button type="submit" variant="contained" color="primary">
//           Cập nhật bài viết
//         </Button>
//       </form>
//     </div>
//   );
// }

// export default EditPost;
