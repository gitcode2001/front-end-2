// import React, { useEffect, useState } from "react";
// import {
//     Button,
//     Container,
//     Table,
//     TableBody,
//     TableCell,
//     TableContainer,
//     TableHead,
//     TableRow,
//     Paper,
//     Typography,
//     IconButton,
// } from "@mui/material";
// import { Delete, Edit } from "@mui/icons-material";
// import { useNavigate } from "react-router-dom";
// import UserService from "../service/UserService";
//
// const UserManagement = () => {
//     const [users, setUsers] = useState([]);
//     const navigate = useNavigate();
//
//     useEffect(() => {
//         fetchUsers();
//     }, []);
//
//     const fetchUsers = () => {
//         UserService.getAllUsers()
//             .then((response) => setUsers(response.data))
//             .catch((error) => {
//                 console.error("Lỗi khi lấy danh sách user:", error);
//                 alert("Không thể lấy danh sách người dùng. Vui lòng thử lại!");
//             });
//     };
//
//     const handleDelete = (id) => {
//         if (window.confirm("Bạn có chắc chắn muốn xóa tài khoản này không?")) {
//             UserService.deleteUser(id)
//                 .then(() => {
//                     alert("Xóa thành công!");
//                     fetchUsers(); // Cập nhật danh sách sau khi xóa
//                 })
//                 .catch((error) => {
//                     console.error("Lỗi khi xóa user:", error);
//                     alert("Xóa thất bại. Vui lòng thử lại!");
//                 });
//         }
//     };
//
//     const handleEdit = (id) => {
//         navigate(`/edit-user/${id}`); // Chuyển hướng đến trang chỉnh sửa user
//     };
//
//     return (
//         <Container>
//             <Typography variant="h4" sx={{ my: 3 }}>
//                 Quản Lý Tài Khoản
//             </Typography>
//             <Button
//                 variant="contained"
//                 color="primary"
//                 sx={{ mb: 2 }}
//                 onClick={() => navigate("/add-user")}
//             >
//                 Thêm Người Dùng
//             </Button>
//             <TableContainer component={Paper}>
//                 <Table>
//                     <TableHead>
//                         <TableRow>
//                             <TableCell>ID</TableCell>
//                             <TableCell>Username</TableCell>
//                             <TableCell>Họ và Tên</TableCell>
//                             <TableCell>Email</TableCell>
//                             <TableCell>Vai Trò</TableCell>
//                             <TableCell>Hành động</TableCell>
//                         </TableRow>
//                     </TableHead>
//                     <TableBody>
//                         {users.length > 0 ? (
//                             users.map((user) => (
//                                 <TableRow key={user.id}>
//                                     <TableCell>{user.id}</TableCell>
//                                     <TableCell>{user.username}</TableCell>
//                                     <TableCell>{user.fullName}</TableCell>
//                                     <TableCell>{user.email}</TableCell>
//                                     <TableCell>{user.role}</TableCell>
//                                     <TableCell>
//                                         <IconButton color="primary" onClick={() => handleEdit(user.id)}>
//                                             <Edit />
//                                         </IconButton>
//                                         <IconButton color="error" onClick={() => handleDelete(user.id)}>
//                                             <Delete />
//                                         </IconButton>
//                                     </TableCell>
//                                 </TableRow>
//                             ))
//                         ) : (
//                             <TableRow>
//                                 <TableCell colSpan={6} align="center">
//                                     Không có dữ liệu
//                                 </TableCell>
//                             </TableRow>
//                         )}
//                     </TableBody>
//                 </Table>
//             </TableContainer>
//         </Container>
//     );
// };
//
// export default UserManagement;
