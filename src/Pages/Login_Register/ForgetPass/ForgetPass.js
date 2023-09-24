import React, { useState } from "react";
import classes from "../Login.module.css";
import axios from "axios";
import Swal from "sweetalert2";
import axiosInstance from "../../../Apis/axiosInstance";

const ForgetPass = (props) => {
    const [message, setMessage] = useState();
    let base = axiosInstance.defaults.baseURL;

    const sendRequestSU = async () => {
        const res = await axios
            .post(`${base}api/auth/forgetpass`, {
                email: String(props.inputs.email),
            })
            .catch((err) => {
                console.log(err);
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Email này chưa được đăng kí.",
                });
            });
        const data = await res.data;
        if (data.status == 201) {
            console.log(data.status);
        } else {
            console.log(data.message);
        }
        return data;
    };
    const handleClick = () => {
        props.closewindow(false);
    };
    const submitEmail = (e) => {
        if (props.errors.emailError != "") {
            e.preventDefault();
            alert("submit failed!");
        } else {
            e.preventDefault();
            sendRequestSU()
                .then((data) => {
                    setMessage(data.message);
                })
                .then(() => {
                    Swal.fire({
                        icon: "success",
                        title: "Hãy kiểm tra email",
                        text: "Email xác nhận mật khẩu đả được gửi cho bạn",
                    });
                });
        }
    };

    return (
        <>
            <div className={classes.forgetpass}>
                <form className={classes.form}>
                    <h2 style={{color:"black", fontWeight:"bold", fontSize:"25px",textAlign:"center"}}>Quên mật khẩu?</h2>
                    <p
                        style={{
                            padding: "5px 0",
                            fontSize: "10px",
                            textAlign: "center",
                        }}
                    >
                        Đừng lo lắng hãy nhập vào email của bạn và bắt đầu thiết
                        lập mật khẩu mới!
                    </p>
                    <p>
                        
                        
              <div className='flex flex-col'>
              <div className='flex '>
                  <label className='text-2xl font-medium w-1/2'>Email</label>
                  <p className='text-2xl font-medium w-1/2 text-right text-red-600'>{props.errors.emailError}</p>
            </div>
            </div>
                     
                        <input
                            className='w-full text-2xl border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
                            placeholder="Nhập mật khẩu của bạn"
                            
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            type="email"
                            name="email"
                            value={props.inputs.email}
                            required
                        />
                        <p
                            style={{
                                color: "red",
                                padding: "10px",
                                fontSize: "12px",
                            }}
                        >
                            {props.errors.emailError}
                        </p>
                    </p>
                    {message && (
                        <p style={{ color: "green", fontSize: "15px",padding:"0 0 10px 10px" }}>
                            {message}
                        </p>
                    )}
                    <p style={{ textAlign: "center", fontSize: "16px" }}>
                        <button
                            className='mb-5 p-64 active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01]  ease-in-out transform py-4 bg-violet-500 rounded-xl text-white font-bold text-2xl'
                            id="sub_btn"
                            type="submit"
                            onClick={submitEmail}
                        >
                            Gửi Email
                        </button>
                        <br />
                        <p className="text-1xl underline" onClick={handleClick}>
                            Quay về đăng nhập
                        </p>
                    </p>
                </form>
            </div>
            <div className={classes.backdrop} onClick={handleClick}></div>
        </>
    );
};

export default ForgetPass;