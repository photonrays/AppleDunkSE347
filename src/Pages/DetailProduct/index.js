import DetailBottom from "./detailBottom";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { useRef, useState, useEffect } from "react";
import images from "../../assets/image";
import classes from "./DetailProduct.module.css";
import Rating from "@mui/material/Rating";
import StoreIcon from '@mui/icons-material/Store';
import { useParams } from "react-router-dom";
import HandleApiProduct from "../../Apis/HandleApiProduct";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Carousel from "./OtherComponent/Carousel";
import "./DetailBottom.css";

function DetailProduct() {
    const [isLoading, setLoading] = useState(true);
    const params = useParams()
    const [currentSlide,setCurrentSlide] = useState(0);
    const mainCarouselRef = useRef(null);
    const thumbnailCarouselRef = useRef(null);
    const [sp, setSp] = useState(null)
    const [user, setUser] = useState(JSON.parse(window.localStorage.getItem("user")))
    
    const [dungluong, setDungluong] = useState("");
    const [lstRom, setLstRom] = useState([])
    const [ram, setRam] = useState("");
    const [lstRam, setLstRam] = useState([])
    const [color, setColor] = useState("");
    const [lstColor, setLstColor] = useState([]);
    const [lstManHinh, setLstManHinh] = useState([])
    const [layout, setLayout] = useState(1)
    let lstColorBG = {
        black: "bg-gray-800",
        gray: "bg-gray-400",
        silver: "bg-gray-200",
        pink: "bg-pink-300",
        blue: "bg-sky-400",
        gold: "bg-yellow-600",
        yellow: "bg-yellow-600",
        green: "bg-green-500",
        purple: "bg-purple-500",
        white: "white"
    }
    const navigate = useNavigate()

    useEffect( ()=>{


        axios.get(`http://localhost:3001/api/product/${params.id}`)
        .then( (response) => { 
            if(response.data !== undefined) {
                setSp(response.data);      
                setLoading(false);
                // lstColor = response.data?response.data.mausac.split(",").map(item => item.trim()):0
                setLstColor(response.data.mausac.split(",").map(item => item.trim().toLowerCase()))
                setLstRom(response.data.rom.split(",").map(item => item.trim().toUpperCase()))
                setLstRam(response.data.ram.split(",").map(item => item.trim().toUpperCase()))
            }
        })
        .catch(error => console.log(error));
        
    },[])

    const handleMuaNgayClick = (e) => {
        if(dungluong === "" && lstRom.length !== 0) {
            Swal.fire({
                title: 'Vui lòng lựa chọn dung lượng!',
                icon: 'warning',
                // showCancelButton: true,
                confirmButtonText: 'OK',
                // cancelButtonText: 'Đóng',
            })
        }
        else if(ram === "" && lstRam.length !== 0) {
            Swal.fire({
                title: 'Vui lòng lựa chọn ram!',
                icon: 'warning',
                // showCancelButton: true,
                confirmButtonText: 'OK',
                // cancelButtonText: 'Đóng',
            })
        }
        else if(color === "" && lstColor.length !== 0) {
            Swal.fire({
                title: 'Vui lòng lựa chọn màu sắc!',
                icon: 'warning',
                confirmButtonText: 'OK',
                // cancelButtonText: 'Đóng',
            })
        } else if(!user) {
            Swal.fire({
                title: 'Bạn phải đăng nhập để thêm vào giỏ hàng.',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Đăng nhập',
                cancelButtonText: 'Đóng',
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate("/login")
                }
            });
        }
        else {
            // màu đc chọn
            const cartData = {
                makh: user.makh,
                masp: params.id,
                mausac: color,
                soluong: 1,
                rom: dungluong,
            }

            console.log(cartData)
            axios.post(`http://localhost:3001/api/cart`,cartData)
            .then( (response) => { 
                console.log(response)
                navigate("/cart")
            })
            .catch(error => console.log(error));
        }
    }

    // const mainCarouselOptions = {
    //     perPage: 1,
    //     pagination: false,
    //     arrows: false,
    //     rewind: true,
    //     gap: '2rem',
    //     onMove: () => {
    //         thumbnailCarouselRef.current.go(mainCarouselRef.current.index);
    //     }
    // };

    // const thumbnailCarouselOptions = {
    //     fixedWidth: 100,
    //     fixedHeight: 100,
    //     gap: '0.1rem',
    //     cover: true,
    //     pagination: false,
    //     arrows: true,
    //     focus: 'center',
    //     updateOnMove: false,
    //     perPage: 3,
    //     breakpoints: {
    //         768: {
    //             fixedWidth: 66,
    //             fixedHeight: 50,
    //         },
    //     },
    // };
    // const handleThumbnailClick = (index) => {
    //     setCurrentSlide(index);
    //     mainCarouselRef.current.go(index);
    //   };

    const handleDungLuongClick = (i) => {
        setDungluong(i)
        // console.log(params.id)
    }
    const VND = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    });
    if (isLoading===false && sp!==undefined && sp!==null) {
        console.log("isLo ",isLoading)
        console.log(sp)
        
    return (
        <div className={classes.container}>
            <section className={classes.detailproduct}>
                {/* <section className={classes.product_splide}>
                    <Splide
                        className={classes.mainSplide}
                        options={mainCarouselOptions}
                        ref={mainCarouselRef}
                    >
                        {
                            sp.imageList?.map((img_item, index)=>(
                                <SplideSlide>
                                    <img src={img_item} alt="Hình ảnh sản phẩm" />
                                </SplideSlide>
                            ))
                        }

                    </Splide>

                    <Splide
                        className={classes.optionSplide}
                        options={thumbnailCarouselOptions}
                        ref={thumbnailCarouselRef}
                        onFirstInit={() => {
                            thumbnailCarouselRef.current.sync(mainCarouselRef.current);
                        }}
                    >
                        {
                            sp.imageList?.map((img_item, index)=>(
                                <SplideSlide>
                                    <div>
                                        <img src={img_item} alt="Thumbnail"
                                        onClick={() => handleThumbnailClick(index)} />
                                    </div>
                                </SplideSlide>
                            ))
                        }
                    </Splide>
                </section> */}
                <div className={classes.carousel}>
                    <Carousel sp = {sp}/>
                </div>

                <div className={classes.overview}>
                    <div className={classes.wrapped_info}>
                        <h1>
                            <span>{sp.tensanpham}</span>
                        </h1>
                        <div className={classes.wrapped_info_content}>
                            <div className={classes.rating}>
                                <Rating name="size-small" defaultValue={2} size="big" />
                            </div>
                            <a>Đánh giá</a>
                        <hr />

                    </div>
                    <div className={classes.price}>
                        <span className={classes.currentPrice}>{VND.format(sp.gia)}</span>
                    </div>
                    <div className={classes.attribute}>
                        <div className={classes.detail_info}>
                            {
                                (lstRom.length !== 0)&&(
                                    <>
                                    <label>Dung lượng</label>
                            <ul>
                                {
                                    lstRom?.map((rom_item, index) =>{
                                        return (
                                            <li onClick={()=> setDungluong(rom_item)}
                                                className={dungluong === rom_item ? classes.active : "hover:border-blue-400 hover:border-[2px] hover:text-blue-600"}>
                                                {rom_item}
                                            </li>
                                        )
                                    } )
                                }
                                
                            </ul>
                                    </>
                                )
                            }

                            {
                                (lstRam.length !==0)&&(
                                    <>
                                    <label>RAM</label>
                            <ul>
                                {
                                    lstRam?.map((ram_item, index) =>{
                                        return (
                                            <li onClick={()=> setRam(ram_item)} 
                                                className={ram === ram_item ? classes.active : "hover:border-blue-400 hover:border-[2px] hover:text-blue-600"}>
                                                {ram_item}
                                            </li>
                                        )
                                    } )
                                }
                                
                            </ul>
                                    </>
                                )
                            }

                            
                           {
                            (lstColor.length !== 0)&&(
                                <>
                                 <label>Màu sắc</label>
                        <div className={classes.itemColor}>
                        <ul >
                            {
                                lstColor?.map((color_item, index) =>{
                                    let colorBG = lstColorBG[color_item]
                                    
                                    if(classes[color_item] !== undefined){
                                        return (
                                            <li title={color_item} className={`${color === color_item ? `${colorBG} outline outline-[2px] outline-blue-500` : classes[color_item]}`}
                                                onClick={()=>setColor(color_item)} value={color_item}>
                                            </li>
                                        )
                                    }
                                } )
                            }

                        </ul>
                        </div>
                                </>
                            )
                           }
                        </div>

                        
                        
                        <div className={classes.confirm}>
                            <button onClick={()=>handleMuaNgayClick()}>MUA NGAY</button>
                        </div>


                    </div>



                    </div>
                </div>

            </section>
            <div>
                {(sp!==undefined)?<DetailBottom sp = {sp}
                              user = {user}
                                layout = {layout}
                              />:""}
            </div>


        </div>
    )}
}

export default DetailProduct;