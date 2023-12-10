import { useEffect, useState } from "react";
import "../DetailBottom.css"

function TsktTable({tongleState, demoProduct, layout}) {
    useEffect(()=>{
        console.log("tongleState tskt: ", tongleState)
    },[tongleState])

    return (
        <div class={tongleState === 2 ? 
        (layout===1 ?"flex-1 ":"flex-1 lg:border-[2px] lg:border-slate-300 lg:boder-solid lg:p-[16px] lg:rounded-[7px] mx-[10px]")
        :( layout === 1 ?  "hidden" : "lg:flex-1 lg:border-[2px] lg:border-slate-300 lg:boder-solid lg:p-[16px] lg:rounded-[7px] mx-[10px] tskt")}>
        <div className={layout === 1 ? "hidden" : "font-bold text-[24px] mb-[10px]"}>Thông số kỹ thuật</div>
            <table className={"w-full table-fixed text-[16px] text-slate-600 border-collapse border border-slate-400"}>
                <tbody>
                    {demoProduct.TSKT.map((tskt, index) => (
                        tskt?<tr className={(index % 2) === 0 ?"w-full bg-slate-200":"w-full"}>
                            <td className={layout === 1 ? "border border-slate-300 py-[6px] px-[16px]" : "border border-slate-300 py-[6px] px-[16px] lg:w-1/3"}>{tskt[0]}</td>
                            <td className="border border-slate-300 py-[6px] px-[16px]">{tskt[1]}</td>
                        </tr>:""
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default TsktTable;