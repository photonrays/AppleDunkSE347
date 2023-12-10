import styles from "../KhuyenMai.module.css";

const KhuyenMaiItem = ({khuyenmai})=>{

    const formatCurrency = (value) => {
        const formattedValue = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        return `${formattedValue} đ`;
    };

    const datebd = new Date(khuyenmai.batdau);
    const formattedDatebd = `${datebd.getDate()}/${datebd.getMonth() + 1}/${datebd.getFullYear()}`;

    const datekt = new Date(khuyenmai.ketthuc);
    const formattedDatekt = `${datekt.getDate()}/${datekt.getMonth() + 1}/${datekt.getFullYear()}`;

    return (
        <div className={styles.bg_white + " "+ styles.item +"  rounded lg:grid grid-cols-3  p-4 drop-shadow-lg"}>
            <div className="flex justify-center col-span-1">
                <img src={khuyenmai.image} alt="hình ảnh khuyến mãi"  className={`${styles.imageKM}`}/>
            </div>
            <div className="col-span-2 px-4">
                <strong className="text-3xl my-4">{khuyenmai.title}</strong>
                <p className="my-4">{khuyenmai.description}</p>
                <div className="flex justify-between">
                    <b>Mã khuyến mãi:</b>
                    <b className="text-red-500 mr-5">{khuyenmai.makm}</b>
                </div>
                <div className="flex justify-between">
                    <b>Áp dụng từ:</b><br/>
                    <b className="mr-5">{formatCurrency(khuyenmai.apdung)}</b>
                </div>
                <div className="flex justify-between">
                    <b>Khuyến mãi:</b>
                    <b className="mr-5">{khuyenmai.phantramkm} %</b>
                </div>
                <div className="my-4 flex justify-between">
                    <p>Thời gian:</p>
                    <p className="mr-5">{formattedDatebd} - {formattedDatekt}</p>
                </div>
            </div>
        </div>
    )
}

export default KhuyenMaiItem;
