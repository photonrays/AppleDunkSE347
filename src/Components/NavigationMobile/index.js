import {
    AccountCircleOutlined,
    FeedOutlined,
    HomeOutlined,
    MonetizationOnOutlined,
    LoginOutlined,
} from "@mui/icons-material";
import styles from "./NavigationMobile.module.css";

function NavigationMobile() {
    return (
        <div className={styles.container + " md:hidden"}>
            <a href="/" className="text-center active:text-[#0066cc] p-2">
                <HomeOutlined
                    sx={{
                        fontSize: "20px",
                        color: "#000",
                        ":active": {
                            color: "#0066cc",
                        },
                    }}
                />
                <div className="text-xl">Trang chủ</div>
            </a>
            <a
                href="/tin-tuc"
                className="text-center active:text-[#0066cc] p-2"
            >
                <FeedOutlined
                    sx={{
                        fontSize: "20px",
                        color: "#000",
                        ":active": {
                            color: "#0066cc",
                        },
                    }}
                />
                <div className="text-xl">Tin tức</div>
            </a>
            <a
                href="/khuyenmai"
                className="text-center active:text-[#0066cc] p-2"
            >
                <MonetizationOnOutlined
                    sx={{
                        fontSize: "20px",
                        color: "#000",
                        ":active": {
                            color: "#0066cc",
                        },
                    }}
                />
                <div className="text-xl">Khuyến mãi</div>
            </a>
            {document.cookie.indexOf("token") !== -1 ? (
                <a
                    href="/customer/info"
                    className="text-center active:text-[#0066cc] p-2"
                >
                    <AccountCircleOutlined
                        sx={{
                            fontSize: "20px",
                            color: "#000",
                            ":active": {
                                color: "#0066cc",
                            },
                        }}
                    />
                    <div className="text-xl">Tài khoản</div>
                </a>
            ) : (
                <a
                    href="/login"
                    className="text-center active:text-[#0066cc] p-2"
                >
                    <LoginOutlined
                        sx={{
                            fontSize: "20px",
                            color: "#000",
                            ":active": {
                                color: "#0066cc",
                            },
                        }}
                    />
                    <div className="text-xl">Đăng nhập</div>
                </a>
            )}
        </div>
    );
}

export default NavigationMobile;
