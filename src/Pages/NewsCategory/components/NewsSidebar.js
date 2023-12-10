import React from "react";
import { Home, Newspaper, Edit, Public, AppShortcut, Lightbulb } from "@mui/icons-material";

export default function NewsSidebar({type}) {
  return (
    <div className="w-[200px] hidden lg:flex shrink-0 justify-center pt-[12px] sticky top-0">
      <ul>
        <li className="w-[180px] h-[52px] flex">
          <a
            href="/tin-tuc"
            className="flex items-center grow text-[16px] px-5 text-[#1D1D1F] font-bold"
          >
            <Home sx={{ fontSize: "24px", marginRight: "6px" }} /> Trang chủ
            News
          </a>
        </li>
        <li className="w-[180px] h-[52px] flex">
          <a
            href="/apple-news"
            className={`flex items-center grow  text-[16px] px-5 rounded-2xl ${
              type === "appleNews"
                ? "text-[#0066CC] bg-gray-200"
                : "text-[#1D1D1F]"
            } font-bold`}
          >
            <Newspaper sx={{ fontSize: "24px", marginRight: "6px" }} />
            Tin tức Apples
          </a>
        </li>
        <li className="w-[180px] h-[52px] text-[16px] text-[#1D1D1F] font-bold flex">
          <a
            href="/news-review"
            className={`flex items-center grow  text-[16px] px-5 rounded-2xl  ${
              type === "review"
                ? "text-[#0066CC] bg-gray-200"
                : "text-[#1D1D1F]"
            } font-bold`}
          >
            <Edit sx={{fontSize: "24px", marginRight: "6px"}}/>
            Bài viết review
          </a>
        </li>
        <li className="w-[180px] h-[52px] text-[16px] text-[#1D1D1F] font-bold flex">
          <a
            href="/tin-kham-pha"
            className={`flex items-center grow  text-[16px] px-5 rounded-2xl ${
              type === "explore"
                ? "text-[#0066CC] bg-gray-200"
                : "text-[#1D1D1F]"
            } font-bold`}
          >
            <Public sx={{fontSize: "24px", marginRight: "6px"}}/>
            Khám phá
          </a>
        </li>
        <li className="w-[180px] h-[52px] text-[16px] text-[#1D1D1F] font-bold flex">
          <a
            href="/thu-thuat"
            className={`flex items-center grow  text-[16px] px-5 rounded-2xl ${
              type === "trick"
                ? "text-[#0066CC] bg-gray-200"
                : "text-[#1D1D1F]"
            } font-bold`}
          >
            <AppShortcut sx={{fontSize: "24px", marginRight: "6px"}}/>
            Thủ thuật
          </a>
        </li>
        <li className="w-[180px] h-[52px] text-[16px] text-[#1D1D1F] font-bold flex">
          <a
            href="/tin-khac"
            className={`flex items-center grow  text-[16px] px-5 rounded-2xl ${
              type === "other"
                ? "text-[#0066CC] bg-gray-200"
                : "text-[#1D1D1F]"
            } font-bold`}
          >
            <Lightbulb sx={{fontSize: "24px", marginRight: "6px"}}/>
            Tin khác
          </a>
        </li>
      </ul>
    </div>
  );
}
