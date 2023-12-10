import { useState } from "react";

export default ({divCss, labelCss, inputType, inputName, inputCss, inputValue, labelContent}) => {
    const [inputValueNew, setInputValue] = useState(inputValue);

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    }
    return (
        <div className={divCss}>
            <label htmlFor ={inputName} className={labelCss}>{labelContent}</label><br/>
            <input type={inputType} 
                    name={inputName} 
                    className={inputCss} 
                    value={inputValueNew} 
                    onChange={handleInputChange}/>
        </div>
    );
}