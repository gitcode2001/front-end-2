import React, { useState, useEffect } from "react";
import { TextField, Button, Box, MenuItem, Select, FormControl, InputLabel, RadioGroup, FormControlLabel, Radio } from "@mui/material";
import { createFood } from "../service/FoodService";
import { getAllCategories } from "../service/FoodService";

const FoodForm = ({ onFoodAdded }) => {
    const [food, setFood] = useState({
        name: "",
        categoryId: "",
        description: "",
        price: "",
        quantity: "",
        rating: "0",
        status: "ACTIVE",
    });

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const data = await getAllCategories();
            setCategories(data);
        } catch (error) {
            console.error("Lỗi khi tải danh mục:", error.message);
        }
    };

    const handleChange = (e) => {
        setFood({ ...food, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!food.categoryId) {
            alert("Vui lòng chọn danh mục!");
            return;
        }
        const newFood = await createFood(food);
        if (newFood) {
            alert("Thêm món ăn thành công!");
            setFood({
                name: "",
                categoryId: "",
                description: "",
                price: "",
                quantity: "",
                rating: "0",
                status: "ACTIVE",
            });
            onFoodAdded(); // Load lại danh sách
        } else {
            alert("Thêm món ăn thất bại!");
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2, width: "350px" }}>
            <TextField name="name" label="Tên món ăn" value={food.name} onChange={handleChange} required />

            <FormControl required>
                <InputLabel>Danh mục</InputLabel>
                <Select name="categoryId" value={food.categoryId} onChange={handleChange}>
                    {categories.map((category) => (
                        <MenuItem key={category.id} value={category.id}>
                            {category.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <TextField name="description" label="Mô tả" multiline rows={3} value={food.description} onChange={handleChange} required />
            <TextField name="price" label="Giá" type="number" value={food.price} onChange={handleChange} required />
            <TextField name="quantity" label="Số lượng" type="number" value={food.quantity} onChange={handleChange} required />
            <TextField name="rating" label="Đánh giá (0-5)" type="number" value={food.rating} onChange={handleChange} inputProps={{ min: 0, max: 5, step: 0.1 }} />

            <FormControl>
                <InputLabel>Trạng thái</InputLabel>
                <RadioGroup row name="status" value={food.status} onChange={handleChange}>
                    <FormControlLabel value="ACTIVE" control={<Radio />} label="Hoạt động" />
                    <FormControlLabel value="INACTIVE" control={<Radio />} label="Không hoạt động" />
                </RadioGroup>
            </FormControl>

            <Button type="submit" variant="contained" color="primary">Thêm món ăn</Button>
        </Box>
    );
};

export default FoodForm;
