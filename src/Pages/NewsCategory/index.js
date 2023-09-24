import React from 'react'
import NewsSidebar from './components/NewsSidebar'
import { useLocation } from "react-router-dom";
import NewsCard from "./components/NewsCard";
import { useState } from "react";
import { useEffect } from "react";
import api from "../../Apis/HandleApiNews";
import { KeyboardArrowLeft, KeyboardArrowRight, KeyboardDoubleArrowLeft, KeyboardDoubleArrowRight } from "@mui/icons-material";

export default function NewsCategory() {
    const location = useLocation();
    const [type, setType] = useState({ name: "", path: "", category: "" });
    const [data, setData] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);
    const [pageRange, setPageRange] = useState([1]);
    const [isLeftMost, setIsLeftMost] = useState(false);
    const [isRightMost, setIsRightMost] = useState(false);
    useEffect(() => {
        switch (location.pathname) {
            case "/apple-news":
                setType({ name: "Tin tức Apple", path: location.pathname, category: "appleNews" });
                api.getAllNews(1, 9, "appleNews").then((result) => {
                    setData(result.listNews);
                    setTotalPage(result.totalPages);
                });
                break;
            case "/news-review":
                setType({ name: "Bài viết review", path: location.pathname, category: "review" });
                api.getAllNews(1, 9, "review").then((result) => {
                    setData(result.listNews);
                    setTotalPage(result.totalPages);
                });
                break;
            case "/tin-kham-pha":
                setType({ name: "Khám phá", path: location.pathname, category: "explore" });
                api.getAllNews(1, 9, "explore").then((result) => {
                    setData(result.listNews);
                    setTotalPage(result.totalPages);
                });
                break;
            case "/thu-thuat":
                setType({ name: "Thủ thuật", path: location.pathname, category: "trick" });
                api.getAllNews(1, 9, "trick").then((result) => {
                    setData(result.listNews);
                    setTotalPage(result.totalPages);
                });
                break;
            case "/tin-khac":
                setType({ name: "Tin khác", path: location.pathname, category: "other" });
                api.getAllNews(1, 9, "other").then((result) => {
                    setData(result.listNews);
                    setTotalPage(result.totalPages);
                });
                break;
            default:
                break;
        }
    }, [location]);

    const changePage = (index) => {
        if (index !== currentPage) {
            setCurrentPage(index)
        }
    }

    const decreasePage = () => {
        setCurrentPage(prev => prev - 1)
    }

    const increasePage = () => {
        setCurrentPage(prev => prev + 1)
    }

    const goToFirstPage = () => {
        setCurrentPage(1)
    }

    const goToLastPage = () => {
        setCurrentPage(totalPage)
    }

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
        if (type.category !== "") {
            api.getAllNews(currentPage, 9, type.category).then(result => setData(result.listNews))
        }
        const arr = [];
        for (var i = currentPage - 2; i <= currentPage + 2; i++) {
            if (i >= 1 && i <= totalPage) {
                arr.push(i);
            }
        }
        setPageRange(arr);
    }, [currentPage, totalPage, type]);
    return (
        <div className='w-full bg-[#f5f5f7]'>
            <div className='w-[1200px] m-auto min-h-[600px] flex pt-[30px] gap-[12px] pb-[30px]'>
                <NewsSidebar type={type.category}/>
                <div className="w-full">
                    <div className="w-full text-[14px] text-[#515154] mt-[25px]">
                        <a href="/tin-tuc" className=" hover:text-[#0066CC]">
                            Trang chủ News
                        </a>
                        <span className="mx-[5px]">{">"}</span>
                        <a href={type.path}>{type.name}</a>
                    </div>

                    <div className="grid grid-cols-3 mt-[24px] gap-[30px]">
                        {data?.map((item, index) => (
                            <NewsCard key={index} data={item} />
                        ))}
                    </div>
                    <div className="flex items-center space-x-1 justify-center gap-[10px] mt-[30px]">
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
                </div>
            </div>
        </div>
    )
}
