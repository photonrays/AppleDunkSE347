import styles from "../Customer.module.css";

export default ({ lanthu, ngbaohanh, mota, tinhtrangbaohanh })=> {
    return (
        <div className={styles.bg_white +" rounded-lg w-full my-4 drop-shadow-lg"}>
            <div className="px-4 py-4">
                <strong className="my-4 text-blue-600">Lần thứ: <span className="text-rose-600">{lanthu}</span></strong>
                <p className="my-4"><b>Ngày bảo hành:</b> {ngbaohanh}.</p>
                <p className="my-4"><b>Mô tả vấn đề của thiết bị:</b> {mota}.</p>
                <p className="my-4"><b>Tình trạng của thiết bị trước khi gửi:</b> {tinhtrangbaohanh}.</p>
            </div>
        </div>
    )
}