import React, { useEffect, useState } from "react";
import axios from "axios";

const InformationView = () => {
  const [info, setInfo] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchInfo();
  }, []);

  const fetchInfo = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Bạn chưa đăng nhập!");
        setIsLoading(false);
        return;
      }
      const res = await axios.get("http://localhost:3000/information", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setInfo(res.data);
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setInfo(null);
      } else {
        setError(err.response?.data?.error || err.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <p>Đang tải thông tin...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  if (!info) {
    return (
      <div style={styles.container}>
        <h2>Chưa có thông tin người dùng</h2>
        <a href="/information/create" style={styles.link}>Tạo thông tin</a>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Thông tin người dùng</h2>
      <p><strong>Họ và tên:</strong> {info.fullName}</p>
      <p><strong>Sở thích:</strong> {info.hobbies}</p>
      <p><strong>Quê quán:</strong> {info.hometown}</p>
      <p><strong>Ngày sinh:</strong> {info.birthdate || "Chưa cập nhật"}</p>
      <p><strong>Số điện thoại:</strong> {info.phoneNumber}</p>
      <p style={styles.role}><strong>Vai trò:</strong> <span style={styles.roleText(info.role)}>{info.role}</span></p>

      <div style={styles.actions}>
        <a href="/information/edit" style={styles.button}>Chỉnh sửa</a>
        <a href="/information/delete" style={{ ...styles.button, backgroundColor: "red" }}>Xóa thông tin</a>
      </div>
    </div>
  );
};

// 🎨 CSS Styles
const styles = {
  container: {
    maxWidth: "600px",
    margin: "50px auto",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "10px",
    backgroundColor: "#f9f9f9",
    boxShadow: "2px 2px 10px rgba(0,0,0,0.1)",
    textAlign: "left",
  },
  title: {
    textAlign: "center",
    color: "#333",
  },
  role: {
    fontSize: "1.1rem",
    fontWeight: "bold",
    marginTop: "10px",
  },
  roleText: (role) => ({
    color: role === "admin" ? "red" : "green",
    fontWeight: "bold",
  }),
  actions: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "20px",
  },
  button: {
    padding: "8px 15px",
    textDecoration: "none",
    backgroundColor: "#007bff",
    color: "white",
    borderRadius: "5px",
    fontWeight: "bold",
  },
  link: {
    display: "block",
    marginTop: "10px",
    textAlign: "center",
    color: "#007bff",
    textDecoration: "none",
  },
};

export default InformationView;
