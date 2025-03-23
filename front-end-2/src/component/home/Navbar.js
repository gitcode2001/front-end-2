import React, { useState } from "react";
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    IconButton,
    Menu,
    MenuItem,
    Container,
    Box,
    TextField,
    InputAdornment,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SearchIcon from "@mui/icons-material/Search";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [search, setSearch] = useState("");
    const navigate = useNavigate();

    const token = localStorage.getItem("token");
    // Chuyển role về upper-case để so sánh nhất quán
    const role = localStorage.getItem("role")
        ? localStorage.getItem("role").toUpperCase()
        : null;

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleSearchChange = (event) => {
        setSearch(event.target.value);
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("username");
        navigate("/homelogin");
    };

    return (
        <AppBar
            position="sticky"
            sx={{ backgroundColor: "#2e3b2e", padding: "10px" }}
        >
            <Container>
                <Toolbar sx={{ justifyContent: "space-between" }}>
                    {/* Logo + Tên nhà hàng */}
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <RestaurantMenuIcon sx={{ color: "#FFD700", mr: 1 }} />
                        <Typography
                            variant="h6"
                            sx={{ fontWeight: "bold", color: "#FFD700" }}
                        >
                            Dola Restaurant
                        </Typography>
                    </Box>

                    {/* Ô tìm kiếm món ăn */}
                    <TextField
                        value={search}
                        onChange={handleSearchChange}
                        variant="outlined"
                        placeholder="Tìm món ăn..."
                        sx={{
                            mr: 2,
                            width: 300,
                            backgroundColor: "#fff",
                            borderRadius: "25px",
                            input: { padding: "5px 10px" },
                        }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                        }}
                    />

                    {/* Các nút điều hướng */}
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Button color="inherit" sx={{ mx: 1 }} onClick={() => navigate("/home")}>
                            Trang chủ
                        </Button>
                        <Button color="inherit" sx={{ mx: 1 }} onClick={() => navigate("/about")}>
                            Giới thiệu
                        </Button>
                        <Button color="inherit" sx={{ mx: 1 }} onClick={() => navigate("/foods")}>
                            Menu
                        </Button>
                        <Button color="inherit" sx={{ mx: 1 }} onClick={() => navigate("/new-dishes")}>
                            Món ăn mới nhất
                        </Button>
                        <Button color="inherit" sx={{ mx: 1 }} onClick={() => navigate("/reservation")}>
                            Đặt bàn
                        </Button>
                        <Button color="inherit" sx={{ mx: 1 }} onClick={() => navigate("/carts")}>
                            Giỏ hàng
                        </Button>
                        <Button color="inherit" sx={{ mx: 1 }} onClick={() => navigate("/order")}>
                            Xem Đơn Hàng
                        </Button>

                        {role === "ADMIN" && (
                            <>
                                <Button
                                    color="inherit"
                                    sx={{ mx: 1 }}
                                    onClick={() => navigate("/foods")}
                                >
                                    Quản lý món ăn
                                </Button>
                                <Button
                                    color="inherit"
                                    sx={{ mx: 1 }}
                                    onClick={() => navigate("/category")}
                                >
                                    Quản lý danh mục
                                </Button>
                                <Button
                                    color="inherit"
                                    sx={{ mx: 1 }}
                                    onClick={() => navigate("/order-management")}
                                >
                                    Quản lý đơn hàng
                                </Button>
                                <Button
                                    color="inherit"
                                    sx={{ mx: 1 }}
                                    onClick={() => navigate("/cart")}
                                >
                                    Giỏ hàng
                                </Button>
                                <Button
                                    color="inherit"
                                    sx={{ mx: 1 }}
                                    onClick={() => navigate("/statistics")}
                                >
                                    Thống kê
                                </Button>
                                <Button
                                    color="inherit"
                                    sx={{ mx: 1 }}
                                    onClick={() => navigate("/account-management")}
                                >
                                    Quản lý tài khoản
                                </Button>
                            </>
                        )}
                        {role === "EMPLOY" && (
                            <>
                                <Button
                                    color="inherit"
                                    sx={{ mx: 1 }}
                                    onClick={() => navigate("/employee-dashboard")}
                                >
                                    Dashboard
                                </Button>
                            </>
                        )}

                        {/* Icon tài khoản + Menu */}
                        <IconButton color="inherit" onClick={handleMenuOpen}>
                            <AccountCircleIcon />
                        </IconButton>
                        <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleMenuClose}
                        >
                            {token ? (
                                <>
                                    <MenuItem
                                        onClick={() => {
                                            handleMenuClose();
                                            navigate("/information");
                                        }}
                                    >
                                        Tài khoản
                                    </MenuItem>
                                    <MenuItem
                                        onClick={() => {
                                            handleMenuClose();
                                            handleLogout();
                                        }}
                                    >
                                        Đăng xuất
                                    </MenuItem>
                                </>
                            ) : (
                                <>
                                    <MenuItem
                                        onClick={() => {
                                            handleMenuClose();
                                            navigate("/homelogin");
                                        }}
                                    >
                                        Đăng nhập
                                    </MenuItem>
                                    <MenuItem
                                        onClick={() => {
                                            handleMenuClose();
                                            navigate("/register");
                                        }}
                                    >
                                        Đăng ký
                                    </MenuItem>
                                </>
                            )}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Navbar;
