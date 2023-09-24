import React from 'react'
import Banner from './Components/Banner';
import DetailSection from './Components/DetailSection';
import ProductSection from './Components/ProductSection';
import SubcribeSection from './Components/SubcribeSection';
import TopSection from './Components/TopSection';

export default function ProductList({ type }) {
    return (
        <div className='w-full bg-[#f5f5f7]'>
            <TopSection type={type} />
            <Banner type={type} />
            <ProductSection type={type} />
            <DetailSection type={type} />
            {/* <SubcribeSection /> */}
        </div >
    )
}
