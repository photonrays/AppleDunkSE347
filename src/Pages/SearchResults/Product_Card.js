import { Link } from "react-router-dom";

export default function ProductCard(prop) {
    const VND = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
      });
      
    return (
        <Link to={{pathname:`/detailproduct/${prop._id}`}}>
            <div id = "product-card"
                className="lg:h-[410px] md:h-[390px] h-[250px] p-[20px] bg-white rounded-[10px] hover:shadow-2xl hover:cursor-pointer">
                <div id="product-tag" className="lg:h-[40px] md:h-[20px] sm:h-[10px]"></div>
                <img className="w-full md:h-[232px] sm:h[212px] self-center" src={prop.hinh}/>
                <div id="product-title" className="h-[54px] md:mt-[20px] mt-[10px] md:text-[18px] text-[15px] md:mb-0 mb-[10px]">{prop.tensanpham}</div>
                <div id="price" className="h-[24px]">
                    <span id="new-price" className="text-blue-600 mr-[5px] text-[16px]">{VND.format(prop.gia)}</span>
                    {/* <span id="old-price" className="text-gray-600 text-[15px] line-through">{VND.format(prop.oldPrice)}</span> */}
                </div>
            </div>
        </Link>
    )
}