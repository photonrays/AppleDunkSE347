import { useState, useEffect, useRef } from "react";
import styles from "../Customer.module.css";
import PersonIcon from '@mui/icons-material/Person';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AssignmentIcon from '@mui/icons-material/Assignment';
import LockIcon from '@mui/icons-material/Lock';
import CropOriginalIcon from '@mui/icons-material/CropOriginal';
import HistoryIcon from '@mui/icons-material/History';
import { blue } from "@mui/material/colors";
import SelectTag from "../Components/SelectTag";
import NavTag from "../Components/NavTag";
import {  useNavigate } from "react-router-dom";
import LabelAndInput from "../Components/LabelAndInput";
import GppGoodIcon from '@mui/icons-material/GppGood';
import HandleApiCustomer from "../../../Apis/HandleApiCustomer";
import Swal from "sweetalert2";
import axios from "axios";
import ChangePassword from "../ChangePassword";
import Addresses from "../Addresses";

function Info2(){
    const user = JSON.parse(localStorage.getItem("user"));
    const [selectedGender, setSelectedGender] = useState(user.gioitinh? user.gioitinh : "Nam");
    const [data, setData] = useState("")
    const inputRef = useRef();
    const navigate = useNavigate();
    useEffect(() => {
        HandleApiCustomer.GetUserInfor()
            .then((res) => {
                // console.log(res);
                if (res.user.image.length !== 0) setData(res.user.image[0].url);
            })
            .catch((e) => {
                console.log(e);
            });
    }, []);
    const [selectedFile, setSelectedFile] = useState();
    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setSelectedFile(selectedFile);
        console.log(selectedFile);
    };
    const uploadFile = async (event) => {
        //const file = event.target.files[0];

        const formData = new FormData();
        formData.append("images", selectedFile);
        await axios
            .post(`http://localhost:3001/api/auth/upload/${user._id}`, formData)
            .then(async (res) => {
                await Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Cập nhật dữ liệu thành công!",
                    showConfirmButton: false,
                    timer: 500,
                });
                console.log(res);
                localStorage.setItem("user", JSON.stringify(res.data));
                window.location.reload();
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const hienThiNgaySinh = () => {
        if(user.ngaysinh){
            const dateParts = user.ngaysinh.split('-');
            return(
                <div>
                    <SelectTag setSelect={"Ngày"} Index={parseInt(dateParts[0])} setIndex={1} setLength={31} setCss={"border-2 rounded-lg px-3 py-3 my-4 mr-8"} setName={"date"}/>
                    <SelectTag setSelect={"Tháng"} Index={parseInt(dateParts[1])} setIndex={1} setLength={12} setCss={"border-2 rounded-lg px-3 py-3 my-4 mr-8"} setName={"month"}/>
                    <SelectTag setSelect={"Năm"} Index={parseInt(dateParts[2])} setIndex={1913} setLength={2023} setCss={"border-2 rounded-lg px-3 py-3 my-4"} setName={"year"}/>
                </div>
            )
        }
        else
            return(
                <div>
                    <SelectTag setSelect={"Ngày"} Index={1} setIndex={1} setLength={31} setCss={"border-2 rounded-lg px-3 py-3 my-4 mr-8"} setName={"date"}/>
                    <SelectTag setSelect={"Tháng"} Index={1} setIndex={1} setLength={12} setCss={"border-2 rounded-lg px-3 py-3 my-4 mr-8"} setName={"month"}/>
                    <SelectTag setSelect={"Năm"} Index={1999} setIndex={1913} setLength={2023} setCss={"border-2 rounded-lg px-3 py-3 my-4"} setName={"year"}/>
                </div>
            )
    }
    
    function changeFormatDate(num){
        if(parseInt(num)<10){
            return "0"+num.toString();
        }else{
            return num.toString();
        }
    }
    
    const handleGenderChange = (event) => {
        setSelectedGender(event.target.value);
    };

    function handleSubmit(event) {
       event.preventDefault();
        const formData = new FormData(event.target);
        const hoten = formData.get('Name');
        const email = formData.get('Email');
        const sdt = formData.get('Telephone');
        const gioitinh = formData.get('Gender')
        const day = formData.get('date');
        const month = formData.get('month');
        const year = formData.get('year');
        HandleApiCustomer.UpdateInfor(user._id,{
            hoten:hoten,
            email:email,
            sdt:sdt,
            gioitinh:gioitinh,
            ngaysinh:changeFormatDate(day)+"-"+changeFormatDate(month)+"-"+changeFormatDate(year)
        }).then(async (res) => {
            await Swal.fire({
                position: "center",
                icon: "success",
                title: "Cập nhật dữ liệu thành công!",
                showConfirmButton: false,
                timer: 500
            });
            localStorage.setItem('user', JSON.stringify(res)); //lưu lại vào trong localStorage
            window.location.reload();
        }).catch((err)=>{
            Swal.fire({
                position: "center",
                icon: "error",
                title: "Cập nhật dữ liệu không thành công!",
                showConfirmButton: false,
                timer: 500
            });
            console.log(err);
        })
      }
    
    return (
        <div>
            <div className={styles.bg_primary + " flex justify-items-center text-2xl"}>
                {/*<div className={styles.bg_white +" rounded-lg w-1/4 my-12 lg:block hidden"}>
                    <NavTag DivCss={styles.bg_blue +" rounded-lg px-4 py-8 mx-6 my-8"} setHref={"#"} spanCss={"mx-4"} spanContent={"Thông tin tài khoản"}
                        aCss={styles.text_blue} setIcon={<PersonIcon sx={{ fontSize: 30, color: blue[700] }}></PersonIcon>} />
                    <NavTag DivCss={"px-4 py-8"} setHref={"/customer/addresses"} spanCss={"mx-6"} spanContent={"Địa chỉ nhận hàng"}
                        aCss={"mx-4 my-4"} setIcon={<LocationOnIcon sx={{ fontSize: 30 }}></LocationOnIcon>} />
                    <NavTag DivCss={"px-4 py-8"} setHref={"/customer/history"} spanCss={"mx-6"} spanContent={"Đơn đặt hàng"}
                        aCss={"mx-4 my-4"} setIcon={<AssignmentIcon sx={{ fontSize: 30 }}></AssignmentIcon>} />
                    <NavTag DivCss={"px-4 py-8"} setHref={"/customer/changePassword"} spanCss={"mx-6"} spanContent={"Đổi mặt khẩu"}
                        aCss={"mx-4 my-4"} setIcon={<LockIcon sx={{ fontSize: 30 }}></LockIcon>} />
                    <NavTag DivCss={"px-4 py-8"} setHref={"/customer/avatar"} spanCss={"mx-6"} spanContent={"Ảnh đại diện"}
                        aCss={"mx-4 my-4"} setIcon={<CropOriginalIcon sx={{ fontSize: 30 }}></CropOriginalIcon>} />
                    <NavTag DivCss={"px-4 py-8"} setHref={"/customer/productReviews"} spanCss={"mx-6"} spanContent={"Lịch sử đánh giá sản phẩm"}
                        aCss={"mx-4 my-4"} setIcon={<HistoryIcon sx={{ fontSize: 30 }}></HistoryIcon>} />
                    <NavTag DivCss={"px-4 py-8 mb-8"}  setHref={"/customer/baohanh"} spanCss={"mx-6"} spanContent={"Bảo hành"}
                        aCss={"mx-4 my-4"} setIcon={<GppGoodIcon sx={{ fontSize: 30 }}></GppGoodIcon>} />
                </div>*/}
                {<div style={{width:"30%"}} class="sticky max-w-full pt-5 pb-5 px-3 mt-6 ml-10 shrink-0 md:w-4/12 md:flex-0 md:mt-0  rounded-lg w-1/4 my-12 lg:block hidden">
            <div class="relative flex flex-col min-w-0 break-words bg-white border-0 shadow-xl dark:bg-slate-850 dark:shadow-dark-xl rounded-2xl bg-clip-border">
              <img class="w-full rounded-t-2xl h-80" src="https://img.freepik.com/premium-vector/apple-background-flat-illustration_598748-19.jpg?w=2000" alt="profile cover image"/>
              <div class="flex flex-wrap justify-center -mx-3">
                <div class="w-4/12 max-w-full px-3 flex-0 justify-items-center ">
                  <div class="ml-6 mb-6 -mt-6 lg:mb-0 lg:-mt-16">
                  <input
        type="file"
        accept=".jpg, .png"
        name="Avatar"
        ref={inputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
      <label htmlFor="avatarInput">
        <img
          className="rounded-full border-2 w-60 h-60"
          src={user.image.length !== 0? user.image[0].url: "https://img.freepik.com/premium-vector/apple-background-flat-illustration_598748-19.jpg?w=2000"}
          alt="profile image"
          onClick={() => inputRef.current.click()}
        />
      </label>
                  </div>
                </div>
              </div>
              <div class="border-black/12.5 rounded-t-2xl p-6 text-center pt-0 pb-6 lg:pt-2 lg:pb-4">
                <div class="flex justify-between">
                <button type="button"  onClick={uploadFile} class="hidden px-8 py-2 font-bold leading-normal text-center text-white align-middle transition-all ease-in border-0 rounded-lg shadow-md cursor-pointer text-xs bg-slate-700 lg:block tracking-tight-rem hover:shadow-xs hover:-translate-y-px active:opacity-85">Đổi Ảnh Đại Diện</button>
                  <button type="button" class="block px-8 py-2 font-bold leading-normal text-center text-white align-middle transition-all ease-in border-0 rounded-lg shadow-md cursor-pointer text-xs bg-cyan-500 lg:hidden tracking-tight-rem hover:shadow-xs hover:-translate-y-px active:opacity-85">
                    <i class="ni ni-collection text-2.8"></i>
                  </button>
                  <button type="button"  onClick={()=>navigate("/customer/history")} class="hidden px-8 py-2 font-bold leading-normal text-center text-white align-middle transition-all ease-in border-0 rounded-lg shadow-md cursor-pointer text-xs bg-slate-700 lg:block tracking-tight-rem hover:shadow-xs hover:-translate-y-px active:opacity-85">Xem Đơn Hàngs</button>
                  <button type="button"  onClick={()=>navigate("/customer/baohanh2")} class="hidden px-8 py-2 font-bold leading-normal text-center text-white align-middle transition-all ease-in border-0 rounded-lg shadow-md cursor-pointer text-xs bg-slate-700 lg:block tracking-tight-rem hover:shadow-xs hover:-translate-y-px active:opacity-85">Xem Bảo Hành</button>
                  <button type="button"  onClick={()=>navigate("/customer/productReviews2")} class="hidden px-8 py-2 font-bold leading-normal text-center text-white align-middle transition-all ease-in border-0 rounded-lg shadow-md cursor-pointer text-xs bg-slate-700 lg:block tracking-tight-rem hover:shadow-xs hover:-translate-y-px active:opacity-85">Xem Bình Luận</button>
                  <button type="button" class="block px-8 py-2 font-bold leading-normal text-center text-white align-middle transition-all ease-in border-0 rounded-lg shadow-md cursor-pointer text-xs bg-slate-700 lg:hidden tracking-tight-rem hover:shadow-xs hover:-translate-y-px active:opacity-85">
                    <i class="ni ni-email-83 text-2.8"></i>
                  </button>
                </div>
              </div>

              <div class="flex-auto p-6 pt-0">
                {/*<div class="flex flex-wrap -mx-3">
                  <div class="w-full max-w-full px-3 flex-1-0">
                    <div class="flex justify-center">
                      <div class="grid text-center">
                        <span class="font-bold dark:text-white text-lg">22</span>
                        <span class="leading-normal dark:text-white text-sm opacity-80">Friends</span>
                      </div>
                      <div class="grid mx-6 text-center">
                        <span class="font-bold dark:text-white text-lg">10</span>
                        <span class="leading-normal dark:text-white text-sm opacity-80">Photos</span>
                      </div>
                      <div class="grid text-center">
                        <span class="font-bold dark:text-white text-lg">89</span>
                        <span class="leading-normal dark:text-white text-sm opacity-80">Comments</span>
                      </div>
                    </div>
                  </div>
                </div>*/}
                <div class="mt-6 text-center">
                  <h5 class="dark:text-white ">
                  {user.hoten ? user.hoten: "Chưa thiết lập"}
                    <span class="font-light"></span>
                  </h5>
                  <div class="mb-2 font-semibold leading-relaxed text-base dark:text-white/80 text-slate-700">
                    <i class="mr-2 dark:text-white ni ni-pin-3"></i>
                    {user.email?user.email : "Chưa thiết lập"}
                  </div>
                  <div class="mt-6 mb-2 font-semibold leading-relaxed text-base dark:text-white/80 text-slate-700">
                    <i class="mr-2 dark:text-white ni ni-briefcase-24"></i>
                    Khách Hàng
                  </div>
                  <div class="dark:text-white/80">
                    <i class="mr-2 dark:text-white ni ni-hat-3"></i>
                    University of Computer Science
                  </div>
                </div>
              </div>
            </div>
            <Addresses></Addresses>
          </div>}{
         <div style={{width:"100%",marginLeft:"45px",justifyItems:"center"}}>







                <div style={{width:"90%"}}
                className={styles.bg_white +" rounded-lg  my-5 "}>
                    {user?
                    <form action="#" onSubmit={handleSubmit}>
                        <div className="grid grid-cols-2 gap-8 mx-8 my-4 ">
                            <LabelAndInput divCss={"my-4"} labelContent={"Tên, Họ:"} inputType={"text"} inputName={"Name"} inputCss={"w-full border-2 rounded-lg pl-4 py-3 mt-2 text-gray-400"} inputValue={user.hoten?user.hoten : "Chưa thiết lập"}/>
                            <LabelAndInput divCss={"my-4"} labelContent={"Email"} inputType={"email"} inputName={"Email"} inputCss={"w-full border-2 rounded-lg pl-4 py-3 mt-2 text-gray-400"} inputValue={user.email?user.email : "Chưa thiết lập"}/>
                        </div>
                        <div className="grid grid-cols-2 gap-8 mx-8 my-4">
                            <LabelAndInput inputType={"tel"} labelContent={"Số điện thoại"} inputName={"Telephone"} inputCss={"w-full border-2 rounded-lg pl-4 py-3 mt-2 text-gray-400"} inputValue={user.sdt || 'Chưa thiết lập'}/>
                            <div className="grid grid-rows-2">
                                <label htmlFor="Gender">Giới tính:</label>
                                <div className="content-center gap-8">
                                    <input type="radio" name="Gender" value="Nam" checked={selectedGender === "Nam"} onChange={handleGenderChange}/>
                                    <label className="mr-8 ml-4">Nam</label>
                                    <input type="radio" name="Gender" value="Nữ" checked={selectedGender === "Nữ"} onChange={handleGenderChange}/>
                                    <label className="ml-4">Nữ</label>
                                </div>
                            </div>
                        </div>
                        <div className="mx-8 my-4">
                            <label>Ngày sinh:</label> <br/>
                            {hienThiNgaySinh()}
                        </div>
                        <div className="mx-8 my-4">
                            <label>Username:</label> {user.hoten ? user.hoten: "Chưa thiết lập"}
                        </div>
                        <div className="flex justify-center my-4">
                            <button className="border-2 rounded-full px-8 py-4 bg-sky-600 text-white">Lưu lại</button>
                        </div>
                    </form> : <div className="flex justify-center">Không có thông tin</div>}
                    <ChangePassword></ChangePassword>
                </div>
                </div>
                
                
                }
                
            </div>
        </div>
    );
}

export default Info2;