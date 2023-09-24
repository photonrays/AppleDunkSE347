import styles from "../Customer.module.css";
import { useState } from "react";
import StarIcon from '@mui/icons-material/Star';
import { yellow } from "@mui/material/colors";
import { Link } from "react-router-dom";

export default ({ productname, date, star, comment}) => {

    const [text, setText] = useState(comment);
    const [rate, setRate] = useState(star);

    const handleComment = (event) => {
        setText(event.target.value);
    };

    const handleRate = (event) => {
        setRate(event.target.value);
    }

    return (
        <div className={styles.bg_white +" rounded-lg w-full mb-8 drop-shadow-lg"}>
            <div className="px-4 py-4">
                <ul>
                    <li className="mb-4">
                        <b>{productname}</b>
                    </li>
                    <li className="mb-4">
                        <span className="mr-20">Ngày: {date}</span>
                        <span>Đánh giá:</span>
                        <strong>
                            <StarIcon sx={{ fontSize: 20, color: yellow[500] }}/>
                            <input type="number" className="" step="1" min="1" max="5" value={rate} onChange={handleRate}/>    
                        </strong>
                    </li>
                    <li>
                        <textarea className="w-full rounded-lg border-2 px-4 py-4" value={text} onChange={handleComment}/>
                    </li>
                    <li className="my-4 text-end">
                        {/* <Link to={{ pathname: `/customer/orderdetail/${madonhang}/${status}` }} className="mx-3 mb-4 text-sky-600">Chi tiết đơn hàng</Link> */}
                        <Link to={{ pathname: `customer/orderdetail/2013/green` }} className="mx-3 mb-4 text-sky-600">Chi tiết đơn hàng</Link>
                    </li>
                </ul>
            </div>
        </div>
    );
}