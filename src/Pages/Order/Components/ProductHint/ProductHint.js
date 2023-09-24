import "@splidejs/react-splide/css";
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import EastIcon from "@mui/icons-material/East";

import ItemProduct from "./ItemProduct";
import images from "../../../../assets/image";
import "./ProductHint.css";
import { useEffect, useState } from "react";
import HandleApiRecommend from "../../../../Apis/HandleApiRecommend";

function ProductHint() {
    // const data = [
    //     {
    //         image: images.ip14prm,
    //         name: "iPhone 14 Pro Leather Case with MagSafe",
    //         price: 1590000,
    //     },
    //     {
    //         image: images.airpod2,
    //         name: "Airpods Pro 2",
    //         price: 5990000,
    //     },
    //     {
    //         image: images.ip14prm,
    //         name: "iPhone 14 Pro Leather Case with MagSafe",
    //         price: 1590000,
    //     },
    //     {
    //         image: images.airpod2,
    //         name: "Airpods Pro 2",
    //         price: 5990000,
    //     },
    //     {
    //         image: images.ip14prm,
    //         name: "iPhone 14 Pro Leather Case with MagSafe",
    //         price: 1590000,
    //     },
    //     {
    //         image: images.airpod2,
    //         name: "Airpods Pro 2",
    //         price: 5990000,
    //     },
    // ];
    const user = JSON.parse(localStorage.getItem("user"));
    const [data, setData] = useState([]);
    useEffect(() => {
        HandleApiRecommend.getRecommends(user?.makh)
            .then((data) => {
                setData(data);
                // console.log(data);
            })
            .catch((err) => console.log(err));
    }, []);

    const options = {
        rewind: true,
        type: "loop",
        speed: 1400,
        perPage: 4,
        perMove: 1,
        width: 1060,
        gap: "3rem",
        // isNavigation: true,
        // fixedWidth: 250,
        // arrows: { prev: <WestIcon />, next: <EastIcon /> }
    };

    return (
        <Splide hasTrack={false} options={options} aria-label="Slider Product">
            <div className="ProductHint__slide mt-6">
                <SplideTrack>
                    {data.map((product, index) => (
                        <SplideSlide key={index}>
                            <ItemProduct data={product} />
                        </SplideSlide>
                    ))}
                </SplideTrack>
            </div>

            {/* <div className="splide__arrows">
                <button className="splide__arrow splide__arrow--prev">
                    <EastIcon />
                </button>
                <button className="splide__arrow splide__arrow--next">
                    <EastIcon />
                </button>
            </div> */}
        </Splide>
    );
}

export default ProductHint;
