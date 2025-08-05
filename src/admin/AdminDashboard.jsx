import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Button
} from "@mui/material";

const AdminDashboard = () => {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("adminToken");
        if (!token) {
            navigate("/admin/login");
            return;
        }
        fetch("http://localhost:3000/api/admin/users", {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((res) => res.json())
            .then((data) => setUsers(data))
            .catch((error) => console.error("Lỗi:", error));
    }, []);

    const handleDelete = async (id) => {
        const token = localStorage.getItem("adminToken");
        if (!window.confirm("Bạn có chắc muốn xóa người dùng này?")) return;

        try {
            const response = await fetch(`http://localhost:3000/api/users/${id}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` },
            });

            if (response.ok) {
                setUsers(users.filter((user) => user._id !== id));
            } else {
                alert("Xóa thất bại!");
            }
        } catch (error) {
            console.error("Lỗi:", error);
        }
    };

    return (
        <div style={{ width: "100vw", height: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", backgroundColor: "#f4f4f4" }}>
            <Typography 
                variant="h3" 
                textAlign="center" 
                sx={{ 
                    mt: 2, 
                    fontWeight: "bold", 
                    color: "#333", 
                    fontSize: "2.5rem" 
                }}>
                Quản lý Người dùng
            </Typography>
            <TableContainer component={Paper} sx={{
                width: "95vw", 
                maxWidth: "1200px", 
                marginTop: 3, 
                borderRadius: 3, 
                boxShadow: 5, 
                backgroundColor: "white",
                padding: 2 
            }}>
                <Table sx={{ width: "100%" }}>
                    <TableHead sx={{ backgroundColor: "#1976d2" }}>
                        <TableRow>
                            <TableCell sx={{ color: "white", fontSize: "1.2rem", fontWeight: "bold" }}>ID</TableCell>
                            <TableCell sx={{ color: "white", fontSize: "1.2rem", fontWeight: "bold" }}>Email</TableCell>
                            <TableCell sx={{ color: "white", fontSize: "1.2rem", fontWeight: "bold", textAlign: "center" }}>Hành động</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow key={user._id} sx={{ 
                                "&:hover": { backgroundColor: "#f1f1f1" }, 
                                transition: "0.3s" 
                            }}>
                                <TableCell sx={{ fontSize: "1rem" }}>{user._id}</TableCell>
                                <TableCell sx={{ fontSize: "1rem" }}>{user.email}</TableCell>
                                <TableCell sx={{ textAlign: "center" }}>
                                    <Button 
                                        variant="contained" 
                                        color="secondary" 
                                        sx={{ 
                                            fontSize: "1rem", 
                                            fontWeight: "bold", 
                                            marginRight: 1 
                                        }} 
                                        onClick={() => handleDelete(user._id)}
                                    >
                                        Xóa
                                    </Button>
                                    <Button 
                                        variant="contained" 
                                        color="primary" 
                                        sx={{ fontSize: "1rem", fontWeight: "bold" }}
                                    >
                                        Sửa
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default AdminDashboard;
