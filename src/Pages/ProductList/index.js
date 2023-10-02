import React from 'react'
import Banner from './Components/Banner';
import DetailSection from './Components/DetailSection';
import ProductSection from './Components/ProductSection';
import TopSection from './Components/TopSection';
import { useThemeContext } from '../../contexts/themeContext';
import { useEffect } from 'react';

export default function ProductList({ type }) {
    const {theme, setTheme} = useThemeContext()

    console.log(theme)

    return (
        <div className='w-full bg-[#f5f5f7]'>
            <TopSection type={type} />
            <Banner type={type} />
            <button className='w-52 h-10 bg-slate-300 mx-auto' onClick={() => setTheme("dark")}>Dark theme</button>
            <button className='w-52 h-10 bg-slate-300 mx-auto' onClick={() => setTheme("light")}>Light theme</button>
            <ProductSection type={type} />
            <DetailSection type={type} />
            {/* <SubcribeSection /> */}
        </div >
    )
}
