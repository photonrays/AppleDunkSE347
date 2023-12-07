import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import { useEffect, useState } from "react";
import NorthIcon from "@mui/icons-material/North";
import styles from "./DefaultLayout.module.css";
import Sidebar from "../../Components/Sidebar";
import NavigationMobile from "../../Components/NavigationMobile";
import HeaderSecond from "../../SecondTemplate/HeaderSecond";


function DefaultLayout({ children }) {
    const [backToTopButton, setBackToTopButton] = useState(false);
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;

    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (window.scrollY / (scrollHeight - clientHeight) >= 0.7) {
                setBackToTopButton(true);
            } else {
                setBackToTopButton(false);
            }
        });
    }, []);

    const scrollUp = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };
    return (
        <div className="max-h-full min-h-screen max-w-full flex overflow-hidden">
            <Sidebar />
            <div className="grow w-full">
                <Header />
                {/* <HeaderSecond /> */}
                <div className="mt-[64px]">{children}</div>
                <Footer />
                {backToTopButton && (
                    <button className={styles.btn} onClick={scrollUp}>
                        <NorthIcon className={styles.btnIcon} />
                    </button>
                )}
            </div>
            {/* Navigation Mobile */}
            <NavigationMobile />
        </div>
    );
}

export default DefaultLayout;
