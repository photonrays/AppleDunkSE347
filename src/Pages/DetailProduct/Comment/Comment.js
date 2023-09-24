import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import StaticRatedStar from '../RatingStar/StaticRatedStar';
import CircleIcon from '@mui/icons-material/Circle';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import moment from 'moment/moment';
function Comment ({DG}) {
    const tryFunction = () => {
        // console.log(DG.tenkh)
        // console.log(DG.tenkh.slice(lastIndexOfSpace))
        console.log(DG.rating)
    }
    const lastIndexOfSpace = DG.tenkh.lastIndexOf(" ") + 1
    const chuCaiDauTenKH = DG.tenkh.slice(lastIndexOfSpace).charAt(0)

    return (
        <div className="wrapper-comment w-full p-[20px]">
            <div className="comment flex">
                <div className="avatar w-[48px] h-[48px] bg-slate-300 rounded-full 
                    text-center text-[22px] font-bold text-white leading-[48px]">{chuCaiDauTenKH}</div>
                <div className="px-[10px]">
                    <div className="name-aria flex">
                        <div className="name text-[18px] ">{DG.tenkh}</div>
                        <span className="text-green-600 leading-[27px] ml-[10px]"><CheckCircleIcon size="large"/></span>
                        <span className="leading-[27px] text-[14px] text-green-600 ml-[3px]">Đã mua tại AppleDunk</span>
                    </div>
                    <div className="user-rating pt-[6px]">
                        <StaticRatedStar size={16}
                                rating={DG.rating}/>
                    </div>
                    <div className="text-[16px] text-gray-500 py-[8px]">
                        {DG.binhluan}
                    </div>
                    <div className="flex text-[14px]">
                    <div className='text-gray-400 mx-[4px]'>
                            <CircleIcon size="small"/>
                        </div>
                        <div className="text-gray-400">{moment(DG.createdAt, 'YYYY-MM-DD').format('DD-MM-YYYY')}</div>
                        
                        {/* <div onClick={()=>tryFunction()} className='text-blue-700 cursor-pointer'>
                            Thích
                        </div>
                        
                        <div className='text-blue-700 cursor-pointer'>
                            Trả lời
                        </div> */}
                    </div>
                </div>
                {/* <div className="ml-auto mr-[15px] text-slate-600 cursor-pointer relative">
                    <MoreVertIcon fontSize='large'/> */}
                    {/* <div className="w-[60px] h-[70px] bg-white absolute z-10 left-[4px] top-[4px]
                                    text-slate-800 text-[18px] border-[2px] border-slate-400 hidden">
                        <div className='border-b-[1px] border-slate-400 text-center'>
                            Xóa
                        </div>
                        <div className='border-t-[1px] border-slate-400 text-center hidden'>
                            Sửa
                        </div>
                    </div> */}
                {/* </div> */}
            </div>
        </div>
    );
}

export default Comment