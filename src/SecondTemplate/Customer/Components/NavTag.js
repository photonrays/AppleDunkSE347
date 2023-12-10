import { Link } from "react-router-dom";
export default ({ DivCss, setHref, aCss, setIcon, spanCss, spanContent}) => {
    return (
        <div className={DivCss}>
            <Link to={setHref} className={aCss}>
                {setIcon}
                <span className={spanCss}>{spanContent}</span>
            </Link>
        </div>
    );
}