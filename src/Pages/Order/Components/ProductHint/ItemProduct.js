function ItemProduct({ data }) {
    return (
        <div className="px-[12px] py-[24px] flex flex-col text-[14px] h-full justify-between">
            <a href={`/detailproduct/${data.id}`}>
                <img
                    src={data.hinh}
                    alt={data.hinh}
                    className="w-full h-[160px] object-contain"
                ></img>
            </a>
            <div className="text-[14px] text-center my-2 min-h-[42px]">
                {data.tensanpham}
            </div>
            <div className="mb-4 text-center text-[16px]">
                {Number(data.gia).toLocaleString() + "đ"}
            </div>
            <a
                href={`/detailproduct/${data.id}`}
                className="text-[14px] flex items-center justify-center text-[#0066cc] rounded-[8px] 
                w-full h-[40px] border-solid border border-[#0066cc]"
            >
                Mua ngay
            </a>
        </div>
    );
}

export default ItemProduct;
