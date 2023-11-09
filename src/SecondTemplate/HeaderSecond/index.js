import styles from "./HeaderSecond.module.css";
import SearchIcon from "@mui/icons-material/Search";
import PersonIcon from "@mui/icons-material/Person";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import FeaturedPlayListOutlinedIcon from "@mui/icons-material/FeaturedPlayListOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import { useState, useEffect, useRef } from "react";
import image from "../../assets/image";
import * as React from "react";
import Cookies from "js-cookie";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import {
    Login,
    Logout,
    Settings,
    Menu as MenuIcon,
    SearchRounded,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import HandleApiCart from "../../Apis/HandleApiCart";
import { useSideBarContext } from "../../contexts/sidebarContext";

import HandleApiProduct from "../../Apis/HandleApiProduct";
import MenuItems from "../HomeSecond/Components/MenuItems";

function HeaderSecond() {
    const [suggestions, setSuggestions] = useState([]);
    const [suggestionsActive, setSuggestionsActive] = useState(false);
    const [categoryActive, setCategoryActive] = useState(false);
    const [value, setValue] = useState("");
    const typingTimeoutRef = useRef(null);

    const navigate = useNavigate();
    const [search, setSearch] = useState(1);
    const [inputIsVisible, setInputIsVisible] = useState(false);
    const [dataNumber, setDataNumber] = useState(0);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const user = JSON.parse(localStorage.getItem("user"));
    var number = 0;
    const { isSidebarOpen, setIsSidebarOpen } = useSideBarContext();

    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose2 = () => {
        setAnchorEl(null);
        localStorage.removeItem("user");
        //localStorage.removeItem("token");
        Cookies.remove("token");
        navigate("/");
    };
    const handleClose1 = () => {
        setAnchorEl(null);
        //localStorage.removeItem("user");
        //localStorage.removeItem("token");
        //Cookies.remove('token')
    };

    const formatUserName = (tenUser) => {
        if (tenUser?.length <= 8) {
            return tenUser;
        } else {
            return tenUser?.substring(0, 8) + "...";
        }
    };

    const inputRef = useRef(null);

    // Ngay lúc diễn ra sự kiện click thì thanh search vẫn chưa hiện vì khi thoát ra khỏi hàm này search mới bằng 2 và inputIsVisible mới bằng true
    const handleClickSearch = () => {
        setSearch(2);
        setInputIsVisible(true);
    };

    const handleEnter = (e) => {
        if (e.key === "Enter")
            if (e.target.value === "") alert("Vui lòng nhập từ khóa tìm kiếm.");
            else window.location.href = `/search?q=${e.target.value}`;
    };

    // Input search
    const handleChange = (e) => {
        const query = e.target.value.toLowerCase();
        setValue(query);

        if (typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current);
        }
        typingTimeoutRef.current = setTimeout(() => {
            if (query.length > 1) {
                HandleApiProduct.getProductByName(query)
                    .then((data) => {
                        setSuggestions(data.listProducts);
                        console.log(data);
                    })
                    .then(() => setSuggestionsActive(true));
                console.log(query);
                console.log(suggestions);
            } else {
                setSuggestionsActive(false);
            }
        }, 300);
    };

    // render total numbers of cart
    useEffect(() => {
        // var number = 0;
        HandleApiCart.getCartByMaKH(user?.makh)
            .then((data) => {
                // console.log(data.productCart);
                // eslint-disable-next-line react-hooks/exhaustive-deps
                number = data?.productCart.reduce((acc, currentValue) => {
                    return acc + currentValue.soluong;
                }, 0);
                setDataNumber(number);
            })
            .catch((err) => console.log(err));
    });

    return (
        <>
            {/* Day la thanh header khi man hinh nho hon lg */}
            <div className="z-10 h-[64px] w-full bg-white flex fixed top-0 lg:hidden items-center justify-between">
                <div className="ml-5">
                    <IconButton
                        onClick={() => setIsSidebarOpen(true)}
                        className={`${isSidebarOpen ? "hidden" : "block"}`}
                    >
                        <MenuIcon sx={{ fontSize: "30px" }} />
                    </IconButton>
                </div>

                <a href="/" className={styles.logo}>
                    <img
                        src={image.logo}
                        alt="logo"
                        className="h-[45px] w-[180px] object-cover"
                    />
                </a>

                {/* Đây là thanh search trên Header khi nào click icon search thì xuất hiện */}
                <div
                    onClick={() => {
                        setSearch(1);
                        setSuggestionsActive(false);
                        setCategoryActive(false);
                    }}
                    className={
                        search === 2
                            ? "fixed top-[64px] left-0 bottom-0 right-0 grow bg-black opacity-70 z-10011"
                            : "hidden"
                    }
                ></div>

                {/* //------------------------------------------------ */}
                <div
                    onClick={handleClickSearch}
                    className="cursor-pointer mr-5"
                >
                    <SearchIcon style={{ fontSize: "28px" }} />
                </div>
            </div>

            {/* Day la thanh header khi man hinh lon hon lg */}
            <div className="z-10 h-[64px] w-full bg-[#515154] hidden justify-center fixed top-0 lg:flex">
                {/* Đây là thanh search trên Header khi nào click icon search thì xuất hiện */}
                <div
                    onClick={() => {
                        setSearch(1);
                        setSuggestionsActive(false);
                        setCategoryActive(false);
                    }}
                    className={
                        search === 2
                            ? "fixed top-[64px] left-0 bottom-0 right-0 bg-black opacity-70 z-10011"
                            : "hidden"
                    }
                ></div>

                {/* //------------------------------------------------ */}
                <a href="/" className={styles.logo}>
                    <img
                        src={image.logo}
                        alt="logo"
                        className="h-[45px] w-[180px] object-cover"
                    />
                </a>
                {/* Danh mục sp */}
                <div
                    className="flex items-center cursor-pointer ml-2 mr-8 relative"
                    onClick={() => {
                        setCategoryActive(true);
                        setSearch(2);
                    }}
                >
                    <div className="flex items-center rounded-[8px] bg-stone-300 bg-opacity-10 p-3">
                        <FeaturedPlayListOutlinedIcon
                            style={{ color: "#fff", fontSize: "28px" }}
                        />
                        <div className="text-[12px] w-[62px] text-white ml-2">
                            Danh mục
                        </div>
                    </div>
                    {categoryActive && (
                        <div className="absolute top-[43px] right-0">
                            <MenuItems />
                        </div>
                    )}
                </div>

                {/* Tìm kiếm input */}
                <div className={"h-full"}>
                    <div className="flex items-center h-full">
                        <div className="h-[40px] p-4 bg-white flex items-center cursor-pointer rounded-l-[12px] hover:bg-gray-200">
                            <SearchRounded fontSize="large" className={""} />
                        </div>
                        <input
                            type="text"
                            placeholder="Bạn cần tìm gì?"
                            value={value}
                            onChange={handleChange}
                            onFocus={() => setSearch(2)}
                            onKeyDown={handleEnter}
                            className="h-[40px] w-[300px] py-2 px-4 outline-none caret-red-600 placeholder:text-[14px] text-[14px] rounded-r-[12px]"
                        ></input>
                    </div>
                    {/* Onfocus input thì hiển thị này */}
                    {suggestionsActive && (
                        <div className={styles.searchSuggest}>
                            <h3 className="mx-[8px] my-[12px] text-[#818080] text-[14px]">
                                Gợi ý sản phẩm
                            </h3>
                            <div className="px-[12px] cursor-pointer">
                                {suggestions.length > 0 ? (
                                    suggestions.map((item, index) => (
                                        <a
                                            key={index}
                                            href={`detailproduct/${item._id}`}
                                            className="cursor-pointer text-[14px] flex items-center mb-6 hover:bg-gray-200"
                                        >
                                            <img
                                                src={item.hinh}
                                                alt={item.tensanpham}
                                                className="w-[48px] h-[48px]  object-cover"
                                            />
                                            <div className="ml-[8px] leading-[24px]">
                                                {item.tensanpham}
                                            </div>
                                        </a>
                                    ))
                                ) : (
                                    <div className="text-[14px] mb-6">
                                        Không có sản phẩm phù hợp tìm kiếm!
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
                <div className={styles.utilities}>
                    {/* <div onClick={handleClickSearch} className="cursor-pointer">
                        <SearchIcon style={{ color: "#fff", fontSize: "28px" }} />
                    </div> */}
                    <a href="/store" className="flex items-center">
                        <LocationOnOutlinedIcon
                            style={{ color: "#fff", fontSize: "32px" }}
                        />
                        <div className="text-[12px] w-[62px] text-white">
                            Danh sách cửa hàng
                        </div>
                    </a>
                    <a href="/customer/history" className="flex items-center">
                        <LocalShippingOutlinedIcon
                            style={{ color: "#fff", fontSize: "32px" }}
                        />
                        <div className="text-[12px] w-[62px] text-white ml-2">
                            Tra cứu đơn hàng
                        </div>
                    </a>
                    <a href="/cart" style={{ position: "relative" }}>
                        <ShoppingBagOutlinedIcon
                            style={{ color: "#fff", fontSize: "28px" }}
                        />
                        <div className={styles.cartNumber}>{dataNumber}</div>
                    </a>
                    {/*<Tooltip title="Account settings">*/}
                    {document.cookie.indexOf("token") !== -1 ? (
                        <IconButton
                            onClick={handleClick}
                            size="small"
                            sx={{ ml: -0.2 }}
                            aria-controls={open ? "account-menu" : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? "true" : undefined}
                        >
                            {/*<PersonOutlinedIcon
                                    style={{ color: "#fff", fontSize: "28px" }}
                                />*/}

                            <div className={styles.userr}>
                                <img
                                    src={
                                        user.image.length !== 0
                                            ? user.image[0].url
                                            : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkNjtjpEZtAtYMoeDfg6PO5DoGrpAhCA79Jg&usqp=CAU"
                                    }
                                    alt="User Image"
                                    className={styles.userr_image}
                                />
                                <p
                                    className={styles.menuItemLink}
                                    style={{ color: "white" }}
                                >
                                    {formatUserName(user.hoten)}
                                </p>
                            </div>
                        </IconButton>
                    ) : (
                        <Link to="/login">
                            <p
                                className={styles.menuItemLink}
                                style={{ color: "white" }}
                            >
                                Đăng nhập
                            </p>
                        </Link>
                    )}
                    {/*</Tooltip>*/}
                    <Menu
                        anchorEl={anchorEl}
                        id="account-menu"
                        open={open}
                        onClose={handleClose1}
                        onClick={handleClose1}
                        PaperProps={{
                            elevation: 0,
                            sx: {
                                overflow: "visible",
                                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                                mt: 0,
                                "& .MuiAvatar-root": {
                                    width: 40,
                                    height: 32,
                                    ml: 0,
                                    mr: 1,
                                },
                                "&:before": {
                                    content: '""',
                                    display: "block",
                                    position: "absolute",
                                    top: 0,
                                    right: 80,
                                    width: 10,
                                    height: 10,
                                    bgcolor: "background.paper",
                                    transform: "translateY(-50%) rotate(45deg)",
                                    zIndex: 0,
                                },
                            },
                        }}
                        transformOrigin={{
                            horizontal: "right",
                            vertical: "top",
                        }}
                        anchorOrigin={{
                            horizontal: "right",
                            vertical: "bottom",
                        }}
                    >
                        <Link to="/customer/info">
                            <MenuItem
                                onClick={handleClose1}
                                sx={{ fontSize: 15 }}
                            >
                                <ListItemIcon>
                                    <PersonIcon fontSize="large"></PersonIcon>
                                </ListItemIcon>
                                Trang cá nhân
                            </MenuItem>
                        </Link>
                        <Divider />

                        {document.cookie.indexOf("token") == -1 ? (
                            <Link to="/login">
                                <MenuItem
                                    onClick={handleClose1}
                                    sx={{ fontSize: 15 }}
                                >
                                    <ListItemIcon>
                                        <Login fontSize="large" />
                                    </ListItemIcon>
                                    Đăng nhập
                                </MenuItem>
                            </Link>
                        ) : (
                            <MenuItem
                                onClick={handleClose2}
                                sx={{ fontSize: 15 }}
                            >
                                <ListItemIcon>
                                    <Logout fontSize="large" />
                                </ListItemIcon>
                                Đăng xuất
                            </MenuItem>
                        )}
                    </Menu>
                </div>
            </div>
        </>
    );
}

export default HeaderSecond;
