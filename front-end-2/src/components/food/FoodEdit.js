import React, { useEffect, useState } from "react";
import {
    TextField,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    CircularProgress,
    Typography
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { getFoodById, updateFood } from "../../service/FoodService";

const FoodEdit = () => {
    const [editData, setEditData] = useState({
        name: "",
        description: "",
        price: "",
        quantity: ""
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { foodId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        fetchFoodDetails();
    }, [foodId]);

    const fetchFoodDetails = async () => {
        try {
            setLoading(true);
            const data = await getFoodById(foodId);
            if (!data) throw new Error("Món ăn không tồn tại!");
            setEditData(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setEditData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSaveEdit = async () => {
        if (!editData.name.trim() || !editData.price || !editData.quantity) {
            alert("Vui lòng nhập đầy đủ thông tin!");
            return;
        }

        try {
            await updateFood(foodId, editData);
            alert("Cập nhật thành công!");
            navigate("/food");
        } catch (err) {
            alert("Cập nhật thất bại! " + err.response?.data?.message || err.message);
        }
    };

    const handleCancel = () => {
        navigate("/food");
    };

    if (loading) return <CircularProgress sx={{ display: "block", margin: "20px auto" }} />;
    if (error) return <Typography color="error">{error}</Typography>;

    return (
        <Dialog open={true} onClose={handleCancel}>
            <DialogTitle sx={{ fontWeight: "bold", color: "#1976d2" }}>Chỉnh sửa món ăn</DialogTitle>
            <DialogContent>
                <TextField
                    fullWidth
                    name="name"
                    label="Tên món"
                    value={editData.name}
                    onChange={handleChange}
                    sx={{ mt: 2 }}
                />
                <TextField
                    fullWidth
                    name="description"
                    label="Mô tả"
                    value={editData.description}
                    onChange={handleChange}
                    sx={{ mt: 2 }}
                />
                <TextField
                    fullWidth
                    name="price"
                    label="Giá"
                    type="number"
                    value={editData.price}
                    onChange={handleChange}
                    sx={{ mt: 2 }}
                />
                <TextField
                    fullWidth
                    name="quantity"
                    label="Số lượng"
                    type="number"
                    value={editData.quantity}
                    onChange={handleChange}
                    sx={{ mt: 2 }}
                />
            </DialogContent>
            <DialogActions sx={{ justifyContent: "space-between", px: 3, pb: 2 }}>
                <Button onClick={handleCancel} sx={{ backgroundColor: "#b0bec5", color: "black", "&:hover": { backgroundColor: "#90a4ae" } }}>
                    Hủy
                </Button>
                <Button onClick={handleSaveEdit} color="primary" variant="contained">
                    Lưu
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default FoodEdit;
