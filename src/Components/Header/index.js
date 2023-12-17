import styles from "./Header.module.css";
import SearchIcon from "@mui/icons-material/Search";
import PersonIcon from "@mui/icons-material/Person";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import { useState, useEffect, useRef } from "react";
import image from "../../assets/image";
import * as React from "react";
import Cookies from "js-cookie";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { Login, Logout, Settings, Menu as MenuIcon } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import HandleApiCart from "../../Apis/HandleApiCart";
import { useSideBarContext } from "../../contexts/sidebarContext";
import { useTemplateContext } from "../../contexts/templateContext";
import HeaderSecond from "../../SecondTemplate/HeaderSecond";

function Header() {
    const navigate = useNavigate();
    const [search, setSearch] = useState(1);
    const [inputIsVisible, setInputIsVisible] = useState(false);
    const [dataNumber, setDataNumber] = useState(0);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const user = JSON.parse(localStorage.getItem("user"));
    var number = 0;
    const { isSidebarOpen, setIsSidebarOpen } = useSideBarContext();
    // const { template, setTemplate } = useTemplateContext();
    const { template, setTemplate } = useTemplateContext();
    console.log("template a" + template);
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

    // Lúc này input đã xuất hiện
    useEffect(() => {
        if (inputIsVisible) {
            inputRef.current.focus();
        }
    }, [inputIsVisible]);
    if (template === 1) {
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
                        onClick={() => setSearch(1)}
                        className={
                            search === 2
                                ? "fixed top-0 left-0 w-full h-screen grow bg-black opacity-70 z-[10011]"
                                : "hidden"
                        }
                    ></div>
                    <div
                        className={
                            search === 2
                                ? "fixed h-[64px] text-center leading-[64px] w-full bg-black z-[10012]"
                                : "hidden"
                        }
                    >
                        {inputIsVisible && (
                            <input
                                onKeyDown={handleEnter}
                                ref={inputRef}
                                placeholder="Tìm kiếm"
                                id="search-box"
                                className={
                                    "w-1/2 h-3/5 px-[16px] rounded-[3px] text-[16px] text-black-700 outline-none z-[10012]"
                                }
                            />
                        )}
                    </div>
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
                        onClick={() => setSearch(1)}
                        className={
                            search === 2
                                ? "fixed w-full h-full bg-black opacity-70 z-[10011]"
                                : "hidden"
                        }
                    ></div>
                    <div
                        className={
                            search === 2
                                ? "fixed h-[64px] text-center leading-[64px] w-full bg-black z-[10012]"
                                : "hidden"
                        }
                    >
                        {inputIsVisible && (
                            <input
                                onKeyDown={handleEnter}
                                ref={inputRef}
                                placeholder="Tìm kiếm sp"
                                id="search-box"
                                className={
                                    "w-1/2 h-3/5 px-[16px] rounded-[3px] text-[16px] text-black-700 outline-none z-[10012]"
                                }
                            />
                        )}
                    </div>
                    {/* //------------------------------------------------ */}
                    <a href="/" className={styles.logo}>
                        <img
                            src={image.logo}
                            alt="logo"
                            className="h-[45px] w-[180px] object-cover"
                        />
                    </a>
                    <ul className={styles.menu}>
                        <li className={styles.menuItem}>
                            <a href="/iphone" className={styles.menuItemLink}>
                                iPhone
                            </a>
                        </li>
                        <li className={styles.menuItem}>
                            <a href="/ipad" className={styles.menuItemLink}>
                                iPad
                            </a>
                        </li>
                        <li className={styles.menuItem}>
                            <a href="/mac" className={styles.menuItemLink}>
                                Mac
                            </a>
                        </li>
                        <li className={styles.menuItem}>
                            <a href="/watch" className={styles.menuItemLink}>
                                Watch
                            </a>
                        </li>
                        <li className={styles.menuItem}>
                            <a href="/am-thanh" className={styles.menuItemLink}>
                                Âm thanh
                            </a>
                        </li>
                        <li className={styles.menuItem}>
                            <a href="/phu-kien" className={styles.menuItemLink}>
                                Phụ kiện
                            </a>
                        </li>
                        <li className={styles.menuItem}>
                            <a href="/tin-tuc" className={styles.menuItemLink}>
                                Tin tức
                            </a>
                        </li>
                        <li className={styles.menuItem}>
                            <a
                                href="/khuyenmai"
                                className={styles.menuItemLink}
                            >
                                Khuyến mãi
                            </a>
                        </li>
                    </ul>
                    <div className={styles.utilities}>
                        <div
                            onClick={handleClickSearch}
                            className="cursor-pointer"
                        >
                            <SearchIcon
                                style={{ color: "#fff", fontSize: "28px" }}
                            />
                        </div>
                        <a href="/cart" style={{ position: "relative" }}>
                            <ShoppingBagOutlinedIcon
                                style={{ color: "#fff", fontSize: "28px" }}
                            />
                            <div className={styles.cartNumber}>
                                {dataNumber}
                            </div>
                        </a>
                        {/*<Tooltip title="Account settings">*/}
                        {document.cookie.indexOf("token") !== -1 ? (
                            <IconButton
                                onClick={handleClick}
                                size="small"
                                sx={{ ml: -0.2 }}
                                aria-controls={
                                    open ? "account-menu" : undefined
                                }
                                aria-haspopup="true"
                                aria-expanded={open ? "true" : undefined}
                            >
                                {/*<PersonOutlinedIcon
                                    style={{ color: "#fff", fontSize: "28px" }}
                                />*/}

                                <div className={styles.userr}>
                                    <img
                                        src={
                                            user?.image?.length !== 0
                                                ? user?.image[0]?.url
                                                : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkNjtjpEZtAtYMoeDfg6PO5DoGrpAhCA79Jg&usqp=CAU"
                                        }
                                        alt="User Image"
                                        className={styles.userr_image}
                                    />
                                    <p
                                        className={styles.menuItemLink}
                                        style={{ color: "white" }}
                                    >
                                        {formatUserName(user?.hoten)}
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
                                        transform:
                                            "translateY(-50%) rotate(45deg)",
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
                        <div className="text-white">
                            <button
                                className={`border-2 p-1  mr-4 w-9 h-9 hover:text-blue-600 hover:border-blue-600 ${
                                    template === 1
                                        ? "border-blue-600 text-blue-600"
                                        : "border-white"
                                }`}
                                onClick={() => setTemplate(1)}
                            >
                                1
                            </button>
                            <button
                                className={`border-2 p-1 w-9 h-9 hover:text-blue-600 hover:border-blue-600 ${
                                    template === 2
                                        ? "border-blue-600 text-blue-600"
                                        : "border-white"
                                }`}
                                onClick={() => setTemplate(2)}
                            >
                                2
                            </button>
                        </div>
                    </div>
                </div>
            </>
        );
    }

    return <HeaderSecond />;
}

export default Header;