import React, { useState, useEffect } from "react";
import { Container, Typography, Box, Grid, Button } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// Import các thành phần riêng
import Navbar from "./Navbar";
import Footer from "./Footer";
import { getAllFoods } from "../../service/FoodService"; // Đường dẫn tùy thuộc vào cấu trúc dự án

// Màu sắc chủ đạo
const themeColors = {
    primary: "#F9FAFB",
    secondary: "#F59E0B",
    background: "#1F2937",
    textPrimary: "#F9FAFB",
};

// Mảng đánh giá khách hàng
const reviews = [
    {
        id: 1,
        title: "Món ăn tuyệt vời!",
        content:
            '"Món ăn tuyệt vời và giao hàng nhanh chóng. Tôi rất hài lòng với dịch vụ!"',
        customer: "- Nguyễn Thị Lan, Khách hàng",
        date: "Ngày 15 tháng 3, 2025",
        service: "Giao hàng nhanh chóng và chất lượng món ăn",
    },
    {
        id: 2,
        title: "Thực đơn đa dạng",
        content: '"Thực đơn đa dạng và đồ ăn luôn tươi ngon, rất đáng thử!"',
        customer: "- Trần Minh Tuấn, Khách hàng",
        date: "Ngày 10 tháng 3, 2025",
        service: "Chất lượng đồ ăn và sự đa dạng của thực đơn",
    },
    {
        id: 3,
        title: "Dịch vụ tuyệt vời",
        content: '"Dịch vụ rất tốt và món ăn rất ngon, tôi sẽ quay lại!"',
        customer: "- Lê Thị Thu, Khách hàng",
        date: "Ngày 5 tháng 3, 2025",
        service: "Dịch vụ phục vụ tuyệt vời và món ăn ngon",
    },
    {
        id: 4,
        title: "Không gian nhà hàng tuyệt vời",
        content:
            '"Chất lượng phục vụ tuyệt vời, tôi rất thích không gian nhà hàng!"',
        customer: "- Nguyễn Mạnh Hùng, Khách hàng",
        date: "Ngày 1 tháng 3, 2025",
        service: "Không gian và phong cách phục vụ tuyệt vời",
    },
];

