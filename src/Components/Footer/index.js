import classes from "./Footer.module.css";
import image from "../../assets/image";


function Footer() {
    return (
        <div className={classes.container}>
            <div className={classes.footerUpper + " grid grid-cols-footer gap-4"}>
                <div className={classes.followUs}>
                    <img
                        src={image.logo}
                        alt="logo"
                        className="h-[45px] w-[180px] object-cover ml-[-10px]"
                    />
                    <p className={classes.gioiThieu}>
                        Năm 2023, Apple Dunk trở thành đại lý ủy quyền của Apple. Chúng tôi
                        phát triển chuỗi cửa hàng tiêu chuẩn và Apple Mono Store nhằm mang
                        đến trải nghiệm tốt nhất về sản phẩm và dịch vụ của Apple cho người
                        dùng Việt Nam.
                    </p>
                    <ul className={classes.networks}>
                        <li className={classes.networkIcon}>
                            <a
                                href="https://www.facebook.com/shopdunk.store"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <img src="https://shopdunk.com/images/uploaded/icon/Face.png" alt="facebook-icon" />
                            </a>
                        </li>
                        <li className={classes.networkIcon}>
                            <a
                                href="https://www.tiktok.com/@shopdunk_apple"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <img src="https://shopdunk.com/images/uploaded/icon/Tiktok.png" alt="tiktok-icon" />
                            </a>
                        </li>
                        <li className={classes.networkIcon}>
                            <a href="https://zalo.me/3937868610324741136">
                                <img src="https://shopdunk.com/images/uploaded/icon/Zalo.png" alt="zalo-icon" />
                            </a>
                        </li>
                        <li className={classes.networkIcon}>
                            <a
                                href="https://www.youtube.com/c/ShopDunkApple"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <img
                                    src="https://shopdunk.com/images/uploaded/icon/Youtube.png"
                                    alt="youtube-icon"
                                />
                            </a>
                        </li>
                    </ul>
                </div>
                <div className={classes.information}>
                    <div className={classes.title}>Thông tin</div>
                    <ul>
                        <li>
                            <a href="/tin-tuc" className={classes.listItem}>
                                Tin Tức
                            </a>
                        </li>
                        <li>
                            <a href="/customer/baohanh" className={classes.listItem}>
                                Bảo hành và sửa chữa
                            </a>
                        </li>
                        <li>
                            <a href="/khuyenmai" className={classes.listItem}>
                                Khuyến mãi
                            </a>
                        </li>
                    </ul>
                </div>
                <div className={classes.customerService}>
                    <div className={classes.title}>Chính sách</div>
                    <ul>
                        <li>
                            <a href="/policy" className={classes.listItem}>
                                Bảo hành
                            </a>
                        </li>
                    </ul>
                </div>
                <div className={classes.myAccount}>
                    <div className={classes.title}>Địa chỉ & Liên hệ</div>
                    <ul>
                        <li>
                            <a href="/customer/info" className={classes.listItem}>
                                Tài khoản của tôi
                            </a>
                        </li>
                        <li>
                            <a href="/customer/history" className={classes.listItem}>
                                Đơn đặt hàng
                            </a>
                        </li>
                        <li>
                            <a href="/store" className={classes.listItem}>
                                Hệ thống cửa hàng
                            </a>
                        </li>
                        <li>
                            <a href="tel:0826132302" className={classes.listItem}>
                                Mua hàng: <span className={classes.phone}>0826.132.302</span>
                            </a>
                            <ul>
                                <li>
                                    <span
                                        className={`${classes.listItem} ${classes.listItemLocation}`}
                                    >
                                        Nhánh 1: khu vực Hà Nội và các tỉnh phía bắc
                                    </span>
                                </li>
                                <li>
                                    <span
                                        className={`${classes.listItem} ${classes.listItemLocation}`}
                                    >
                                        Nhánh 2: khu vực Hồ Chí Minh và các tỉnh phía nam
                                    </span>
                                </li>
                                <li>
                                    <span
                                        className={`${classes.listItem} ${classes.listItemLocation}`}
                                    >
                                        Nhánh 3: Khiếu nại và góp ý
                                    </span>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <a href="tel:0826132302" className={classes.listItem}>
                                Doanh nghiệp:{" "}
                                <span className={classes.phone}>0826.132.302</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <div className={classes.footerLower}>
                <div className={classes.footerInfo}>
                    {/* <span className={classes.footerDisclaimer}>
                        © 2016 Công ty Cổ Phần HESMAN Việt Nam GPDKKD: 0107465657 do Sở KH &
                        ĐT TP. Hà Nội cấp ngày 08/06/2016.<br></br>Địa chỉ: Số 76 Thái Hà,
                        phường Trung Liệt, quận Đống Đa, thành phố Hà Nội, Việt Nam<br></br>
                    </span> */}
                    <a href="http://online.gov.vn/(X(1)S(jfktnnku5rui3vjf5pnk4sgc))/Home/WebDetails/34144?AspxAutoDetectCookieSupport=1">
                        <img
                            src="https://shopdunk.com/images/uploaded-source/Trang%20ch%E1%BB%A7/Bocongthuong.png"
                            alt="bocongthuong"
                            className={classes.footerImg}
                        />
                    </a>
                </div>
            </div>
        </div>
    );
}

export default Footer;
