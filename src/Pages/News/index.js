import React, { useEffect, useState } from 'react'
import api from '../../Apis/HandleApiNews'
import NewsSection from './components/NewsSection';
import Breadcrumb from './components/Breadcrumb';
export default function News() {
    const [firstNews, setFirstNews] = useState();
    const [appleNews, setAppleNews] = useState();
    const [reviews, setReviews] = useState();
    const [tricks, setTricks] = useState();
    const [others, setOthers] = useState();
    const [explore, setExplore] = useState();

    useEffect(() => {
        api.getAllNews(1, 3).then((data) => {
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

    return (
        <div className='w-full bg-[#f5f5f7]'>
            <Breadcrumb />
            <div className='w-[1200px] mx-auto'>
                <div className='h-[492px] w-full flex mb-[40px]'>
                    <div className='w-[787px] h-full bg-white rounded-xl mr-[20px] relative cursor-pointer overflow-hidden'>
                        <img className='w-full h-full object-cover' src={firstNews && firstNews.length !== 0 && firstNews[0].image} alt='news' />
                        <div className='absolute bottom-0 w-full flex items-center bg-gradient-to-t from-black'>
                            <p className='text-[#FBFBFB] text-[18px] ml-[25px] opacity-95 py-[25px]'>{firstNews && firstNews[0].title}</p>
                        </div>
                    </div>
                    <div className='h-full'>
                        <div className='w-[385px] h-[256px] bg-white rounded-xl mb-[20px] relative cursor-pointer overflow-hidden'>
                            <img className='w-full h-full object-cover' src={firstNews && firstNews.length !== 0 && firstNews[1].image} alt='news1' />
                            <div className='absolute bottom-0 w-full flex items-center bg-gradient-to-t from-black'>
                                <p className='text-[#FBFBFB] text-[18px] ml-[25px] opacity-95 py-[25px]'>{firstNews && firstNews[1].title}</p>
                            </div>
                        </div>
                        <div className='w-[385px] h-[216px] bg-white rounded-xl relative cursor-pointer overflow-hidden'>
                            <img className='w-full h-full object-cover' src={firstNews && firstNews.length !== 0 && firstNews[2].image} alt='news2' />
                            <div className='absolute bottom-0 w-full flex items-center bg-gradient-to-t from-black'>
                                <p className='text-[#FBFBFB] text-[18px] ml-[25px] opacity-95 py-[25px]'>{firstNews && firstNews[2].title}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='w-full flex justify-center gap-[16px] mb-[40px]'>
                    <a href='/apple-news' className='h-[47px] bg-white flex justify-center items-center px-[25px] py-[10px] text-[15px] text-[#515154] rounded-[8px] drop-shadow-sm hover:drop-shadow-xl'>Tin tức Apple</a>
                    <a href='/news-review' className='h-[47px] bg-white flex justify-center items-center px-[25px] py-[10px] text-[15px] text-[#515154] rounded-[8px] drop-shadow-sm hover:drop-shadow-xl'>Bài viết review</a>
                    <a href='/tin-kham-pha' className='h-[47px] bg-white flex justify-center items-center px-[25px] py-[10px] text-[15px] text-[#515154] rounded-[8px] drop-shadow-sm hover:drop-shadow-xl'>Khám phá</a>
                    <a href='/thu-thuat' className='h-[47px] bg-white flex justify-center items-center px-[25px] py-[10px] text-[15px] text-[#515154] rounded-[8px] drop-shadow-sm hover:drop-shadow-xl'>Thủ thuật</a>
                    <a href='/tin-khac' className='h-[47px] bg-white flex justify-center items-center px-[25px] py-[10px] text-[15px] text-[#515154] rounded-[8px] drop-shadow-sm hover:drop-shadow-xl'>Tin khác</a>
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
