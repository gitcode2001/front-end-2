import React, { useEffect, useState } from "react";
import {
    Container, Typography, Table, TableHead, TableBody, TableRow, TableCell, Paper,
    Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, CircularProgress,
    Box, TablePagination, FormControl, InputLabel, Select, MenuItem
} from "@mui/material";
import { getAllOrders, createOrder, updateOrder, deleteOrder } from "../../service/OrderService";
import Navbar from "../../component/home/Navbar";
import Footer from "../../component/home/Footer";

const OrderManagement = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [openDialog, setOpenDialog] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        totalPrice: "",
        status: "PENDING",
        paymentMethod: "CASH"
    });

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            setLoading(true);
            const data = await getAllOrders();
            setOrders(data);
        } catch (err) {
            setError("Lỗi khi tải danh sách đơn hàng.");
        } finally {
            setLoading(false);
        }
    };

    const handleOpenDialog = (order = null) => {
        if (order) {
            setSelectedOrder(order);
            setFormData({
                name: order.user?.name || "",
                email: order.user?.email || "",
                totalPrice: order.totalPrice,
                status: order.status,
                paymentMethod: order.paymentMethod
            });
            setIsEditing(true);
        } else {
            setFormData({
                name: "", email: "", totalPrice: "", status: "PENDING", paymentMethod: "CASH"
            });
            setIsEditing(false);
            setSelectedOrder(null);
        }
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setSelectedOrder(null);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSave = async () => {
        try {
            if (isEditing && selectedOrder) {
                await updateOrder(selectedOrder.id, formData);
                alert("Cập nhật đơn hàng thành công!");
            } else {
                await createOrder(formData);
                alert("Tạo đơn hàng thành công!");
            }
            fetchOrders();
            handleCloseDialog();
        } catch (err) {
            alert("Có lỗi xảy ra khi lưu đơn hàng.");
        }
    };

    const handleDelete = async (orderId) => {
        if (window.confirm("Bạn có chắc chắn muốn xóa đơn hàng này?")) {
            try {
                await deleteOrder(orderId);
                alert("Xóa đơn hàng thành công!");
                fetchOrders();
            } catch (err) {
                alert("Lỗi khi xóa đơn hàng.");
            }
        }
    };

    const paginatedOrders = orders.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
    const handleChangePage = (event, newPage) => setPage(newPage);
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <div>
            <Navbar />
            <Container sx={{ mt: 4, mb: 4 }}>
                <Typography variant="h4" align="center" gutterBottom>Quản lý đơn hàng</Typography>
                <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
                    <Button variant="contained" color="primary" onClick={() => handleOpenDialog()}>Tạo đơn hàng mới</Button>
                </Box>
                {loading ? (
                    <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}><CircularProgress /></Box>
                ) : error ? (
                    <Typography color="error" align="center">{error}</Typography>
                ) : (
                    <Paper>
                        <Table>
                            <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
                                <TableRow>
                                    <TableCell>ID</TableCell>
                                    <TableCell>Tên</TableCell>
                                    <TableCell>Email</TableCell>
                                    <TableCell>Tổng tiền</TableCell>
                                    <TableCell>Trạng thái</TableCell>
                                    <TableCell>Thanh toán</TableCell>
                                    <TableCell>Ngày tạo</TableCell>
                                    <TableCell>Hành động</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {paginatedOrders.map((order) => (
                                    <TableRow key={order.id}>
                                        <TableCell>{order.id}</TableCell>
                                        <TableCell>{order.user?.name || "N/A"}</TableCell>
                                        <TableCell>{order.user?.email || "N/A"}</TableCell>
                                        <TableCell>{order.totalPrice.toLocaleString()} VNĐ</TableCell>
                                        <TableCell>{order.status}</TableCell>
                                        <TableCell>{order.paymentMethod}</TableCell>
                                        <TableCell>{new Date(order.createdAt).toLocaleString()}</TableCell>
                                        <TableCell>
                                            <Button variant="outlined" size="small" onClick={() => handleOpenDialog(order)}>Sửa</Button>&nbsp;
                                            <Button variant="outlined" size="small" color="error" onClick={() => handleDelete(order.id)}>Xóa</Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        <TablePagination component="div" count={orders.length} page={page} onPageChange={handleChangePage} rowsPerPage={rowsPerPage} onRowsPerPageChange={handleChangeRowsPerPage} rowsPerPageOptions={[5, 10, 25]} />
                    </Paper>
                )}
            </Container>
            <Footer />
        </div>
    );
};

export default OrderManagement;
