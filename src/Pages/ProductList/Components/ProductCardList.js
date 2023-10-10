import React from 'react'
import { convertToSlug } from '../../../utils'
import { Memory, Storage } from '@mui/icons-material';

export default function ProductCardList({ item }) {
    return (
        <div className='w-full col-span-3 md:col-span-4 h-[160px] lg:h-[240px] bg-white p-[7px] rounded-[8px] drop-shadow-[0_1px_8px_rgba(0,0,0,0.025)] cursor-pointer hover:drop-shadow-2xl'>
            <a href={`/detailproduct/${item._id}`} className='flex h-full w-full'>
                <div className='flex flex-col h-full p-5 sm:min-w-[180px]'>
                    <div className='flex justify-end mb-[5px] lg:mb-[12px]'>
                        {item.soluong > 0 && <img src="https://shopdunk.com/images/uploaded/icon/san-hang-n.png" alt='' className='max-w-full max-h-full object-contain' />}
                    </div>
                    <div className='w-auto h-[80%] max-w-[160px] max-h-[245px] mb-[10px] lg:mb-[20px] mx-auto'>
                        <img src={item.imageList[0]} alt={item.tensanpham} className='max-w-full max-h-full object-contain' />
                    </div>
                </div>
                <div className='mx-[13px]'>
                    <a href={convertToSlug(item.tensanpham)} className="text-2xl md:text-[18px] text-[#1b1b1f] font-semibold line-clamp-1 mb-2 lg:my-5">{item.tensanpham}</a>
                    <div className='flex items-center mb-2 text-xl md:text-2xl'><Memory fontSize='large' /><span className='ml-2 line-clamp-1'>Hệ điều hành: {item.hedieuhanh}</span></div>
                    <div className='flex items-center mb-2 text-xl md:text-2xl'><Storage fontSize='large' /><span className='ml-2 line-clamp-1'>Ram: {item.ram}/ Rom: {item.rom}</span></div>
                    <p className='mb-2 text-xl md:text-2xl line-clamp-1'>Thời hạn bảo hành: {item.baohanh}</p>
                    <div className='flex items-center'>
                        <span className="text-[#0066CC] text-xl md:text-2xl mr-[5px]">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.gia)}</span>
                    </div>
                </div>
            </a>
        </div>
    )
}
