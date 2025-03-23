import React, { useState } from "react";
import axios from "axios";
import {
    Container,
    Card,
    CardContent,
    Typography,
    TextField,
    Button,
    Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleForgotPassword = async (e) => {
        e.preventDefault();
        setMessage("");
        setLoading(true);

        try {
            // Gọi API để gửi yêu cầu reset mật khẩu
            const response = await axios.post(
                "http://localhost:8080/api/login/forgot-password",
                { email }
            );
            if (response.status === 200) {
                setMessage("Email đặt lại mật khẩu đã được gửi. Vui lòng kiểm tra hộp thư của bạn.");
                // Sau vài giây chuyển hướng về trang đăng nhập
                setTimeout(() => {
                    navigate("/homelogin");
                }, 3000);
            }
        } catch (error) {
            console.error("Lỗi khi lấy lại mật khẩu:", error);
            if (error.response && error.response.data) {
                setMessage(error.response.data.message || "Lấy lại mật khẩu thất bại!");
            } else {
                setMessage("Lấy lại mật khẩu thất bại!");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 4 }}>
            <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
                <CardContent sx={{ p: 4 }}>
                    <Typography
                        variant="h5"
                        align="center"
                        gutterBottom
                        sx={{ fontWeight: "bold", mb: 3 }}
                    >
                        Lấy lại mật khẩu
                    </Typography>
                    {message && (
                        <Typography
                            variant="body1"
                            align="center"
                            color="error"
                            sx={{ mb: 2 }}
                        >
                            {message}
                        </Typography>
                    )}
                    <Box component="form" onSubmit={handleForgotPassword} noValidate>
                        <TextField
                            label="Email"
                            type="email"
                            variant="outlined"
                            fullWidth
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            sx={{ mb: 3 }}
                        />
                        <Button
                            variant="contained"
                            type="submit"
                            fullWidth
                            disabled={loading}
                            sx={{ textTransform: "none", backgroundColor: "#E7B45A" }}
                        >
                            {loading ? "Đang xử lý..." : "Lấy lại mật khẩu"}
                        </Button>
                    </Box>
                </CardContent>
            </Card>
        </Container>
    );
}

export default ForgotPassword;
