import styles from "../Customer.module.css";
import PersonIcon from "@mui/icons-material/Person";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AssignmentIcon from "@mui/icons-material/Assignment";
import LockIcon from "@mui/icons-material/Lock";
import CropOriginalIcon from "@mui/icons-material/CropOriginal";
import HistoryIcon from "@mui/icons-material/History";
import { blue } from "@mui/material/colors";
import NavTag from "../Components/NavTag";
import AvatarImg from "../Components/AvatarImg";
import GppGoodIcon from "@mui/icons-material/GppGood";
import { useState, useEffect } from "react";
import axios from "axios";
import HandleApiCustomer from "../../../Apis/HandleApiCustomer";
import Swal from "sweetalert2";

function Avatar() {
    const user = JSON.parse(localStorage.getItem("user"));
    const [data, setData] = useState("");
    //if(user.image.length !== 0 ) setData(user.image[0].url);

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

    return (
        <div>
            <div
                className={styles.bg_primary + " flex justify-evenly text-2xl"}
            >
                <div
                    className={
                        styles.bg_white +
                        " rounded-lg w-1/4 my-12 lg:block hidden"
                    }
                >
                    <NavTag
                        DivCss={"px-4 py-8"}
                        setHref={"/customer/info"}
                        spanCss={"mx-6"}
                        spanContent={"Thông tin tài khoản"}
                        aCss={"mx-4 my-4"}
                        setIcon={
                            <PersonIcon sx={{ fontSize: 30 }}></PersonIcon>
                        }
                    />
                    <NavTag
                        DivCss={"px-4 py-8"}
                        setHref={"/customer/addresses"}
                        spanCss={"mx-4"}
                        spanContent={"Địa chỉ nhận hàng"}
                        aCss={"mx-4 my-4"}
                        setIcon={
                            <LocationOnIcon
                                sx={{ fontSize: 30 }}
                            ></LocationOnIcon>
                        }
                    />
                    <NavTag
                        DivCss={"px-4 py-8"}
                        setHref={"/customer/history"}
                        spanCss={"mx-6"}
                        spanContent={"Đơn đặt hàng"}
                        aCss={"mx-4 my-4"}
                        setIcon={
                            <AssignmentIcon
                                sx={{ fontSize: 30 }}
                            ></AssignmentIcon>
                        }
                    />
                    <NavTag
                        DivCss={"px-4 py-8"}
                        setHref={"/customer/changePassword"}
                        spanCss={"mx-6"}
                        spanContent={"Đổi mặt khẩu"}
                        aCss={"mx-4 my-4"}
                        setIcon={<LockIcon sx={{ fontSize: 30 }}></LockIcon>}
                    />
                    <NavTag
                        DivCss={
                            styles.bg_blue + " rounded-lg px-4 py-8 mx-6 my-8"
                        }
                        setHref={"#"}
                        spanCss={"mx-6"}
                        spanContent={"Ảnh đại diện"}
                        aCss={styles.text_blue}
                        setIcon={
                            <CropOriginalIcon
                                sx={{ fontSize: 30, color: blue[700] }}
                            ></CropOriginalIcon>
                        }
                    />
                    <NavTag
                        DivCss={"px-4 py-8"}
                        setHref={"/customer/productReviews"}
                        spanCss={"mx-6"}
                        spanContent={"Lịch sử đánh giá sản phẩm"}
                        aCss={"mx-4 my-4"}
                        setIcon={
                            <HistoryIcon sx={{ fontSize: 30 }}></HistoryIcon>
                        }
                    />
                    <NavTag
                        DivCss={"px-4 py-8"}
                        setHref={"/customer/baohanh"}
                        spanCss={"mx-6"}
                        spanContent={"Bảo hành"}
                        aCss={"mx-4 my-4"}
                        setIcon={
                            <GppGoodIcon sx={{ fontSize: 30 }}></GppGoodIcon>
                        }
                    />
                </div>
                <div
                    className={
                        styles.bg_white +
                        " h-fit grid grid-cols-2 rounded-lg lg:w-2/5 my-12 flex items-center"
                    }
                >
                    <div className="mx-4 my-4 flex flex-col h-fit">
                        <AvatarImg
                            src={
                                data
                                    ? data
                                    : "http://webcoban.vn/image/flower.gif"
                            }
                            alt="Ảnh avatar"
                        ></AvatarImg>
                        <input
                            type="file"
                            accept=".jpg, .png"
                            name="Avatar"
                            onChange={handleFileChange}
                            className="mx-3 my-3 h-fit"
                        />
                    </div>
                    <div className="mx-4 my-4 flex flex-col h-fit">
                        <button
                            className="border-2 w-3/4 rounded-lg px-4 py-4 mb-5 bg-sky-600 text-white"
                            onClick={uploadFile}
                        >
                            Tải lên
                        </button>
                        {/*<button className="border-2 w-3/4 rounded-lg px-4 py-4 mb-5 border-pink-500 text-red-500">Xóa ảnh</button>*/}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Avatar;
