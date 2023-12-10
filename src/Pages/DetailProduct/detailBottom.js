import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./DetailBottom.css";
import StarRating from "./StarRating";
import RatedStar from "./RatingStar/RatedStar";
import RatingModal from "./RatingStar/RatingModal";
import CheckIcon from '@mui/icons-material/Check';
import StaticRatedStar from "./RatingStar/StaticRatedStar.js";
import Comment from "./Comment/Comment";
import Swal from "sweetalert2";
import axios from "axios";
import GeneralInformation from "./OtherComponent/GeneralInformation";
import TsktTable from "./OtherComponent/TsktTable";
function DetailBottom({sp, user, layout}) {
    const navigate = useNavigate()
    const [tongleState, setTongleState] = useState(1);
    const [filterIndex, setFilterIndex] = useState(6);
    const [listDanhGia, setListDanhGia] = useState([])
    const [allDG, setAllDG] = useState([])
    const [newListDG, setNewListDG] = useState([])
    const [haveComment, setHaveComment] = useState(true)
    const [dtbDG, setDtbDG] = useState("...")
    const [soluongDG, setSoLuongDG] = useState()
    const [loading, setLoading] = useState(false)

    // hàm set giá trị cho tab được chon
    const tongleTab = function(index) {
        setTongleState(index);
        // console.log(user)
        // console.log(sp)
    }   

    // Biến để quyết định việc bật tắt modal, 1 là tắt, 0 là mở
    const [closeRatingModal, setCloseRatingModal] = useState(1);

    const handleClickGuiDG = (index) => {
        if(user) {
            setCloseRatingModal(0)
        } else {
            Swal.fire({
                title: 'Bạn phải đăng nhập trước khi bình luận',
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
    }


    // Lấy giá trị rating
    const [ratingOut, setRatingOut] = useState(null);

    // Định dạng lại sp
    const demoProduct = {
            name: sp.tensanpham,
            mota: sp.mota,
            description: {
                moTaChung: sp.tensanpham + ". Bắt trọn chi tiết ấn tượng với Camera Chính 48MP. Trải nghiệm \
                iPhone theo cách hoàn toàn mới với Dynamic Island và màn hình Luôn Bật. Công nghệ \
                an toàn quan trọng – Phát Hiện Va Chạm  thay bạn gọi trợ giúp khi cần kíp",
                title1: "Tính năng nổi bật",
                des1: "Màn hình Super Retina XDR 6,7 inch với tính năng Luôn Bật và ProMotion \
                Dynamic Island, một cách mới tuyệt diệu để tương tác với iPhone \
                Camera Chính 48MP cho độ phân giải gấp 4 lần",
                title2: "Pháp lý",
                des2: "SOS Khẩn Cấp sử dụng kết nối mạng di động hoặc Cuộc Gọi Wi-Fi\
                Màn hình có các góc bo tròn. Khi tính theo hình chữ nhật, kích thước \
                màn hình theo đường chéo là 6,69 inch. Diện tích hiển thị thực tế nhỏ hơn.",
            },
    
            TSKT: [
                sp.kichthuocmanhinh?[
                    "Màn hình",
                    sp.kichthuocmanhinh || "6.7 inch, Super Retina XDR, 2796 x 1290 Pixels",
                ]:null,
                sp.camera?[
                    "Camera",
                    sp.camera || "48.0 MP + 12.0 MP + 12.0 MP"
                ]:null,
                sp.rom?[
                    "ROM",
                    sp.rom || "128 GB",
                ]:null,
                sp.ram?[
                    "RAM",
                    sp.ram || "6GB",
                ]:null,
                sp.chip?[
                    "Chip",
                    sp.chip || "Chip A16 Bionic,CPU 6 nhân, GPU 5 lõi, 16-core Neural Engine",
                ]:null,
                sp.baomat?[
                    "Bảo mật",
                    sp.baomat || "Face ID, Được kích hoạt bởi camera trước TrueDepth để nhận dạng khuôn mặt",
                ]:null,
                sp.chongnuoc?[
                    "Chống nước",
                    sp.chongnuoc|| "IP68 (độ sâu tối đa 6 mét trong tối đa 30 phút) theo tiêu chuẩn IEC 60529",
                ]:null,
                sp.sac?[
                    "Sạc",
                    sp.sac,
                ]:null,
                sp.dophangiai?[
                    "Độ phân giải",
                    sp.dophangiai,
                ]:null,
                sp.kichthuoc?[
                    "Kích thước",
                    sp.kichthuoc,
                ]:null,
                sp.khoiluong?[
                    "Khối lượng",
                    sp.khoiluong,
                ]:null,
                sp.hedieuhanh?[
                    "Hệ điều hành",
                    sp.hedieuhanh,
                ]:null,
                sp.nguongoc?[
                    "Nguồn gốc",
                    sp.nguongoc,
                ]:null,
                sp.chatlieu?[
                    "Chất liệu",
                    sp.chatlieu,
                ]:null,
                sp.loaiphukien?[
                    "Loại phụ kiện",
                    sp.loaiphukien,
                ]:null,
                sp.congnghe?[
                    "Công nghệ",
                    sp.congnghe,
                ]:null,
                sp.congsuat?[
                    "Công suất",
                    sp.congsuat,
                ]:null,
            ]
    }

    const modalDanhGia = <div className="fixed w-full h-full bg-black opacity-70 z-10014">
    </div>;

    useEffect(() => {
        const fetchData = async () => {
          try {
            setLoading(true);
      
            const response = await axios.get(`http://localhost:3001/api/danhgia/${sp._id}`);
            const data = response.data;
      
            if (data !== undefined) {
              const DGs = data.listDanhGia;
              let sumRating = 0;
      
              if (filterIndex === 6) {
                setListDanhGia(DGs);
              }
              setAllDG(DGs);
              setSoLuongDG(DGs.length);
      
              DGs.forEach(dg => {
                sumRating = sumRating + dg.rating;
              });
      
              setDtbDG((sumRating / DGs.length).toFixed(1));
            //   setLoading(false);
            }
          } catch (error) {
            console.log(error);
            // setHaveComment(false);
            setLoading(true);
          }
        };
      
        fetchData();
      }, [newListDG]);

    useEffect(()=>{
        if(filterIndex !== 6){
            setListDanhGia(allDG.filter(danhgia => {
                return danhgia.rating === filterIndex;
            }))
        } else {
            setListDanhGia(allDG);
        }
    },[filterIndex])

    useEffect(()=>{
        console.log("listDanhGia ",listDanhGia)
    },[listDanhGia])

 if(loading)
 {
    return (<div className="product-bot-container mx-auto grid grid-cols-1 my-[50px]">
        
        <div className={layout === 1 ? "des-container place-self-center" : "lg:w-full"}>
                    {/* <div className="tab-bar"> */}
                    <div className={layout === 1 ? "tab-bar" : "lg:hidden tab-bar"}>
                        <div className={tongleState === 1 ? "tab-item tab-item-active":"tab-item"}
                            onClick={() => tongleTab(1)}>
                            <div className="tab-item-title">Mô tả sản phẩm</div>
                        </div>

                        <div className={tongleState === 2 ? "tab-item tab-item-active":"tab-item"}
                            onClick={() => tongleTab(2)}>
                            <div className="tab-item-title">Thông số kỹ thuật</div>
                        </div>

                        <div className="line"></div>
                    </div>
                    {/* Tab content: tab thông tin chung và9+ tab thông số kỹ thuật */}
                    <div class={layout === 1 ? "tab-content w-full" : "lg:flex lg:justify-between lg:items-start tab-content w-full"}>
                        <GeneralInformation tongleState = {tongleState}
                            demoProduct = {demoProduct}
                            layout = {layout}
                        />
                        <TsktTable tongleState = {tongleState}
                            demoProduct = {demoProduct}
                            layout = {layout}
                            />
                    </div>

        </div>
                    {/* Đánh giá sản phẩm */}
                    <div className="place-self-center mt-[40px] w-full py-[16px] rounded-[7px] border-[2px] border-slate-300 boder-solid">
                        {/* Title */}
                        <div className="px-[16px] pb-[16px] text-[18px] text-slate-700 font-semi-bold border-b-[2px] border-slate-300">Đánh giá sản phẩm</div>
                        {/* grid grid-cols-3 */}
                        <div className="rateDiv justify-items-stretch text-[16px] py-[20px] border-b-[2px] border-slate-100">
                            <div className="rateItem text-center">
                                <div className="average-title text-slate-700">Đánh giá trung bình</div>
                                <div className="text-[36px] text-red-600">{dtbDG}/5</div>
                                <div className="flex justify-center">
                                <StaticRatedStar
                                    size={16}
                                    rating={5}/>
                                </div>
                                <div>{soluongDG} đánh giá</div>
                            </div>
                            {<div className="rateItem my-auto">
                                <RatedStar allDG = {allDG}
                                        soluongDG = {soluongDG}/>
                            </div>}
                            <div className="rateItem text-center my-auto">
                                <div className="last-rateItem-title text-[16px] my-[10px]">Bạn đã dùng sản phẩm này</div>
                                <button className="text-[16px] text-white bg-blue-600 rounded-[5px] font-extralight p-[10px]"
                                onClick={()=>handleClickGuiDG(0)}>GỬI ĐÁNH GIÁ</button>
                            </div>
                        </div>
                        <div className="filter-rate text-[14px] text-slate-500 bg-slate-100 items-center">
                            <div className="filter-title">Lọc xem theo:</div>
                            <div className={filterIndex === 6 ? "filter-item px-[10px] py-[3px] mx-[10px] rounded-[4px] align-middle cursor-pointer border-[1px] border-blue-400 hover:bg-blue-400 hover:text-white text-blue-400" 
                            :"filter-item px-[10px] py-[3px] mx-[10px] rounded-[4px] align-middle scursor-pointer border-[1px] border-slate-300 hover:bg-slate-300"}
                                onClick={()=>setFilterIndex(6)}>
                                    <span className={filterIndex === 6 ? "font-bold": "hidden"}><CheckIcon fontSize="20"/></span>
                                    <span>Tất cả đánh giá</span>
                                </div>

                            {[...Array(5)].map((filterbtn, index) => {
                                const star = index + 1;
                                return <div className={filterIndex === star ?"filter-item px-[10px] py-[3px] mr-[10px] rounded-[4px] align-middle cursor-pointer border-[1px] border-blue-400 hover:bg-blue-400 hover:text-white text-blue-400" 
                            :"filter-item px-[8px] py-[3px] mr-[10px] rounded-[4px] align-middle cursor-pointer border-[1px] border-slate-300 hover:bg-slate-300"}
                                onClick={()=> setFilterIndex(star)}>
                                    <span className={filterIndex === star ? "font-bold": "hidden"}><CheckIcon fontSize="20"/></span>
                                    <span>{star} sao</span>
                                </div>
                            })}
                        </div>
                        {listDanhGia.map((DG)=>(
                                <Comment DG = {DG}/>
                        ))
                        }
                    </div>
                <RatingModal 
                    closeRatingModal = {closeRatingModal}
                    setCloseRatingModal = {setCloseRatingModal}
                    user = {user}
                    sp = {sp}
                    setNewListDG = {setNewListDG}/>
        </div>);
 }
}

export default DetailBottom;