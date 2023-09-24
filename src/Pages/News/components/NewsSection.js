import React from 'react'
import NewsCard from './NewsCard'

export default function NewsSection({data, title, url, category}) {
  return (
    <div>
        <h2 className='text-[32px] text-[#1D1D1F]'>{title}</h2>
                <div className='mt-[20px] grid grid-cols-2 gap-[20px] gap-y-[40px] mb-[20px]'>
                    {data?.map((obj, index) => {
                        if (obj.category === category)
                            return <NewsCard key={index} data={obj} />
                        return <></>
                    })}
                </div>
                <a href={url} className='w-full block text-[14px] text-[#0066CC] pb-[40px] text-center'>Xem tất cả {title} {">"}</a>
    </div>
  )
}
