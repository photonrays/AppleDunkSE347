import React from 'react'

export default function SubcribeSection() {
    return (
        <div className='mt-[111px] p-[50px] mb-[60px]'>
            <p className='text-[24px] text-[#1D1D1F] font-bold text-center'>Đăng ký nhận tin từ AppleDunk</p>
            <p className='text-[14px] text-[#515154] text-center py-[8px]'>Thông tin sản phẩm mới nhất và chương trình khuyến mãi</p>
            <div className='w-full flex justify-center mt-[16px]'>
                <input className='h-[40px] w-full max-w-[470px] pl-[20px] rounded-l-[40px] text-[14px]' placeholder='Email của bạn'></input>
                <button className='h-[40px] w-[100px] bg-[#0066CC] rounded-[40px] text-white text-[12px] hover:bg-[#248ece] ml-[-20px]'>Đăng ký</button>
            </div>
        </div>
    )
}
