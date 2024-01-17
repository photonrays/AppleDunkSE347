import styles from "../Customer.module.css";
import { Link } from "react-router-dom";
import jsPDF from 'jspdf';
import { useState, useEffect } from "react";
import 'jspdf-autotable';
import Status from "./Status";
import HandleApiThanhToan from "../../../Apis/HandleApiThanhtoan"
import HandleApiOrder from "../../../Apis/HandleApiOrder";
import HandleApiProduct from "../../../Apis/HandleApiProduct";

//import hai file script thêm font chữ roboto hỗ trợ tiếng Việt vào trong jspdf
import "./Roboto-Bold.js";
import "./Roboto-Medium";
import images from "../../../assets/image/index.js";
import to_vietnamese from "./n2vi.js";
import html2canvas from 'html2canvas'

export default function Orderbilldetail({ order }) {
    const date = new Date(order.updatedAt);

    const day = date.getDate();
    const month = date.getMonth() + 1; // Lưu ý: Tháng trong đối tượng Date được đếm từ 0 đến 11
    const year = date.getFullYear();

    const user = JSON.parse(localStorage.getItem("user"));
    const [products, setProducts] = useState([]);

    var thanhTien = 0;
    const productData = products?.map((product, index) => {
        const item = order.products[index];
        const totalPrice = product ? product.gia * item.soluong : 0;
        thanhTien += totalPrice;
        return [product?.tensanpham  || '', item.soluong, new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.gia) || '', new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalPrice)];
    });

    //hàm lấy thông tin product theo productId
    const getProduct = async (proId) => {
        try {
            const response = await HandleApiProduct.getProductById(proId);
            return response;
        } catch (error) {
            console.log(error);
            return null;
        }
    };

    const fetchProducts = async () => {
        const productPromises = order.products.map((item) => getProduct(item.productId));
        const resolvedProducts = await Promise.all(productPromises);
        setProducts(resolvedProducts);
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    //gọi api cập nhật order
    const UpdateOrder = (id, url) => {
        HandleApiOrder.updateDonHang(order.madh, {
            transId: id,
            orderUrl: url
        })
            .then((response) => {
                window.open(response.orderUrl, "_blank");
            })
            .catch((error) => {
                console.log(error);
            });
    }

    //hàm thanh toán khi nhấn nút thanh toán lại
    const ThanhToan = () => {
        //gọi hàm thanh toán và set lại transId, orderUrl
        if (order.paymentMethod == "momo")
            HandleApiThanhToan.thanhtoanMoMo(order.tongtrigia)
                .then((res) => {
                    UpdateOrder(res.transId, res.orderUrl);
                })
                .catch((e) => {
                    console.log(e);
                })
        else
            HandleApiThanhToan.thanhtoanZalo(order.tongtrigia)
                .then((res) => {
                    UpdateOrder(res.transId, res.orderUrl);
                })
                .catch((e) => {
                    console.log(e);
                })
    }

    //hàm fomat định dạng tiền việt nam
    const formatCurrency = (value) => {
        const formattedValue = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        return `${formattedValue} đ`;
    };

    const generatePDF = () => {
        const doc = new jsPDF();
        const capture = document.querySelector('#bill-detail')
        html2canvas(capture).then((canvas) => {
            const imgData = canvas.toDataURL('img/png')
            const doc = new jsPDF('p', 'mm', 'a4');
            const componentWidth = doc.internal.pageSize.getWidth();
            const componentHeight = doc.internal.pageSize.getHeight();
            doc.addImage(imgData, 'PNG', 0, 0, componentWidth, componentHeight);
            doc.save(`order_${order.madh}.pdf`);
        })


        // doc.save(`order_${order.madh}.pdf`);
    }

    return (
        <div>
            <div className={styles.bg_white + " rounded-lg w-full mb-8 px-8 py-10 drop-shadow-lg"}>
                <ul>
                    <li className="flex justify-between mb-4">
                        <label>Mã đơn hàng:</label>
                        <b>{order.madh}</b>
                    </li>
                    <hr />
                    <li className="flex justify-between mt-4 mb-4">
                        <label>Ngày đặt hàng:</label>
                        <span>{day}/{month}/{year}</span>
                    </li>
                    <hr />
                    <li className="flex justify-between mt-4 mb-4">
                        <label>Tình trạng đặt hàng:</label>
                        <Status status={order.tinhtrang}></Status>
                    </li>
                </ul>
                <div className="flex items-center justify-center">
                    <button onClick={generatePDF} className={styles.bg_white + " text-sky-600 border-sky-600 border-2 rounded-lg px-10 py-4"}>
                        Xuất file PDF
                    </button>
                </div>
            </div>
            <div className={styles.bg_white + " rounded-lg w-full mb-8 px-8 py-10 drop-shadow-lg"}>
                <ul>
                    <li className="flex justify-between mb-4">
                        <label>Tên khách hàng:</label>
                        <span>{user?.hoten || "Chưa thiết lập"}</span>
                    </li>
                    <li className="flex justify-between mt-4 mb-4">
                        <label>Điện thoại:</label>
                        <span>{user?.sdt || "Chưa thiết lập"}</span>
                    </li>
                    <li className="flex justify-between mt-4 mb-4">
                        <label>E-mail:</label>
                        <span>{user?.email || "Chưa thiết lập"}</span>
                    </li>
                    <hr />
                    <li className="flex justify-between mt-4 mb-4">
                        <label className="w-[200px]">Địa chỉ nhận hàng:</label>
                        <span>{order?.address || "Chưa thiết lập"}</span>
                    </li>
                    <hr />
                    <li className="flex justify-between mt-4 mb-4">
                        <label>Phương thức thanh toán:</label>
                        <span>{order.paymentMethod}</span>
                    </li>
                    <li className="mt-4 mb-4">
                        <div className="flex justify-between">
                            <label>Tình trạng thanh toán:</label>
                            {(() => {
                                if (order.tinhtrang == "Đã thanh toán") return (<span>Thành công</span>);
                                else if (order.tinhtrang == "Đã hủy") return (<span>Đã hủy</span>);
                                else if (order.tinhtrang == "Chưa thanh toán") return (<span>Chưa thanh toán</span>);
                                else return (<span>Đang giao</span>);
                            })()}
                        </div>
                        {
                            (() => {
                                if (order.tinhtrang == "Chưa thanh toán" && order.orderUrl !== "Không có") {
                                    return (
                                        <div className="text-center">
                                            <button className="border-2 rounded-lg px-8 py-4 mt-8 mb-8 mx-auto bg-sky-600 text-white" onClick={ThanhToan}>Thử thanh toán lại</button>
                                            <p className="text-lg text-slate-400">Đơn đặt hàng này chưa được thanh toán. Để thanh toán ngay bây giờ, hãy nhấn vào nút "Thử thanh toán lại".</p>
                                        </div>
                                    );
                                } else {
                                    return null;
                                }
                            })()
                        }

                    </li>
                    <li className="mt-4 mb-4">
                        <label>Sản phẩm</label>
                        {order.products !== undefined &&
                            products.map((product, index) => {
                                const item = order.products[index];
                                return (
                                    <div className="mt-4 mb-4 rounded-lg border-2 px-4 py-3 flex justify-between" key={product._id}>
                                        {item !== undefined && (
                                            <div>
                                                <div>
                                                    <Link to="#" className="">
                                                        {product.tensanpham}
                                                    </Link>
                                                </div>
                                                <div>
                                                    <label>Số lượng: </label>
                                                    <span>{item.soluong}</span>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                    </li>
                    <li className="flex justify-between mt-4 mb-4">
                        <label>Tổng số tiền đã đặt hàng:</label>
                        <b className="text-2xl">{formatCurrency(order.tongtrigia)}</b>
                    </li>
                </ul>
            </div>
            {/* <div className="absolute bg-white opacity-0 bottom-0 -z-10"> */}
            <div className="absolute bg-white">
                <div className='p-5 text-2xl leading-10 container w-[803px] h-[1132px]' id="bill-detail">
                    <div className='grid grid-cols-2 items-center pb-10 z-10'>
                        <div>
                            <img src={images.logo} alt='logo' className='-ml-10' />
                            <p><span className='font-semibold'>Website:</span> https://appledunk.com</p>
                        </div>
                        <div className='text-center'>
                            <h1 className='text-7xl font-bold mb-7'>HÓA ĐƠN</h1>
                            <p>Ngày {day} tháng {month} năm {year}</p>
                            <p><span className='font-semibold'>Mã hóa đơn:</span> {order?.madh || "Không có"}</p>
                        </div>
                    </div>
                    <div className='z-10'>
                        <div className='grid grid-cols-3'>
                            <p className='col-span-2'><span className='font-semibold'>Tên khách hàng:</span> {user.hoten ? user.hoten : "Không có"}</p>
                            <p><span className='font-semibold'>SĐT:</span> {user?.sdt || 'Không có'}</p>
                        </div>
                        <p><span className='font-semibold'>Địa chỉ:</span> {order?.address || "Chưa thiết lập"}</p>
                        <p className='pb-5'><span className='font-semibold'>Phương thức thanh toán:</span> {order?.paymentMethod || "Chưa thiết lập"}</p>
                        <table class="table-auto w-[750px] m-4 text-center pb-5">
                            <thead className='bg-blue-500 pb-4 border-2 border-black'>
                                <tr className='text-3xl text-white'>
                                    <th className='p-4 border-r-2 border-black'>STT</th>
                                    <th className="border-r-2 border-black">Tên sản phẩm</th>
                                    <th className="border-r-2 border-black">Số lượng</th>
                                    <th >Đơn giá</th>
                                </tr>
                            </thead>
                            <tbody className='border-x-2 border-b-2 border-black'>
                                {productData.map((p, key) => {
                                    return (
                                        <tr className="h-16 border-b-2 border-black">
                                            <td className="border-r-2 border-black">{key + 1}</td>
                                            <td className="border-r-2 border-black">{p[0]}</td>
                                            <td className="border-r-2 border-black">{p[1]}</td>
                                            <td>{p[2]}</td>
                                        </tr>
                                    )
                                })}
                                <tr className="h-16">
                                    <td colSpan={2} className='text-center border-r-2 border-black'>Tổng cộng</td>
                                    <td className="border-r-2 border-black">{productData.length}</td>
                                    <td>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(order.tongtrigia)}</td>
                                </tr>
                            </tbody>
                        </table>
                        <p><span className='font-semibold'>Số tiền bằng chữ:</span> <span className="capitalize">{to_vietnamese(order.tongtrigia)}</span></p>
                    </div>
                </div>
            </div>
        </div>
    );
}