import React, { useEffect, useState } from "react";
import {
    Box,
    Button,
    Card,
    CardContent,
    Container,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";
import CategoryForm from "./CategoryForm";
import { deleteCategory, getAllCategories } from "../../service/FoodService";
import { useNavigate } from "react-router-dom";

const CategoryList = () => {
    const [categories, setCategories] = useState([]);
    const [selectedCategoryId, setSelectedCategoryId] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const data = await getAllCategories();
            setCategories(data);
        } catch (error) {
            console.error("Lỗi khi tải danh mục:", error);
            alert("Không thể tải danh mục!");
        }
    };

    const handleEdit = (id) => {
        setSelectedCategoryId(id);
    };

    const handleDelete = async (id) => {
        if (window.confirm("Bạn có chắc chắn muốn xóa danh mục này không?")) {
            try {
                await deleteCategory(id);
                alert("Xóa thành công!");
                fetchCategories();
            } catch (error) {
                console.error("Lỗi khi xóa danh mục:", error);
                alert("Xóa thất bại!");
            }
        }
    };

    const handleBackHome = () => {
        navigate("/home");
    };

    return (
        <Container maxWidth="md" sx={{ mt: 4 }}>
            <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
                <CardContent sx={{ p: 4 }}>
                    <Typography variant="h4" align="center" gutterBottom sx={{ mb: 3 }}>
                        Quản lý danh mục
                    </Typography>

                    {/* Form thêm/sửa danh mục */}
                    <Box sx={{ mb: 4 }}>
                        <CategoryForm categoryId={selectedCategoryId} onCategorySaved={fetchCategories} />
                    </Box>

                    <TableContainer component={Paper} elevation={2}>
                        <Table>
                            <TableHead>
                                <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                                    <TableCell sx={{ fontWeight: "bold" }}>ID</TableCell>
                                    <TableCell sx={{ fontWeight: "bold" }}>Tên danh mục</TableCell>
                                    <TableCell sx={{ fontWeight: "bold" }} align="center">
                                        Hành động
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {categories.length > 0 ? (
                                    categories.map((category) => (
                                        <TableRow key={category.id}>
                                            <TableCell>{category.id}</TableCell>
                                            <TableCell>{category.name}</TableCell>
                                            <TableCell align="center">
                                                <Button
                                                    variant="contained"
                                                    size="small"
                                                    color="primary"
                                                    onClick={() => handleEdit(category.id)}
                                                    sx={{ mr: 1 }}
                                                >
                                                    Sửa
                                                </Button>
                                                <Button
                                                    variant="outlined"
                                                    size="small"
                                                    color="secondary"
                                                    onClick={() => handleDelete(category.id)}
                                                >
                                                    Xóa
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={3} align="center">
                                            Không có danh mục nào
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    {/* Nút quay về trang chủ */}
                    <Box sx={{ mt: 4, textAlign: "center" }}>
                        <Button variant="contained" color="primary" onClick={handleBackHome} sx={{ textTransform: "none" }}>
                            Quay về trang chủ
                        </Button>
                    </Box>
                </CardContent>
            </Card>
        </Container>
    );
};

export default CategoryList;
