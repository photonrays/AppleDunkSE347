import React, { useEffect, useState } from 'react'
import api from '../../Apis/HandleApiNews'
import NewsSection from './components/NewsSection';
import Breadcrumb from './components/Breadcrumb';
import { Splide, SplideSlide, SplideTrack } from '@splidejs/react-splide';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

export default function News() {
    const [firstNews, setFirstNews] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [appleNews, setAppleNews] = useState();
    const [reviews, setReviews] = useState();
    const [tricks, setTricks] = useState();
    const [others, setOthers] = useState();
    const [explore, setExplore] = useState();

    useEffect(() => {
        api.getAllNews(1, 3).then((data) => {
            setIsLoading(false)
            setFirstNews(data.listNews)
        })
        api.getAllNews(1, 4, 'appleNews').then((data) => {
            setAppleNews(data.listNews)
        })
        api.getAllNews(1, 4, 'review').then((data) => {
            setReviews(data.listNews)
        })
        api.getAllNews(1, 4, 'trick').then((data) => {
            setTricks(data.listNews)
        })
        api.getAllNews(1, 4, 'other').then((data) => {
            setOthers(data.listNews)
        })
        api.getAllNews(1, 4, 'explore').then((data) => {
            setExplore(data.listNews)
        })
    }, [])

    const options = {
        rewind: true,
        type: "loop",
        speed: 1400,
        perPage: 1,
        perMove: 1,
        autoplay: true,
        pagination: true,
        paginationKeyboard: true,
    };

    return (
        <div className='w-full bg-[#f5f5f7]'>
            <Breadcrumb />
            <div className='w-full max-w-[1200px] mx-auto px-5'>
                {isLoading ?
                    <div className='h-[492px] w-full md:grid grid-cols-3 grid-rows-2 mb-[40px] hidden '>
                        <div className='block max-w-[787px] h-full col-span-2 row-span-2 bg-gray-400 animate-pulse rounded-xl mr-[20px] relative cursor-pointer overflow-hidden'>
                        </div>
                        <div className='h-full'>
                            <div className='block max-w-[385px] h-[256px] bg-gray-400 animate-pulse rounded-xl mb-[20px] relative cursor-pointer overflow-hidden'>
                            </div>
                            <div className='block max-w-[385px] h-[216px] bg-gray-400 animate-pulse rounded-xl relative cursor-pointer overflow-hidden'>
                            </div>
                        </div>
                    </div>
                    :
                    <div className='h-[492px] w-full md:flex mb-[40px] hidden'>
                        <a href={`/tin-tuc/${firstNews && firstNews[0]?.slug}`} className='block max-w-[787px] h-full bg-white rounded-xl mr-[20px] relative cursor-pointer overflow-hidden'>
                            <img className='w-full h-full object-cover' src={firstNews && firstNews.length !== 0 && firstNews[0].image} alt='news' />
                            <div className='absolute bottom-0 w-full flex items-center bg-gradient-to-t from-black'>
                                <p className='text-[#FBFBFB] text-[18px] ml-[25px] opacity-95 py-[25px]'>{firstNews && firstNews[0].title}</p>
                            </div>
                        </a>
                        <div className='h-full'>
                            <a href={`/tin-tuc/${firstNews && firstNews[0]?.slug}`} className='block max-w-[385px] h-[256px] bg-white rounded-xl mb-[20px] relative cursor-pointer overflow-hidden'>
                                <img className='w-full h-full object-cover' src={firstNews && firstNews.length !== 0 && firstNews[1].image} alt='news1' />
                                <div className='absolute bottom-0 w-full flex items-center bg-gradient-to-t from-black'>
                                    <p className='text-[#FBFBFB] text-[18px] ml-[25px] opacity-95 py-[25px]'>{firstNews && firstNews[1].title}</p>
                                </div>
                            </a>
                            <a href={`/tin-tuc/${firstNews && firstNews[0]?.slug}`} className='block max-w-[385px] h-[216px] bg-white rounded-xl relative cursor-pointer overflow-hidden'>
                                <img className='w-full h-full object-cover' src={firstNews && firstNews.length !== 0 && firstNews[2].image} alt='news2' />
                                <div className='absolute bottom-0 w-full flex items-center bg-gradient-to-t from-black'>
                                    <p className='text-[#FBFBFB] text-[18px] ml-[25px] opacity-95 py-[25px]'>{firstNews && firstNews[2].title}</p>
                                </div>
                            </a>
                        </div>
                    </div>}

                {isLoading ? <div className='w-full max-w-[787px] h-[300px] mx-auto md:hidden block mb-[40px] bg-gray-400 animate-pulse rounded-xl'>

                </div> : <div className='w-full mx-auto md:hidden block mb-[40px]'>
                    <Splide hasTrack={false} options={options} aria-label="Slider Product">
                        <div className="mainSlider">
                            <SplideTrack>
                                <SplideSlide >
                                    <a href={`/tin-tuc/${firstNews && firstNews[0]?.slug}`} className='block max-w-[787px] h-full bg-white rounded-xl mr-[20px] relative cursor-pointer overflow-hidden'>
                                        <img className='w-full h-full object-cover' src={firstNews && firstNews.length !== 0 && firstNews[0].image} alt='news' />
                                        <div className='absolute bottom-0 w-full flex items-center bg-gradient-to-t from-black'>
                                            <p className='text-[#FBFBFB] text-[18px] ml-[25px] opacity-95 py-[25px]'>{firstNews && firstNews[0].title}</p>
                                        </div>
                                    </a>
                                </SplideSlide>
                                <SplideSlide >
                                    <a href={`/tin-tuc/${firstNews && firstNews[1]?.slug}`} className='block max-w-[787px] h-full bg-white rounded-xl mr-[20px] relative cursor-pointer overflow-hidden'>
                                        <img className='w-full h-full object-cover' src={firstNews && firstNews.length !== 0 && firstNews[1].image} alt='news' />
                                        <div className='absolute bottom-0 w-full flex items-center bg-gradient-to-t from-black'>
                                            <p className='text-[#FBFBFB] text-[18px] ml-[25px] opacity-95 py-[25px]'>{firstNews && firstNews[1].title}</p>
                                        </div>
                                    </a>
                                </SplideSlide>
                                <SplideSlide >
                                    <a href={`/tin-tuc/${firstNews && firstNews[2]?.slug}`} className='block max-w-[787px] h-full bg-white rounded-xl mr-[20px] relative cursor-pointer overflow-hidden'>
                                        <img className='w-full h-full object-cover' src={firstNews && firstNews.length !== 0 && firstNews[2].image} alt='news' />
                                        <div className='absolute bottom-0 w-full flex items-center bg-gradient-to-t from-black'>
                                            <p className='text-[#FBFBFB] text-[18px] ml-[25px] opacity-95 py-[25px]'>{firstNews && firstNews[2].title}</p>
                                        </div>
                                    </a>
                                </SplideSlide>

                            </SplideTrack>
                        </div>
                        <div className="paginationSlider">
                            <div className="splide__arrows">
                                <button className="splide__arrow splide__arrow--prev">
                                    <NavigateNextIcon fontSize='small' />
                                </button>
                                <button className="splide__arrow splide__arrow--next  ">
                                    <NavigateNextIcon />
                                </button>
                            </div>
                        </div>
                    </Splide>
                </div>}

                <div className='w-full flex mb-8'>
                    <div className='mx-auto flex gap-[16px] overflow-x-scroll pb-5 items-center'>
                        <a href='/apple-news' className='h-[47px] shrink-0 bg-white flex justify-center items-center px-[25px] py-[10px] text-[15px] text-[#515154] rounded-[8px] drop-shadow-sm hover:drop-shadow-xl'>Tin tức Apple</a>
                        <a href='/news-review' className='h-[47px] shrink-0 bg-white flex justify-center items-center px-[25px] py-[10px] text-[15px] text-[#515154] rounded-[8px] drop-shadow-sm hover:drop-shadow-xl'>Bài viết review</a>
                        <a href='/tin-kham-pha' className='h-[47px] shrink-0 bg-white flex justify-center items-center px-[25px] py-[10px] text-[15px] text-[#515154] rounded-[8px] drop-shadow-sm hover:drop-shadow-xl'>Khám phá</a>
                        <a href='/thu-thuat' className='h-[47px] shrink-0 bg-white flex justify-center items-center px-[25px] py-[10px] text-[15px] text-[#515154] rounded-[8px] drop-shadow-sm hover:drop-shadow-xl'>Thủ thuật</a>
                        <a href='/tin-khac' className='h-[47px] shrink-0 bg-white flex justify-center items-center px-[25px] py-[10px] text-[15px] text-[#515154] rounded-[8px] drop-shadow-sm hover:drop-shadow-xl'>Tin khác</a>
                    </div>
                </div>
                <NewsSection data={appleNews} title="Tin tức Apple" url="/apple-news" category="appleNews" />
                <NewsSection data={reviews} title="Bài viết review" url="/news-review" category="review" />
                <NewsSection data={explore} title="Khám phá" url="/tin-kham-pha" category="explore" />
                <NewsSection data={tricks} title="Thủ thuật" url="/thu-thuat" category="trick" />
                <NewsSection data={others} title="Tin khác" url="/tin-khac" category="other" />
            </div>
        </div>
    )
}
