import { HighlightOffOutlined } from "@mui/icons-material";
import PromotionItem from "../PromotionItem";
import style from "./Promotion.module.css";
import { useEffect, useState } from "react";
import HandleApiKM from "../../../../Apis/HandleApiKM";

function PromotionList({
    display,
    setDisplay,
    promotion,
    setPromotion,
    totalMoney,
    selected,
    setSelected,
}) {
    const [data, setData] = useState([]);
    // const [selected, setSelected] = useState("");

    const handleDisplayOff = () => {
        setDisplay(!display);
    };
    // console.log("Money: " + totalMoney);

    useEffect(() => {
        HandleApiKM.getKMByApdung(Number(totalMoney))
            .then((data) => {
                // console.log("Click: " + data);
                setData(data);
            })
            .catch((err) => console.log(err));
    }, []);

    useEffect(() => {
        HandleApiKM.getKMByApdung(Number(totalMoney))
            .then((data) => {
                setData(data);
            })
            .catch((err) => console.log(err));
    }, [totalMoney]);

    return (
        <div>
            {display && (
                <div>
                    <div
                        className={style.overlay}
                        onClick={handleDisplayOff}
                    ></div>
                    <div className={style.bPopup}>
                        <HighlightOffOutlined
                            sx={{
                                position: "absolute",
                                top: 0,
                                right: 0,
                                fontSize: "32px",
                                color: "#ce3939",
                                cursor: "pointer",
                                marginTop: "12px",
                                marginRight: "20px",
                                ":hover": {
                                    color: "#dd2929",
                                },
                            }}
                            onClick={handleDisplayOff}
                        />
                        <div className="text-center md:text-[32px] text-[22px] font-semibold mb-4 mt-8 md:mt-0">
                            Danh sách khuyến mãi khả dụng
                        </div>
                        <div className="lg:max-h-[300px] min-h-[150px] max-h-[500px] overflow-y-auto">
                            <div>
                                {data.map((item, index) => (
                                    <PromotionItem
                                        key={item._id}
                                        onClick={() => setSelected(item._id)}
                                        item={item}
                                        display={display}
                                        setDisplay={setDisplay}
                                        promotion={promotion}
                                        setPromotion={setPromotion}
                                        styles={
                                            selected === item._id
                                                ? "w-[102px] lg:ml-[50px] border border-solid p-[10px] text-[14px] cursor-not-allowed border-[#777] text-[#777] rounded-[8px]"
                                                : "w-[102px] lg:ml-[50px] border border-solid border-[#0066cc] p-[10px] text-[14px] text-[#0066cc] rounded-[8px] hover:bg-sky-200"
                                        }
                                        text={
                                            selected === item._id
                                                ? "Đã áp dụng"
                                                : "Áp dụng"
                                        }
                                        setSelected={setSelected}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default PromotionList;
