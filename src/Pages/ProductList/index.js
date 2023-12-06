import React from 'react'
import Banner from './Components/Banner';
import DetailSection from './Components/DetailSection';
import ProductSection from './Components/ProductSection';
import TopSection from './Components/TopSection';
import { useEffect } from 'react';
import { useTemplateContext } from '../../contexts/templateContext';

export default function ProductList({ type }) {
    const {template} = useTemplateContext();
    console.log("(Product) template: ", template)
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