const HomePage = () => {
    // State chứa danh sách món ăn lấy từ API
    const [foodItems, setFoodItems] = useState([]);
    // State chứa danh sách review ngẫu nhiên
    const [randomReviews, setRandomReviews] = useState([]);

    // Lấy danh sách món ăn từ API khi component mount
    useEffect(() => {
        const fetchFoods = async () => {
            try {
                const data = await getAllFoods();
                // data: [{id, name, imageUrl, price, ...}, ...]
                setFoodItems(data);
            } catch (error) {
                console.error("Lỗi khi tải danh sách món ăn:", error);
            }
        };
        fetchFoods();
    }, []);

    // Chọn ngẫu nhiên 2 đánh giá, cập nhật mỗi 5 giây
    useEffect(() => {
        const interval = setInterval(() => {
            const randomIndices = [];
            // Lấy 2 chỉ số ngẫu nhiên, không trùng nhau
            while (randomIndices.length < 2) {
                const randomIndex = Math.floor(Math.random() * reviews.length);
                if (!randomIndices.includes(randomIndex)) {
                    randomIndices.push(randomIndex);
                }
            }
            // Lấy 2 review dựa trên chỉ số
            const selectedReviews = randomIndices.map((index) => reviews[index]);
            setRandomReviews(selectedReviews);
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    return (
        <Box
            display="flex"
            flexDirection="column"
            minHeight="100vh"
            sx={{ backgroundColor: themeColors.background }}
        >
            {/* Thanh điều hướng */}
            <Navbar />

            {/* Banner */}
            <Box
                sx={{
                    backgroundImage: 'url("/images/banner.jpg")', // Đường dẫn ảnh banner
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    color: themeColors.textPrimary,
                    textAlign: "center",
                    py: 10,
                    boxShadow: 3,
                    position: "relative",
                }}
            >
                <Typography variant="h3" fontWeight="bold">
                    Chào mừng đến với Dola Restaurant!
                </Typography>
                <Typography variant="h6" sx={{ mt: 2, opacity: 0.9 }}>
                    Đặt món dễ dàng, thưởng thức những món ăn tuyệt vời tại nhà hàng của chúng tôi!
                </Typography>
                <Button
                    variant="contained"
                    sx={{
                        mt: 3,
                        bgcolor: themeColors.secondary,
                        "&:hover": { bgcolor: themeColors.primary },
                    }}
                >
                    Đặt bàn ngay
                </Button>
            </Box>

            <Container sx={{ py: 8 }}>
                <Grid container spacing={4}>
                    {/* Giới thiệu */}
                    <Grid item xs={12} md={8}>
                        <Typography
                            variant="h4"
                            textAlign="center"
                            fontWeight="bold"
                            mb={6}
                            color={themeColors.primary}
                        >
                            Giới thiệu về Dola Restaurant
                        </Typography>
                        <Typography
                            variant="body1"
                            color={themeColors.textPrimary}
                            sx={{ lineHeight: 1.6 }}
                        >
                            Dola Restaurant mang đến một không gian ấm cúng, phục vụ những món
                            ăn ngon với hương vị đặc trưng của ẩm thực Việt Nam. Chúng tôi cam
                            kết mang đến những bữa ăn ngon miệng, tươi ngon, và phục vụ nhanh
                            chóng. Đội ngũ nhân viên của chúng tôi luôn tận tâm và sẵn sàng
                            đáp ứng mọi yêu cầu của quý khách.
                            <br />
                            <br />
                            Chúng tôi sử dụng nguyên liệu tươi mới, đảm bảo vệ sinh an toàn
                            thực phẩm và tuân thủ các quy trình chế biến nghiêm ngặt để mang
                            lại cho bạn trải nghiệm ẩm thực tuyệt vời.
                            <br />
                            <br />
                            Không chỉ thế, chúng tôi cũng luôn cập nhật các món ăn mới và thực
                            đơn phong phú để phục vụ quý khách hàng yêu thích sự mới mẻ.
                        </Typography>

                        {/* Món ăn đặc biệt */}
                        <Container sx={{ py: 8 }}>
                            <Typography
                                variant="h4"
                                textAlign="center"
                                fontWeight="bold"
                                mb={6}
                                color={themeColors.primary}
                            >
                                Món ăn đặc biệt
                            </Typography>
                            <Swiper
                                spaceBetween={20}
                                slidesPerView={1}
                                loop={true}
                                autoplay={{
                                    delay: 5000,
                                    disableOnInteraction: false,
                                    pauseOnMouseEnter: true,
                                }}
                                pagination={{ clickable: true }}
                                style={{ width: "100%" }}
                                effect="fade"
                                speed={1000}
                            >
                                {foodItems.map((food) => (
                                    <SwiperSlide key={food.id}>
                                        <Box
                                            sx={{
                                                textAlign: "center",
                                                borderRadius: "10px",
                                                overflow: "hidden",
                                                boxShadow: 3,
                                                p: 2,
                                                display: "flex",
                                                flexDirection: "column",
                                                justifyContent: "center",
                                                alignItems: "center",
                                                minHeight: "200px",
                                            }}
                                        >
                                            <Box
                                                sx={{
                                                    width: "50%",
                                                    margin: "0 auto",
                                                    borderRadius: "10px",
                                                    overflow: "hidden",
                                                    backgroundColor: "#f0f0f0",
                                                }}
                                            >
                                                <img
                                                    src={food.imageUrl || "https://via.placeholder.com/300"}
                                                    alt={food.name}
                                                    style={{
                                                        width: "100%",
                                                        height: "auto",
                                                        display: "block",
                                                        objectFit: "contain",
                                                        objectPosition: "center",
                                                    }}
                                                />
                                            </Box>

                                            <Typography
                                                variant="h6"
                                                fontWeight="bold"
                                                color={themeColors.primary}
                                                sx={{ fontSize: "1.2rem", mt: 2 }}
                                            >
                                                {food.name}
                                            </Typography>
                                            <Typography
                                                variant="body1"
                                                color="white"
                                                sx={{ fontSize: "1rem", mt: 1 }}
                                            >
                                                {Number(food.price).toLocaleString("en-US")} VND
                                            </Typography>
                                        </Box>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </Container>
                    </Grid>

                    {/* Khuyến mãi */}
                    <Grid item xs={12} md={4}>
                        <Typography
                            variant="h4"
                            textAlign="center"
                            fontWeight="bold"
                            mb={6}
                            color={themeColors.primary}
                        >
                            Chương trình khuyến mãi
                        </Typography>
                        <Grid container spacing={4}>
                            <Grid item xs={12}>
                                <Box
                                    sx={{
                                        textAlign: "center",
                                        boxShadow: 3,
                                        borderRadius: "10px",
                                        p: 3,
                                        backgroundColor: "#4A5568",
                                        "&:hover": {
                                            backgroundColor: "#38A169",
                                            color: "#F9FAFB",
                                            cursor: "pointer",
                                        },
                                    }}
                                >
                                    <Typography
                                        variant="h6"
                                        fontWeight="bold"
                                        color={themeColors.primary}
                                    >
                                        Giảm giá 20% cho đơn hàng đầu tiên
                                    </Typography>
                                    <Typography
                                        variant="body1"
                                        color="text.secondary"
                                        sx={{ fontStyle: "italic", mt: 2 }}
                                    >
                                        Đặt món đầu tiên tại Dola và nhận ngay ưu đãi giảm giá 20%.
                                        Còn chần chừ gì nữa, hãy thử ngay hôm nay!
                                    </Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={12}>
                                <Box
                                    sx={{
                                        textAlign: "center",
                                        boxShadow: 3,
                                        borderRadius: "10px",
                                        p: 3,
                                        backgroundColor: "#4A5568",
                                        "&:hover": {
                                            backgroundColor: "#38A169",
                                            color: "#F9FAFB",
                                            cursor: "pointer",
                                        },
                                    }}
                                >
                                    <Typography
                                        variant="h6"
                                        fontWeight="bold"
                                        color={themeColors.primary}
                                    >
                                        Khuyến mãi cho nhóm
                                    </Typography>
                                    <Typography
                                        variant="body1"
                                        color="text.secondary"
                                        sx={{ fontStyle: "italic", mt: 2 }}
                                    >
                                        Đặt cho nhóm từ 4 người trở lên và nhận ngay ưu đãi đặc biệt
                                        từ nhà hàng. Tận hưởng bữa ăn tuyệt vời với bạn bè và gia đình!
                                    </Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={12}>
                                <Box
                                    sx={{
                                        textAlign: "center",
                                        boxShadow: 3,
                                        borderRadius: "10px",
                                        p: 3,
                                        backgroundColor: "#4A5568",
                                        "&:hover": {
                                            backgroundColor: "#38A169",
                                            color: "#F9FAFB",
                                            cursor: "pointer",
                                        },
                                    }}
                                >
                                    <Typography
                                        variant="h6"
                                        fontWeight="bold"
                                        color={themeColors.primary}
                                    >
                                        Mua 1 tặng 1 món ăn đặc biệt
                                    </Typography>
                                    <Typography
                                        variant="body1"
                                        color="text.secondary"
                                        sx={{ fontStyle: "italic", mt: 2 }}
                                    >
                                        Đặt món ăn đặc biệt và nhận ngay một món ăn miễn phí. Hãy
                                        trải nghiệm thực đơn mới của chúng tôi.
                                    </Typography>
                                </Box>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>

            {/* Thực đơn */}
            <Container sx={{ py: 8 }}>
                <Typography
                    variant="h4"
                    textAlign="center"
                    fontWeight="bold"
                    mb={6}
                    color={themeColors.primary}
                >
                    Thực đơn
                </Typography>
                <Swiper
                    spaceBetween={20}
                    slidesPerView={4}
                    loop={true}
                    autoplay={{
                        delay: 5000,
                        disableOnInteraction: false,
                        pauseOnMouseEnter: true,
                    }}
                    pagination={{ clickable: true }}
                    style={{ width: "100%" }}
                    speed={1000}
                    slidesPerGroup={1}
                    breakpoints={{
                        600: {
                            slidesPerView: 1,
                            slidesPerGroup: 1,
                        },
                        900: {
                            slidesPerView: 2,
                            slidesPerGroup: 1,
                        },
                        1200: {
                            slidesPerView: 4,
                            slidesPerGroup: 1,
                        },
                    }}
                >
                    {foodItems.map((food) => (
                        <SwiperSlide key={food.id}>
                            <Box
                                sx={{
                                    textAlign: "center",
                                    borderRadius: "10px",
                                    overflow: "hidden",
                                    boxShadow: 3,
                                    p: 2,
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "space-between",
                                    height: "100%",
                                }}
                            >
                                <Box
                                    sx={{
                                        width: "100%",
                                        height: "200px",
                                        overflow: "hidden",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                    }}
                                >
                                    <img
                                        src={food.imageUrl || "https://via.placeholder.com/300"}
                                        alt={food.name}
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                            objectFit: "cover",
                                            objectPosition: "center",
                                        }}
                                    />
                                </Box>
                                <Typography
                                    variant="h6"
                                    fontWeight="bold"
                                    color={themeColors.primary}
                                    sx={{ mt: 2, fontSize: "1.2rem" }}
                                >
                                    {food.name}
                                </Typography>
                                <Typography
                                    variant="body1"
                                    color="white"
                                    sx={{ fontSize: "1rem", mt: 1 }}
                                >
                                    {Number(food.price).toLocaleString("en-US")} VND
                                </Typography>
                            </Box>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </Container>

            {/* Cảm nhận khách hàng */}
            <Container sx={{ py: 8, backgroundColor: "#2D3748" }}>
                <Typography
                    variant="h4"
                    textAlign="center"
                    fontWeight="bold"
                    mb={6}
                    color={themeColors.primary}
                >
                    Cảm nhận khách hàng
                </Typography>
                <Grid container spacing={4}>
                    {randomReviews.map((review) => (
                        <Grid item xs={12} md={6} key={review.id}>
                            <Box
                                sx={{
                                    backgroundColor: "#F9FAFB",
                                    p: 3,
                                    borderRadius: "10px",
                                    boxShadow: 3,
                                    minHeight: "200px",
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "space-between",
                                    "&:hover": {
                                        backgroundColor: "#38A169",
                                        color: "#F9FAFB",
                                        cursor: "pointer",
                                    },
                                }}
                            >
                                <Typography variant="h6" fontWeight="bold" color={themeColors.primary}>
                                    {review.title}
                                </Typography>
                                <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
                                    {review.content}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                                    {review.customer} - {review.date}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    sx={{ fontStyle: "italic", mt: 1 }}
                                >
                                    {review.service}
                                </Typography>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </Container>

            {/* Footer */}
            <Footer />
        </Box>
    );
};

export default HomePage;
