import styles from "../Customer.module.css";
import PersonIcon from '@mui/icons-material/Person';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AssignmentIcon from '@mui/icons-material/Assignment';
import LockIcon from '@mui/icons-material/Lock';
import CropOriginalIcon from '@mui/icons-material/CropOriginal';
import HistoryIcon from '@mui/icons-material/History';
import { blue } from "@mui/material/colors";
import NavTag from "../Components/NavTag";
import LabelAndInput from "../Components/LabelAndInput";
import CitySelect from "../Components/CitySelect";
import GppGoodIcon from '@mui/icons-material/GppGood';
import Swal from "sweetalert2";
import {  useNavigate } from "react-router-dom";
import HandleApiCustomer from "../../../Apis/HandleApiCustomer";

function Addaddress2 () {
    const user = JSON.parse(localStorage.getItem("user"));
    const navigate = useNavigate();
    function handleSubmit(event) {
        event.preventDefault();
         const formData = new FormData(event.target);
         const hoten = formData.get('Name');
         const email = formData.get('Email');
         const sdt = formData.get('Telephone');
         const diachi = formData.get('Detail')
         HandleApiCustomer.AddAdress(user._id,{
             ten:hoten,
             email:email,
             sdt:sdt,
             diachi:diachi
         }).then(async (res) => {
             await Swal.fire({
                 position: "center",
                 icon: "success",
                 title: "Thêm dữ liệu thành công!",
                 showConfirmButton: false,
                 timer: 500
             });
            
             navigate(-1)
         }).catch((err)=>{
             Swal.fire({
                 position: "center",
                 icon: "error",
                 title: "Thêm dữ liệu không thành công!",
                 showConfirmButton: false,
                 timer: 500
             });
 
         })
       }
    return (
        <div>
            <div className={styles.bg_primary + " flex justify-evenly text-2xl"}>
            
            <button type="button" onClick={()=>navigate(-1)} class=" mt-36 mx-10 w-16 h-16 flex items-center justify-center w-1/2 px-5 py-2 text-lg text-gray-700 transition-colors duration-200 bg-white border rounded-lg gap-x-2 sm:w-auto dark:hover:bg-gray-800 dark:bg-gray-900 hover:bg-gray-100 dark:text-gray-200 dark:border-gray-700">
    <svg class="w-5 h-5 rtl:rotate-180" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
    </svg>
    <span class="hidden md:inline">Go back to setting page</span>
<span class="inline md:hidden">Go back</span>
</button>
                <div className={styles.bg_white +" rounded-lg lg:w-2/5 m-12"}>
                    <form action="#" onSubmit={handleSubmit}>
                        <LabelAndInput divCss={"px-5 py-5"} inputValue={""} inputType={"text"} labelContent={"Tên:"} inputName={"Name"} inputCss={"w-full border-2 rounded-lg pl-4 py-3 mt-2 text-gray-400"}/>
                        <div className="grid grid-cols-2 ">
                            <LabelAndInput divCss={"px-5 py-5"} inputValue={""} inputType={"tel"} labelContent={"Số điện thoại:"} inputName={"Telephone"} inputCss={"w-full border-2 rounded-lg pl-4 py-3 mt-2 text-gray-400"}/>
                            <LabelAndInput divCss={"px-5 py-5"} inputValue={""} inputType={"email"} labelContent={"Email:"} inputName={"Email"} inputCss={"w-full border-2 rounded-lg pl-4 py-3 mt-2 text-gray-400"}/>
                            <div className="px-5 py-5">
                                <label>Quốc gia</label><br/>
                                <select className="w-full border-2 rounded-lg px-3 py-3 my-4 mr-8">
                                    <option value="">Chọn quốc gia</option>
                                    <option value="VN">Việt Nam</option>
                                </select>
                            </div>
                            <div className="px-5 py-5">
                                <CitySelect></CitySelect>
                            </div>
                            <LabelAndInput divCss={"px-5 py-5"} inputValue={""} inputType={"text"} labelContent={"Quận, huyện:"} inputName={"Quan"} inputCss={"w-full border-2 rounded-lg pl-4 py-3 mt-2 text-gray-400"}/>
                            <LabelAndInput divCss={"px-5 py-5"} inputValue={""} inputType={"text"} labelContent={"Phường, xã:"} inputName={"Phuong"} inputCss={"w-full border-2 rounded-lg pl-4 py-3 mt-2 text-gray-400"}/>
                        </div>
                        <LabelAndInput divCss={"px-5 py-5"} inputValue={""} inputType={"text"} labelContent={"Địa chỉ cụ thể:"} inputName={"Detail"} inputCss={"w-full border-2 rounded-lg pl-4 py-3 mt-2 text-gray-400"}/>
                        <div className="flex justify-center">
                            <button className="border-2 rounded-lg px-4 py-4 mb-5 bg-sky-600 text-white">Lưu lại</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Addaddress2;