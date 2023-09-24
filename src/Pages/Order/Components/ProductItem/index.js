import styles from "./ProductItem.module.css";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import HandleApiCart from "../../../../Apis/HandleApiCart";

import { DeleteOutline, ReceiptOutlined } from "@mui/icons-material";
import { IconButton } from "@mui/material";

function ProductItem({
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
        <tr className="border-solid border-t border-t-[#d9d9d9]" key={index}>
            <td className="p-[12px]">
                <a>
                    <img
                        className="w-[80px] h-[80px]  m-[auto]"
                        src={item.hinh}
                        alt={item.tensp}
                    ></img>
                </a>
            </td>
            <td className="text-left pl-[24px] p-[12px]">
                <a href="/" className="font-semibold">
                    {item.tensp}
                </a>
                <div className="text-[#86868B] font-normal mt-1">
                    Hình thức: Mua thẳng
                    <br />
                    Màu sắc: {item.mausac}
                    <br />
                    {item.dungluong && <div>Dung lượng: {item?.dungluong}</div>}
                </div>
            </td>
            <td className="p-[12px] align-top">
                {Number(item.gia).toLocaleString() + "đ"}
            </td>
            <td className="p-[12px] align-top">
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
            </td>
            <td className="p-[12px] align-top">
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
            </td>
        </tr>
    );
}

export default ProductItem;
