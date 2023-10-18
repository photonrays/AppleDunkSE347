import "@splidejs/react-splide/css";
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import images from "../../../assets/image";
import "./AdvertisementSlide.css";
import { useRef, useState } from "react";
import styles from "./AdvertisementSlide.module.css";
import MenuItems from "./MenuItems";

function AdvertisementSlide() {
    const thumbnailCarouselRef = useRef(null);
    const mainCarouselRef = useRef(null);
    const [currentSlide, setCurrentSlide] = useState(0);

    const data = [
        {
            image: images.banner1,
            slogan: "iPhone 14 Pro Max mua ngay",
        },
        {
            image: images.banner2,
            slogan: "Tháng tỏ lời yêu tri ân giá tốt",
        },
        {
            image: images.banner3,
            slogan: "Cuối tuần giá sốc chỉ từ 1.665.000đ",
        },
        {
            image: images.banner4,
            slogan: "Macbook Air giá tốt nhất thị trường",
        },
        {
            image: images.banner5,
            slogan: "iPad trải nghiệm hoàn hảo",
        },
        {
            image: images.banner6,
            slogan: "Apple watch mở bán quà ngon",
        },
    ];

    const handleThumbnailClick = (index) => {
        setCurrentSlide(index);
        mainCarouselRef.current.go(index);
    };

    const handleMainClick = (index) => {
        if (index < 0) {
            setCurrentSlide(data.length - 1);
        } else if (index > data.length - 1) {
            setCurrentSlide(0);
        } else setCurrentSlide(index);

        thumbnailCarouselRef.current.go(index);
    };

    const mainCarouselOptions = {
        rewind: true,
        speed: 1400,
        perPage: 1,
        perMove: 1,
        pagination: false,
        arrows: true,
        fixedHeight: 280,
        gap: "2rem",
        onMove: () => {
            thumbnailCarouselRef.current.go(mainCarouselRef.current.index);
        },
    };

    const mainCarouselOptionsMobile = {
        rewind: true,
        speed: 1400,
        perPage: 1,
        perMove: 1,
        pagination: true,
        arrows: false,
        fixedHeight: 220,
        // gap: "2rem",
    };

    const thumbnailCarouselOptions = {
        fixedWidth: 130,
        fixedHeight: 80,
        // gap: "12px",
        marginRight: "12px",
        // cover: true,
        pagination: false,
        // arrows: true,
        focus: "center",
        updateOnMove: true,
        arrows: false,
        perPage: 6,
        perMove: 1,
        breakpoints: {
            768: {
                fixedWidth: 80,
                fixedHeight: 60,
                perPage: 3,
            },
            1024: {
                // fixedWidth: 80,
                // fixedHeight: 60,
            },
        },
        onMove: () => {
            mainCarouselRef.current.go(thumbnailCarouselRef.current.index);
        },
    };

    return (
        <div>
            {/* Carousel Mobile */}
            <div className={styles.displayBlock + " hidden mainSlider"}>
                <Splide
                    hasTrack={false}
                    aria-label="Slider Product"
                    options={mainCarouselOptionsMobile}
                >
                    <SplideTrack>
                        {data.map((product, index) => (
                            <SplideSlide key={index}>
                                <div className="cursor-pointer h-full w-full">
                                    <img
                                        className="block h-full object-cover"
                                        src={product.image}
                                        alt={product.image}
                                    ></img>
                                </div>
                            </SplideSlide>
                        ))}
                    </SplideTrack>
                </Splide>
            </div>
            {/* --------------- */}
            <div className="hidden w-full md:flex lg:justify-center">
                <div className="hidden lg:w-[1200px] md:flex lg:justify-center">
                    <MenuItems />
                    <div
                        className={
                            styles.Carousel + " lg:flex-1 mt-[16px] mx-[12px]"
                        }
                    >
                        <Splide
                            hasTrack={false}
                            aria-label="Slider Product"
                            options={mainCarouselOptions}
                            ref={mainCarouselRef}
                            // className="md:h-[200px] lg:h-[280px]"
                        >
                            <SplideTrack>
                                {data.map((product, index) => (
                                    <SplideSlide key={index}>
                                        <div className="cursor-pointer h-full w-full">
                                            <img
                                                className="lg:h-full rounded-t-[12px] object-cover"
                                                src={product.image}
                                                alt={product.image}
                                            ></img>
                                        </div>
                                    </SplideSlide>
                                ))}
                            </SplideTrack>
                            <div className="SecondCarouselPagination">
                                <div className="splide__arrows advertisement">
                                    <button
                                        className="splide__arrow splide__arrow--prev"
                                        onClick={(e) =>
                                            handleMainClick(currentSlide - 1)
                                        }
                                    >
                                        <NavigateNextIcon />
                                    </button>
                                    <button
                                        className="splide__arrow splide__arrow--next"
                                        onClick={(e) =>
                                            handleMainClick(currentSlide + 1)
                                        }
                                    >
                                        <NavigateNextIcon />
                                    </button>
                                </div>
                            </div>
                            {/* border-none bg-slate-400 opacity-50 ml-[80px] w-[60px] h-[60px] */}
                        </Splide>
                        <Splide
                            options={thumbnailCarouselOptions}
                            ref={thumbnailCarouselRef}
                            onFirstInit={() => {
                                thumbnailCarouselRef.current.sync(
                                    mainCarouselRef.current
                                );
                            }}
                        >
                            {data.map((item, index) => (
                                <SplideSlide>
                                    <div
                                        className={
                                            (currentSlide == index
                                                ? styles.IsActive
                                                : "") +
                                            " hidden md:flex items-center h-full w-full px-4 cursor-pointer text-center text-[12px] hover:bg-gray-200"
                                        }
                                        onClick={() =>
                                            handleThumbnailClick(index)
                                        }
                                    >
                                        {item.slogan}
                                    </div>
                                </SplideSlide>
                            ))}
                        </Splide>
                    </div>
                    <div className="hidden lg:flex flex-wrap lg:w-[240px] mt-[10px]">
                        <img
                            className="object-contain w-full rounded-[12px] my-[6px]"
                            src={images.rightBanner1}
                            alt="Right banner 1"
                        />
                        <img
                            className="object-contain w-full rounded-[12px] my-[6px]"
                            src={images.rightBanner2}
                            alt="Right banner 2"
                        />
                        <img
                            className="object-contain w-full rounded-[12px] mt-[6px]"
                            src={images.rightBanner3}
                            alt="Right banner 3"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
export default AdvertisementSlide;
