import styles from "./Order.module.css";
// import images from "../../assets/image/index";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import { ReceiptOutlined } from "@mui/icons-material";
import ProductHint from "./Components/ProductHint/ProductHint";
import Payment from "./Components/Payment/Payment";
import PromotionList from "./Components/PromotionList";
import HandleApiCart from "../../Apis/HandleApiCart";
import HandleApiKM from "../../Apis/HandleApiKM";
import ProductItem from "./Components/ProductItem";
import HandleApiRecommend from "../../Apis/HandleApiRecommend";
import ProductItemMobile from "./Components/ProductItemMobile";

function Order() {
    const [data, setData] = useState([]);
    // const [recommendData, setRecommendData] = useState([]);
    const [isChecked, setIsChecked] = useState(false);
    const [voucherDisplay, setVoucherDisplay] = useState(false);
    const [dataPayment, setDataPayment] = useState(null);
    const [promotion, setPromotion] = useState(0);
    const [moneyDiscount, setMoneyDiscount] = useState(0);
    const [totalMoney, setTotalMoney] = useState(0);
    const [promotionInput, setPromotionInput] = useState("");
    const [selected, setSelected] = useState("");

    const navigate = useNavigate();
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    const user = JSON.parse(localStorage.getItem("user"));

    // Hàm render giỏ hàng
    const HandleGetCart = () => {
        HandleApiCart.getCartByMaKH(user?.makh)
            .then((data) => {
                setData(data);
                setMoneyDiscount(data.order.tongtrigia * (promotion / 100));
                setTotalMoney(
                    data.order.tongtrigia -
                        data.order.tongtrigia * (promotion / 100)
                );
            })
            .catch((err) => console.log(err));
    };

    // Render order the first time
    useEffect(() => {
        HandleGetCart();
    }, []);

    // Render list recommend product
    // useEffect(() => {
    //     HandleApiRecommend.getRecommends(user?.makh)
    //         .then((data) => {
    //             setRecommendData(data);
    //         })
    //         .catch((err) => console.log(err));
    // }, []);

    // Change total money when select promotion
    useEffect(() => {
        setMoneyDiscount(data.order?.tongtrigia * (promotion / 100));
        setTotalMoney(
            data.order?.tongtrigia - data.order?.tongtrigia * (promotion / 100)
        );
    }, [promotion]);

    const handleGetData = (data) => {
        setDataPayment(data);
    };

    const handleCheckBoxChange = (e) => {
        setIsChecked(e.target.checked);
    };

    const handleFailOrder = () => {
        Swal.fire({
            position: "center",
            icon: "error",
            title: "Vui lòng chọn và điền đầy đủ thông tin trước khi thanh toán!",
            showConfirmButton: false,
            timer: 1500,
            padding: "0 0 20px 0",
        });
    };
    // console.log(typeof dataPayment?.selectedProvince);
    const handleOrder = (e) => {
        e.preventDefault();
        if (
            dataPayment.name &&
            dataPayment.phone &&
            dataPayment.email &&
            dataPayment.selectedProvince &&
            dataPayment.selectedDistrict &&
            dataPayment.method &&
            dataPayment.payment
        ) {
            if (emailRegex.test(dataPayment.email)) {
                if (dataPayment.method === "Ship") {
                    if (dataPayment.address && dataPayment.selectedWard) {
                        if (isChecked) {
                            navigate("/billdetail", {
                                state: { dataPayment, totalMoney, data },
                            });
                        } else {
                            Swal.fire({
                                position: "center",
                                icon: "error",
                                title: "Vui lòng chấp nhận các điều khoản và điều kiện!",
                                showConfirmButton: false,
                                timer: 1500,
                                padding: "0 0 20px 0",
                            });
                        }
                    } else handleFailOrder();
                } else if (dataPayment.method === "Store") {
                    if (dataPayment.selectedStore) {
                        if (isChecked) {
                            navigate("/billdetail", {
                                state: { dataPayment, totalMoney, data },
                            });
                        } else {
                            Swal.fire({
                                position: "center",
                                icon: "error",
                                title: "Vui lòng chấp nhận các điều khoản và điều kiện!",
                                showConfirmButton: false,
                                timer: 1500,
                                padding: "0 0 20px 0",
                            });
                        }
                    } else handleFailOrder();
                }
            } else {
                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: "Vui lòng nhập đúng format Email!",
                    showConfirmButton: false,
                    timer: 1500,
                    padding: "0 0 20px 0",
                });
            }
        } else handleFailOrder();
    };

    const handleDisplayVoucher = () => {
        setVoucherDisplay(true);
    };

    // Handle Áp dụng Mã giảm giá bằng input
    const HandleApplyPromotion = () => {
        console.log("click");
        if (promotionInput.trim() !== "") {
            HandleApiKM.getKMByMaKM(promotionInput.toUpperCase())
                .then((data) => {
                    console.log(data);
                    setPromotion(data.phantramkm);
                    setSelected("");
                })
                .catch((err) => console.log(err));
        } else {
            Swal.fire({
                position: "center",
                icon: "error",
                title: "Mã giảm giá không đúng!",
                showConfirmButton: true,
                timer: 1000,
                padding: "0 0 20px 0",
            });
        }
    };

    //  Handle change promotion input
    const HandleChangePromotionInput = (e) => {
        setPromotionInput(e.target.value);
    };
    // console.log(promotionInput);

    // Reload Cart
    const HandleReload = () => {
        window.location.reload();
    };

    return (
        <div>
            {user && data?.productCart?.length !== 0 ? (
                <div>
                    {/* Header */}
                    <div className={styles.header}>
                        <div className={styles.label}>
                            <a
                                href="/"
                                className="text-[14px] text-[#515154] hover:text-[#0066cc]"
                            >
                                Trang chủ
                            </a>
                            <div className="px-[5px] py-0">&gt;</div>
                            <a
                                href="/cart"
                                className="text-[14px] text-[#515154] hover:text-[#0066cc]"
                            >
                                Giỏ hàng
                            </a>
                        </div>
                    </div>

                    {/* Body */}
                    <div className={styles.body}>
                        <div
                            className={
                                styles.content +
                                " grid lg:grid-cols-3 gap-8 grid-cols-1"
                            }
                        >
                            <div className={styles.cartInfo + " col-span-2"}>
                                <div className={styles.cartDetail}>
                                    <table className={styles.table}>
                                        <thead
                                            className={
                                                styles.displayNone +
                                                " h-[54px] text-[16px]"
                                            }
                                        >
                                            <tr>
                                                <th className="w-1/6">
                                                    Hình ảnh
                                                </th>
                                                <th className="w-1/3">
                                                    Tên sản phẩm
                                                </th>
                                                <th className="w-1/4">
                                                    Giá bán
                                                </th>
                                                <th>Số lượng</th>
                                                <th className="w-1/12"></th>
                                            </tr>
                                        </thead>
                                        <tbody className="text-center">
                                            {data?.productCart?.map(
                                                (item, index) => (
                                                    <ProductItem
                                                        key={index}
                                                        item={item}
                                                        index={index}
                                                        setData={setData}
                                                        setMoneyDiscount={
                                                            setMoneyDiscount
                                                        }
                                                        setTotalMoney={
                                                            setTotalMoney
                                                        }
                                                        promotion={promotion}
                                                    />
                                                )
                                            )}
                                        </tbody>
                                    </table>
                                    {/* Mobile */}
                                    <div
                                        className={
                                            styles.displayBlock + " hidden"
                                        }
                                    >
                                        {data?.productCart?.map(
                                            (item, index) => (
                                                <ProductItemMobile
                                                    key={index}
                                                    item={item}
                                                    index={index}
                                                    setData={setData}
                                                    setMoneyDiscount={
                                                        setMoneyDiscount
                                                    }
                                                    setTotalMoney={
                                                        setTotalMoney
                                                    }
                                                    promotion={promotion}
                                                />
                                            )
                                        )}
                                    </div>
                                    {/* ------- */}
                                </div>
                                <div
                                    className={
                                        styles.displayMobile +
                                        " mt-[16px] md:text-right"
                                    }
                                >
                                    <button
                                        type="submit"
                                        className={
                                            styles.tabletWidth +
                                            " border-solid border border-[#0066cc] rounded-[8px] py-[10px] md:px-[20px] text-[#0066cc] text-[14px] hover:bg-sky-100 px-[12px] bg-white"
                                        }
                                        onClick={HandleReload}
                                    >
                                        Cập nhật giỏ hàng
                                    </button>
                                    <a
                                        href="/"
                                        className={
                                            styles.tabletWidth +
                                            " border-solid border border-[#0066cc] rounded-[8px] py-[10px] md:px-[20px] text-[#0066cc] text-[14px] text-center md:ml-8 hover:bg-sky-100 px-[12px] bg-white"
                                        }
                                    >
                                        Tiếp tục mua hàng
                                    </a>
                                </div>
                            </div>
                            {/* SideBar */}
                            <div className={styles.cartSidebar}>
                                <div className={styles.cartDiscount}>
                                    <input
                                        type="text"
                                        placeholder="Mã giảm giá"
                                        value={promotionInput}
                                        onChange={HandleChangePromotionInput}
                                        className="h-full flex-1 placeholder:text-[16px] placeholder:font-light outline-none rounded-l-[8px] pl-6 caret-red-600 text-[16px]"
                                    ></input>
                                    <button
                                        className="h-full w-[120px] text-[16px] font-light text-white bg-[#aaa] rounded-r-[6px] border-none hover:bg-[#999]"
                                        onClick={HandleApplyPromotion}
                                    >
                                        Áp dụng
                                    </button>
                                </div>
                                {/* Mã giảm giá */}
                                <div className=" mb-[16px] flex justify-between">
                                    <div className="flex items-center">
                                        <ReceiptOutlined
                                            sx={{
                                                marginRight: "6px",
                                                fontSize: "20px",
                                                color: "#0066cc",
                                            }}
                                        />
                                        <div className="text-2xl">
                                            AppleDunk voucher
                                        </div>
                                    </div>
                                    <button
                                        className="border border-solid border-[#0066cc] rounded-[4px] px-3 py-1 
                                    text-[10px] text-[#0066cc] hover:bg-sky-100"
                                        onClick={handleDisplayVoucher}
                                    >
                                        Chọn mã giảm giá
                                    </button>
                                </div>

                                {/* Tổng giá */}
                                <div className={styles.totals}>
                                    <div className="border-solid border-b border-[#d9d9d9] mb-8">
                                        <div className="flex justify-between py-2">
                                            <div className="text-2xl  text-[#86868B]">
                                                Tổng phụ:
                                            </div>
                                            <div className="text-[16px]">
                                                {data?.order?.tongtrigia.toLocaleString() +
                                                    "đ"}
                                            </div>
                                        </div>
                                        {promotion !== 0 && (
                                            <div className="flex justify-between py-2">
                                                <div className="text-2xl  text-[#86868B]">
                                                    Voucher giảm giá:
                                                </div>
                                                <div className="text-[16px]">
                                                    &minus;{" "}
                                                    {moneyDiscount.toLocaleString() +
                                                        "đ"}
                                                </div>
                                            </div>
                                        )}
                                        <div className="flex justify-between py-4 mb-6">
                                            <div className="text-[18px] font-semibold text-black">
                                                Tổng cộng:
                                            </div>
                                            <div className="text-[18px] text-[#007bff]">
                                                {totalMoney.toLocaleString() +
                                                    "đ"}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Điều khoản */}
                                <div className="flex items-center mb-10">
                                    <input
                                        type="checkbox"
                                        id="service"
                                        className="w-[20px] h-[20px] mr-4"
                                        checked={isChecked}
                                        onChange={handleCheckBoxChange}
                                    ></input>
                                    <label
                                        htmlFor="service"
                                        className="text-[14px]"
                                    >
                                        Tôi đã đọc và đồng ý với
                                        <span className="text-[#0066cc]">
                                            {" "}
                                            điều khoản và điều kiện{" "}
                                        </span>
                                        của website.
                                    </label>
                                </div>

                                <button
                                    className="w-full h-[48px] px-8 py-4 text-[16px] text-white bg-[#0066CC] rounded-[8px]"
                                    onClick={handleOrder}
                                >
                                    Tiến hành đặt hàng
                                </button>

                                {/* <div className="text-[#e4434b] text-[14px] pr-4 font-light mt-6">
                                    &#40;&#42;&#41; Phí phụ thu sẽ được tính khi
                                    bạn tiến hành thanh toán.
                                </div> */}
                            </div>
                            {/* Gợi ý sản phẩm */}
                            <div className={styles.productHint + " col-span-2"}>
                                <label className="text-[24px] font-semibold">
                                    Gợi ý sản phẩm bán chạy
                                </label>
                                <ProductHint />
                            </div>
                            {/* Thông tin thanh toán */}
                            <div className={styles.payment + " col-span-2"}>
                                <label className="text-[24px] font-semibold text-center md:text-left block">
                                    Thông tin thanh toán
                                </label>
                                <Payment handleGetData={handleGetData} />

                                {/* Sidebar On Mobile */}
                                <div className="w-full bg-white p-8 rounded-[8px] mt-6 lg:hidden">
                                    <div>
                                        <div className={styles.cartDiscount}>
                                            <input
                                                type="text"
                                                placeholder="Mã giảm giá"
                                                value={promotionInput}
                                                onChange={
                                                    HandleChangePromotionInput
                                                }
                                                className="h-full flex-1 placeholder:text-[16px] placeholder:font-light outline-none rounded-l-[8px] pl-6 caret-red-600 text-[16px]"
                                            ></input>
                                            <button
                                                className="h-full w-[120px] text-[16px] font-light text-white bg-[#aaa] rounded-r-[6px] border-none hover:bg-[#999]"
                                                onClick={HandleApplyPromotion}
                                            >
                                                Áp dụng
                                            </button>
                                        </div>
                                        {/* Mã giảm giá */}
                                        <div className=" mb-[16px] flex justify-between">
                                            <div className="flex items-center">
                                                <ReceiptOutlined
                                                    sx={{
                                                        marginRight: "6px",
                                                        fontSize: "20px",
                                                        color: "#0066cc",
                                                    }}
                                                />
                                                <div className="text-2xl">
                                                    AppleDunk voucher
                                                </div>
                                            </div>
                                            <button
                                                className="border border-solid border-[#0066cc] rounded-[4px] px-3 py-1 
                                    text-[10px] text-[#0066cc] hover:bg-sky-100"
                                                onClick={handleDisplayVoucher}
                                            >
                                                Chọn mã giảm giá
                                            </button>
                                        </div>

                                        {/* Tổng giá */}
                                        <div className={styles.totals}>
                                            <div className="border-solid border-b border-[#d9d9d9] mb-8">
                                                <div className="flex justify-between py-2">
                                                    <div className="text-2xl  text-[#86868B]">
                                                        Tổng phụ:
                                                    </div>
                                                    <div className="text-[16px]">
                                                        {data?.order?.tongtrigia.toLocaleString() +
                                                            "đ"}
                                                    </div>
                                                </div>
                                                {promotion !== 0 && (
                                                    <div className="flex justify-between py-2">
                                                        <div className="text-2xl  text-[#86868B]">
                                                            Voucher giảm giá:
                                                        </div>
                                                        <div className="text-[16px]">
                                                            &minus;{" "}
                                                            {moneyDiscount.toLocaleString() +
                                                                "đ"}
                                                        </div>
                                                    </div>
                                                )}
                                                <div className="flex justify-between py-4 mb-6">
                                                    <div className="text-[18px] font-semibold text-black">
                                                        Tổng cộng:
                                                    </div>
                                                    <div className="text-[18px] text-[#007bff]">
                                                        {totalMoney.toLocaleString() +
                                                            "đ"}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Điều khoản */}
                                        <div className="flex items-center mb-10">
                                            <input
                                                type="checkbox"
                                                id="service"
                                                className="w-[20px] h-[20px] mr-4"
                                                checked={isChecked}
                                                onChange={handleCheckBoxChange}
                                            ></input>
                                            <label
                                                htmlFor="service"
                                                className="text-[14px]"
                                            >
                                                Tôi đã đọc và đồng ý với
                                                <span className="text-[#0066cc]">
                                                    {" "}
                                                    điều khoản và điều kiện{" "}
                                                </span>
                                                của website.
                                            </label>
                                        </div>

                                        <button
                                            className="w-full h-[48px] px-8 py-4 text-[16px] text-white bg-[#0066CC] rounded-[8px]"
                                            onClick={handleOrder}
                                        >
                                            Tiến hành đặt hàng
                                        </button>

                                        {/* <div className="text-[#e4434b] text-[14px] pr-4 font-light mt-6">
                                    &#40;&#42;&#41; Phí phụ thu sẽ được tính khi
                                    bạn tiến hành thanh toán.
                                </div> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <PromotionList
                        display={voucherDisplay}
                        setDisplay={setVoucherDisplay}
                        promotion={promotion}
                        setPromotion={setPromotion}
                        totalMoney={totalMoney}
                        selected={selected}
                        setSelected={setSelected}
                    />
                </div>
            ) : (
                <div className="h-[540px]">
                    {/* Header */}
                    <div className={styles.header}>
                        <div className={styles.label}>
                            <a
                                href="/"
                                className="text-[14px] text-[#515154] hover:text-[#0066cc]"
                            >
                                Trang chủ
                            </a>
                            <div className="px-[5px] py-0">&gt;</div>
                            <a
                                href="/cart"
                                className="text-[14px] text-[#515154] hover:text-[#0066cc]"
                            >
                                Giỏ hàng
                            </a>
                        </div>
                    </div>
                    <div className="text-[16px] text-[#777] text-center pt-16">
                        Giỏ hàng của bạn đang trống!
                    </div>
                </div>
            )}
        </div>
    );
}

export default Order;
