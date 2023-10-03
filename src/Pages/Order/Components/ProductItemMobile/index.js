import styles from "./ProductItemMobile.module.css";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import HandleApiCart from "../../../../Apis/HandleApiCart";

import { DeleteOutline, ReceiptOutlined } from "@mui/icons-material";
import { IconButton } from "@mui/material";

function ProductItemMobile({
    item,
    index,
    setData,
    setMoneyDiscount,
    setTotalMoney,
    promotion,
}) {
    const [addClass, setAddClass] = useState("");
    const [qty, setQty] = useState(Number(item?.soluong) || 1);
    // console.log(item);
    const user = JSON.parse(localStorage.getItem("user"));
    useEffect(() => {
        if (Number(qty) === 1) {
            setAddClass("text-[#ccc]");
        } else setAddClass("");

        HandleApiCart.updateCart(
            item.makh,
            item.masp,
            item.mausac,
            item.dungluong,
            {
                soluong: Number(qty) || 1,
            }
        )
            .then(() => {
                HandleGetCart();
            })
            .catch((err) => console.log(err));
    }, [qty]);

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

    // Handle Delete Product
    const HandleDeleteSp = (item) => {
        HandleApiCart.deleteSpFromCart(
            item.makh,
            item.masp,
            item.mausac,
            item.dungluong
        )
            .then(() => {
                HandleGetCart();
            })
            .catch(() => {
                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: "Xóa sản phẩm thất bại",
                    showConfirmButton: false,
                    timer: 1500,
                    padding: "0 0 20px 0",
                });
            });
    };

    const increaseQty = (item) => {
        // setAddClass("");
        const data = {
            // soluong: Number(item.soluong) + 1,
            soluong: Number(qty) + 1,
        };
        setQty(data.soluong);
        HandleApiCart.updateCart(
            item.makh,
            item.masp,
            item.mausac,
            item.dungluong,
            data
        )
            .then(() => {
                HandleGetCart();
                // window.location.reload();
            })
            .catch((err) => console.log(err));
    };

    const decreaseQty = (item) => {
        const data = {
            // soluong: Number(item.soluong) - 1,
            soluong: Number(qty) - 1,
        };
        if (item.soluong > 1) {
            HandleApiCart.updateCart(
                item.makh,
                item.masp,
                item.mausac,
                item.dungluong,
                data
            )
                .then(() => {
                    setQty(data.soluong);
                    HandleGetCart();
                })
                .catch((err) => console.log(err));
        }
    };

    const handleQtyChange = (e) => {
        // if (e.target.value < 0) {
        //     setQty(Math.abs(e.target.value));
        // }
        // else
        // console.log(e.target.value);
        setQty(e.target.value);
    };

    const handleKeyDown = (e) => {
        // console.log(e.keyCode);
        if (e.keyCode === 189 || e.keyCode === 96 || e.keyCode === 48) {
            e.preventDefault();
        }
    };
    return (
        <div className="bg-white mb-5 rounded-xl">
            <div className={styles.tablet + " flex"}>
                <a
                    href={`/detailproduct/${item.masp}`}
                    className={styles.pt24 + " py-[12px]"}
                >
                    <img
                        className={
                            styles.scale +
                            " w-[80px] h-[80px] m-[auto] object-cover"
                        }
                        src={item.hinh}
                        alt={item.tensp}
                    ></img>
                </a>
                <div className="text-left md:pl-[24px] md:p-[20px] p-[12px]">
                    <a href="/" className="font-semibold">
                        {item.tensp}
                    </a>
                    <div className="text-[#86868B] font-normal mt-1">
                        Hình thức: Mua thẳng
                        <br />
                        Màu sắc: {item.mausac}
                        <br />
                        {item.dungluong && (
                            <div>Dung lượng: {item?.dungluong}</div>
                        )}
                    </div>
                    <div
                        className={
                            styles.displayBlock +
                            " hidden text-[#0066cc] font-semibold pt-2"
                        }
                    >
                        Giá bán: {Number(item.gia).toLocaleString() + "đ"}
                    </div>
                </div>
            </div>
            <div className="flex items-center justify-end pb-2">
                <div className={styles.quantity}>
                    <button
                        className={addClass + " text-[16px]"}
                        onClick={() => decreaseQty(item)}
                    >
                        &#8722;
                    </button>
                    <input
                        type="number"
                        value={
                            // item.soluong
                            qty
                        }
                        onChange={handleQtyChange}
                        onKeyDown={handleKeyDown}
                        className={
                            styles.inputQuantity + " " + styles.noSpinner
                        }
                    ></input>
                    <button
                        className="text-[16px]"
                        onClick={() => increaseQty(item)}
                    >
                        &#43;
                    </button>
                </div>
                <div className="lg:p-[12px] p-[8px] align-top">
                    <IconButton
                        size="medium"
                        color="error"
                        onClick={() => HandleDeleteSp(item)}
                    >
                        <DeleteOutline
                            sx={{
                                fontSize: "24px",
                            }}
                        />
                    </IconButton>
                </div>
            </div>
        </div>
    );
}

export default ProductItemMobile;
