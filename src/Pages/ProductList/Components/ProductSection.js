import React, { useEffect, useState } from 'react'
import Select from "react-select";
import ProductCard from './ProductCard';
import images from '../../../assets/image';
import { useLocation } from 'react-router-dom'
import { Splide, SplideSlide } from '@splidejs/react-splide';
import api from '../../../Apis/HandleApiProduct'
import { convertToSlug } from '../../../utils'
import { KeyboardArrowLeft, KeyboardArrowRight, KeyboardDoubleArrowLeft, KeyboardDoubleArrowRight, GridViewOutlined, ViewAgendaOutlined } from "@mui/icons-material";
import ProductCardList from './ProductCardList';


const accessoryNavigation = [
    {
        name: "Cường lực bảo vệ",
        image: images.cuongLuc,
        path: "/phu-kien/cuong-luc-bao-ve",
    },
    {
        name: "Sạc, cáp",
        image: images.sacCap,
        path: "/phu-kien/sac-cap",
    },
    {
        name: "Bao da/ Ốp lưng",
        image: images.opLung,
        path: "/phu-kien/bao-da-op-lung",
    },
    {
        name: "Sạc dự phòng",
        image: images.sacDuPhong,
        path: "/phu-kien/sac-du-phong",
    },
    {
        name: "Balo/ Túi chống sốc",
        image: images.balo,
        path: "/phu-kien/balo-tui-chong-soc",
    },
    {
        name: "Chuột/ Bàn phím",
        image: images.chuot,
        path: "/phu-kien/chuot-ban-phim",
    },
    {
        name: "Bút Apple Pencil",
        image: images.applePencil,
        path: "/phu-kien/but-apple-pencil",
    },
    {
        name: "Dây đeo Apple Watch",
        image: images.dayDeo,
        path: "/phu-kien/day-deo-apple-watch",
    },
    {
        name: "AirTags",
        image: images.airtags,
        path: "/phu-kien/airtags",
    }, {
        name: "Máy ảnh",
        image: images.mayAnh,
        path: "/phu-kien/may-anh",
    },
    {
        name: "Máy đọc sách",
        image: images.mayDocSach,
        path: "/phu-kien/may-doc-sach",
    },
    {
        name: "Apple TV",
        image: images.appleTv,
        path: "/phu-kien/apple-tv",
    },
    {
        name: "Đồng hồ Garmin",
        image: images.garmin,
        path: "/phu-kien/dong-ho-garmin",
    },
]

