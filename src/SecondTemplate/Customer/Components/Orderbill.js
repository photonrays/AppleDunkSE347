import React from 'react';
import { Link } from 'react-router-dom';
import styles from "../Customer.module.css";
import Status from "./Status";

export default ({madonhang, date, total, method, status, id}) => {
    const updateAt = new Date(date);

    const day = updateAt.getDate();
    const month = updateAt.getMonth() + 1; // Lưu ý: Tháng trong đối tượng Date được đếm từ 0 đến 11
    const year = updateAt.getFullYear();

    //hàm fomat định dạng tiền việt nam
    const formatCurrency = (value) => {
        const formattedValue = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        return `${formattedValue} đ`;
    };

    return (
        <div className={styles.bg_white +" rounded-lg w-full mb-8 relative drop-shadow-lg"}>
            <div className="px-4 py-4">
                <ul>
                    <li className="mx-3 mb-4">
                        <label className="mr-3">Mã đơn hàng:</label>
                        <span>{madonhang}</span>
                    </li>
                    <li className="mx-3 my-8">
                        <label className="mr-3">Ngày đặt hàng:</label>
                        <span>{day}/{month}/{year}</span>
                    </li>
                    <li className="mx-3 my-8">
                        <label className="mr-3">Tổng tiền:</label>
                        <b>{formatCurrency(total)}</b>
                    </li>
                    <li className="mx-3 my-8">
                        <label className="mr-3">Phương thức thanh toán:</label>
                        <b>{method}</b>
                    </li>
                </ul>
                <Link to={{ pathname: `/customer/orderdetail/${madonhang}` }} className="mx-3 mb-4 text-sky-600">Xem chi tiết</Link>
            </div>
            <div className="absolute top-0 right-0">
                <Status status={status}></Status>
            </div>
        </div>
    );
}