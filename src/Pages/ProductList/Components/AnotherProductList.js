import React, { useEffect, useState } from 'react'
import ProductSection from './ProductSection';
import TopSection from './TopSection';
import { useParams } from 'react-router-dom'
import api from '../../../Apis/HandleApiProduct'
import { convertToSlug } from '../../../utils'

export default function AnotherProductList({ type }) {
    const { slug } = useParams();
    const [currentCategory, setCurrentCategory] = useState(null);

    useEffect(() => {
        api.getAllSubCategory(type).then(result => {
            for (var res of result) {
                if (slug === convertToSlug(res)) {
                    setCurrentCategory(res);
                    break;
                }
            }
        })
    }, [slug, type])

    return (
        <div className='w-full bg-[#f5f5f7]'>

            {currentCategory !== null && <>
                <TopSection type={type} currentCategory={currentCategory} slug={slug} />
                <ProductSection type={type} currentCategory={currentCategory} />
                </>}
        </div >
    )
}
