import "@splidejs/react-splide/css";
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import images from "../../../assets/image";
import './AdvertisementSlide.css'
function AdvertisementSlide(){
    const data = [
        {
            image: images.banner1,
        },
        {
            image: images.banner2,
        },
        {
            image: images.banner3,
        },
        {
            image: images.banner4,
        },
        {
            image: images.banner5,
        },
        {
            image: images.banner6,
        },
    ];
    const options = {
        rewind: true,
        type: "loop",
        speed: 1400,
        perPage: 1,
        perMove: 1,
        autoplay: true,
        pagination: true,
        paginationKeyboard:true,
        //isNavigation: true,
        // fixedWidth: 250,
        // arrows: { prev: <WestIcon />, next: <EastIcon /> }
    };
    return (
        <div className="w-full">
            
            <Splide hasTrack={false} options={options} aria-label="Slider Product">
            <div className="mainSlider">
                <SplideTrack>
                    {data.map((product, index) => (
                        <SplideSlide key={index}>
                            <div className="min-h-[400px] cursor-pointer">
                                <img  className="h-full" src={product.image} alt={product.image}></img>
                            </div>
                        </SplideSlide>
                    ))}
                </SplideTrack>
            </div>
            <div className="paginationSlider">
                <div className="splide__arrows advertisement">
                        <button className="splide__arrow splide__arrow--prev  ">
                        <NavigateNextIcon  />
                        </button>
                        <button className="splide__arrow splide__arrow--next  ">
                            <NavigateNextIcon  />
                        </button>
                </div>

            </div>
            
          {/* border-none bg-slate-400 opacity-50 ml-[80px] w-[60px] h-[60px] */}
        </Splide>
        </div>
    );
}
export default AdvertisementSlide;