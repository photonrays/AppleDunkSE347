import { Close } from "@mui/icons-material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import image from "../assets/image";
import { IconButton } from '@mui/material';
import { useSideBarContext } from "../contexts/sidebarContext";
import Cookies from "js-cookie";


export default function Sidebar() {
  let location = useLocation();
  const { isSidebarOpen, setIsSidebarOpen } = useSideBarContext();

  const user = JSON.parse(localStorage.getItem("user"));


  const formatUserName = (tenUser) => {
    if (tenUser?.length <= 8) {
      return tenUser;
    } else {
      return tenUser?.substring(0, 8) + "...";
    }
  }

  const navigate = useNavigate();


  const handleClose2 = () => {
    localStorage.removeItem("user");
    Cookies.remove('token')
    navigate("/");
};

  return (
    <aside className={`fixed z-50 left-0 top-0 h-full bg-gray-50 shrink-0 grow-0 w-full transition-all ease-in-out duration-400 block lg:hidden ${isSidebarOpen ? 'ml-0 shadow-2xl' : 'ml-[-250px]'} max-w-[250px] overflow-y-auto`}>
      <div className="flex items-center w-full justify-between p-5">
        <Link to={"/"} className="flex items-center text-4xl font-bold tracking-widest text-[#f5dac0]">
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
        {(document.cookie.indexOf('token') !== -1) ?
          <div className="p-6">
            <Link to="/customer/info" className="flex items-center">
              <img src={user.image.length !== 0 ? user.image[0].url : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkNjtjpEZtAtYMoeDfg6PO5DoGrpAhCA79Jg&usqp=CAU"} alt="User" className="w-16 h-16" />
              <p className="block p-5 text-2xl">{formatUserName(user.hoten)}</p>
            </Link>
            <button className="w-full p-5 rounded-3xl mb-4 border-2 border-gray-200 cursor-pointer text-2xl mt-5 text-center hover:bg-gray-200" onClick={handleClose2}>Đăng xuất</button>
          </div>
          :
          <Link to="/login" className="block w-full p-5 rounded-3xl mb-4 border-2 border-gray-200 cursor-pointer text-2xl mt-10 text-center hover:bg-gray-200">Đăng nhập</Link>
        }
      </div>
    </aside >
  );
}
