const API_URL = "http://localhost:3000/api/posts"; // Điều chỉnh nếu cần

export const fetchPosts = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    console.error("Token không tồn tại. Vui lòng đăng nhập lại.");
    throw new Error("Token không tồn tại.");
  }

  const response = await fetch(API_URL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    console.error("Không thể lấy bài viết. Mã lỗi:", response.status);
    throw new Error("Không thể lấy bài viết!");
  }
  return response.json();
};

export const createPost = async (postData) => {
  // Nếu postData không có trường "content", chuyển trường "description" thành "content"
  const payload = {
    ...postData,
    content: postData.content || postData.description || "",
  };

  // Kiểm tra nếu tiêu đề hoặc nội dung rỗng thì không gửi request
  if (!payload.title.trim() || !payload.content.trim()) {
    console.error("Tiêu đề và nội dung không được để trống!");
    throw new Error("Tiêu đề và nội dung không được để trống!");
  }

  try {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Token không tồn tại. Vui lòng đăng nhập lại.");
      throw new Error("Token không tồn tại.");
    }
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });
    if (!response.ok) {
      console.error("Lỗi khi đăng bài. Mã lỗi:", response.status);
      throw new Error("Lỗi khi đăng bài!");
    }
    return response.json();
  } catch (error) {
    console.error("Lỗi khi đăng bài:", error);
    return null;
  }
};
