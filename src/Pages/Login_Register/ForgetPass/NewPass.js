import React, { useState } from 'react'
import classes from '../Login.module.css'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import images from "../../../assets/image";
import Swal from 'sweetalert2'
import axiosInstance from '../../../Apis/axiosInstance'


const NewPass = () => {
  let base = axiosInstance.defaults.baseURL;
  const navigate = useNavigate();
  const token = useParams().token.toString();
  console.log(token);
    const [inputs, setInputs] = useState({
        password:""
      })
      const [errors, setErrors] = useState({
        passwordError:" ",confirmError:" "
      })
    const handleChange = (e) =>{
        setInputs((prev)=>{
          return{
          ...prev,
          [e.target.name]:e.target.value
        }
        })

      }
    const handleBlur=function(e){
      
        if(e.target.name==="password")
        {
            if(e.target.value.length<8||e.target.value==="")
            {e.target.style.borderColor="red"; 
            setErrors((prev)=>{
                return{
                ...prev,
                passwordError:"Mật khẩu phải dài hơn 8 ký tự."
              }
              })
            }
            else
            {
            e.target.style.borderColor="#fff"
            setErrors((prev)=>{
                return{
                ...prev,
                passwordError:""
              }
              })
            }
        }
        if(e.target.name==="password2")
        {
            if(e.target.value!==inputs.password)
            {e.target.style.borderColor="red"; 
            setErrors((prev)=>{
                return{
                ...prev,
                confirmError:"Mật khẩu không khớp."
              }
              })
            }
            else
            {
            e.target.style.borderColor="#fff"
            setErrors((prev)=>{
                return{
                ...prev,
                confirmError:""
              }
              })
            }
        }
    }
    const authAxios = axios.create({
      baseURL: `${base}`,
      headers:{
        Authorization:`Bearer ${token}`
      }
    })
    const sendRequestSU = async ()=>{
        const res = await authAxios
        .post(`api/auth/resetpass`,{
          password:String(inputs.password),
          verifyToken:String(token)
        })
        .catch((err)=>console.log(err))
    
        const data = await res.data;
        console.log(data);
        return data;
      }
    const handleSubmit = (e) => {
        if(errors.passwordError!=""||errors.confirmError!="")
        {
            e.preventDefault();
            alert("Change failed!");
        } else {
          e.preventDefault();
          sendRequestSU()
          .then((data)=>{ console.log(data);
          })
          .then(()=>Swal.fire({
            icon: 'success',
            title: 'Chúc mừng',
            text: 'Mật khẩu của bản đã được thay đổi',
          }))
          .then(()=>navigate("/login"));
        }
    }
    
  return (
    <div className={classes.register} style={{backgroundImage: `url(${images.registerbg})`,backgroundRepeat:"no-repeat",backgroundPosition:"center",backgroundSize:"cover", padding:"30px"}}>
      
            <div className={classes.registerlayout}>
            <div className={classes.registerimg}></div>
            <form className={classes.form}>
              <h2 style={{padding: "12px 0", textAlign:"center",fontSize:"30px"}}
              
              >Nhập Mật Khẩu Mới</h2>
                <p>
                    <label>Mật khẩu</label><br/>
                    <input 
                    className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                    placeholder="Nhập mật khẩu mới"
                     value={inputs.password}
                    type="password" name="password" onChange={handleChange} onBlur={handleBlur} required />
                    <p style={{color: "red", padding: "10px",fontSize:"12px"}}>{errors.passwordError}</p>
                </p>
                <p>
                    <label>Xác nhận mật khẩu</label><br/>
                    <input 
                    className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                    placeholder="Nhập mật khẩu mới"
                    type="password" name="password2" onBlur={handleBlur} required />
                    <p style={{color: "red", padding: "10px",fontSize:"12px"}}>{errors.confirmError}</p>
                </p>
                <p style={{ textAlign:"center", fontSize:"16px"}}>
                    <button 
                            className='mb-5 px-56 active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01]  ease-in-out transform py-4 bg-violet-500 rounded-xl text-white font-bold text-2xl'

                     id="sub_btn" type="submit"
                    onClick={handleSubmit}>Đổi mật khẩu</button><br/>
                    <Link to="/login">Quay về đăng nhập</Link>
                </p>
            </form>
            </div>
    
        </div>
  )
}

export default NewPass