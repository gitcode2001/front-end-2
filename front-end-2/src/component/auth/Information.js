import React, { useState, useEffect } from "react";
import axios from "axios";
import {
    Container,
    Card,
    CardContent,
    Typography,
    CircularProgress,
    Box,
    Button,
    Divider,
    TextField,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

function Information() {
    const [userInfo, setUserInfo] = useState(null);
    const [editedInfo, setEditedInfo] = useState(null);
    const [errorMsg, setErrorMsg] = useState("");
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        // Lấy username từ localStorage
        const username = localStorage.getItem("username");
        if (!username) {
            setErrorMsg("Bạn chưa đăng nhập!");
            setLoading(false);
            return;
        }

        // Gọi API lấy thông tin người dùng
        axios
            .get("http://localhost:8080/api/information", { params: { username } })
            .then((res) => {
                setUserInfo(res.data);
                setEditedInfo(res.data); // khởi tạo editedInfo từ userInfo
                setLoading(false);
            })
            .catch(() => {
                setErrorMsg("Không tìm thấy thông tin người dùng!");
                setLoading(false);
            });
    }, []);

    // Hiển thị loading
    if (loading) {
        return (
            <Container
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100vh",
                }}
            >
                <CircularProgress />
            </Container>
        );
    }

    // Hiển thị lỗi
    if (errorMsg) {
        return (
            <Container sx={{ p: 3 }}>
                <Typography variant="h6" color="error">
                    {errorMsg}
                </Typography>
            </Container>
        );
    }

    // Chuyển sang trang đổi mật khẩu
    const handleChangePassword = () => {
        navigate("/change_password");
    };

    // Xử lý chuyển đổi giữa chế độ xem và chỉnh sửa
    const handleToggleEdit = () => {
        if (isEditing) {
            // Khi nhấn "Cập nhật", gọi API PUT để cập nhật thông tin
            axios
                .put(`http://localhost:8080/api/${userInfo.id}`, editedInfo)
                .then((res) => {
                    setUserInfo(res.data);
                    setEditedInfo(res.data);
                    setIsEditing(false);
                })
                .catch((error) => {
                    console.error("Lỗi cập nhật:", error);
                    setErrorMsg("Cập nhật thông tin thất bại!");
                });
        } else {
            setIsEditing(true);
        }
    };

    // Xử lý thay đổi giá trị trong form chỉnh sửa
    const handleChange = (e) => {
        setEditedInfo({ ...editedInfo, [e.target.name]: e.target.value });
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 4 }}>
            <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
                <CardContent sx={{ p: 4 }}>
                    <Typography
                        variant="h5"
                        gutterBottom
                        sx={{
                            fontWeight: "bold",
                            textAlign: "center",
                            mb: 3,
                            color: "#333",
                        }}
                    >
                        Thông tin người dùng
                    </Typography>

                    <Box sx={{ mb: 2 }}>
                        {/* Hiển thị ID (không chỉnh sửa) */}
                        <Typography variant="body1" sx={{ mb: 1 }}>
                            <strong>ID:</strong> {userInfo.id}
                        </Typography>
                        <Divider sx={{ mb: 1 }} />

                        {/* Họ tên */}
                        {isEditing ? (
                            <TextField
                                label="Họ tên"
                                name="fullName"
                                variant="outlined"
                                fullWidth
                                value={editedInfo.fullName}
                                onChange={handleChange}
                                sx={{ mb: 1 }}
                            />
                        ) : (
                            <>
                                <Typography variant="body1" sx={{ mb: 1 }}>
                                    <strong>Họ tên:</strong> {userInfo.fullName}
                                </Typography>
                                <Divider sx={{ mb: 1 }} />
                            </>
                        )}

                        {/* Email */}
                        {isEditing ? (
                            <TextField
                                label="Email"
                                name="email"
                                variant="outlined"
                                fullWidth
                                value={editedInfo.email}
                                onChange={handleChange}
                                sx={{ mb: 1 }}
                            />
                        ) : (
                            <>
                                <Typography variant="body1" sx={{ mb: 1 }}>
                                    <strong>Email:</strong> {userInfo.email}
                                </Typography>
                                <Divider sx={{ mb: 1 }} />
                            </>
                        )}

                        {/* Địa chỉ */}
                        {isEditing ? (
                            <TextField
                                label="Địa chỉ"
                                name="address"
                                variant="outlined"
                                fullWidth
                                value={editedInfo.address}
                                onChange={handleChange}
                                sx={{ mb: 1 }}
                            />
                        ) : (
                            <>
                                <Typography variant="body1" sx={{ mb: 1 }}>
                                    <strong>Địa chỉ:</strong> {userInfo.address}
                                </Typography>
                                <Divider sx={{ mb: 1 }} />
                            </>
                        )}

                        {/* Số điện thoại */}
                        {isEditing ? (
                            <TextField
                                label="Số điện thoại"
                                name="phoneNumber"
                                variant="outlined"
                                fullWidth
                                value={editedInfo.phoneNumber}
                                onChange={handleChange}
                                sx={{ mb: 1 }}
                            />
                        ) : (
                            <>
                                <Typography variant="body1" sx={{ mb: 1 }}>
                                    <strong>Số điện thoại:</strong> {userInfo.phoneNumber}
                                </Typography>
                                <Divider sx={{ mb: 1 }} />
                            </>
                        )}

                        {/* Ngày sinh */}
                        {isEditing ? (
                            <TextField
                                label="Ngày sinh"
                                name="birthDate"
                                variant="outlined"
                                fullWidth
                                value={editedInfo.birthDate}
                                onChange={handleChange}
                                sx={{ mb: 1 }}
                            />
                        ) : (
                            <Typography variant="body1">
                                <strong>Ngày sinh:</strong> {userInfo.birthDate}
                            </Typography>
                        )}
                    </Box>

                    <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
                        <Button
                            variant="contained"
                            onClick={handleToggleEdit}
                            sx={{ backgroundColor: "#E7B45A", textTransform: "none" }}
                        >
                            {isEditing ? "Cập nhật" : "Chỉnh sửa"}
                        </Button>
                        <Button
                            variant="contained"
                            onClick={handleChangePassword}
                            sx={{ backgroundColor: "#E7B45A", textTransform: "none" }}
                        >
                            Đổi mật khẩu
                        </Button>
                    </Box>
                </CardContent>
            </Card>
        </Container>
    );
}

export default Information;
