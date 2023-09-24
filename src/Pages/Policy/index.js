import React from 'react'
import images from "../../assets/image";
const Policy = () => {
  return (
    <div className='px-60 py-10'>
        <h1 className='text-6xl text-center font-bold'>Chính sách bảo hành sản phẩm</h1>
        <p className="text-center text-lg text-gray-400 py-3 ">Chính sách bảo hành tuân thủ theo đúng quy định của Apple áp dụng tại thị trường Việt Nam</p>
        <p className="text-justify text-2xl font-bold">Luôn ưu tiên quyền lợi của khách hàng là quan trọng nhất, ShopDunk đưa ra chính sách bảo hành tuân thủ theo đúng quy định của Apple áp dụng tại thị trường Việt Nam
        <br/>Chính sách bảo hành tiêu chuẩn Apple: Áp dụng cho tất cả sản phẩm do công ty TNHH Apple Việt Nam phân phối
và được ShopDunk bán ra:</p>
<p style={{textIndent:"30px"}}>
        <ul style={{listStyle:"inside"}} className='text-xl py-5'>
            <li>Tuân theo điều khoản bảo hành của Apple, áp dụng từ thời điểm xuất hóa đơn cho khách hàng</li>
            <li>Link tham khảo: </li>
        </ul>
        </p>
        <p className="text-justify text-xl font-bold">Trong trường hợp sản phẩm gặp sự cố, khách hàng có thể xử lý:</p>
        <p style={{textIndent:"30px"}}>
        <ul style={{listStyle:"inside", padding:"20px 0"}} className='text-xl'>
            <li>Cách 1: Khách hàng liên hệ và bảo hành máy tại các Trung tâm bảo hành uỷ quyền của Apple tại Việt Nam</li>
            <li>Cách 2:</li>
        <p style={{textIndent:"60px"}}>
            
            <ul style={{listStyle:"inside"}}>
            <li>Liên hệ với ShopDunk hotline CSKH: 1900.6626 hoặc tới trực tiếp cửa hàng ShopDunk</li>
            <li>ShopDunk tiếp nhận và gửi máy tới Trung tâm bảo hành uỷ quyền của Apple tại Việt Nam để giám định và thông qua báo kết quả, phương thức xử lý từ Apple cho khách hàng</li>
        </ul>
        </p>
        </ul>
        </p>
        <p className='text-xl'>Lưu ý: Quý khách cần giữ lại hoá đơn mua hàng tại ShopDunk để bảo hành. Hoá đơn này được gửi tự động vào e-mail của Quý khách</p>
        <p className="text-justify text-xl font-bold py-2">Danh sách Trung tâm dịch vụ uỷ quyền Apple</p>
    <div className='flex align-middle'>
      <img src={images.adress1}></img>
      <img src={images.adress2}></img>

    </div>
    </div>
  )
}

export default Policy