import ProductCard from "./Product_Card";
function Products_Display({currentItems}) {
    return (
        <div id="product-list" 
        className="grid justify-items-stretch gap-[20px] grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {currentItems.map(item => (
                <ProductCard {...item}/>
            ))}
        </div>
    );
}

export default Products_Display;