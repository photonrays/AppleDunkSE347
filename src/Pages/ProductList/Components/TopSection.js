import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'

const iphoneNavigation = [
    {
        name: "iPhone 14 series",
        path: "/iphone-14-series",
    },
    {
        name: "iPhone 13 series",
        path: "/iphone-13-series",
    },
    {
        name: "iPhone 12 series",
        path: "/iphone-12-series",
    },
    {
        name: "iPhone 11 series",
        path: "/iphone-11-series",
    },
    {
        name: "iPhone SE",
        path: "/iphone-se-series",
    },
]

const ipadNavigation = [
    {
        name: "iPad Pro M1",
        path: "/ipad-pro-m1",
    },
    {
        name: "iPad Pro M2",
        path: "/ipad-pro-m2",
    },
    {
        name: "iPad Air",
        path: "/ipad-air",
    },
    {
        name: "iPad 10",
        path: "/ipad-10",
    },
    {
        name: "iPad 9",
        path: "/ipad-9",
    },
    {
        name: "iPad Mini",
        path: "/ipad-mini",
    },
]

const macnavigation = [
    {
        name: "MacBook Pro",
        path: "/macbook-pro",
    },
    {
        name: "MacBook Air",
        path: "/macbook-air",
    },
    {
        name: "iMac",
        path: "/imac",
    },
    {
        name: "Mac Mini",
        path: "/mac-mini",
    },
]

const watchNavigation = [
    {
        name: "Apple Watch Ultra",
        path: "/apple-watch-ultra",
    },
    {
        name: "Apple Watch Series 8",
        path: "/apple-watch-series-8",
    },
    {
        name: "Apple Watch Series 7",
        path: "/apple-watch-series-7",
    },
    {
        name: "Apple Watch Series 6",
        path: "/apple-watch-series-6",
    },
    {
        name: "Apple Watch SE",
        path: "/apple-watch-se",
    },
    {
        name: "Apple Watch Series 3",
        path: "/apple-watch-series-3",
    },
]

const soundNavigation = [
    {
        name: "AirPods",
        path: "/airpods",
    },
    {
        name: "EarPods",
        path: "/earpods",
    },
    {
        name: "Marshall",
        path: "/loa-marshall",
    },
    {
        name: "Beats",
        path: "/loa-beats",
    },
    {
        name: "Harman Kardon",
        path: "/loa-harman-kardon",
    },
    {
        name: "JBL",
        path: "/loa-jbl",
    },
    {
        name: "Google",
        path: "/loa-google",
    },
]

const accessoryNavigation = [
    {
        name: "Cường lực bảo vệ",
        path: "/cuong-luc-bao-ve",
    },
    {
        name: "Sạc, cáp",
        path: "/sac-cap",
    },
    {
        name: "Bao da/ Ốp lưng",
        path: "/bao-da-op-lung",
    },
    {
        name: "Sạc dự phòng",
        path: "/sac-du-phong",
    },
    {
        name: "Balo/ Túi chống sốc",
        path: "/balo-tui-chong-soc",
    },
    {
        name: "Chuột/ Bàn phím",
        path: "/chuot-ban-phim",
    }, {
        name: "Bút Apple Pencil",
        path: "/but-apple-pencil",
    }, {
        name: "Dây đeo Apple Watch",
        path: "/day-deo-apple-watch",
    }, {
        name: "AirTags",
        path: "/airtags",
    }, {
        name: "Máy ảnh",
        path: "/may-anh",
    },
    {
        name: "Máy đọc sách",
        path: "/may-doc-sach",
    },
    {
        name: "Apple TV",
        path: "/apple-tv",
    },
    {
        name: "Đồng hồ Garmin",
        path: "/dong-ho-garmin",
    },
]

export default function TopSection({ type, currentCategory = null, slug = null }) {
    const [detail, setDetail] = useState();
    const [typeLink, setTypeLink] = useState();
    const location = useLocation();

    useEffect(() => {
        switch (type) {
            case "iPhone":
                setTypeLink("/iphone")
                break;
            case "iPad":
                setTypeLink("/ipad")
                break;
            case "Mac":
                setTypeLink("/mac")
                break;
            case "Watch":
                setTypeLink("/watch")
                break;
            case "Âm thanh":
                setTypeLink("/am-thanh")
                break;
            default:
                setTypeLink("/phu-kien")
                break;
        }
        // eslint-disable-next-line
    }, [location])


    return (
        <div>
            <div className='px-[10px] py-[8px] bg-white'>
                <div className='max-w-[1200px] m-auto w-full flex items-center'>
                    <a
                        href="/"
                        className="text-[14px] text-[#515154] hover:text-[#0066cc]"
                    >
                        Trang chủ
                    </a>
                    <div className="px-[5px] py-0">&gt;</div>
                    <a
                        href={typeLink}
                        className="text-[14px] text-[#515154] hover:text-[#0066cc]"
                    >
                        {type}
                    </a>

                    {currentCategory !== null &&
                        <>
                            <div className="px-[5px] py-0">&gt;</div>
                            <a
                                href={slug}
                                className="text-[14px] text-[#515154]"
                            >
                                {currentCategory}
                            </a>
                        </>
                    }
                </div>
            </div>
            <h1 className='text-[36px] text-center font-bold py-[16px] w-full bg-[#f5f5f7] m-auto'>{currentCategory ? currentCategory : type}</h1>
        </div >
    )
}
