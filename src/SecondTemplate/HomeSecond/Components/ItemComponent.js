import styles from './ItemComponent.module.css'
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import images from '../../../assets/image';
import ItemProduct from './ItemProduct';
function ItemComponent(props) { 
    return(
        <div className="text-center">
            <h1 className="text-[30px]">{props.data.title}</h1>
            <div className="flex flex-wrap justify-center  py-8">
                {
                    props.data.datas.map((item, index)=>(
                        <ItemProduct key={index} data={item} title={props.data.title}/>
                    ))
                }
            </div>
            <div className="flex justify-center py-8">
                   <a href={props.data.link} className={styles.buttonMore} >
                        <p className="text-[14px] leading-7">Xem tất cả {props.data.title}</p>
                        <NavigateNextIcon/>
                    </a>
            </div>
        </div>
    );

 };
 export default ItemComponent;