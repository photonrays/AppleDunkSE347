import React from "react";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import "./Pagination.css";

const Pagination = ({
    totalItems,
    itemsPerPage,
    paginate,
    currentPage,
    previousPage,
    nextPage
}) => {
    let pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div className='pagination-container'>
            <ul className="pagination">
                <li onClick={previousPage} className="page-number font-bold text-[18px]">
                    <ArrowBackIosNewIcon className="font-bold text-[18px]"/>
                </li>
                {pageNumbers.map((number, index) => {
                    const curPage = index + 1

                    return (<li 
                        key={number} 
                        onClick={() => paginate(number)}
                        className={curPage === currentPage ? "page-number active" : "page-number"}
                    >
                        {number}
                    </li>)
                }
                )}
                <li onClick={nextPage} className="font-bold text-[18px] page-number">
                    <ArrowForwardIosIcon className="font-bold text-[18px]"/>
                </li>
            </ul>
        </div>
    );
};

export default Pagination;