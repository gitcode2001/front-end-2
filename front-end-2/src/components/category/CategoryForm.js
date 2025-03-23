import React, { useState, useEffect } from "react";
import { TextField, Button, Box } from "@mui/material";
import { createCategory, updateCategory, getCategoryById } from "../../service/FoodService";

const CategoryForm = ({ categoryId, onCategorySaved }) => {
    const [category, setCategory] = useState({ name: "" });

    useEffect(() => {
        if (categoryId) {
            loadCategory(categoryId);
        }
    }, [categoryId]);

    const loadCategory = async (id) => {
        const data = await getCategoryById(id);
        if (data) setCategory(data);
    };

    const handleChange = (e) => {
        setCategory({ ...category, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (categoryId) {
            await updateCategory(categoryId, category);
            alert("Cập nhật danh mục thành công!");
        } else {
            await createCategory(category);
            alert("Thêm danh mục thành công!");
        }
        setCategory({ name: "" });
        onCategorySaved();
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2, width: "300px" }}>
            <TextField name="name" label="Tên danh mục" value={category.name} onChange={handleChange} required />
            <Button type="submit" variant="contained" color="primary">
                {categoryId ? "Cập nhật" : "Thêm danh mục"}
            </Button>
        </Box>
    );
};

export default CategoryForm;
