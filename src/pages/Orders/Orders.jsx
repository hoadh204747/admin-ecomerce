import React from "react";
import './Orders.scss'
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
// import { Link } from 'react-router-dom'
import { useState, useEffect } from "react";
import { getAllOrder, updateOrder } from "../../services/orderService";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const Orders = () => {

    const [params, setParams] = useState("")
    const [tab, setTab] = useState('all')
    const [orders, setOrders] = useState([])
    //const [statusOrder, setStatusOrder] = useState("") // state cập nhật trạng thái đơn hàng

    // Trong hàm order, cần cập nhật cấu trúc của đơn hàng để bao gồm trạng thái đơn hàng
    const order = async (params) => {
        await getAllOrder(params)
            .then((res) => {
                if (res.success) {
                    // Cập nhật cấu trúc của đơn hàng bằng cách thêm trạng thái đơn hàng vào mỗi đơn hàng
                    const ordersWithStatus = res.data.map(order => ({
                        ...order,
                        statusOrder: "" // Khởi tạo trạng thái đơn hàng mặc định
                    }));
                    setOrders(ordersWithStatus);
                }
            })
    }


    const updateStatusOrder = async (id, newStatus) => {
        const data = {
            orderId: id,
            status: newStatus
        }
        await updateOrder(data)
            .then((resp) => {
                if (resp.success) {
                    alert(resp.message)
                    // Cập nhật trạng thái đơn hàng cho đơn hàng cụ thể sau khi cập nhật thành công
                    const updatedOrders = orders.map(order => {
                        if (order._id === id) {
                            return {
                                ...order,
                                statusOrder: newStatus
                            };
                        }
                        return order;
                    });
                    setOrders(updatedOrders);
                }
            })
        await order()
        window.location.reload()
    }


    useEffect(() => {
        order(params);
    }, [params])


    return (
        <div className="home">
            <Sidebar orders = {orders} />
            <div className="homeContainer">
                <Navbar />
                <div className="orders">
                    <div className="list-tab">
                        <span onClick={() => { setTab('all'); setParams("") }} className={tab === 'all' ? 'active' : ''} >Tất cả</span>
                        <span onClick={() => { setTab('cho-xac-nhan'); setParams("cho-xac-nhan") }} className={tab === 'cho-xac-nhan' ? 'active' : ''}>Chờ xác nhận</span>
                        <span onClick={() => { setTab('chuan-bi-hang'); setParams("chuan-bi-hang") }} className={tab === 'chuan-bi-hang' ? 'active' : ''}>Chuẩn bị hàng</span>
                        <span onClick={() => { setTab('dang-giao'); setParams("dang-giao") }} className={tab === 'dang-giao' ? 'active' : ''}>Đang giao</span>
                        <span onClick={() => { setTab('da-giao'); setParams("da-giao") }} className={tab === 'da-giao' ? 'active' : ''}>Đã giao</span>
                        <span onClick={() => { setTab('da-huy'); setParams("da-huy") }} className={tab === 'da-huy' ? 'active' : ''}>Đã hủy</span>
                    </div>
                    <div className="list-order">
                        <TableContainer component={Paper} className="table">
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell className='tableCell' sx={{ width: '10%' }}>Mã đơn hàng</TableCell>
                                        <TableCell className='tableCell' sx={{ width: '30%' }}>Sản phẩm</TableCell>
                                        <TableCell className='tableCell' sx={{ width: '8%' }}>Khách hàng</TableCell>
                                        <TableCell className='tableCell' sx={{ width: '10%' }}>Ngày tạo</TableCell>
                                        <TableCell className='tableCell' sx={{ width: '8%' }}>Tổng giá</TableCell>
                                        <TableCell className='tableCell' sx={{ width: '13%' }}>Phương thức thanh toán</TableCell>
                                        <TableCell className='tableCell' sx={{ width: '10%' }}>Trạng thái</TableCell>

                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {orders.map((order) => {

                                        return (
                                            <TableRow key={order._id} >
                                                <TableCell className='tableCell'>
                                                    {order._id}
                                                </TableCell>
                                                <TableCell className='tableCell'>
                                                    <ul>
                                                        {order.orderItems.map((item) => {
                                                            return (
                                                                <li>
                                                                    <span>{item.amount}x</span>
                                                                    <img src={item.product.image[0]} alt="" />
                                                                    <span>{item.product.name}</span>
                                                                </li>
                                                            )
                                                        })}
                                                    </ul>
                                                </TableCell>
                                                <TableCell className='tableCell'>{order.shippingAddress.fullname}</TableCell>
                                                <TableCell className='tableCell'>{new Date(order.createdAt).toLocaleString()}</TableCell>
                                                <TableCell className='tableCell'>{(order.totalPrice).toFixed(3)}.000₫</TableCell>
                                                <TableCell className='tableCell'>{order.paymentMethod}</TableCell>
                                                <TableCell className='tableCell'><span className={`status ${order.slugStatus}`}>{order.status}</span></TableCell>
                                                <TableCell className='tableCell'>
                                                    <div className='cellAction'>
                                                        <span onClick={() => { updateStatusOrder(order._id) }}>Update</span>
                                                        <select value={order.statusOrder} onChange={(e) => { updateStatusOrder(order._id, e.target.value) }}>
                                                            <option disabled value="">Trạng thái</option>
                                                            <option value="Chuẩn bị hàng">Xác nhận</option>
                                                            <option value="Đang giao">Giao hàng</option>
                                                            <option value="Đã giao">Hoàn thành</option>
                                                            <option value="Đã hủy">Hủy</option>
                                                        </select>
                                                    </div>
                                                </TableCell>

                                            </TableRow>
                                        )

                                    })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Orders;