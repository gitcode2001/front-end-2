import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, IconButton, Box } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const ImageModal = ({ open, images, selectedIndex, onClose, onPrev, onNext }) => {
    const isValidIndex = images && images.length > 0 && selectedIndex >= 0 && selectedIndex < images.length;

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
            <DialogTitle>Hình ảnh phản hồi</DialogTitle>
            <DialogContent
                sx={{
                    position: "relative",
                    textAlign: "center",
                    backgroundColor: "#000",
                }}
            >
                {isValidIndex ? (
                    <Box sx={{ position: "relative" }}>
                        <img
                            src={images[selectedIndex].url} // Đổi từ `.img` thành `.url`
                            alt={`Hình ảnh ${selectedIndex + 1}`}
                            style={{ width: "100%", height: "auto", display: "block" }}
                        />
                        {/* Điều hướng trái */}
                        <IconButton
                            onClick={onPrev}
                            sx={{
                                position: "absolute",
                                top: "50%",
                                left: 0,
                                transform: "translateY(-50%)",
                                color: "#fff",
                            }}
                        >
                            <ArrowBackIosIcon />
                        </IconButton>
                        {/* Điều hướng phải */}
                        <IconButton
                            onClick={onNext}
                            sx={{
                                position: "absolute",
                                top: "50%",
                                right: 0,
                                transform: "translateY(-50%)",
                                color: "#fff",
                            }}
                        >
                            <ArrowForwardIosIcon />
                        </IconButton>
                    </Box>
                ) : (
                    <Box sx={{ color: "#fff", textAlign: "center", padding: 2 }}>
                        Không có hình ảnh để hiển thị.
                    </Box>
                )}
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={onClose}
                    variant="contained"
                    sx={{
                        backgroundColor: "#E7B45A",
                        "&:hover": { backgroundColor: "#dba147" },
                    }}
                >
                    Đóng
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ImageModal;
