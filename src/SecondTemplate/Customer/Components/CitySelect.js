import React, { useState } from "react";

const cityList = [
  "Hà Nội",
  "Hà Giang",
  "Cao Bằng",
  "Bắc Kạn",
  "Tuyên Quang",
  "Lào Cai",
  "Điện Biên",
  "Lai Châu",
  "Sơn La",
  "Yên Bái",
  "Hòa Bình",
  "Thái Nguyên",
  "Lạng Sơn",
  "Bắc Giang",
  "Quảng Ninh",
  "Phú Thọ",
  "Vĩnh Phúc",
  "Bắc Ninh",
  "Hải Dương",
  "Hưng Yên",
  "Thái Bình",
  "Hà Nam",
  "Nam Định",
  "Ninh Bình",
  "Thanh Hóa",
  "Nghệ An",
  "Hà Tĩnh",
  "Quảng Bình",
  "Quảng Trị",
  "Thừa Thiên Huế",
  "Đà Nẵng",
  "Quảng Nam",
  "Quảng Ngãi",
  "Bình Định",
  "Phú Yên",
  "Khánh Hòa",
  "Ninh Thuận",
  "Bình Thuận",
  "Kon Tum",
  "Gia Lai",
  "Đắk Lắk",
  "Đắk Nông",
  "Lâm Đồng",
  "Bình Phước",
  "Tây Ninh",
  "Bình Dương",
  "Đồng Nai",
  "Bà Rịa-Vũng Tàu",
  "Hồ Chí Minh",
  "Long An",
  "Tiền Giang",
  "Bến Tre",
  "Trà Vinh",
  "Vĩnh Long",
  "Đồng Tháp",
  "An Giang",
  "Kiên Giang",
  "Cần Thơ",
  "Hậu Giang",
  "Sóc Trăng",
  "Bạc Liêu",
  "Cà Mau",
];

const CitySelect = () => {
    const [selectedCity, setSelectedCity] = useState("");

    const handleCityChange = (event) => {
        setSelectedCity(event.target.value);
    };

    return (
        <div>
            <label htmlFor="city-select">Tỉnh, thành phố:</label>
            <select className="w-full border-2 rounded-lg px-3 py-3 my-4 mr-8"
                id="city-select"
                value={selectedCity}
                onChange={handleCityChange}>
                    <option value="">Chọn tỉnh, thành phố</option>
                    {cityList.map((city) => (
                    <option key={city} value={city}>
                        {city}
                    </option>
                    ))}
            </select>
        </div>
    );
};

export default CitySelect;