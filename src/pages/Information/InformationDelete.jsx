import React, { useEffect, useState } from "react";
import axios from "axios";



const InformationDelete = () => {
  const [info, setInfo] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
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
      setError(err.response?.data?.error || err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      setError("");
      setSuccess("");
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Bạn chưa đăng nhập!");
        return;
      }
      const res = await axios.delete("http://localhost:3000/information", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSuccess(res.data.message || "Xóa thông tin thành công!");
      setInfo(null);
    } catch (err) {
      setError(err.response?.data?.error || err.message);
    }
  };

  if (isLoading) return <p>Đang tải thông tin...</p>;

  if (!info && !error) {
    return <p>Không có thông tin để xóa.</p>;
  }

  return (
    <div>
      <h2>Xóa thông tin</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}

      {info && (
        <div>
          <p>Bạn có chắc muốn xóa thông tin của mình không?</p>
          <button onClick={handleDelete}>Xác nhận xóa</button>
        </div>
      )}
    </div>
  );
};

export default InformationDelete;
