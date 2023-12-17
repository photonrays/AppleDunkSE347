import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import "./Carousel.css"

function Carousel(props) {
    const images = props.sp.imageList.map(img => 
            (
                {
                    original: img,
                    thumbnail: img,
                }
            )
          );
    return(
            <ImageGallery
             class="image-gallery"
             items={images}
             showFullscreenButton={false}
             showPlayButton={false}
             />
    );
}

export default Carousel;
