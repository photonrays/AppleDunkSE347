import {
    AccountCircleOutlined,
    FeedOutlined,
    HomeOutlined,
    MonetizationOnOutlined,
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
            <div className="text-center active:text-[#0066cc] p-2">
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
            </div>
            <div className="text-center active:text-[#0066cc] p-2">
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
            </div>
            <div className="text-center active:text-[#0066cc] p-2">
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
            </div>
        </div>
    );
}

export default NavigationMobile;
