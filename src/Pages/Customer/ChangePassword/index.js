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
        <div>
            <div className={styles.bg_primary + " flex justify-evenly text-2xl"}>
                <div className={styles.bg_white +" rounded-lg w-1/4 my-12 lg:block hidden"}>
                    <NavTag DivCss={"px-4 py-8"} setHref={"/customer/info"} spanCss={"mx-6"} spanContent={"Thông tin tài khoản"}
                        aCss={"mx-4 my-4"} setIcon={<PersonIcon sx={{ fontSize: 30 }}></PersonIcon>} />
                    <NavTag DivCss={"px-4 py-8"} setHref={"/customer/addresses"} spanCss={"mx-4"} spanContent={"Địa chỉ nhận hàng"}
                        aCss={"mx-4 my-4"} setIcon={<LocationOnIcon sx={{ fontSize: 30 }}></LocationOnIcon>} />
                    <NavTag DivCss={"px-4 py-8"} setHref={"/customer/history"} spanCss={"mx-6"} spanContent={"Đơn đặt hàng"}
                        aCss={"mx-4 my-4"} setIcon={<AssignmentIcon sx={{ fontSize: 30 }}></AssignmentIcon>} />
                    <NavTag DivCss={styles.bg_blue +" rounded-lg px-4 py-8 mx-6 my-8"} setHref={"#"} spanCss={"mx-6"} spanContent={"Đổi mặt khẩu"}
                        aCss={styles.text_blue} setIcon={<LockIcon sx={{ fontSize: 30, color: blue[700] }}></LockIcon>} />
                    <NavTag DivCss={"px-4 py-8"} setHref={"/customer/avatar"} spanCss={"mx-6"} spanContent={"Ảnh đại diện"}
                        aCss={"mx-4 my-4"} setIcon={<CropOriginalIcon sx={{ fontSize: 30 }}></CropOriginalIcon>} />
                    <NavTag DivCss={"px-4 py-8"} setHref={"/customer/productReviews"} spanCss={"mx-6"} spanContent={"Lịch sử đánh giá sản phẩm"}
                        aCss={"mx-4 my-4"} setIcon={<HistoryIcon sx={{ fontSize: 30 }}></HistoryIcon>} />
                    <NavTag DivCss={"px-4 py-8 mb-8"}  setHref={"/customer/baohanh"} spanCss={"mx-6"} spanContent={"Bảo hành"}
                        aCss={"mx-4 my-4"} setIcon={<GppGoodIcon sx={{ fontSize: 30 }}></GppGoodIcon>} />
                </div>
                <div className={styles.bg_white +" rounded-lg lg:w-2/5 my-12"}>
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
        </div>
    );
}

export default ChangePassword;