import styles from "../Customer.module.css";
import { useState,useEffect } from "react";
import SortIcon from '@mui/icons-material/Sort';
import PersonIcon from '@mui/icons-material/Person';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AssignmentIcon from '@mui/icons-material/Assignment';
import LockIcon from '@mui/icons-material/Lock';
import CropOriginalIcon from '@mui/icons-material/CropOriginal';
import HistoryIcon from '@mui/icons-material/History';
import { blue } from "@mui/material/colors";
import NavTag from "../Components/NavTag";
import Preview from "../Components/Preview";
import GppGoodIcon from '@mui/icons-material/GppGood';
import HandleApiCustomer from "../../../Apis/HandleApiCustomer";
import {  useNavigate } from "react-router-dom";

function ProductReviews2 () {
    const user = JSON.parse(localStorage.getItem("user"));
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [selectedValue, setSelectedValue] = useState('rate_increase');
    
    useEffect(() => {
        let order = selectedValue==="rate_increase"?'asc':'desc';
        console.log(order);
        HandleApiCustomer.GetDG("KH1",order)
        .then((res) => {
            setData(res);
            console.log(data);

        });
    }, [selectedValue]);
    const handleSelectChange = (event) => {
        setSelectedValue(event.target.value);
      };
    return (
        <div>
            
            <div className={styles.bg_primary + " flex justify-evenly text-2xl"}>
            <button type="button" onClick={()=>navigate(-1)} class=" mt-36 mx-10 w-20 h-16 flex items-center justify-center w-1/2 px-5 py-2 text-lg text-gray-700 transition-colors duration-200 bg-white border rounded-lg gap-x-2 sm:w-auto dark:hover:bg-gray-800 dark:bg-gray-900 hover:bg-gray-100 dark:text-gray-200 dark:border-gray-700">
    <svg class="w-5 h-5 rtl:rotate-180" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
    </svg>
    <span class="hidden md:inline">Go back to setting page</span>
<span class="inline md:hidden">Go back</span>
</button>
                <div className={"lg:w-2/5 my-12"}>
                    <div className="flex justify-end">
                        <div className="relative">
                            <div className="mr-4 pl-3 mt-2 absolute top-0 left-0">
                                <SortIcon sx={{ fontSize: 25, color: blue[600] }}/>
                            </div>
                            <select value={selectedValue}
                                    onChange={handleSelectChange} className={styles.bg_white+ " text-sky-600 border-sky-600 focus-visible:border-sky-600 border-2 rounded-lg pl-14 pr-2 py-2  mb-10 mr-6"}>
                                {/*<option value="date_increase">Ngày tăng dần</option>
                                <option value="date_derease">Ngày giảm dần</option>*/}
                                <option value="rate_increase">Đánh giá cao đến thấp</option>
                                <option value="rate_decrease">Đánh giá thấp đến cao</option>
                            </select>
                        </div>
                    </div>
                    {data?.map((item, index) => (
                        <Preview productname={"Iphone 12 pro max"} date={item.createdAt.substring(0, 10)} star={item.rating} comment={item.binhluan} key={item._id}/>
                    ))}
                    <div className="flex justify-center my-4">
                        <button className="border-2 rounded-full px-8 py-4 bg-sky-600 text-white">Lưu lại</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductReviews2;