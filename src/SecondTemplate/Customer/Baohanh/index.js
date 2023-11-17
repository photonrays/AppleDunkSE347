import styles from "../Customer.module.css";
import PersonIcon from '@mui/icons-material/Person';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AssignmentIcon from '@mui/icons-material/Assignment';
import LockIcon from '@mui/icons-material/Lock';
import CropOriginalIcon from '@mui/icons-material/CropOriginal';
import HistoryIcon from '@mui/icons-material/History';
import { blue } from "@mui/material/colors";
import NavTag from "../Components/NavTag";
import BaohanhItem from "../Components/BaohanhItem";
import GppGoodIcon from '@mui/icons-material/GppGood';
import { KeyboardArrowLeft, KeyboardArrowRight, KeyboardDoubleArrowLeft, KeyboardDoubleArrowRight } from "@mui/icons-material"; 
import HandleApiBaohanh from "../../../Apis/HandleApiBaohanh";
import { useState,useEffect } from "react";

function Baohanh () {
    const user = JSON.parse(localStorage.getItem("user"));
    const [data, setData] = useState([]);

    const pagesize = 5; // mỗi trang có bao nhiêu phần tử
    const [currentPage, setCurrentPage] = useState(1); //trang hiện tại
    let [totalPage, setTotalPage] =  useState(1);; //tổng số trang
    const [pageRange, setPageRange] = useState([1]); //dải phân trang
    const [isLeftMost, setIsLeftMost] = useState(false); //nút mũi tên trái
    const [isRightMost, setIsRightMost] = useState(false); //nút mũi tên phải

    //hàm chuyển trang
    const changePage = (index) => {
        if (index !== currentPage) 
            setCurrentPage(index)
    }

    //hàm chuyển sang trang trước đó
    const decreasePage = () => {
        setCurrentPage(prev => prev - 1)
    }

    //hàm chuyển sang trang phía sau
    const increasePage = () => {
        setCurrentPage(prev => prev + 1)
    }

    //hàm đi đến trang đầu tiên
    const goToFirstPage = () => {
        setCurrentPage(1)
    }

    //hàm đi đên trang cuối cùng
    const goToLastPage = () => {
        setCurrentPage(totalPage)
    }

    //xử lý thay đổi trang
    useEffect(() => {
        if (totalPage === 1) {
            setIsLeftMost(true)
            setIsRightMost(true)
        } else if (currentPage === 1) {
            setIsLeftMost(true)
            setIsRightMost(false)
        } else if (currentPage === totalPage) {
            setIsRightMost(true)
            setIsLeftMost(false)
        } else {
            setIsLeftMost(false)
            setIsRightMost(false)
        }
        const arr = [];
        for (var i = currentPage - 2; i <= currentPage + 2; i++)  
            if (i >= 1 && i <= totalPage) 
                arr.push(i);
        setPageRange(arr);
    }, [currentPage, totalPage]);

    useEffect(() => {
        HandleApiBaohanh.getBHByMaKH(user.makh, pagesize, currentPage)
        .then((res) => {
            setData(res.listBH);
            setTotalPage(res.totalPages);
            });
    }, [data]); 

    return (
        <div>
            <div className={styles.bg_primary + " flex justify-evenly text-2xl relative"}>
                <div className={styles.bg_white +" rounded-lg w-1/4 my-12 lg:block hidden"}>
                    <NavTag DivCss={"px-4 py-8"} setHref={"/customer/info"} spanCss={"mx-6"} spanContent={"Thông tin tài khoản"}
                        aCss={"mx-4 my-4"} setIcon={<PersonIcon sx={{ fontSize: 30 }}></PersonIcon>} />
                    <NavTag DivCss={"px-4 py-8"} setHref={"/customer/addresses"} spanCss={"mx-4"} spanContent={"Địa chỉ nhận hàng"}
                        aCss={"mx-4 my-4"} setIcon={<LocationOnIcon sx={{ fontSize: 30 }}></LocationOnIcon>} />
                    <NavTag DivCss={"px-4 py-8"} setHref={"/customer/history"} spanCss={"mx-6"} spanContent={"Đơn đặt hàng"}
                        aCss={"mx-4 my-4"} setIcon={<AssignmentIcon sx={{ fontSize: 30 }}></AssignmentIcon>} />
                    <NavTag DivCss={"px-4 py-8"} setHref={"/customer/changePassword"} spanCss={"mx-6"} spanContent={"Đổi mặt khẩu"}
                        aCss={"mx-4 my-4"} setIcon={<LockIcon sx={{ fontSize: 30 }}></LockIcon>} />
                    <NavTag DivCss={"px-4 py-8"} setHref={"/customer/avatar"} spanCss={"mx-6"} spanContent={"Ảnh đại diện"}
                        aCss={"mx-4 my-4"} setIcon={<CropOriginalIcon sx={{ fontSize: 30 }}></CropOriginalIcon>} />
                    <NavTag DivCss={"px-4 py-8"} setHref={"/customer/productReviews"} spanCss={"mx-6"} spanContent={"Lịch sử đánh giá sản phẩm"}
                        aCss={"mx-4 my-4"} setIcon={<HistoryIcon sx={{ fontSize: 30 }}></HistoryIcon>} />
                    <NavTag DivCss={styles.bg_blue +" rounded-lg px-4 py-8 mx-6 my-8  mb-8"}  setHref={"#"} spanCss={"mx-6"} spanContent={"Bảo hành"}
                        aCss={styles.text_blue} setIcon={<GppGoodIcon sx={{ fontSize: 30, color: blue[700] }}></GppGoodIcon>} />
                </div>
                <div className={"lg:w-2/5 my-12"}>
                    {(data === undefined || data.length===0)? (<div className="flex justify-center">Bạn chưa mua hàng</div>
                    ) : (
                        <>
                            {/* <div className="relative">
                                <SearchIcon className="absolute left-0 pl-2" sx={{ fontSize: 32, color: blue[700] }}></SearchIcon>
                                <input type="text" className="border-2 rounded border-sky-500 px-2 py-2 pl-12"/>
                            </div> */}
                            {data.map((item)=>(
                                <BaohanhItem name={item.masp} id={item._id} ngmua={item.thoigian} nghethan={item.nghethan} key={item._id}/>
                            ))}
                        </>
                    )}
                    
                    {/* Phân trang */}
                    {totalPage!==0 && 
                        <div className="flex items-center space-x-1 justify-center gap-[10px]">
                        {!isLeftMost && (
                            <>
                                <div onClick={goToFirstPage} className="flex items-center justify-center bg-white rounded-md hover:bg-blue-400 text-[15px] text-gray-700 hover:text-white w-[35px] h-[35px] cursor-pointer select-none">
                                    <KeyboardDoubleArrowLeft />
                                </div>
                                <div onClick={decreasePage} className="flex items-center justify-center bg-white rounded-md hover:bg-blue-400 text-[15px] text-gray-700 hover:text-white w-[35px] h-[35px] cursor-pointer select-none">
                                    <KeyboardArrowLeft />
                                </div>
                            </>
                        )}
                        {pageRange.map((item, index) => {
                            return (
                                <div key={index}
                                    className={`flex items-center justify-center rounded-md text-[15px] text-gray-700 w-[35px] h-[35px] cursor-pointer select-none ${item === currentPage ? 'text-white bg-blue-400' : 'bg-white hover:text-white hover:bg-blue-400'}`}
                                    onClick={() => changePage(item)}
                                >
                                    {item}
                                </div>)
                        })}
                        {!isRightMost && (
                            <>
                                <div onClick={increasePage} className="flex items-center justify-center bg-white rounded-md hover:bg-blue-400 text-[15px] text-gray-700 hover:text-white w-[35px] h-[35px] cursor-pointer select-none">
                                    <KeyboardArrowRight />
                                </div>
                                <div onClick={goToLastPage} className="flex items-center justify-center bg-white rounded-md hover:bg-blue-400 text-[15px] text-gray-700 hover:text-white w-[35px] h-[35px] cursor-pointer select-none">
                                    <KeyboardDoubleArrowRight />
                                </div>
                            </>
                        )}
                        </div>
                    }
                </div>
            </div>
        </div>
    );
}

export default Baohanh;