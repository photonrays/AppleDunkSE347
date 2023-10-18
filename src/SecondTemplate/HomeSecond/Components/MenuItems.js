import styles from "./MenuItems.module.css";
import {
    TabletMac,
    ArrowForwardIos,
    PhoneIphone,
    LaptopMac,
    Watch,
    Headphones,
    SettingsRemote,
    Newspaper,
    Receipt,
} from "@mui/icons-material/";
function MenuItems() {
    return (
        <div
            className="md:w-[175px] lg:w-[200px] mt-[16px] shadow-[0_1px_9px_1px_rgba(0,0,0,0.08)] 
        rounded-[12px] bg-gray-100"
        >
            <a
                href="/iphone"
                className="flex justify-between items-center cursor-pointer hover:bg-gray-200 hover:rounded-t-[12px] p-4"
            >
                <div>
                    <PhoneIphone
                        sx={{
                            width: "24px",
                            height: "24px",
                            marginRight: "10px",
                        }}
                    />
                    <span className="text-[12px]">iPhone</span>
                </div>
                <ArrowForwardIos />
            </a>
            <a
                href="/ipad"
                className="flex justify-between items-center cursor-pointer hover:bg-gray-200 p-4"
            >
                <div>
                    <TabletMac
                        sx={{
                            width: "24px",
                            height: "24px",
                            marginRight: "10px",
                        }}
                    />
                    <span className="text-[12px]">iPad</span>
                </div>
                <ArrowForwardIos />
            </a>
            <a
                href="/mac"
                className="flex justify-between items-center cursor-pointer hover:bg-gray-200 p-4"
            >
                <div>
                    <LaptopMac
                        sx={{
                            width: "24px",
                            height: "24px",
                            marginRight: "10px",
                        }}
                    />
                    <span className="text-[12px]">Macbook</span>
                </div>
                <ArrowForwardIos />
            </a>
            <a
                href="/watch"
                className="flex justify-between items-center cursor-pointer hover:bg-gray-200 p-4"
            >
                <div>
                    <Watch
                        sx={{
                            width: "24px",
                            height: "24px",
                            marginRight: "10px",
                        }}
                    />
                    <span className="text-[12px]">Watch</span>
                </div>
                <ArrowForwardIos />
            </a>
            <a
                href="/am-thanh"
                className="flex justify-between items-center cursor-pointer hover:bg-gray-200 p-4"
            >
                <div>
                    <Headphones
                        sx={{
                            width: "24px",
                            height: "24px",
                            marginRight: "10px",
                        }}
                    />
                    <span className="text-[12px]">Âm thanh</span>
                </div>
                <ArrowForwardIos />
            </a>
            <a
                href="/phu-kien"
                className="flex justify-between items-center cursor-pointer hover:bg-gray-200 p-4"
            >
                <div>
                    <SettingsRemote
                        sx={{
                            width: "24px",
                            height: "24px",
                            marginRight: "10px",
                        }}
                    />
                    <span className="text-[12px]">Phụ kiện</span>
                </div>
                <ArrowForwardIos />
            </a>
            <a
                href="/tin-tuc"
                className="flex justify-between items-center cursor-pointer hover:bg-gray-200 p-4"
            >
                <div>
                    <Newspaper
                        sx={{
                            width: "24px",
                            height: "24px",
                            marginRight: "10px",
                        }}
                    />
                    <span className="text-[12px]">Tin tức</span>
                </div>
                <ArrowForwardIos />
            </a>
            <a
                href="/khuyenmai"
                className="flex justify-between items-center cursor-pointer hover:bg-gray-200 p-4 hover:rounded-b-[12px]"
            >
                <div>
                    <Receipt
                        sx={{
                            width: "24px",
                            height: "24px",
                            marginRight: "10px",
                        }}
                    />
                    <span className="text-[12px]">Khuyến mãi</span>
                </div>
                <ArrowForwardIos />
            </a>
        </div>
    );
}

export default MenuItems;
