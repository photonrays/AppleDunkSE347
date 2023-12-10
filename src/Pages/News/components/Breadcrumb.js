import React, { Fragment } from "react";

export default function Breadcrumb({ data }) {
  return (
    <div>
      <div className="px-[10px] py-[8px] pt-[20px] mb-[24px]">
        <div className="max-w-[1200px] m-auto w-full flex items-center flex-wrap">
          <a
            href="/"
            className="text-[14px] text-[#515154] hover:text-[#0066cc]"
          >
            Trang chủ
          </a>
          <div className="px-[5px] py-0">&gt;</div>
          <a href="/tin-tuc" className={`text-[14px] text-[#515154] ${data && "hover:text-[#0066cc]"}`}>
            Tin tức
          </a>
          {data && <Fragment>  <div className="px-[5px] py-0">&gt;</div>
            <a href={data.url} className="text-[14px] text-[#515154]">
              {data.name}
            </a>
          </Fragment>}

        </div>
      </div>
    </div>
  );
}
