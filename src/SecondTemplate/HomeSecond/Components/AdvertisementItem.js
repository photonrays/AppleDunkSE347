import images from "../../../assets/image";

function AdvertisementItem(){
    const data = [
        {
            image: images.BonusBanner1,
        },
        {
            image: images.BonusBanner2,
        },
        {
            image: images.BonusBanner3,
        }
    ];
    return (
        <div className="flex flex-wrap justify-center pb-28">
           {data.map((product, index) => (
                        // eslint-disable-next-line jsx-a11y/anchor-is-valid
                        <a href="#" key={index} className="lg:pt-20 pt-8">
                            <div className="w-[370px] mx-4">
                                <img  src={product.image} alt={product.image}></img>
                            </div>
                        </a>
            ))}
        </div>
    );
}
export default AdvertisementItem;