import React from 'react'

export default function AnotherNewsCard({ data }) {
    console.log(data)
    return (
        <div className='w-full h-[220px] flex bg-white p-5 rounded-2xl hover:drop-shadow-2xl col-span-1 sm:col-span-2 lg:col-span-3'>
            <a href={`/tin-tuc/${data?.slug}`} className='block w-1/2 max-w-[300px] shrink-0'>
                <img src={data?.image} alt={data?.title} className='h-full w-full object-cover rounded-2xl' />
            </a>
            <div className='h-full px-10 py-5 flex flex-col grow'>
                <a href={`/tin-tuc/${data?.slug}`} className='text-3xl text-[#1d1d1f] font-bold line-clamp-2 mb-3 shrink-0'>{data?.title}</a>

                <div className='overflow-y-auto grow mb-2'>
                    <p className='text-xl overflow-hidden'>
                        {data?.description}
                        {/* {data?.description} */}
                    </p>
                </div>
                <span className='text-[15px] text-[#86868B]'>{data?.dateSource}</span>
            </div>
        </div>
    )
}
