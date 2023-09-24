import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom"
import api from '../../../Apis/HandleApiNews'
import parse from "html-react-parser"
import NewsSidebar from './NewsSidebar';
import Breadcrumb from '../../News/components/Breadcrumb';


export default function NewsPage() {
    const { id } = useParams();
    const [data, setData] = useState(null)

    useEffect(() => {
        api.getNewsById(id).then(result => setData(result.data))
    }, [id])

    return (
        <div className='w-full'>
            <div className='w-[1200px] m-auto min-h-[600px] flex pt-[30px] gap-[12px] pb-[30px] justify-center	'>
                <NewsSidebar type={data?.category} />
                <div className='flex flex-col'>
                    <Breadcrumb data={{url: data?.slug, name: data?.title}}/>
                    <img src={data?.image} alt={data?.title} className='w-[784px] h-[315px] rounded-3xl object-cover' />
                    <div className='mt-[24px] border-2 w-[784px] px-[25px] py-[21px] bg-white'>
                        <h1 className='text-[24px] text-[#393939] font-bold'>{data?.title}</h1>
                        <p className='text-[13px] text-[#86868B] mt-[6px]'>{data?.dateSource}</p>
                        {data && <div className='text-center w-full'>{parse(data.detail)}</div>}
                    </div>
                </div>
            </div>
        </div>

    )
}
