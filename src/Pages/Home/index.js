import "./Home.module.css";
import AdvertisementSlide from "./Components/AdvertisementSlide";
import AdvertisementItem from "./Components/AdvertisementItem";
import ItemComponent from "./Components/ItemComponent";
import images from "../../assets/image";
import SubcribeSection from "../ProductList/Components/SubcribeSection";
import { useEffect, useState } from "react";
import HandleApiProduct from "../../Apis/HandleApiProduct.js";
import HandleApiNews from "../../Apis/HandleApiNews";

function Home() {
    const [dataIphoneProduct, setDataIphoneProduct]=useState([]);
    const [dataIpadProduct, setDataIpadProduct]=useState([]);
    const [dataMacProduct, setDataMacProduct]=useState([]);
    const [dataAmThanhProduct, setDataAmThanhProduct]=useState([]);
    const [dataWatchProduct, setDataWatchProduct]=useState([]);
    const [dataNews, setDataNews]=useState([]);


    const dataIphoneFromAPI=HandleApiProduct.getAllProduct("iPhone");
    const dataIpadFromAPI=HandleApiProduct.getAllProduct("iPad");
    const dataMacFromAPI=HandleApiProduct.getAllProduct("Mac");
    const dataWatchFromAPI=HandleApiProduct.getAllProduct("Watch");
    const dataAmThanhFromAPI=HandleApiProduct.getAllProduct("Âm thanh");
    const dataNewsFromAPI=HandleApiNews.getAllNews(1,3);


    useEffect(()=>{
        dataIphoneFromAPI.then((data)=>{
            setDataIphoneProduct(()=>{
                return data.listProducts.slice(0,4)
            })
        })
        dataIpadFromAPI.then((data)=>{
            setDataIpadProduct(()=>{
                return data.listProducts.slice(0,4)
            })
        })
        dataMacFromAPI.then((data)=>{
            setDataMacProduct(()=>{
                return data.listProducts.slice(0,4)
            })
        })
        dataWatchFromAPI.then((data)=>{
            setDataWatchProduct(()=>{
                return data.listProducts.slice(0,4)
            })
        })
        dataAmThanhFromAPI.then((data)=>{
            setDataAmThanhProduct(()=>{
                return data.listProducts.slice(0,4)
            })
        })
        dataNewsFromAPI.then((data)=>{
            setDataNews(()=>{
                return data.listNews
            })
        })
    },[])
    let listIphoneProduct=[];
    let listIpadProduct=[];
    let listMacProduct=[];
    let listWatchProduct=[];
    let listAmThanhProduct=[];
    dataIphoneProduct.map((value,index)=>{
        listIphoneProduct.push({
            image: value.hinh,
            name: value.tensanpham,
            newPrice: value.gia,
            oldPrice: value.gia,
            note: images.khaitruong,
            link:'/detailproduct/'+value._id
        })
    })
    dataIpadProduct.map((value,index)=>{
        listIpadProduct.push({
            image: value.hinh,
            name: value.tensanpham,
            newPrice: value.gia,
            oldPrice: value.gia,
            note: images.khaitruong,
            link:'/detailproduct/'+value._id
        })
    })
    dataMacProduct.map((value,index)=>{
        listMacProduct.push({
            image: value.hinh,
            name: value.tensanpham,
            newPrice: value.gia,
            oldPrice: value.gia,
            note: images.khaitruong,
            link:'/detailproduct/'+value._id
        })
    })
    dataWatchProduct.map((value,index)=>{
        listWatchProduct.push({
            image: value.hinh,
            name: value.tensanpham,
            newPrice: value.gia,
            oldPrice: value.gia,
            note: images.khaitruong,
            link:'/detailproduct/'+value._id
        })
    })
    dataAmThanhProduct.map((value,index)=>{
        listAmThanhProduct.push({
            image: value.hinh,
            name: value.tensanpham,
            newPrice: value.gia,
            oldPrice: value.gia,
            note: images.khaitruong,
            link:'/detailproduct/'+value._id
        })
    })
    const tintucData=[
    {
        image: images.tintuc,
        name: 'Sinh viên kinh tế có nên chọn Apple để làm việc',
        date: '07/04/2023',
        link:'/tintuc'
    },
    {
        image: images.tintuc,
        name: 'Sinh viên kinh tế có nên chọn Apple để làm việc',
        date: '07/04/2023',
        link:'/tintuc'
    },
    {
        image: images.tintuc,
        name: 'Sinh viên kinh tế có nên chọn Apple để làm việc',
        date: '07/04/2023',
        link:'/tintuc'
    }
]
    const itemUI=[
        {
            title: "iPhone",
            datas: listIphoneProduct,
            link: '/iphone'
        },
        {
            title: "iPad",
            datas: listIpadProduct,
            link: '/ipad'
        },
        {
            title: "Mac",
            datas: listMacProduct,
            link: '/ipad'
        },
        {
            title: "Watch",
            datas: listWatchProduct,
            link: '/watch'
        },
        {
            title: "Âm thanh",
            datas: listAmThanhProduct,
            link: '/am-thanh'
        }
];
const tintucUI={
    title: 'Tin tức',
    datas: dataNews,
    link: '/tin-tuc'
}
    return(
    <div className="w-full bg-gray-100">
       <AdvertisementSlide/>
       <AdvertisementItem/>
       {
        itemUI.map((item, index)=>(
            <ItemComponent data={item} key={index}/>
        ))
       }
       <div className="flex justify-center">
            <a  href="/tin-tuc" className="block h-[432px] m-8">
                    <img  className="" src={images.BannerBottom} alt={images.BannerBottom}></img>
            </a>
       </div>
       <ItemComponent data={tintucUI}/>
       {/* <div className="my-[-80px]">
             <SubcribeSection/>
       </div> */}
    </div>
    );
}

export default Home;
