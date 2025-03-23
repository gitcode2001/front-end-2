import React, { useState, useEffect } from "react";
import {
    TextField, Button, Box, MenuItem, Select, FormControl,
    InputLabel, RadioGroup, FormControlLabel, Radio, Grid, Typography
} from "@mui/material";
import { createFood, getAllCategories } from "../../service/FoodService";
import { uploadImageAndGetUrl } from "../../service/CloudinaryService";
import { useNavigate } from "react-router-dom";

const FoodForm = () => {
    const navigate = useNavigate();

    const [food, setFood] = useState({
        name: "",
        description: "",
        price: "",
        quantity: "",
        rating: "0",
        status: "ACTIVE",
        categoryId: "",
        imageUrl: ""
    });

    const [categories, setCategories] = useState([]);
    const [imageFile, setImageFile] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);

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
        const { name, value } = e.target;
        setFood((prevFood) => ({
            ...prevFood,
            [name]: value
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            // Tạo preview cho hình ảnh
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!food.categoryId) {
            alert("Vui lòng chọn danh mục!");
            return;
        }

        let imageUrl = food.imageUrl;
        if (imageFile) {
            try {
                imageUrl = await uploadImageAndGetUrl(imageFile, { width: 500, height: 500, crop: "fill" });
            } catch (error) {
                alert("Tải ảnh thất bại! " + error.message);
                return;
            }
        }

        const foodData = {
            name: food.name,
            description: food.description,
            price: parseFloat(food.price),
            quantity: parseInt(food.quantity),
            rating: parseFloat(food.rating),
            status: food.status,
            category: { id: Number(food.categoryId) },
            imageUrl
        };

        console.log("Dữ liệu gửi đến API:", foodData);

        try {
            await createFood(foodData);
            alert("Thêm món ăn thành công!");
            navigate("/foods");
        } catch (error) {
            alert("Thêm món ăn thất bại! " + error.message);
        }
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
                maxWidth: "600px",
                margin: "auto",
                padding: "20px",
                backgroundColor: "#f9f9f9",
                borderRadius: "10px",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)"
            }}
        >
            <Typography variant="h5" align="center" gutterBottom>
                Thêm Món Ăn
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <TextField
                        fullWidth
                        name="name"
                        label="Tên món ăn"
                        value={food.name}
                        onChange={handleChange}
                        required
                    />
                </Grid>
                <Grid item xs={6}>
                    <FormControl fullWidth required>
                        <InputLabel>Danh mục</InputLabel>
                        <Select
                            name="categoryId"
                            value={food.categoryId}
                            onChange={handleChange}
                        >
                            <MenuItem value="" disabled>
                                Chọn danh mục
                            </MenuItem>
                            {categories.map((category) => (
                                <MenuItem key={category.id} value={category.id.toString()}>
                                    {category.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        name="description"
                        label="Mô tả"
                        multiline
                        rows={3}
                        value={food.description}
                        onChange={handleChange}
                        required
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        fullWidth
                        name="price"
                        label="Giá"
                        type="number"
                        value={food.price}
                        onChange={handleChange}
                        required
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        fullWidth
                        name="quantity"
                        label="Số lượng"
                        type="number"
                        value={food.quantity}
                        onChange={handleChange}
                        required
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        fullWidth
                        name="rating"
                        label="Đánh giá (0-5)"
                        type="number"
                        value={food.rating}
                        onChange={handleChange}
                        inputProps={{ min: 0, max: 5, step: 0.1 }}
                    />
                </Grid>
                <Grid item xs={6}>
                    <FormControl fullWidth>
                        <RadioGroup
                            row
                            name="status"
                            value={food.status}
                            onChange={handleChange}
                        >
                            <FormControlLabel
                                value="ACTIVE"
                                control={<Radio />}
                                label="Còn Hàng"
                            />
                            <FormControlLabel
                                value="INACTIVE"
                                control={<Radio />}
                                label="Hết Hàng "
                            />
                        </RadioGroup>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <Button
                        fullWidth
                        variant="contained"
                        component="label"
                    >
                        Chọn ảnh
                        <input
                            type="file"
                            accept="image/*"
                            hidden
                            onChange={handleImageChange}
                        />
                    </Button>
                </Grid>
                {previewImage && (
                    <Grid item xs={12}>
                        <Box mt={2} display="flex" justifyContent="center">
                            <img
                                src={previewImage}
                                alt="Preview"
                                style={{ maxWidth: "100%", maxHeight: "300px" }}
                            />
                        </Box>
                    </Grid>
                )}
                <Grid item xs={12}>
                    <Button
                        fullWidth
                        type="submit"
                        variant="contained"
                        color="primary"
                        sx={{ borderRadius: "20px" }}
                    >
                        Thêm món ăn
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
};

export default FoodForm;
