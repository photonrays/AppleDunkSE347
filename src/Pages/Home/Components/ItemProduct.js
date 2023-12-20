import styles from './ItemComponent.module.css'


function ItemProduct(props){
    if(props.title==='Tin tức'){
        return (
        <a href={'/tin-tuc/'+props.data.slug} className={`flex flex-col pb-4 mx-4 w-[385px] h-[350px] bg-white rounded-xl drop-shadow-sm hover:drop-shadow-2xl ${styles.item}`}>
            <img className=" h-[190px] rounded-xl" src={props.data.image} alt={props.data.image}></img>
            <h3 className="text-[18px] flex-1 font-bold text-left px-8 py-8">
                {
                    props.data.title
                }
            </h3>
            <div className="flex items-end">
                <p className="text-[#aaa] text-[16px]  pl-8 pb-8">{props.data.dateSource}</p>
            </div>

        </a>
        );
    }
    else
    {
        return (
            <a href={props.data.link} className={`flex flex-col py-4 mx-4 w-[280px] h-[420px] bg-white rounded-xl drop-shadow-sm hover:drop-shadow-2xl ${styles.item}`}>
                <div className="h-[50px] flex justify-end pr-4">
                    <img className="w-[100px]" src={props.data.note} alt={props.data.note}></img>
                </div>
                <img className="p-[16px] w-[280px] h-[240px] object-contain" src={props.data.image} alt={props.data.image}></img>
                <h3 className="text-[18px] flex-1 font-bold text-left px-8">
                    {
                        props.data.name
                    }
                </h3>
                <div className="flex items-end">
                    <p className="text-[#0066cc] text-[16px] font-bold pl-8">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(props.data.newPrice)}</p>
                    {/* <p className="text-[#86868b] text-[13px] line-through  pl-4 ">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(props.data.oldPrice)}</p> */}
                </div>
    
            </a>
        );
    }
}
export default ItemProduct;