import React from 'react'
import {convertToSlug} from '../../../utils'

export default function ProductCard({ item }) {
    return (
        <div className='w-[100px] h-[200px] min-[400px]:w-[130px] min-[400px]:h-[240px] sm:w-[180px] sm:h-[280px] lg:w-[240px] lg:h-[360px] xl:w-[285px] xl:h-[412px] bg-white p-[7px] rounded-[8px] drop-shadow-[0_1px_8px_rgba(0,0,0,0.025)] cursor-pointer hover:drop-shadow-2xl'>
            <a href={`/detailproduct/${item._id}`}>
                <div className='flex justify-end mb-[5px] lg:mb-[12px] h-[20px] lg:h-[30px]'>
                    {item.soluong > 0 && <img src="https://shopdunk.com/images/uploaded/icon/san-hang-n.png" alt='' />}
                </div>
                <div className='w-full h-auto max-w-[245px] max-h-[245px] mb-[10px] lg:mb-[20px] mx-auto'>
                    <img src={item.imageList[0]} alt={item.tensanpham} className='max-w-full max-h-full object-contain'/>
                </div>
                <div className='mx-[13px] flex flex-col'>
                    <a href={convertToSlug(item.tensanpham)} className="text-2xl lg:text-[18px] text-[#1b1b1f] font-semibold line-clamp-2">{item.tensanpham}</a>
                    <div className='flex items-center'>
                        <span className="text-[#0066CC] text-lg lg:text-2xl mr-[5px]">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.gia)}</span>
                    </div>
                </div>
            </a>
        </div>
    )
}
