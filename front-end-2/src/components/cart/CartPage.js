import React, { useEffect, useState } from "react";
import {
    Box,
    Button,
    CircularProgress,
    Container,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Navbar from "../../component/home/Navbar";
import Footer from "../../component/home/Footer";
import {
    getCartsByUserId,
    updateCart,
    deleteCart,
    checkoutCart,
} from "../../service/CartService";

function CartPage() {
    const [carts, setCarts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const userId = localStorage.getItem("userId");

    useEffect(() => {
        if (!userId) {
            setError("Bạn chưa đăng nhập! Vui lòng đăng nhập để xem giỏ hàng.");
            return;
        }
        fetchCart();
    }, []);

    // Gọi API lấy giỏ hàng
    const fetchCart = async () => {
        setLoading(true);
        try {
            const data = await getCartsByUserId(userId);
            setCarts(data);
            setError(""); // Xóa lỗi cũ (nếu có)
        } catch (err) {
            setError("Lỗi khi tải giỏ hàng!");
            console.error("fetchCart error:", err);
        } finally {
            setLoading(false);
        }
    };

    // Cập nhật số lượng của từng mục giỏ hàng
    const handleQuantityChange = (cartId, newQuantity) => {
        setCarts((prev) =>
            prev.map((cart) =>
                cart.id === cartId ? { ...cart, quantity: Number(newQuantity) } : cart
            )
        );
    };

    // Cập nhật mục giỏ hàng khi bấm "Cập nhật"
    const handleUpdateCart = async (cart) => {
        try {
            await updateCart(cart.id, cart);
            alert("Cập nhật giỏ hàng thành công");
            fetchCart();
        } catch (err) {
            console.error(err);
            alert("Cập nhật thất bại");
        }
    };

    // Xóa mục giỏ hàng
    const handleDeleteCart = async (cartId) => {
        if (window.confirm("Bạn có chắc chắn muốn xóa mục này?")) {
            try {
                await deleteCart(cartId);
                alert("Xóa thành công");
                fetchCart();
            } catch (err) {
                console.error(err);
                alert("Xóa thất bại");
            }
        }
    };

    // Thanh toán giỏ hàng
    const handleCheckout = async () => {
        try {
            const response = await checkoutCart(userId);
            // Ở backend, nếu thành công, có thể trả về kiểu { success: true, message: "..."}
            // Hoặc trả về chuỗi "🛒 Thanh toán giỏ hàng thành công!"
            // Tùy thuộc vào API, bạn cần kiểm tra format dữ liệu
            if (response.includes("thành công")) {
                alert("Thanh toán giỏ hàng thành công!");
                fetchCart();
            } else {
                alert(response || "Thanh toán thất bại!");
            }
        } catch (err) {
            console.error(err);
            alert("Có lỗi khi thanh toán");
        }
    };

    return (
        <div>
            <Navbar />
            <Container sx={{ mt: 4 }}>
                <Typography variant="h4" align="center" gutterBottom>
                    Giỏ Hàng
                </Typography>

                {/* Nếu chưa đăng nhập hoặc có lỗi */}
                {error && (
                    <Typography color="error" align="center" sx={{ mb: 2 }}>
                        {error}
                    </Typography>
                )}

                {/* Nếu chưa đăng nhập, không hiển thị bảng giỏ hàng */}
                {!userId ? (
                    <Box textAlign="center" sx={{ mt: 2 }}>
                        <Button
                            variant="contained"
                            onClick={() => navigate("/homelogin")}
                            sx={{ textTransform: "none" }}
                        >
                            Đăng nhập
                        </Button>
                    </Box>
                ) : loading ? (
                    // Đang tải
                    <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
                        <CircularProgress />
                    </Box>
                ) : (
                    // Bảng giỏ hàng
                    <>
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
                                    <TableRow>
                                        <TableCell>ID</TableCell>
                                        <TableCell>Tên món</TableCell>
                                        <TableCell>Số lượng</TableCell>
                                        <TableCell>Ghi chú</TableCell>
                                        <TableCell>Hành động</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {carts.length > 0 ? (
                                        carts.map((cart) => (
                                            <TableRow key={cart.id}>
                                                <TableCell>{cart.id}</TableCell>
                                                <TableCell>{cart.food?.name || "Không có"}</TableCell>
                                                <TableCell>
                                                    <TextField
                                                        type="number"
                                                        size="small"
                                                        value={cart.quantity}
                                                        onChange={(e) =>
                                                            handleQuantityChange(cart.id, e.target.value)
                                                        }
                                                        inputProps={{ min: 1 }}
                                                        sx={{ width: 70 }}
                                                    />
                                                </TableCell>
                                                <TableCell>{cart.note || "-"}</TableCell>
                                                <TableCell>
                                                    <Button
                                                        variant="contained"
                                                        color="primary"
                                                        size="small"
                                                        onClick={() => handleUpdateCart(cart)}
                                                        sx={{ mr: 1, textTransform: "none" }}
                                                    >
                                                        Cập nhật
                                                    </Button>
                                                    <Button
                                                        variant="outlined"
                                                        color="secondary"
                                                        size="small"
                                                        onClick={() => handleDeleteCart(cart.id)}
                                                        sx={{ textTransform: "none" }}
                                                    >
                                                        Xóa
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan={5} align="center">
                                                Giỏ hàng trống
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>

                        <Box sx={{ mt: 4, textAlign: "center" }}>
                            <Button
                                variant="contained"
                                color="success"
                                onClick={handleCheckout}
                                sx={{ textTransform: "none" }}
                            >
                                Thanh toán
                            </Button>
                        </Box>
                    </>
                )}
            </Container>
            <Footer />
        </div>
    );
}

export default CartPage;
