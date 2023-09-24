import KhuyenmaiItem from "./Components/khuyenmaiItem"
import styles from "./KhuyenMai.module.css";
import React,{ useState, useEffect } from "react";
import HandleApiKM from "../../Apis/HandleApiKM";
import { KeyboardArrowLeft, KeyboardArrowRight, KeyboardDoubleArrowLeft, KeyboardDoubleArrowRight } from "@mui/icons-material"; 

function KhuyenMai () {
    const [Mucapdung, setMucapdung] = useState(1000000);

    const handleMucapdungChange = (event) => {
        setMucapdung(event.target.value);
    };

    const [khuyenmais, setKhuyenmais] = useState([]);

    const pagesize = 6; // mỗi trang có bao nhiêu phần tử
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
        HandleApiKM.getKMByApdungAndPhanTram(Mucapdung, 0, pagesize, currentPage)
            .then((response) => {
                setKhuyenmais(response.listKM);
                setTotalPage(response.totalPages)
            })
            .catch((error) => {
                console.log(error);
            });
      }, [currentPage]);

    const handleSearch = () => {
        HandleApiKM.getKMByApdungAndPhanTram(Mucapdung, 0, pagesize, currentPage)
            .then((response) => {
                setKhuyenmais(response.listKM);
                setTotalPage(response.totalPages)
            })
            .catch((error) => {
                console.log(error);
            });
    }
      
    return (
        <div className={styles.bg_primary}>
            <div className={" text-3xl text-center py-8 w-[1200px] mx-auto"}>
                <h1 className="text-4xl py-4">Các Voucher khuyến mãi của AppleDunk</h1>
                <div className=" pl-8 py-4 text-left mt-8">
                    <label htmlFor="mucapdung" className="mr-4">Mức áp dụng: </label>
                    <input type="number" name="mucapdung" className="text-center border-2 border-black mr-4 rounded-lg py-3" min={10000} step={10000} 
                        value={Mucapdung} onChange={handleMucapdungChange} style={{width: 200}}/>
                    <button className="border-2 rounded-lg px-8 py-3 mb-5 bg-sky-600 text-white" onClick={handleSearch}>Tìm</button>
                </div>
            </div>
            <div className=" grid grid-cols-2 gap-4 text-2xl justify-items-center px-8 pl-8 pr-8 pb-16 w-[1200px] mx-auto">
                {khuyenmais.map((khuyenmai) => {
                    return <KhuyenmaiItem khuyenmai={khuyenmai} key={khuyenmai._id}/>
                })}
            </div>

            {/* Phân trang */}
            {totalPage!==0 && 
                    <div className="flex items-center space-x-1 justify-center gap-[10px] pb-8">
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
    )
}

export default KhuyenMai