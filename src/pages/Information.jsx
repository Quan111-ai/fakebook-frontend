import React, { useState } from "react";
import { Link } from "react-router-dom";
import InformationView from "./Information/InformationView";
import InformationCreate from "./Information/InformationCreate";
import InformationEdit from "./Information/InformationEdit";
import InformationDelete from "./Information/InformationDelete";
import "./Information.css";

const Information = () => {
  // Các chế độ: "view", "create", "edit", "delete"
  const [mode, setMode] = useState("view");

  return (
    <div className="information-container">
      <h1>Quản lý Thông tin người dùng</h1>
      <nav className="information-nav">
        <button
          className={mode === "view" ? "active" : ""}
          onClick={() => setMode("view")}
        >
          Xem thông tin
        </button>
        <button
          className={mode === "create" ? "active" : ""}
          onClick={() => setMode("create")}
        >
          Tạo mới
        </button>
        <button
          className={mode === "edit" ? "active" : ""}
          onClick={() => setMode("edit")}
        >
          Chỉnh sửa
        </button>
        <button
          className={mode === "delete" ? "active" : ""}
          onClick={() => setMode("delete")}
        >
          Xóa thông tin
        </button>
      </nav>
      <div className="information-content">
        {mode === "view" && <InformationView />}
        {mode === "create" && <InformationCreate />}
        {mode === "edit" && <InformationEdit />}
        {mode === "delete" && <InformationDelete />}
      </div>
      <div className="information-back">
        <Link to="/">← Quay lại trang chủ</Link>
      </div>
    </div>
  );
};

export default Information;
