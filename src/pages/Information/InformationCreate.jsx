import React, { useState } from "react";
import axios from "axios";
import "./InformationCreate.css"; // Import CSS mới

const InformationCreate = () => {
  const [fullName, setFullName] = useState("");
  const [hobbies, setHobbies] = useState("");
  const [hometown, setHometown] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleCreate = async () => {
    try {
      setError("");
      setSuccess("");
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Bạn chưa đăng nhập!");
        return;
      }

      const res = await axios.post(
        "http://localhost:3000/information",
        { fullName, hobbies, hometown, birthdate, phoneNumber },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSuccess(res.data.message || "Tạo thông tin thành công!");
    } catch (err) {
      setError(err.response?.data?.error || err.message);
    }
  };

  return (
    <div className="information-create-container">
      <h2>Tạo thông tin người dùng</h2>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}
      <div>
        <label>Họ và tên:</label>
        <input value={fullName} onChange={(e) => setFullName(e.target.value)} />
      </div>
      <div>
        <label>Sở thích:</label>
        <input value={hobbies} onChange={(e) => setHobbies(e.target.value)} />
      </div>
      <div>
        <label>Quê quán:</label>
        <input value={hometown} onChange={(e) => setHometown(e.target.value)} />
      </div>
      <div>
        <label>Ngày sinh:</label>
        <input type="date" value={birthdate} onChange={(e) => setBirthdate(e.target.value)} />
      </div>
      <div>
        <label>Số điện thoại:</label>
        <input value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
      </div>
      <button onClick={handleCreate}>Tạo</button>
    </div>
  );
};

export default InformationCreate;
