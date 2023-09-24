import { useState } from "react";
import HandleApiKM from "../../../../Apis/HandleApiKM";

function PromotionItem({
    item,
    display,
    setDisplay,
    setPromotion,
    styles,
    text,
    setSelected,
}) {
    // Select khuyến mãi
    const handleSelectItem = () => {
        HandleApiKM.getKMByIdCached(item._id)
            .then((res) => {
                // console.log("DatA" + res);
                setPromotion(res.data.phantramkm);
            })
            .catch((err) => console.log(err));

        setDisplay(!display);
        setSelected(item._id);
    };

    //format lại thời gian bắt đầu
    const datebd = new Date(item.batdau);
    const formattedDatebd = `${datebd.getDate()}/${datebd.getMonth() + 1}/${datebd.getFullYear()}`;

    //format thời gian kết thúc
    const datekt = new Date(item.ketthuc);
    const formattedDatekt = `${datekt.getDate()}/${datekt.getMonth() + 1}/${datekt.getFullYear()}`;

    return (
        <div className="flex items-center justify-center my-10">
            <div className="mr-[16px]">
                <img
                    src={item.image}
                    alt="khuyen mai"
                    className="w-[70px] h-[70px] object-cover rounded-[8px]"
                />
            </div>
            <div className="w-[450px]">
                <div className="text-[18px] text-[#1D1D1F] font-semibold">
                    {item?.title}
                </div>
                <div className="text-[16px] text-[#333]">
                    Giảm giá: {item?.phantramkm}%
                </div>
                <span className="text-[15px] text-[#86868B]">
                    {formattedDatebd}
                </span>
                <span className="text-[15px] text-[#86868B]"> &minus; </span>
                <span className="text-[15px] text-[#86868B]">
                    {formattedDatekt}
                </span>
            </div>
            <button className={styles} onClick={handleSelectItem}>
                {text}
            </button>
        </div>
    );
}

export default PromotionItem;
