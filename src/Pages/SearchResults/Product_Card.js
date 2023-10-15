import { Link } from "react-router-dom";

export default function ProductCard(prop) {
    const VND = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
      });
      
    return (
        <Link to={{pathname:`/detailproduct/${prop._id}`}}>
            <div id = "product-card"
                className="lg:h-[410px] md:h-[390px] p-[20px] bg-white rounded-[10px] hover:shadow-2xl hover:cursor-pointer">
                <div id="product-tag" className="lg:h-[40px] h-[20px]"></div>
                <img className="w-full h-[232px] self-center" src={prop.hinh}/>
                <div id="product-title" className="h-[54px] mt-[20px] text-[18px]">{prop.tensanpham}</div>
                <div id="price" className="h-[24px]">
                    <span id="new-price" className="text-blue-600 mr-[5px] text-[16px]">{VND.format(prop.gia)}</span>
                    {/* <span id="old-price" className="text-gray-600 text-[15px] line-through">{VND.format(prop.oldPrice)}</span> */}
                </div>
            </div>
        </Link>
    )
}