import { Link, useLocation } from "react-router-dom"
import React, { useState, useEffect } from 'react';
import HandleApiBaohanh from '../../../Apis/HandleApiBaohanh';
import HandleApiOrder from "../../../Apis/HandleApiOrder";
import HandleApiHoaDon from "../../../Apis/HandleApiHoaDon";
import Swal from "sweetalert2";
export default ({method, tinhtrang, madonhang})=> {
    const location = useLocation();

    //các tham số query chung của zalopay và momo
    const searchParams = new URLSearchParams(location.search);
    const phuongThuc = searchParams.get("phuongthuc");
    const amount = searchParams.get("amount");

    //các tham số query của momo
    const partnerCode = searchParams.get("partnerCode");
    const orderId = searchParams.get("orderId");
    const requestId = searchParams.get("requestId");
    const orderInfo = searchParams.get("orderInfo");
    const orderType = searchParams.get("orderType");
    const transId = searchParams.get("transId");
    const resultCode = searchParams.get("resultCode");
    const message = searchParams.get("message");
    const payType = searchParams.get("payType");
    const responseTime = searchParams.get("responseTime");
    const extraData = searchParams.get("extraData");
    const signature = searchParams.get("signature");
    //các tham số query của zalo
    const appid = searchParams.get("appid");
    const apptransid = searchParams.get("apptransid");
    const discountamount = searchParams.get("discountamount");
    const checksum = searchParams.get("checksum");
    const pmcid = searchParams.get("pmcid");
    const bankcode = searchParams.get("bankcode");
    const status = searchParams.get("status");

    const user = JSON.parse(localStorage.getItem('user'));

    //Lấy ngày tháng hiện tại cho ngxuathd
    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1; // Lưu ý: Phương thức getMonth() trả về giá trị từ 0 - 11
    const year = currentDate.getFullYear();

    //lấy order bằng transId 
    let order  = {}
    const [donhang, setDonHang] = useState();

    //hàm lấy order bằng transId với momo, để tạo hóa đơn
    const getOrderByMomo = async() =>{
        await HandleApiOrder.getOrderByTransId(orderId)
        .then((response) => {
            order = response;
            setDonHang(response);
        })
        .catch((error) => {
            console.log(error);
        });
    }

    //hàm lấy order bằng transId với zalopay, để tạo hóa đơn
    const getOrderByZalo = async() => {
        await HandleApiOrder.getOrderByTransId(apptransid)
        .then((response) => {
            order = response;
            setDonHang(response);
        })
        .catch((error) => {
            console.log(error);
        });
    }
    
    //Tạo đối tượng hoadon để post vào api tạo hóa đơn
    let hoadon={};
    
    //Hàm tạo hóa đơn với data truyền từ giỏ hàng
    const addHoadon = async(hd) => {
        await HandleApiHoaDon.addHoaDon(hd)
        .then((response) => {
        })
        .catch((error) => {
            console.log(error);
        });
    }

    //hàm cập nhật lại tình trạng của order
    const UpdateOrder = async(madh)=>{
        await HandleApiOrder.updateDonHang(madh, {tinhtrang: "Đã thanh toán"})
        .then((response) => {
        })
        .catch((error) => {
            console.log(error);
        });
    }

    //Tạo bảo hành cho từng sản phẩm
    const AddBH = async()=>{
        // Duyệt qua từng sản phẩm trong order.products và tạo bảo hành cho từng sản phẩm
        for (const product of order.products) {
            const bhData = {
                makh: user.makh,
                masp: product.productId,
                mahd: order.madh,
                manv: "Không có",
                thoigian: `${day}/${month}/${year}`,
                nghethan: `${day}/${month}/${year + 1}`,
            };
            // Gọi API để tạo bảo hành cho sản phẩm
            await HandleApiBaohanh.addBH(bhData)
            .then((res)=>{
            })
            .catch ((error)=> {
                console.log(error);
            })
        }
    }

    //khi thanh toán thất bại thì lấy madh để vào trang chi tiết đơn hàng
    useEffect(()=>{
        if(tinhtrang==="thất bại")
            if(phuongThuc=="momo") getOrderByMomo();
            else if(phuongThuc=="zalo") getOrderByZalo();
    },[tinhtrang])

    //Hàm Xác nhận thanh toán, dùng để cập nhật giỏ hàng và tạo hóa đơn
    const Confirm= async()=>{
        if (phuongThuc=="momo" && resultCode == 0 && order!==undefined){
            await getOrderByMomo();
            hoadon = {  
                madh: order.madh,
                manv: "Không có",
                ngayxuathd: day+"/"+month+"/"+year,
            }
            await UpdateOrder(order.madh);
            await addHoadon(hoadon);
            await AddBH();
        }  
        else if (phuongThuc=="zalo" && status==1 && order!==undefined){
             await getOrderByZalo();
            hoadon = {  
                madh: order.madh,
                manv: "Không có",
                ngayxuathd: day+"/"+month+"/"+year,
            }
            await UpdateOrder(order.madh);
            await addHoadon(hoadon);
            await AddBH();
        }
        await Swal.fire({
            position: "center",
            icon: "success",
            title: "Xác nhận đơn hàng thành công!",
            showConfirmButton: false,
            timer: 500
        });
    }

    const [isConfirmed, setIsConfirmed] = useState(false);
    const handleConfirmation = () => {
        setIsConfirmed(true);
        Confirm();
    };

    return(
        <>
            {tinhtrang==="thành công" ?
                <>
                    <h1 className="text-green-500 font-bold mb-10 text-3xl">Thanh toán qua {method} {tinhtrang}</h1>
                    {isConfirmed ? (
                        <>
                            <p className="mb-10">Chúng tôi sẽ gửi xác nhận vào email cho bạn khi việc thanh toán được hoàn tất</p>
                            <strong className="mb-10">SỐ ĐƠN ĐẶT HÀNG: {madonhang}</strong><br/>
                            <div className="my-10">
                                {donhang &&
                                    <Link to={`/customer/orderdetail/${donhang.madh}`} className="text-blue-600">Nhấp vào đây để biết chi tiết đơn hàng</Link>
                                }
                            </div>
                            <div className="mb-10">
                                <Link to="/" className="border-2 rounded-lg px-8 py-4 mx-auto bg-sky-600 text-white">Tiếp tục mua hàng</Link>
                            </div>
                        </>
                    ) : (<>
                            <p className="mb-10">Nhấn nút Xác nhận đã thanh toán để hoàn tất tất cả công đoạn</p>
                            <button className="border-2 rounded-lg px-8 py-4 mx-auto bg-sky-600 text-white" onClick={handleConfirmation}>
                                Xác nhận đã thanh toán
                            </button>
                        </>
                    )}            
                </> : 
                <div className="my-10">
                    <h1 className="text-red-500 font-bold mb-10 text-3xl">Thanh toán qua {method} {tinhtrang}</h1>
                    {donhang !==undefined && 
                        <Link to={`/customer/orderdetail/${donhang.madh}`}className="text-blue-600">Nhấp vào đây để biết chi tiết đơn hàng và thanh toán lại.</Link>
                    }
                </div>
            }
        </>
    )
}