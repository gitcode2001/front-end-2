import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    Container,
    Typography,
    Box,
    TextField,
    Button,
    InputAdornment
} from "@mui/material";
import { AccountCircle, Lock } from "@mui/icons-material";
import axios from "axios";

function Home() {
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({ username: "", password: "" });
    const [errorMsg, setErrorMsg] = useState("");
    // Lấy token từ localStorage
    const token = localStorage.getItem("token");

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setErrorMsg("");
        try {
            const response = await axios.post("http://localhost:8080/api/login", {
                username: credentials.username,
                password: credentials.password,
            });
            if (response.data.success) {
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("role", response.data.role);
                localStorage.setItem("username", response.data.username);
                navigate("/home");
            } else {
                setErrorMsg(response.data.message || "Đăng nhập thất bại!");
            }
        } catch (error) {
            console.error("Lỗi đăng nhập:", error);
            setErrorMsg("Lỗi kết nối server hoặc thông tin đăng nhập sai!");
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("username");
        navigate("/home");
    };

    return token ? (
        <Container sx={{ mt: 4 }}>
            <Typography variant="h4" gutterBottom>
                Trang chủ
            </Typography>
            <Typography variant="body1" gutterBottom>
                Chào mừng, {localStorage.getItem("username")}!
            </Typography>
            <Typography variant="body1" gutterBottom>
                Bạn đã đăng nhập thành công.
            </Typography>
            <Box sx={{ mt: 2 }}>
                <Link to="/information" style={{ marginRight: 10, textDecoration: "none" }}>
                    <Typography variant="button" sx={{ color: "#1976d2" }}>
                        Thông tin tài khoản
                    </Typography>
                </Link>
                <Button variant="contained" color="error" onClick={handleLogout}>
                    Đăng xuất
                </Button>
            </Box>
        </Container>
    ) : (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                background: "linear-gradient(to right, #ff758c, #ff7eb3, #57c1eb, #4685eb)",
            }}
        >
            <Box
                sx={{
                    width: 400,
                    p: 4,
                    borderRadius: 3,
                    boxShadow: 5,
                    textAlign: "center",
                    background: "#1E1E1E",
                    color: "#FF8A80",
                }}
            >
                <Typography variant="h5" fontWeight="bold" mb={2}>
                    Member Login
                </Typography>
                <Typography fontSize="14px" mb={3}>
                    Please enter your account details
                </Typography>
                {errorMsg && (
                    <Typography fontSize="14px" mb={2} color="error">
                        {errorMsg}
                    </Typography>
                )}
                <Box component="form" onSubmit={handleLogin}>
                    <TextField
                        fullWidth
                        name="username"
                        label="Username"
                        variant="outlined"
                        margin="normal"
                        value={credentials.username}
                        onChange={handleChange}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <AccountCircle sx={{ color: "#FF8A80" }} />
                                </InputAdornment>
                            ),
                        }}
                        sx={{
                            backgroundColor: "#2E2E2E",
                            borderRadius: 1,
                            "& .MuiInputBase-input": { color: "#fff" },
                            "& .MuiInputLabel-root": { color: "#fff" },
                        }}
                    />

                    <TextField
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        variant="outlined"
                        margin="normal"
                        value={credentials.password}
                        onChange={handleChange}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Lock sx={{ color: "#FF8A80" }} />
                                </InputAdornment>
                            ),
                        }}
                        sx={{
                            backgroundColor: "#2E2E2E",
                            borderRadius: 1,
                            "& .MuiInputBase-input": { color: "#fff" },
                            "& .MuiInputLabel-root": { color: "#fff" },
                        }}
                    />

                    <Button
                        fullWidth
                        variant="contained"
                        type="submit"
                        sx={{
                            mt: 2,
                            py: 1.5,
                            fontWeight: "bold",
                            borderRadius: 2,
                            background: "linear-gradient(to right, #FF8A80, #57C1EB)",
                            color: "#fff",
                            textTransform: "none",
                            ":hover": { opacity: 0.9 },
                        }}
                    >
                        Login
                    </Button>
                </Box>
                <Typography
                    fontSize="12px"
                    mt={2}
                    sx={{ cursor: "pointer", textAlign: "center", color: "#FF8A80" }}
                    onClick={() => navigate("/Register")}
                >
                    Don't have an account? Sign up
                </Typography>
            </Box>
        </Box>
    );
}

export default Home;
