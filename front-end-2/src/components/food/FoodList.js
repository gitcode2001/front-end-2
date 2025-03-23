import React, { useEffect, useState } from "react";
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from "@mui/material";
import { deleteFood, getAllFoods } from "../service/FoodService";
import { getAllCategories } from "../service/FoodService";

const FoodList = ({ onEdit }) => {
    const [foods, setFoods] = useState([]);
    const [categories, setCategories] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchFoods();
        fetchCategories();
    }, []);

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

    const fetchCategories = async () => {
        try {
            const data = await getAllCategories();
            const categoryMap = {};
            data.forEach((category) => {
                categoryMap[category.id] = category.name;
            });
            setCategories(categoryMap);
        } catch (err) {
            console.error("Lỗi khi tải danh mục:", err.message);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Bạn có chắc chắn muốn xóa món ăn này không?")) {
            try {
                await deleteFood(id);
                alert("Xóa thành công!");
                fetchFoods();
            } catch (err) {
                alert("Xóa thất bại! " + err.message);
            }
        }
    };

    if (loading) return <Typography>Đang tải dữ liệu...</Typography>;
    if (error) return <Typography color="error">{error}</Typography>;

    return (
        <div>
            <Typography variant="h5" sx={{ mb: 2 }}>Danh sách món ăn</Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Tên món</TableCell>
                            <TableCell>Danh mục</TableCell>
                            <TableCell>Mô tả</TableCell>
                            <TableCell>Giá</TableCell>
                            <TableCell>Số lượng</TableCell>
                            <TableCell>Đánh giá</TableCell>
                            <TableCell>Trạng thái</TableCell>
                            <TableCell>Hành động</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {foods.length > 0 ? foods.map((food) => (
                            <TableRow key={food.id}>
                                <TableCell>{food.id}</TableCell>
                                <TableCell>{food.name}</TableCell>
                                <TableCell>{categories[food.categoryId] || "Không có"}</TableCell>
                                <TableCell>{food.description}</TableCell>
                                <TableCell>{food.price} VNĐ</TableCell>
                                <TableCell>{food.quantity}</TableCell>
                                <TableCell>{food.rating} ⭐</TableCell>
                                <TableCell>{food.status === "ACTIVE" ? "Hoạt động" : "Không hoạt động"}</TableCell>
                                <TableCell>
                                    <Button color="primary" onClick={() => onEdit(food)}>Chỉnh sửa</Button>
                                    <Button color="secondary" onClick={() => handleDelete(food.id)}>Xóa</Button>
                                </TableCell>
                            </TableRow>
                        )) : (
                            <TableRow>
                                <TableCell colSpan={9} align="center">Không có món ăn nào</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default FoodList;
