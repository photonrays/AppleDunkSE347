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
import Notice from "../Components/Notice";
import GppGoodIcon from '@mui/icons-material/GppGood';
import HandleApiCustomer from "../../../Apis/HandleApiCustomer";
import Swal from "sweetalert2";

function ChangePassword () {
    const user = JSON.parse(localStorage.getItem("user"));
    function handleSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        if(formData.get('accessPassword')!= formData.get('newPassword')){
            Swal.fire({
                position: "center",
                icon: "error",
                title: "Xác nhận mật khẩu thất bại",
                showConfirmButton: true,
            });
        } else {
        // console.log("vào đây");
         HandleApiCustomer.UpdatePass(user._id,{
            oldPassword: formData.get('oldPassword'),
            newPassword: formData.get('newPassword')
         }).then(async (res) => {
             await Swal.fire({
                 position: "center",
                 icon: "success",
                 title: "Cập nhật dữ liệu thành công!",
                 showConfirmButton: false,
                 timer: 500
             });
            
             window.location.reload();
         }).catch((err)=>{
            console.log(err);
             Swal.fire({
                 position: "center",
                 icon: "error",
                 title: "Cập nhật dữ liệu không thành công!",
                 showConfirmButton: false,
                 timer: 500
             });
 
         })
       }}
    return (
        <div style={{width:"100%"}}>
            
                <div className={styles.bg_white +" rounded-lg  my-12"}>
                    <Notice divCss={"mx-4 mt-8 mb-4 bg-slate-200 px-3 py-3 rounded-lg w-fit"} labelCss={"text-xl"} labelContent={"Lưu ý: Mật khẩu phải có tối thiểu 8 ký tự bao gồm chữ, số và các ký tự đặc biệt"}></Notice>
                    <form action="" onSubmit={handleSubmit}>
                        <LabelAndInput divCss={"w-full px-4 py-4"} inputName={"oldPassword"} inputType={"password"} inputCss={"border-2 rounded-lg w-full my-4 px-2 py-3"} labelContent={"Mật khẩu cũ:"} inputValue={''}/>
                        <LabelAndInput divCss={"w-full px-4 py-4"} inputName={"newPassword"} inputType={"password"} inputCss={"border-2 rounded-lg w-full my-4 px-2 py-3"} labelContent={"Mật khẩu mới:"} inputValue={''}/>
                        <LabelAndInput divCss={"w-full px-4 py-4"} inputName={"accessPassword"} inputType={"password"} inputCss={"border-2 rounded-lg w-full my-4 px-2 py-3"} labelContent={"Xác nhận mật khẩu:"} inputValue={''}/>
                        <div className="flex justify-center">
                            <button className="border-2 rounded-lg px-4 py-4 mb-5 bg-sky-600 text-white">Đổi mật khẩu</button>
                        </div>
                    </form>
                </div>
            </div>
        
    );
}

export default ChangePassword;