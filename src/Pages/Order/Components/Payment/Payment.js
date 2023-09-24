import Select from "react-select";
import { useEffect, useState } from "react";
import axios from "axios";
import images from "../../../../assets/image";
import styles from "./Payment.module.css";
import HandleApiStore from "../../../../Apis/HandleApiStore";

function Payment(props) {
    const user = JSON.parse(localStorage.getItem("user"));

    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);
    const [stores, setStores] = useState([]);

    const [selectedProvince, setSelectedProvince] = useState(null);
    const [selectedDistrict, setSelectedDistrict] = useState(null);
    const [selectedWard, setSelectedWard] = useState(null);
    const [selectedStore, setSelectedStore] = useState(null);
    const [name, setName] = useState(user ? user.hoten : "");
    const [email, setEmail] = useState(user ? user.email : "");
    const [phone, setPhone] = useState(user ? user.sdt : "");
    const [payment, setPayment] = useState(null);
    const [address, setAddress] = useState(null);

    const [method, setMethod] = useState("Store");

    const [showStore, setShowStore] = useState(true);
    const [showAddress, setShowAddress] = useState(false);
    const { handleGetData } = props;
    const dataParent = {
        name,
        phone,
        email,
        selectedProvince,
        selectedDistrict,
        method,
        selectedStore,
        selectedWard,
        address,
        payment,
    };

    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const handleBlur = function (e) {
        // if (e.target.type === "email") {
        //     if (
        //         emailRegex.test(e.target.value) === false ||
        //         e.target.value === ""
        //     ) {
        //         e.target.style.borderColor = "red";
        //     } else {
        //         // e.target.style.borderColor = "#ddd";
        //     }
        // }
        // if (e.target.type === "text" || e.target.type === "number") {
        //     if (e.target.value === "") {
        //         e.target.style.borderColor = "red";
        //     } else {
        //         e.target.style.borderColor = "#ddd";
        //     }
        // }
    };

    useEffect(() => {
        handleGetData(dataParent);
    }, []);

    useEffect(() => {
        handleGetData(dataParent);
    }, [
        selectedWard,
        selectedStore,
        selectedProvince,
        selectedDistrict,
        method,
        name,
        email,
        phone,
        payment,
        address,
    ]);

    // Render tên tỉnh, tpho
    useEffect(() => {
        axios
            .get(`https://provinces.open-api.vn/api/p`)
            .then((response) => {
                const cities = response.data.map((res) => ({
                    code: res.code,
                    label: res.name,
                }));
                setProvinces(cities);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    // Handle change province
    const handleChangeProvince = (selectedOption) => {
        setSelectedProvince(selectedOption);
        setSelectedDistrict(null);
        setSelectedWard(null);
        axios
            .get(
                `https://provinces.open-api.vn/api/p/${selectedOption.code}?depth=2`
            )
            .then((response) => {
                // console.log(response.data);
                const options = response.data.districts.map((item) => ({
                    value: item.code,
                    label: item.name,
                }));
                setDistricts(options);
            });
    };

    // Call handleChangDistrict khi method thay đổi
    useEffect(() => {
        if (selectedDistrict) {
            handleChangeDistrict(selectedDistrict);
        }
    }, [method]);

    // Handle change District
    const handleChangeDistrict = (selectedOption) => {
        setSelectedDistrict(selectedOption);
        // console.log(selectedOption);
        setSelectedWard(null);
        setSelectedStore(null);
        if (method === "Ship") {
            axios
                .get(
                    `https://provinces.open-api.vn/api/d/${selectedOption.value}?depth=2`
                )
                .then((response) => {
                    // console.log(response.data);
                    const options = response.data.wards.map((item) => ({
                        value: item.code,
                        label: item.name,
                    }));
                    setWards(options);
                });
        } else {
            HandleApiStore.getStoreByDistrict(selectedOption.value)
                .then((data) => {
                    console.log(data);
                    // setStores(data);
                    const options = data.map((item) => ({
                        value: item.districtCode,
                        label: item.name,
                    }));
                    setStores(options);
                })
                .catch((err) => console.log(err));
        }
    };

    // Handle change Ward
    const handleChangeWard = (selectedOption) => {
        setSelectedWard(selectedOption);
    };

    // Handle change Store
    const handleChangeStore = (selectedOption) => {
        setSelectedStore(selectedOption);
    };

    // Handle change radio input
    const handleChangeMethod = (e) => {
        setMethod(e.target.value);
        setShowStore(!showStore);
        setShowAddress(!showAddress);
        // console.log(e.target.value);
    };

    // Handle change name input
    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    // Handle change phone input
    const handlePhoneChange = (e) => {
        setPhone(e.target.value);
    };

    // Handle change email input
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    // Handle change payment
    const handlePaymentChange = (e) => {
        setPayment(e.target.value);
    };

    // Handle change payment
    const handleAddressChange = (e) => {
        setAddress(e.target.value);
    };
    // Custome select style
    const customStyles = {
        control: (provided, state) => ({
            ...provided,
            border: state.isSelected ? "1px solid #ddd" : "1px solid #ddd",
        }),
    };

    return (
        <div>
            <div className="w-full bg-white p-8 rounded-[8px] mt-6">
                {/* Thông tin khách hàng */}
                <div className="grid grid-cols-2 gap-6 mb-6">
                    <div className="col-span-2">
                        <div className="text-[14px] font-light mb-[8px]">
                            Họ tên:
                        </div>
                        <input
                            type="text"
                            value={name}
                            onBlur={handleBlur}
                            onfocus="this.style.borderColor='#0066cc'"
                            onChange={handleNameChange}
                            placeholder="Nhập họ tên"
                            // defaultValue={user.hoten}
                            required
                            className="h-[48px] w-full px-[16px] py-[8px] text-[16px] text-[#777]
                         outline-none border border-[#ddd] rounded-[8px] focus:border-[#0066cc] focus:text-black"
                        />
                    </div>
                    <div>
                        <div className="text-[14px] font-light mb-[8px]">
                            Số điện thoại:
                        </div>
                        <input
                            type="number"
                            value={phone}
                            onBlur={handleBlur}
                            // defaultValue={user.sdt}
                            onChange={handlePhoneChange}
                            placeholder="Nhập số điện thoại"
                            required
                            className={
                                styles.noSpinner +
                                " h-[48px] w-full px-[16px] py-[8px] text-[16px] text-[#777] appearance-none outline-none border border-[#ddd] rounded-[8px] focus:border-[#0066cc] focus:text-black"
                            }
                        />
                    </div>
                    <div>
                        <div className="text-[14px] font-light mb-[8px]">
                            Email:
                        </div>
                        <input
                            type="email"
                            value={email}
                            onBlur={handleBlur}
                            // defaultValue={user.email}
                            onChange={handleEmailChange}
                            placeholder="Nhập Email"
                            required
                            className="h-[48px] w-full px-[16px] py-[8px] text-[16px] text-[#777] outline-none border
                             border-[#ddd] rounded-[8px] focus:border-[#0066cc] focus:text-black"
                        />
                    </div>
                </div>

                {/* Hình thức nhận hàng */}
                <label className="font-semibold text-2xl">
                    Hình thức nhận hàng
                </label>
                <div className="flex items-center mt-[8px]">
                    <input
                        id="store"
                        type="radio"
                        name="store"
                        value="Store"
                        onChange={handleChangeMethod}
                        checked={method === "Store"}
                    />
                    <label
                        htmlFor="store"
                        className="text-2xl ml-[4px] mt-[2px]"
                    >
                        Nhận tại cửa hàng
                    </label>
                    <input
                        id="address"
                        name="store"
                        type="radio"
                        className="ml-8"
                        onChange={handleChangeMethod}
                        value="Ship"
                        checked={method === "Ship"}
                    />
                    <label
                        htmlFor="address"
                        className="text-2xl ml-[4px] mb-[2px]"
                    >
                        Giao hàng tận nơi
                    </label>
                </div>
                <div className="grid grid-cols-2 gap-6">
                    <div>
                        <div className="text-[14px] font-light my-[8px]">
                            Tỉnh, thành phố:
                        </div>
                        <Select
                            // isClearable
                            options={provinces}
                            className="text-[16px]"
                            closeMenuOnSelect={true}
                            getOptionLabel={(option) => option.label}
                            getOptionValue={(option) => option.code}
                            styles={customStyles}
                            placeholder="Chọn tỉnh, thành phố"
                            onChange={handleChangeProvince}
                        />
                    </div>
                    <div>
                        <div className="text-[14px] font-light my-[8px]">
                            Quận, huyện:
                        </div>
                        <Select
                            className="text-[16px]"
                            value={selectedDistrict}
                            onChange={handleChangeDistrict}
                            options={districts}
                            closeMenuOnSelect={true}
                            isDisabled={!selectedProvince}
                            styles={customStyles}
                            getOptionLabel={(option) => option.label}
                            getOptionValue={(option) => option.code}
                            placeholder="Chọn quận/huyện"
                        />
                    </div>

                    {showStore && (
                        <div className="col-span-2">
                            <div className="text-[14px] font-light mb-[8px]">
                                Cửa hàng:
                            </div>
                            <Select
                                className="text-[16px]"
                                value={selectedStore}
                                onChange={handleChangeStore}
                                options={stores}
                                closeMenuOnSelect={true}
                                isDisabled={!selectedDistrict}
                                styles={customStyles}
                                placeholder="Chọn địa chỉ cửa hàng"
                            />
                        </div>
                    )}
                    {showAddress && (
                        <div className="col-span-2 transition-all">
                            <div>
                                <div className="text-[14px] font-light mb-[8px]">
                                    Phường, xã, thị trấn:
                                </div>
                                <Select
                                    className="text-[16px]"
                                    value={selectedWard}
                                    onChange={handleChangeWard}
                                    options={wards}
                                    closeMenuOnSelect={true}
                                    isDisabled={!selectedDistrict}
                                    styles={customStyles}
                                    placeholder="Chọn phường, xã, thị trấn"
                                />
                            </div>
                            <div className="">
                                <div className="text-[14px] mt-[15px] mb-[8px]">
                                    Địa chỉ cụ thể:
                                </div>
                                <input
                                    type="text"
                                    // value="Trung"
                                    onChange={handleAddressChange}
                                    placeholder="Nhập số nhà, tên đường"
                                    required
                                    className="h-[48px] w-full px-[16px] py-[8px] text-[16px] text-[#777]
                                outline-none border border-[#ddd] rounded-[8px] focus:border-[#0066cc] focus:text-black"
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Thông tin thanh toán */}
            <div className="w-full bg-white p-8 rounded-[8px] mt-6">
                <label className="font-semibold text-2xl">
                    Thông tin thanh toán
                </label>
                <div className="text-[14px] text-[#777] mt-[8px] mb-4">
                    Quý khách vui lòng lựa chọn các hình thức thanh toán dưới
                    đây:
                </div>
                <div className="grid grid-cols-2 gap-6">
                    <label
                        htmlFor="momo"
                        className="flex border border-solid border-[#ddd] rounded-[8px] py-5 px-10 
                        items-center cursor-pointer focus-within:border-[#0066cc]"
                    >
                        <input
                            type="radio"
                            id="momo"
                            name="method"
                            value="momo"
                            onChange={handlePaymentChange}
                        />
                        <img
                            src={images.momo}
                            alt="Momo"
                            className="h-[36px] w-[36px] rounded-[8px] mx-5"
                        />
                        <div className="text-[14px]">Thanh toán bằng Momo</div>
                    </label>
                    <label
                        htmlFor="zalopay"
                        className="flex border border-solid border-[#ddd] rounded-[8px] py-5 px-10 
                        items-center cursor-pointer focus-within:border-[#0066cc]"
                    >
                        <input
                            type="radio"
                            id="zalopay"
                            name="method"
                            value="zalopay"
                            onChange={handlePaymentChange}
                        />
                        <img
                            src={images.zalopay}
                            alt="ZaloPay"
                            className="h-[36px] w-[36px] rounded-[8px] mx-5"
                        />
                        <div className="text-[14px]">
                            Thanh toán bằng ZaloPay
                        </div>
                    </label>
                    <label
                        htmlFor="shipcod"
                        className="flex border border-solid border-[#ddd] rounded-[8px] py-5 px-10 
                        items-center cursor-pointer focus-within:border-[#0066cc]"
                    >
                        <input
                            type="radio"
                            id="shipcod"
                            name="method"
                            value="shipcod"
                            onChange={handlePaymentChange}
                        />
                        <img
                            src={images.shipcod}
                            alt="COD"
                            className="h-[36px] w-[36px] rounded-[8px] mx-5"
                        />
                        <div className="text-[14px]">
                            Thanh toán khi nhận hàng
                        </div>
                    </label>
                </div>
            </div>
        </div>
    );
}

export default Payment;
