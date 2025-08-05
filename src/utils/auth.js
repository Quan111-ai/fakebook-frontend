export const checkLoginStatus = () => {
  const storedUser = localStorage.getItem("user");
  const token = localStorage.getItem("token");
  console.log("checkLoginStatus - storedUser:", storedUser, "token:", token);
  
  if (storedUser && token) {
    try {
      return JSON.parse(storedUser);
    } catch (error) {
      console.error("❌ Lỗi khi parse JSON user:", error);
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      return null;
    }
  }
  
  // Nếu thiếu token hoặc storedUser thì xóa cả hai và trả về null
  localStorage.removeItem("user");
  localStorage.removeItem("token");
  return null;
};
