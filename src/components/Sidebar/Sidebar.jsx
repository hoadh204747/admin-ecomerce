import './sidebar.scss';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import FilterFramesIcon from '@mui/icons-material/FilterFrames';
import InsertChartIcon from '@mui/icons-material/InsertChart';
import AddCardIcon from '@mui/icons-material/AddCard';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import Badge from '@mui/material/Badge';
import { Link } from 'react-router-dom';
import { getAllOrder } from '../../services/orderService';
import { useEffect, useState } from 'react';import Tooltip from '@mui/material/Tooltip';
import { useContext } from "react";
import { DarkModeContext } from "../../context/darkModeContext";

const Sidebar = () => {

    const { dispatch } = useContext(DarkModeContext);
    const [orders, setOrders] = useState([])

    const getOrders = async () => {
        await getAllOrder()
            .then((res) => {
                if(res.success){
                    setOrders(res.data)
                }
            })
    }
    useEffect(() =>{
        getOrders()
    },[])

    let amountOrder = orders.filter(order => order.slugStatus === 'cho-xac-nhan').length

    return (
        <div className="sidebar">
            <div className="top">
                <span className='logo'>Admin</span>
            </div>
            <hr />
            <div className="center">
                <ul>
                    <p className="title">MAIN</p>
                    <li>
                        <DashboardIcon />
                        <Link to={'/'}><span>Dashborad</span></Link>
                    </li>
                    <p className="title">LISTS</p>
                    <li>
                        <PeopleOutlinedIcon />
                        <Link to={'/users'}><span>Users</span></Link>
                    </li>
                    <li>

                        <Inventory2Icon />

                        <Link to={'/products'}><span>Products</span></Link>
                    </li>
                    <Tooltip title={amountOrder > 0 ? `Bạn có ${amountOrder} đơn hàng mới chờ xác nhận.` : ''} placement="right" >
                        <li>
                            <Badge badgeContent={amountOrder} color="primary" >
                                <FilterFramesIcon />
                            </Badge>

                            <Link to={'/orders'}><span>Orders</span></Link>
                        </li>
                    </Tooltip>
                    <p className="title">USEFUL</p>
                    <li>
                        <InsertChartIcon />
                        <span>Statistical</span>
                    </li>
                    
                    <p className="title">ADD NEW</p>
                    <li>
                        <AddCardIcon />
                        <Link to={'/products/add-product'}><span>New Product</span></Link>
                    </li>
                    <li>
                        <AddCardIcon />
                        <Link to={'/products/brands'}><span>Category</span></Link>
                    </li>
                    <li>
                        <AddCardIcon />
                        <Link to={'/products/attribute'}> <span>Add Attribute</span> </Link>
                    </li>
                    <p className="title">USER</p>
                    <li>
                        <AccountCircleOutlinedIcon />
                        <span>Profile</span>
                    </li>
                    <li>
                        <LogoutOutlinedIcon />
                        <span>Logout</span>
                    </li>
                </ul>
            </div>
            <div className="bottom">
                <div className="colorOption" onClick={() => dispatch({ type: "LIGHT" })}></div>
                <div className="colorOption" onClick={() => dispatch({ type: "DARK" })}></div>
            </div>
        </div>
    );
}

export default Sidebar;