import React from 'react'
import images from '../../../../assets/image'
import to_vietnamese from '../n2vi'
import './index.css'

export default function BillTemplate({ order, user, products, day, month, year }) {
    var thanhTien = 0;
    const productData = products?.map((product, index) => {
        const item = order.products[index];
        const totalPrice = product ? product.gia * item.soluong : 0;
        thanhTien += totalPrice;
        return [product?.tensanpham || '', product?.masp || '', item.soluong, `${product.gia} đ` || '', `${totalPrice} đ`];
    });
    return (
        <div className='p-5 text-2xl leading-10 container' id="bill-detail">
            <div className='grid grid-cols-2 items-center pb-10 '>
                <div>
                    <img src={images.logo} alt='logo' className='-ml-10' />
                    <p><span className='font-semibold'>Website:</span> https:appledunk.com</p>
                </div>
                <div className='text-center'>
                    <h1 className='text-7xl font-bold mb-7'>HÓA ĐƠN</h1>
                    <p>Ngày {day} tháng {month} năm {year}</p>
                    <p><span className='font-semibold'>Mã hóa đơn:</span> {order?.madh || "Không có"}</p>
                </div>
            </div>
            <div className=''>
                <div className='grid grid-cols-3'>
                    <p className='col-span-2'><span className='font-semibold'>Tên khách hàng:</span> {user.hoten ? user.hoten : "Không có"}</p>
                    <p><span className='font-semibold'>SĐT:</span> {user?.sdt || 'Không có'}</p>
                </div>
                <p><span className='font-semibold'>Địa chỉ:</span> {order?.address || "Chưa thiết lập"}</p>
                <p className='pb-5'><span className='font-semibold'>Phương thức thanh toán:</span> {order?.paymentMethod || "Chưa thiết lập"}</p>
                <table class="table-auto w-full m-4 text-center border-2 border-gray-700 pb-5">
                    <thead className='bg-blue-500'>
                        <tr className='text-3xl text-white'>
                            <th className='p-4'>STT</th>
                            <th>Tên sản phẩm</th>
                            <th>Mã sản phẩm</th>
                            <th>Số lượng</th>
                            <th>Đơn giá</th>
                            <th>Thành tiền</th>
                        </tr>
                    </thead>
                    <tbody className=''>

                        {productData.map((p, key) => {
                            return (
                                <tr>
                                    <td>{key + 1}</td>
                                    <td>{p[0]}</td>
                                    <td>{p[1]}</td>
                                    <td>{p[2]}</td>
                                    <td>{p[3]}</td>
                                    <td>{p[4]}</td>
                                </tr>
                            )
                        })}
                        <tr>
                            <td colSpan={3} className='text-center'>Tổng cộng</td>
                            <td>{productData.length}</td>
                            <td colSpan={2}>{thanhTien}</td>
                        </tr>
                    </tbody>
                </table>
                <p><span className='font-semibold'>Số tiền bằng chữ:</span> {to_vietnamese(thanhTien)}</p>
            </div>
        </div>
    )
}
