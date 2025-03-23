import React from "react";
import { Typography, IconButton, Box, Grid } from "@mui/material";
import { Email, Facebook, Twitter } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
    const navigate = useNavigate();

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                background: "linear-gradient(to right, #ff758c, #ff7eb3, #57c1eb, #4685eb)",
            }}
        >
            <Box
                sx={{
                    width: 400,
                    p: 4,
                    borderRadius: 3,
                    boxShadow: 5,
                    textAlign: "center",
                    background: "#1E1E1E",
                    color: "#FF8A80",
                }}
            >
                <Typography variant="h5" fontWeight="bold" mb={2}>
                    Sign Up
                </Typography>
                <Typography fontSize="14px" mb={3}>
                    Using your social media account
                </Typography>

                <Grid container spacing={2} justifyContent="center">
                    <Grid item>
                        <IconButton sx={{ background: "#E4405F", color: "white", "&:hover": { background: "#D5304E" } }}>
                            <Email />
                        </IconButton>
                    </Grid>
                    <Grid item>
                        <IconButton sx={{ background: "#1877F2", color: "white", "&:hover": { background: "#155BD0" } }}>
                            <Facebook />
                        </IconButton>
                    </Grid>
                    <Grid item>
                        <IconButton sx={{ background: "#1DA1F2", color: "white", "&:hover": { background: "#0C85D0" } }}>
                            <Twitter />
                        </IconButton>
                    </Grid>
                </Grid>

                <Typography fontSize="12px" mt={2} textAlign="center">
                    By signing up I agree with <span style={{ color: "#FF8A80", cursor: "pointer" }}>terms and conditions</span>
                </Typography>

                <Typography fontSize="12px" mt={2} sx={{ cursor: "pointer", textAlign: "center", color: "#FF8A80" }} onClick={() => navigate("/login")}>
                    Already have an account? Login
                </Typography>
            </Box>
        </Box>
    );
};

export default SignupPage;
