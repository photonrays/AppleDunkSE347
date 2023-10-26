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
        api.getNewsById(id).then(result => setData(result))
    }, [id])

    return (
        <div className='w-full'>
            <div className='max-w-[1200px] m-auto min-h-[600px] flex pt-[30px] gap-[12px] pb-[30px] justify-center	'>
                <NewsSidebar type={data?.category} />
                <div className='w-full'>
                    <Breadcrumb data={{url: data?.slug, name: data?.title}}/>
                    <img src={data?.image} alt={data?.title} className='max-w-[800px] w-full h-auto rounded-3xl object-cover mx-auto ' />
                    <div className='w-full mt-[24px] border-2 rounded-3xl max-w-[800px] px-[25px] py-[21px] bg-white mx-auto '>
                        <h1 className='text-5xl text-[#393939] font-bold mb-5'>{data?.title}</h1>
                        <p className='text-[13px] text-[#86868B] mt-[6px] mb-10'>{data?.dateSource}</p>
                        {data && <div className='w-full'>{parse(data.detail)}</div>}
                    </div>
                </div>
            </div>
        </div>

    )
}
