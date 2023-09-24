import React from 'react'

export default function NewsCard({data}) {
    return (
        <div className='h-[358px] bg-white rounded-2xl hover:drop-shadow-2xl'>
            <a href={`/tin-tuc/${data?.slug}`} className='block w-full h-[195px] shrink-0'>
                <img src={data?.image} alt={data?.title} className='h-full w-full object-cover rounded-t-2xl' />
            </a>
            <div className='h-[163px] px-[35px] py-[31px] flex flex-col justify-around shrink-0'>
                <a href={`/tin-tuc/${data?.slug}`} className='text-[18px] text-[#1d1d1f] font-bold'>{data?.title}</a>
                <span className='text-[15px] text-[#86868B]'>{data?.dateSource}</span>
            </div>
        </div>
    )
}
