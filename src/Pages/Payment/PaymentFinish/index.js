import { useLocation } from "react-router-dom";
import PaymentConfirm from "../Component/PaymentConfirm";

function PaymentFinish () {
    const location = useLocation();

    //các tham số query chung của zalopay và momo
    const searchParams = new URLSearchParams(location.search);
    const phuongThuc = searchParams.get("phuongthuc");
    const amount = searchParams.get("amount");

    //các tham số query của momo
    const partnerCode = searchParams.get("partnerCode");
    const orderId = searchParams.get("orderId");
    const requestId = searchParams.get("requestId");
    const orderInfo = searchParams.get("orderInfo");
    const orderType = searchParams.get("orderType");
    const transId = searchParams.get("transId");
    const resultCode = searchParams.get("resultCode");
    const message = searchParams.get("message");
    const payType = searchParams.get("payType");
    const responseTime = searchParams.get("responseTime");
    const extraData = searchParams.get("extraData");
    const signature = searchParams.get("signature");
    //các tham số query của zalo
    const appid = searchParams.get("appid");
    const apptransid = searchParams.get("apptransid");
    const discountamount = searchParams.get("discountamount");
    const checksum = searchParams.get("checksum");
    const pmcid = searchParams.get("pmcid");
    const bankcode = searchParams.get("bankcode");
    const status = searchParams.get("status");

    return (
        <div className="text-center text-2xl py-20">
            {(()=>{
                if (phuongThuc=="momo")
                    if(resultCode == 0)
                        return(<PaymentConfirm method={phuongThuc} tinhtrang={"thành công"} madonhang={orderId}/>)
                    else
                        return(<PaymentConfirm method={phuongThuc} tinhtrang={"thất bại"} madonhang={orderId}/>)
                else
                    if(status==1)
                        return(<PaymentConfirm method={phuongThuc} tinhtrang={"thành công"} madonhang={apptransid}/>)
                    else
                        return(<PaymentConfirm method={phuongThuc} tinhtrang={"thất bại"} madonhang={apptransid}/>)
            })()
            }
        </div>
    );
}

export default PaymentFinish