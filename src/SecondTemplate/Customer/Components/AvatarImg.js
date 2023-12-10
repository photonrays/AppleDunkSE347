export default ({src, alt}) => {
    return (
        <div className="border-2 rounded-full w-fit h-fit px-2 py-2 mx-3 my-3">
            <img src={src} alt={alt} className="rounded-full border-2 w-40 h-40"/>
        </div>
    );
}