export default function ProductSection({ type, currentCategory = null }) {
    const [initPath, setInitPath] = useState();
    const location = useLocation();
    const [sort, setSort] = useState(null);
    const [data, setData] = useState();
    const [subCategories, setSubCategories] = useState()
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);
    const [pageRange, setPageRange] = useState([1]);
    const [isLeftMost, setIsLeftMost] = useState(false);
    const [isRightMost, setIsRightMost] = useState(false);
    const [itemsViewType, setItemsViewType] = useState(1);

    const options = [
        { label: "Giá cao đến thấp", value: "desc" },
        { label: "Giá thấp đến cao", value: "asc" }
    ]

    const onChangeSort = (changedSort) => {
        setSort(changedSort?.value)
    }

    useEffect(() => {
        switch (type) {
            case "iPhone":
                api.getAllSubCategory(type).then(result => setSubCategories(result));
                setInitPath("/iphone")
                break;
            case "iPad":
                api.getAllSubCategory(type).then(result => setSubCategories(result));
                setInitPath("/ipad")
                break;
            case "Mac":
                api.getAllSubCategory(type).then(result => setSubCategories(result));
                setInitPath("/mac")
                break;
            case "Watch":
                api.getAllSubCategory(type).then(result => setSubCategories(result));
                setInitPath("/watch")
                break;
            case "Âm thanh":
                api.getAllSubCategory(type).then(result => setSubCategories(result));
                setInitPath("/am-thanh")
                break;
            default:
                api.getAllSubCategory(type).then(result => setSubCategories(result));
                setInitPath("/phu-kien")
                break;
        }
        // eslint-disable-next-line
    }, [location])

    useEffect(() => {
        api.getAllProduct(type, currentPage, 12, currentCategory, sort).then(result => { console.log(result); setData(result.listProducts); setTotalPage(result.totalPages); })
    }, [currentCategory, type, currentPage, sort])

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
            api.getAllProduct(type, currentPage, 12, currentCategory).then(result => setData(result.listProducts))
        }
        const arr = [];
        for (var i = currentPage - 2; i <= currentPage + 2; i++) {
            if (i >= 1 && i <= totalPage) {
                arr.push(i);
            }
        }
        setPageRange(arr);
    }, [currentPage, totalPage, type, currentCategory]);

    let Layout = ProductCard;

    if (itemsViewType === 1) {
        Layout = ProductCard;
    } else if (itemsViewType === -1) {
        Layout = ProductCardList;
    }

    return (
        <div className='w-full max-w-[1280px] mx-auto px-2 sm:px-10'>
            <div className='w-full mt-14 mb-5 py-[6px]'>
                <div className='flex justify-between flex-wrap gap-5 md:flex-nowrap'>
                    {type !== "Phụ kiện" ?
                        <>
                            <div className='flex gap-x-[40px] items-center overflow-x-scroll mr-[40px] pb-[10px]'>
                                <a href={initPath} className={`text-[15px] ${currentCategory === null ? 'text-[#0066cc]' : 'text-[#515154]'} shrink-0`}>Tất cả</a>
                                {subCategories?.map((item, index) => (
                                    <a key={index} href={`${initPath}/${convertToSlug(item)}`} className={`text-[15px] ${currentCategory === item ? 'text-[#0066cc]' : 'text-[#515154]'} hover:text-[#0066cc] shrink-0	`}>{item}</a>
                                ))}
                            </div>
                            <Select
                                options={options}
                                className="text-[16px] shrink-0 hidden md:block"
                                isClearable={true}
                                closeMenuOnSelect={true}
                                placeholder="Thứ tự hiển thị"
                                onChange={onChangeSort}
                            />
                        </>
                        :
                        <Splide className='w-full max-w-[1280px]' options={{
                            rewind: true,
                            perPage: 7,
                            pagination: false,
                            breakpoints: {
                                450: {
                                    perPage: 2
                                },
                                640: {
                                    perPage: 4
                                },
                                768: {
                                    perPage: 5
                                },
                                1024: {
                                    perPage: 6
                                }
                            }
                        }}>
                            {accessoryNavigation.filter((item) => subCategories?.includes(item.name)).map((item, index) => (
                                <SplideSlide key={index}>
                                    <div className='flex justify-center flex-col items-center'>
                                        <a href={item.path} className={` ${currentCategory === item && 'border-2 border-[#0066CC]'} w-[70px] h-[70px] bg-white p-[15px] rounded-full shrink-0 hover:drop-shadow-xl `}>
                                            <img src={item.image} alt={item.name} className='h-full w-full object-contain' />
                                        </a>
                                        <span className='text-[15px] text-[#1D1D1F] mt-[20px]'>{item.name}</span>
                                    </div>
                                </SplideSlide>
                            ))}
                        </Splide>
                    }

                </div>
            </div>
            <div className='flex w-full justify-between items-center mb-5'>
                {type !== "Phụ kiện" && <Select
                    options={options}
                    className="text-[16px] shrink-0 block md:hidden"
                    isClearable={true}
                    closeMenuOnSelect={true}
                    placeholder="Thứ tự hiển thị"
                    onChange={onChangeSort}
                />}
                <div className='flex mb-5 ml-auto'>
                    <div className={`px-2 py-1 border-2 cursor-pointer  rounded-l-xl ${itemsViewType === 1 ? 'bg-[#086ecf] border-[#086ecf]' : 'border-gray-300 hover:bg-gray-300'}`} onClick={() => setItemsViewType(1)}><GridViewOutlined sx={{ fontSize: '32px', color: `${itemsViewType === 1 ? '#ffffff' : '#666666'}` }} /></div>
                    <div className={`px-2 py-1 border-2 cursor-pointer  rounded-r-xl ${itemsViewType === -1 ? 'bg-[#086ecf] border-[#086ecf]' : 'border-gray-300 hover:bg-gray-300'}`} onClick={() => setItemsViewType(-1)}><ViewAgendaOutlined sx={{ fontSize: '32px', color: `${itemsViewType === -1 ? '#ffffff' : '#666666'}` }} /></div>
                </div>
            </div>
            <div className='grid grid-cols-2 min-[470px]:grid-cols-3 md:grid-cols-4 place-items-center gap-[20px] mb-[35px] mx-auto'>
                {data?.map((item, index) => <Layout key={index} item={item} />)}
            </div>
            <div className="flex items-center space-x-1 justify-center gap-[10px] pb-10">
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
    )
}
