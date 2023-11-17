export default ({ divCss, labelCss, labelContent }) => {
    return (
        <div className={divCss}>
            <label className={labelCss}>{labelContent}</label>
        </div>
    );
}