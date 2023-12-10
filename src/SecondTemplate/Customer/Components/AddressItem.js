import styles from "../Customer.module.css";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import HandleApiCustomer from "../../../Apis/HandleApiCustomer";
import Swal from "sweetalert2";

export default ({name, email, sdt, address,id}) => {
    function handleDelete(event) {
        event.preventDefault();
        HandleApiCustomer.DelAdress(id)
        .then(async (res) => {
            localStorage.setItem('user', JSON.stringify(res)); //lưu lại vào trong localStorage
            await Swal.fire({
                position: "center",
                icon: "success",
                title: "Xóa dữ liệu thành công!",
                showConfirmButton: false,
                timer: 500
            });
           
            window.location.reload();
        }).catch((err)=>{
            Swal.fire({
                position: "center",
                icon: "error",
                title: "Xóa dữ liệu không thành công!",
                showConfirmButton: false,
                timer: 500
            });
            console.log(err);
        })
    }
    return (
        <div className={styles.bg_white +" rounded-lg w-full mb-8 drop-shadow-lg"}>
            <div className="flex justify-between items-center">
                <div className="px-4 py-4 ">
                    <LocationOnIcon sx={{ fontSize: 20}}></LocationOnIcon>
                    <strong className="px-3 py-3">Địa chỉ</strong>
                </div>
                <div className="px-4 py-4 grid grid-cols-1">
                    {/*<button className="border-2 px-8 py-3 rounded-lg bg-sky-600 text-white mr-3 flex items-center">
                        <EditIcon sx={{ fontSize: 20}}></EditIcon>
                        <span className="ml-1">Sửa</span>
                    </button>*/}
                    <button className="border-2 px-8 py-3 rounded-lg border-pink-500 text-red-500 flex items-rigth" onClick={handleDelete}>
                        <DeleteForeverIcon sx={{ fontSize: 20}}></DeleteForeverIcon>
                        <span className="ml-1">Xóa</span>
                    </button>
                </div>
            </div>
            <hr className="mx-6 py-4"></hr>
            <div className="px-4 py-4 pt-0">
                <ul>
                    <li className="mx-3 mb-4">
                        <label className="mr-3">Tên:</label>
                        <span>{name}</span>
                    </li>
                    <li className="mx-3 my-8">
                        <label className="mr-3">Email:</label>
                        <span>{email}</span>
                    </li>
                    <li className="mx-3 my-8">
                        <label className="mr-3">Số điện thoại:</label>
                        <span>{sdt}</span>
                    </li>
                    <li className="mx-3 my-8">
                        <label className="mr-3">Địa chỉ:</label>
                        <span>{address}</span>
                    </li>
                </ul>
            </div>
        </div>
    );
}