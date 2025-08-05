import React, { useEffect, useState } from "react";
import axios from "axios";

const InformationEdit = () => {
  const [fullName, setFullName] = useState("");
  const [hobbies, setHobbies] = useState("");
  const [hometown, setHometown] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
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
      const info = res.data;
      setFullName(info.fullName || "");
      setHobbies(info.hobbies || "");
      setHometown(info.hometown || "");
      setBirthdate(info.birthdate ? new Date(info.birthdate).toISOString().split("T")[0] : "");
      setPhoneNumber(info.phoneNumber || "");
    } catch (err) {
      setError(err.response?.data?.error || err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdate = async () => {
    try {
      setError("");
      setSuccess("");
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Bạn chưa đăng nhập!");
        return;
      }

      const res = await axios.put("http://localhost:3000/information", {
        fullName,
        hobbies,
        hometown,
        birthdate,
        phoneNumber,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSuccess(res.data.message || "Cập nhật thông tin thành công!");
    } catch (err) {
      setError(err.response?.data?.error || err.message);
    }
  };

  if (isLoading) return <p>Đang tải thông tin...</p>;

  return (
    <div>
      <h2>Chỉnh sửa thông tin</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
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
      <button onClick={handleUpdate}>Cập nhật</button>
    </div>
  );
};

export default InformationEdit;
