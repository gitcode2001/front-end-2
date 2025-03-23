import React, { useEffect, useState } from "react";
import {
    Box,
    Button,
    CircularProgress,
    Container,
    Grid,
    List,
    ListItem,
    ListItemText,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    Chip,
    TextField,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { getAllFoods, getAllCategories } from "../../service/FoodService";
import { createCart } from "../../service/CartService"; // Sửa lại import addToCart
import Navbar from "../../component/home/Navbar";
import Footer from "../../component/home/Footer";

const FoodList = () => {
    const [foods, setFoods] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategoryId, setSelectedCategoryId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const navigate = useNavigate();
    // Chuyển role về in hoa để so sánh
    const role = (localStorage.getItem("role") || "").toUpperCase();

    useEffect(() => {
        fetchFoods();
        fetchCategories();
    }, []);

    // Lấy danh sách món ăn
    const fetchFoods = async () => {
        try {
            setLoading(true);
            const data = await getAllFoods();
            setFoods(data);
        } catch (err) {
            setError("Lỗi khi tải danh sách món ăn!");
        } finally {
            setLoading(false);
        }
    };

    // Lấy danh mục
    const fetchCategories = async () => {
        try {
            const data = await getAllCategories();
            setCategories(data);
        } catch (err) {
            console.error("Lỗi khi tải danh mục!", err);
        }
    };

    // Chọn danh mục
    const handleCategoryClick = (category) => {
        setSelectedCategoryId(category ? category.id : null);
    };

    // Thêm món vào giỏ hàng (dành cho user/employee)
    const handleAddToCart = async (food) => {
        const userId = localStorage.getItem("userId");
        if (!userId) {
            alert("⚠ Bạn cần đăng nhập để thêm vào giỏ hàng!");
            return;
        }
        try {
            await createCart(userId, food.id, 1, "");
            alert(`🛒 Đã thêm "${food.name}" vào giỏ hàng!`);
        } catch (err) {
            console.error("❌ Lỗi khi thêm vào giỏ hàng:", err);
            alert("❌ Không thể thêm vào giỏ hàng! Kiểm tra console để biết chi tiết.");
        }
    };

    // Sửa món (dành cho admin)
    const handleEdit = (foodId) => {
        navigate(`/food/edit/${foodId}`);
    };

    // Xóa món (dành cho admin)
    const handleDelete = async (foodId) => {
        if (window.confirm("Bạn có chắc chắn muốn xóa món ăn này không?")) {
            try {
                // Gọi API xóa món, ví dụ: await deleteFood(foodId);
                alert("Xóa thành công!");
                fetchFoods();
            } catch (error) {
                console.error("Lỗi khi xóa món ăn:", error);
                alert("Xóa thất bại!");
            }
        }
    };

    return (
        <div>
            <Navbar />
            <Container sx={{ mt: 2 }}>
                <Typography variant="h5" sx={{ mb: 2, textAlign: "center" }}>
                    🍽 Danh sách món ăn
                </Typography>

                <Grid container spacing={3}>
                    {/* Cột trái (Danh mục món ăn) */}
                    <Grid item xs={12} md={2}>
                        <Paper sx={{ p: 2 }}>
                            <Typography variant="h6" sx={{ textAlign: "center", mb: 2 }}>
                                📂 Danh mục
                            </Typography>
                            <List>
                                <ListItem
                                    button
                                    selected={!selectedCategoryId}
                                    onClick={() => handleCategoryClick(null)}
                                >
                                    <ListItemText primary="Tất cả món ăn" />
                                </ListItem>
                                {categories.map((category) => (
                                    <ListItem
                                        button
                                        key={category.id}
                                        selected={selectedCategoryId === category.id}
                                        onClick={() => handleCategoryClick(category)}
                                    >
                                        <ListItemText primary={category.name} />
                                    </ListItem>
                                ))}
                            </List>
                        </Paper>
                    </Grid>

                    {/* Cột phải (Danh sách món ăn) */}
                    <Grid item xs={12} md={10}>
                        <Paper sx={{ p: 2 }}>
                            {loading ? (
                                <Box sx={{ display: "flex", justifyContent: "center" }}>
                                    <CircularProgress />
                                </Box>
                            ) : error ? (
                                <Typography color="error" textAlign="center">
                                    {error}
                                </Typography>
                            ) : (
                                <TableContainer
                                    component={Paper}
                                    sx={{ height: 500, maxHeight: 500, overflowY: "auto" }}
                                >
                                    <Table>
                                        <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
                                            <TableRow>
                                                <TableCell>Hình ảnh</TableCell>
                                                <TableCell>Tên món</TableCell>
                                                <TableCell>Danh mục</TableCell>
                                                <TableCell>Giá</TableCell>
                                                <TableCell>Trạng thái</TableCell>
                                                <TableCell>Hành động</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {foods
                                                .filter(
                                                    (food) =>
                                                        !selectedCategoryId ||
                                                        food.category?.id === selectedCategoryId
                                                )
                                                .map((food) => (
                                                    <TableRow key={food.id}>
                                                        <TableCell>
                                                            <img
                                                                src={
                                                                    food.imageUrl ||
                                                                    "https://via.placeholder.com/80"
                                                                }
                                                                alt={food.name}
                                                                width="80"
                                                                height="80"
                                                                style={{
                                                                    objectFit: "contain",
                                                                    borderRadius: "5px",
                                                                }}
                                                            />
                                                        </TableCell>
                                                        <TableCell>{food.name}</TableCell>
                                                        <TableCell>
                                                            {food.category
                                                                ? food.category.name
                                                                : "Không có"}
                                                        </TableCell>
                                                        <TableCell>
                                                            {food.price?.toLocaleString()} VNĐ
                                                        </TableCell>
                                                        <TableCell>
                                                            <Chip
                                                                label={
                                                                    food.status === "ACTIVE"
                                                                        ? "Còn Món"
                                                                        : "Hết Hàng"
                                                                }
                                                                color={
                                                                    food.status === "ACTIVE"
                                                                        ? "success"
                                                                        : "error"
                                                                }
                                                            />
                                                        </TableCell>
                                                        <TableCell>
                                                            {role === "ADMIN" ? (
                                                                <>
                                                                    <Button
                                                                        variant="contained"
                                                                        color="primary"
                                                                        size="small"
                                                                        onClick={() => handleEdit(food.id)}
                                                                        sx={{ mr: 1 }}
                                                                    >
                                                                        Sửa
                                                                    </Button>
                                                                    <Button
                                                                        variant="outlined"
                                                                        color="secondary"
                                                                        size="small"
                                                                        onClick={() => handleDelete(food.id)}
                                                                    >
                                                                        Xóa
                                                                    </Button>
                                                                </>
                                                            ) : (
                                                                <Button
                                                                    variant="contained"
                                                                    color="success"
                                                                    size="small"
                                                                    startIcon={<AddShoppingCartIcon />}
                                                                    onClick={() => handleAddToCart(food)}
                                                                >
                                                                    Thêm vào giỏ hàng
                                                                </Button>
                                                            )}
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            )}
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
            <Footer />
        </div>
    );
};

export default FoodList;
