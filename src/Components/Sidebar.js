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
import {
  BsChevronDown,
  BsChatLeftText,
  BsCalendarCheck,
  BsFiles,
  BsServer,
} from 'react-icons/bs';
import {
  MdOutlineDashboard,
  MdAccountCircle,
  MdAnalytics,
  MdOutlineSettings,
  MdLogout,
} from 'react-icons/md';

export default function Sidebar() {
  const Menus = [

    {
      title: 'Services',
      src: 'Services',
      subMenus: [
        {
          title: 'Service 1',
          src: '/customer/info',
  
          cName: 'sub-nav',
        },
        {
          title: 'Service 2',
          src: '/customer/history',
  
          cName: 'sub-nav',
        },
        {
          title: 'Service 3',
          src: '/services/services3',
        },
        {
          title: 'Service 1',
          src: '/services/services1',
  
          cName: 'sub-nav',
        },
        {
          title: 'Service 2',
          src: '/services/services2',
  
          cName: 'sub-nav',
        },
        {
          title: 'Service 3',
          src: '/services/services3',
        }
      ],
    }

  ];
  const [open, setOpen] = useState(true);
  const [subMenuOpen, setSubMenuOpen] = useState(false);
  
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
        
    
        <hr />

        {(document.cookie.indexOf('token') != -1) ?
        <ul className="pt-0">
          {Menus.map((Menu, index) => (
            <>
              <li
                key={index}
                className={`flex  rounded-md p-2 cursor-pointer-full hover:bg-gray-200  text-black text-sm items-center gap-x-4 
              ${Menu.gap ? 'mt-0' : 'mt-0'}  `}
              >
                
                {(document.cookie.indexOf('token') != -1) ?
        <div className={styles.userr}>
                                <img src={user.image.length !== 0 ? user.image[0].url : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkNjtjpEZtAtYMoeDfg6PO5DoGrpAhCA79Jg&usqp=CAU"} alt="User Image" className={styles.userr_image} />
                                <p className={styles.menuItemLink} style={{ color: "black" }}>{formatUserName(user.hoten)}</p>
                                <hr />
                            </div>:<></>}
                {Menu.subMenus && (
                  <BsChevronDown
                    onClick={() => setSubMenuOpen(!subMenuOpen)}
                    className={`${subMenuOpen && 'rotate-180'}`}
                  />
                )}
              </li>
              {Menu.subMenus && subMenuOpen && open && (
                <ul>
                  {Menu.subMenus.map((subMenuItem, idx) => (
                    <li
                      key={idx}
                      className={`w-full text-2xl hover:bg-gray-200 ${location.pathname === 'khuyenmai' && 'bg-gray-200'} p-6 rounded-2xl mb-4 block`}
                    >
                      <a href={subMenuItem.src}>
                      {subMenuItem.title}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </>
          ))}
        </ul>
       :<></>}
{(document.cookie.indexOf('token') == -1) ?
                            
                            <button onClick={()=>{navigate("/login");setIsSidebarOpen(false);}} className="w-full p-5 rounded-3xl mb-4 border-2 border-gray-200 cursor-pointer text-2xl mt-10 hover:bg-gray-200">Đăng nhập</button>
                        
                        :
                        <button className="w-full p-5 rounded-3xl mb-4 border-2 border-gray-200 cursor-pointer text-2xl mt-10 hover:bg-gray-200" onClick={handleClose2}>Đăng Xuất</button>}
              </div>
    </aside>
  );
}
