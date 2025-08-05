import axios from "axios";

export const handleAddComment = async (postId, content) => {
  if (!content.trim()) return null;

  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Token không tồn tại, vui lòng đăng nhập lại!");
    }
    console.log("Sending comment with token:", token);
    console.log("Post ID:", postId);
    console.log("Comment content:", content);

    // Gọi API POST đến backend với body { content, postId }
    const res = await axios.post(
      "http://localhost:3000/comments",
      { content, postId },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    console.log("Response from backend when adding comment:", res.data);
    // Backend trả về { message, comment: newComment }
    return res.data.comment;
  } catch (error) {
    console.error("Lỗi khi bình luận:", error.response?.data || error);
    return null;
  }
};

export const handleLike = async (postId) => {
  try {
    const token = localStorage.getItem("token");
    await axios.post(
      `http://localhost:3000/api/posts/${postId}/like`,
      {},
      { headers: { Authorization: token ? `Bearer ${token}` : "" } }
    );
    return true;
  } catch (error) {
    console.error("Lỗi khi thích bài viết:", error.response?.data || error);
    return false;
  }
};
