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

function ChangePassword() {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleChangePassword = async (e) => {
        e.preventDefault();
        setMessage("");

        try {
            // Lấy token để xác thực
            const token = localStorage.getItem("token");
            const response = await axios.put(
                "http://localhost:8080/api/login/change-password",
                { oldPassword, newPassword },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            if (response.status === 200) {
                setMessage("Đổi mật khẩu thành công!");
            }
        } catch (error) {
            console.error("Lỗi đổi mật khẩu:", error);
            if (error.response && error.response.data) {
                setMessage(error.response.data);
            } else {
                setMessage("Đổi mật khẩu thất bại!");
            }
        }
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 4 }}>
            <Card sx={{ boxShadow: 3 }}>
                <CardContent>
                    <Typography variant="h5" gutterBottom align="center">
                        Đổi mật khẩu
                    </Typography>
                    {message && (
                        <Typography variant="body1" color="error" align="center" sx={{ mb: 2 }}>
                            {message}
                        </Typography>
                    )}
                    <Box component="form" onSubmit={handleChangePassword} noValidate>
                        <TextField
                            label="Mật khẩu cũ"
                            type="password"
                            variant="outlined"
                            fullWidth
                            required
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            label="Mật khẩu mới"
                            type="password"
                            variant="outlined"
                            fullWidth
                            required
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            sx={{ mb: 3 }}
                        />
                        <Button variant="contained" type="submit" fullWidth sx={{ backgroundColor: "#E7B45A" }}>
                            Đổi mật khẩu
                        </Button>
                    </Box>
                </CardContent>
            </Card>
        </Container>
    );
}

export default ChangePassword;
