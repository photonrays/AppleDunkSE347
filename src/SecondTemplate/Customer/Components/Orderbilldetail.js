import styles from "../Customer.module.css";
import { Link } from "react-router-dom";
import jsPDF from 'jspdf';
import { useState,useEffect } from "react";
import 'jspdf-autotable';
import Status from "./Status";
import HandleApiThanhToan from "../../../Apis/HandleApiThanhtoan"
import HandleApiOrder from "../../../Apis/HandleApiOrder";
import HandleApiProduct from "../../../Apis/HandleApiProduct";

//import hai file script thêm font chữ roboto hỗ trợ tiếng Việt vào trong jspdf
import "./Roboto-Bold.js";
import "./Roboto-Medium";

export default ({ order }) => {
    const date = new Date(order.updatedAt);
    
    const day = date.getDate();
    const month = date.getMonth() + 1; // Lưu ý: Tháng trong đối tượng Date được đếm từ 0 đến 11
    const year = date.getFullYear();
    
    const user = JSON.parse(localStorage.getItem("user"));
    const [products, setProducts] = useState([]);

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
    const UpdateOrder = (id, url)=>{
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
    const ThanhToan = ()=>{
        //gọi hàm thanh toán và set lại transId, orderUrl
        if(order.paymentMethod == "momo") 
            HandleApiThanhToan.thanhtoanMoMo(order.tongtrigia)
            .then((res)=>{
                UpdateOrder(res.transId, res.orderUrl);
            })
            .catch((e)=>{
                console.log(e);
            })
        else
            HandleApiThanhToan.thanhtoanZalo(order.tongtrigia)
            .then((res)=>{
                UpdateOrder(res.transId, res.orderUrl);
            })
            .catch((e)=>{
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

        //đặt fontsize cho cả file pdf
        doc.setFontSize(10);
        doc.setFont("Roboto", "bold");
        doc.text(5, 5, `Mã đơn hàng: ${order?.madh || "Không có"}`);
        doc.text(5, 10, `https://appledunk.com`);
        doc.text(5, 15, `Ngày: ${day}/${month}/${year}`);
        doc.setFont("Roboto", "medium");
        doc.text(10, 20, `Tên: ${user.hoten ?  user.hoten : "Không có"}`);
        doc.text(10, 25, `Số điện thoại: ${user?.sdt || 'Không có'}`);
        doc.text(10, 30, `Địa chỉ:`);
        doc.text(20, 35, `${order?.address || "Chưa thiết lập"}`);
        doc.text(10, 40, `Phương thức thanh toán: ${order?.paymentMethod || "Chưa thiết lập"}`);
        doc.setFont("Roboto", "bold");
        doc.text(10, 55, `Các sản phẩm:`);
        doc.setFont("Roboto", "medium");

        //tạo các dòng dữ liệu cho bảng
        const productData = products.map((product, index) => {
            const item = order.products[index];
            const totalPrice = product ? product.gia * item.soluong : 0;
            return [product?.tensanpham || '', product?.masp || '', `${product.gia} đ` || '', item.soluong, `${totalPrice} đ`];
          });
        
        //tạo bảng
        doc.autoTable({
            head: [["Tên", "Mã sản phẩm", "Giá", "Số lượng", "Tổng"]],
            body: productData,
            startY: 60,
            styles: {font: "Roboto"}
        });
        
        //tính chiều dài của bảng
        const tableHeight = 60 + products.length*5 + 10;

        doc.setFont("Roboto", "bold");
        doc.setFontSize(10);
        doc.text(190, tableHeight + 20, `Tổng: ${order.tongtrigia}`, { align: "right" });

        //lưu file về máy client
        doc.save(`order_${order.madh}.pdf`);
    }
    
    return(
        <div>
            <div className={styles.bg_white +" rounded-lg w-full mb-8 px-8 py-10 drop-shadow-lg"}>
                <ul>
                    <li className="flex justify-between mb-4">
                        <label>Mã đơn hàng:</label>
                        <b>{order.madh}</b>
                    </li>
                    <hr/>
                    <li className="flex justify-between mt-4 mb-4">
                        <label>Ngày đặt hàng:</label>
                        <span>{day}/{month}/{year}</span>
                    </li>
                    <hr/>
                    <li className="flex justify-between mt-4 mb-4">
                        <label>Tình trạng đặt hàng:</label>
                        <Status status={order.tinhtrang}></Status>
                    </li>
                </ul>
                <div className="flex items-center justify-center">
                    <button onClick={generatePDF} className={styles.bg_white+ " text-sky-600 border-sky-600 border-2 rounded-lg px-10 py-4"}>
                        Xuất file PDF
                    </button>
                </div>
            </div>
            <div className={styles.bg_white +" rounded-lg w-full mb-8 px-8 py-10 drop-shadow-lg"}>
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
                    <hr/>
                    <li className="flex justify-between mt-4 mb-4">
                        <label className="w-[200px]">Địa chỉ nhận hàng:</label>
                        <span>{ order?.address || "Chưa thiết lập"}</span>
                    </li>
                    <hr/>
                    <li className="flex justify-between mt-4 mb-4">
                        <label>Phương thức thanh toán:</label>
                        <span>{order.paymentMethod}</span>
                    </li>
                    <li className="mt-4 mb-4">
                        <div className="flex justify-between">
                            <label>Tình trạng thanh toán:</label>
                            {(()=>{
                                if(order.tinhtrang == "Đã thanh toán")return (<span>Thành công</span>);
                                else if (order.tinhtrang=="Đã hủy") return (<span>Đã hủy</span>);
                                else if (order.tinhtrang=="Chưa thanh toán") return (<span>Chưa thanh toán</span>);
                                else return (<span>Đang giao</span>);
                            })()}
                        </div>
                        { 
                            (() => {
                                if (order.tinhtrang == "Chưa thanh toán" && order.orderUrl!=="Không có") {
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
        </div>
    );
}