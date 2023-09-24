import React from 'react'

export default function NewsCard({data}) {    
    return (
        <div className='flex border-b-2 pb-3'>
            <a href={`/tin-tuc/${data?.slug}`} className='block w-[170px] h-[170px] shrink-0'>
                <img src={data?.image} alt={data?.title} className='w-full h-full object-cover rounded-[8px]' />
            </a>
            <div className='mx-[35px] mt-[30px] mb-[10px] flex flex-col	justify-between'>
                <a href={`/tin-tuc/${data?.slug}`} className='text-[18px] text-[#1D1D1F] font-semibold	block hover:text-[#4B4B4B]'>{data?.title}</a>
                <span className='text-[15px] text-[#86868B]'>{data?.dateSource}</span>
            </div>
        </div>
    )
}
