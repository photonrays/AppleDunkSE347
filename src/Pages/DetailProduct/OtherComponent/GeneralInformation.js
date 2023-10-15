
import { useEffect, useState } from "react";
import parse from 'html-react-parser'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import "../DetailBottom.css"

function GeneralInformation({tongleState, demoProduct, layout}) {
    const [more, setMore] = useState(0);

    // Xem thêm hoặc thu gọn
    const handleOnclickMoreOrNot = (index) => {
        setMore(index);
    }

    useEffect(()=>{
        console.log("tongleState information: ",tongleState)
    },[tongleState])

    return (
        <div className={tongleState === 1 ? 
        (layout === 1 ? "flex-1" : "flex-1 lg:border-[2px] lg:border-slate-300 lg:boder-solid lg:p-[16px] lg:rounded-[7px] mx-[10px]")
        :(layout === 1 ? "hidden" : "lg:flex-1 lg:border-[2px] lg:border-slate-300 lg:boder-solid lg:p-[16px] lg:rounded-[7px] lg:mx-[10px] infor")}>
            <div className={more === 0? "des text-ellipsis overflow-hidden" : ""}>
            {
                demoProduct.mota? parse(demoProduct.mota) : <>
                    <h1 className="text-[26px] font-bold">{demoProduct.name}</h1>
                <p className="text-[14px]">{demoProduct.description.moTaChung}</p>
        
                <h2 className="text-[18px] font-bold mt-[10px]">{demoProduct.description.title1}</h2>
                <p className="text-[14px]">{demoProduct.description.des1}</p>
        
                <h2 className="text-[18px] font-bold mt-[10px]">{demoProduct.description.title2}</h2>
                <p className="text-[14px]">{demoProduct.description.des2}</p>
                
                </>
            }                               
            </div>
            <div className="moreBtn h-[50px] cursor-pointer ">
                <div className={more === 0? "shadow-lg py-[12px] text-blue-600 text-center text-[18px]":"hidden"}
                onClick={()=>handleOnclickMoreOrNot(1)}>
                    Tìm hiểu thêm
                    <ExpandMoreIcon sx={{ fontSize: 24 }}/>
                </div>

                <div className={more === 1? "shadow-lg py-[12px] text-blue-600 text-center text-[18px]":"hidden"}
                onClick={()=>handleOnclickMoreOrNot(0)}>
                    Rút gọn
                    <ExpandLessIcon sx={{ fontSize: 24 }}/>
                </div>
            </div>
        </div>
    );
}
export default GeneralInformation;