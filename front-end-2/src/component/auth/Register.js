import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
    Container,
    Box,
    TextField,
    Button,
    Typography,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from "@mui/material";

function Register() {
    const navigate = useNavigate();
    const [fullName, setFullName] = useState("");
    const [address, setAddress] = useState("");
    const [gender, setGender] = useState("true");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [msg, setMsg] = useState("");

    const handleRegister = async (e) => {
        e.preventDefault();
        setMsg("");

        try {
            const response = await axios.post("http://localhost:8080/api/admin", {
                fullName,
                address,
                gender: gender === "true",
                phoneNumber,
                birthDate,
                email,
                account: {
                    userName: username,
                    password,
                    role: {
                        id: 2,
                        nameRoles: "employee",
                    },
                },
            });

            if (response.status === 200 || response.status === 201) {
                setMsg("Đăng ký thành công! Hãy đăng nhập.");
                navigate("/homelogin");
            }
        } catch (error) {
            console.error("Lỗi đăng ký:", error.response?.data || error.message);
            setMsg("Không thể đăng ký. Vui lòng thử lại!");
        }
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 5 }}>
            <Box
                sx={{
                    backgroundColor: "#f9f9f9",
                    p: 4,
                    borderRadius: 2,
                    boxShadow: 2,
                }}
            >
                <Typography variant="h4" gutterBottom>
                    Đăng ký
                </Typography>
                {msg && (
                    <Typography variant="body1" color="error" sx={{ mb: 2 }}>
                        {msg}
                    </Typography>
                )}
                <Box component="form" onSubmit={handleRegister}>
                    <TextField
                        label="Họ tên"
                        variant="outlined"
                        fullWidth
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        label="Địa chỉ"
                        variant="outlined"
                        fullWidth
                        required
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        sx={{ mb: 2 }}
                    />
                    <FormControl fullWidth sx={{ mb: 2 }}>
                        <InputLabel id="gender-label">Giới tính</InputLabel>
                        <Select
                            labelId="gender-label"
                            value={gender}
                            label="Giới tính"
                            onChange={(e) => setGender(e.target.value)}
                        >
                            <MenuItem value="true">Nam</MenuItem>
                            <MenuItem value="false">Nữ</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField
                        label="Số điện thoại"
                        variant="outlined"
                        fullWidth
                        required
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        label="Ngày sinh"
                        type="date"
                        variant="outlined"
                        fullWidth
                        required
                        value={birthDate}
                        onChange={(e) => setBirthDate(e.target.value)}
                        sx={{ mb: 2 }}
                        InputLabelProps={{ shrink: true }}
                    />
                    <TextField
                        label="Email"
                        type="email"
                        variant="outlined"
                        fullWidth
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        label="Tài khoản"
                        variant="outlined"
                        fullWidth
                        required
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        label="Mật khẩu"
                        type="password"
                        variant="outlined"
                        fullWidth
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        sx={{ mb: 2 }}
                    />
                    <Button variant="contained" type="submit" fullWidth>
                        Đăng ký
                    </Button>
                </Box>
            </Box>
        </Container>
    );
}

export default Register;
