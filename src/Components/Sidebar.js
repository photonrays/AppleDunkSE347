import { Close } from "@mui/icons-material";
import * as React from "react";
import { Link, useLocation } from "react-router-dom";
import image from "../assets/image";
import { IconButton } from '@mui/material';
import { useMultiContext } from "../contexts/multiContext";
import styles from "../Components/Header/Header.module.css";
import {  useRef,useState } from "react";
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();
  let location = useLocation();
  const user = JSON.parse(localStorage.getItem("user"));
  const formatUserName = (tenUser) =>{
    if (tenUser?.length <= 8) {
        return tenUser;
      } else {
        return tenUser?.substring(0, 8) + "...";
      }
}
const handleClose2 = () => {
  //setAnchorEl(null);
  localStorage.removeItem("user");
  //localStorage.removeItem("token");
  Cookies.remove('token')
  navigate("/");
};

const inputRef = useRef(null);
  const { isSidebarOpen, setIsSidebarOpen } = useMultiContext();

  return (
    <aside className={`fixed z-50 left-0 top-0 h-screen bg-gray-50 shrink-0 grow-0 w-full transition-all ease-in-out duration-400 block lg:hidden ${isSidebarOpen ? 'ml-0 shadow-2xl' : 'ml-[-250px]'} max-w-[250px] basis-[250px]  overflow-y-auto`}>
      <div className="flex items-center w-full justify-between p-5">
        <Link to={"/"} className="flex items-center text-4xl font-bold tracking-widest ">
          <img
            src={image.logo512}
            alt="logo"
            className="h-[50px] w-auto object-cover mr-2"
          />
          Apple<br />Dunk
        </Link>
        <IconButton onClick={() => setIsSidebarOpen(false)}>
          <Close sx={{ fontSize: "30px" }} />
        </IconButton>
      </div>
      <div className="p-5 h-full">
        <ul className="text-2xl">
          <li>
            <a href="/iphone" className={`w-full hover:bg-gray-200 ${location.pathname === '/iphone' && 'bg-gray-200'} p-6 rounded-2xl mb-4 block`}>
              iPhone
            </a>
          </li>
          <li>
            <a href="/ipad" className={`w-full hover:bg-gray-200 ${location.pathname === '/ipad' && 'bg-gray-200'} p-6 rounded-2xl mb-4 block`}>
              iPad
            </a>
          </li>
          <li>
            <a href="/mac" className={`w-full hover:bg-gray-200 ${location.pathname === '/mac' && 'bg-gray-200'} p-6 rounded-2xl mb-4 block`}>
              Mac
            </a>
          </li>
          <li>
            <a href="/watch" className={`w-full hover:bg-gray-200 ${location.pathname === '/watch' && 'bg-gray-200'} p-6 rounded-2xl mb-4 block`}>
              Watch
            </a>
          </li>
          <li>
            <a href="/am-thanh" className={`w-full hover:bg-gray-200 ${location.pathname === '/am-thanh' && 'bg-gray-200'} p-6 rounded-2xl mb-4 block`}>
              Âm thanh
            </a>
          </li>
          <li>
            <a href="/phu-kien" className={`w-full hover:bg-gray-200 ${location.pathname === '/phu-kien' && 'bg-gray-200'} p-6 rounded-2xl mb-4 block`}>
              Phụ kiện
            </a>
          </li>
          <li>
            <a href="/tin-tuc" className={`w-full hover:bg-gray-200 ${location.pathname === '/tin-tuc' && 'bg-gray-200'} p-6 rounded-2xl mb-4 block`}>
              Tin tức
            </a>
          </li>
          <li>
            <a href="/khuyenmai" className={`w-full hover:bg-gray-200 ${location.pathname === 'khuyenmai' && 'bg-gray-200'} p-6 rounded-2xl mb-4 block`}>
              Khuyến mãi
            </a>
          </li>
          
        </ul>
        <div className="relative w-full lg:max-w-sm">
            <select
                enabled
                className="w-full p-2.5 text-gray-500 bg-white border rounded-md shadow-sm outline-none appearance-none focus:border-indigo-600"
            >
                <option>ReactJS Dropdown</option>
                <option>Laravel 9 with React</option>
                <option>React with Tailwind CSS</option>
                <option>React With Headless UI</option>
            </select>
        </div>
        <hr />
        {(document.cookie.indexOf('token') != -1) ?
        <div className={styles.userr}>
                                <img src={user.image.length !== 0 ? user.image[0].url : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkNjtjpEZtAtYMoeDfg6PO5DoGrpAhCA79Jg&usqp=CAU"} alt="User Image" className={styles.userr_image} />
                                <p className={styles.menuItemLink} style={{ color: "black" }}>{formatUserName(user.hoten)}</p>
                                <hr />
                            </div>:<></>}

        {(document.cookie.indexOf('token') == -1) ?
                            <Link to="/login">
                                <button className="w-full p-5 rounded-3xl mb-4 border-2 border-gray-200 cursor-pointer text-2xl mt-10 hover:bg-gray-200" onClick={setIsSidebarOpen(false)}>Đăng nhập</button>
                            </Link>
                            :
                            <button className="w-full p-5 rounded-3xl mb-4 border-2 border-gray-200 cursor-pointer text-2xl mt-10 hover:bg-gray-200" onClick={handleClose2}>Đăng Xuất</button>}
      </div>
    </aside>
  );
}
