import { useEffect, useState } from "react";
import Select from "react-select";
import axios from "axios";
import HandleApiStore from "../../Apis/HandleApiStore";

function Store() {
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [stores, setStores] = useState([]);
    const [showStore, setShowStore] = useState(true);
    const [label, setLabel] = useState("");

    const [selectedProvince, setSelectedProvince] = useState(null);
    const [selectedDistrict, setSelectedDistrict] = useState(null);

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

    // Render all store
    useEffect(() => {
        HandleApiStore.getAllStoreCached()
            .then((response) => {
                // console.log(response.data);
                setStores(response.data.listStores);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    // Handle change province
    const handleChangeProvince = (selectedOption) => {
        setSelectedProvince(selectedOption);
        setSelectedDistrict(null);
        axios
            .get(
                `https://provinces.open-api.vn/api/p/${selectedOption.code}?depth=2`
            )
            .then((response) => {
                console.log(response.data);
                const options = response.data.districts.map((item) => ({
                    value: item.code,
                    label: item.name,
                }));
                setDistricts(options);
            });
        HandleApiStore.getStoreByProvince(selectedOption.code)
            .then((data) => {
                console.log(data);
                setStores(data);
                setShowStore(true);
                if (data.length > 0) {
                    setLabel("Địa chỉ chi nhánh phù hợp");
                } else setLabel("Không có chi nhánh ở địa điểm này");
            })
            .catch((err) => console.log(err));
    };

    // Handle change District
    const handleChangeDistrict = (selectedOption) => {
        setSelectedDistrict(selectedOption);
        console.log(selectedOption);
        // setSelectedStore(null);
        HandleApiStore.getStoreByDistrict(selectedOption.value)
            .then((data) => {
                console.log(data);
                setStores(data);
            })
            .catch((err) => console.log(err));
    };

    // Custome select style
    const customStyles = {
        control: (provided, state) => ({
            ...provided,
            border: state.isSelected ? "1px solid #ddd" : "1px solid #ddd",
        }),
    };

    return (
        <div className="bg-[#F5F5F7] py-14 min-h-full">
            <h1 className="text-center text-5xl font-semibold py-10">
                Xem các chi nhánh cửa hàng
            </h1>
            <div className="bg-white rounded-[8px] py-8 px-6 w-[1180px] mx-auto shadow-sm">
                <div className="grid grid-cols-2 gap-6">
                    <div>
                        <div className="text-2xl font-light my-[8px]">
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
                        <div className="text-2xl font-light my-[8px]">
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
                </div>
                {showStore && (
                    <div>
                        <div className="text-center text-[20px] font-medium py-8">
                            {label}
                        </div>
                        <div>
                            {stores.map((store) => (
                                <div className="text-[#4a90e2] text-2xl mx-[250px] mb-2">
                                    {store.name}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Store;
