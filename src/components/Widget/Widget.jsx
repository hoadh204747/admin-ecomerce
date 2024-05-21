import { useState, useEffect } from "react";
import "./widget.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";

import { getAllUsers } from "../../services/authService";
import { getAllOrder } from "../../services/orderService";

const Widget = ({ type }) => {
  const [users, setUsers] = useState([])
  const [orders, setOrders] = useState([])

  const fetchApiUsers = async () => {
    const res = await getAllUsers();
    setUsers(res)
  }
  useEffect(() => {
    fetchApiUsers()
  }, [])

  const order = async () => {
    await getAllOrder()
      .then((res) => {
        if (res.success) {
          setOrders(res.data);
        }
      })
  }
  useEffect(() => {
    order();
  }, [])

  const totalPriceOrders = orders.reduce((total, order) => {
    return total + order.totalPrice
  },0)
  let data;
  
  switch (type) {
    case "user":
      data = {
        amount: users?.length,
        title: "USERS",
        isMoney: false,
        link: "See all users",
        href: '/users',
        icon: (
          <PersonOutlinedIcon
            className="icon"
            style={{
              color: "crimson",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
        ),
      };
      break;
    case "order":
      data = {
        amount: orders.length,
        title: "ORDERS",
        isMoney: false,
        link: "View all orders",
        href: '/orders',
        icon: (
          <ShoppingCartOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(218, 165, 32, 0.2)",
              color: "goldenrod",
            }}
          />
        ),
      };
      break;
    // case "earning":
    //   data = {
    //     title: "EARNINGS",
    //     isMoney: true,
    //     link: "View net earnings",
    //     icon: (
    //       <MonetizationOnOutlinedIcon
    //         className="icon"
    //         style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
    //       />
    //     ),
    //   };
    //   break;
    case "balance":
      data = {
        title: "BALANCE",
        totalMoney: totalPriceOrders,
        isMoney: true,
        link: "See details",
        icon: (
          <AccountBalanceWalletOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(128, 0, 128, 0.2)",
              color: "purple",
            }}
          />
        ),
      };
      break;
    default:
      break;
  }

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">
          {
            data.isMoney ? `${data.totalMoney.toFixed(3)}M` : `${data.amount}`
          }
        </span>
        <a style={{ textDecoration:'none'}} href={data.href} className="link">{data.link}</a>
      </div>
      <div className="right">
        <div className="percentage positive">
          <KeyboardArrowUpIcon />
          %
        </div>
        {data.icon}
      </div>
    </div>
  );
};

export default Widget;
