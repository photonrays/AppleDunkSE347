import { useEffect, useState, useRef } from "react";
import { FaStar } from "react-icons/fa";
const RatedStar = ({allDG, soluongDG}) => {

    const[loading, setLoading] = useState([])
    const[dg, setDg] = useState(false)
    const barBgRefs = useRef([]);
    const stars = [5, 4, 3, 2, 1];
    const [width, setWidth] = useState(280)

    const countDGByRating = (rating) => {
            return allDG.filter((dg)=>{
                return dg.rating === rating;
            }).length;
    }

    const progressBar = (star) => {
        let result
        if(soluongDG !== 0) {
            result = Math.round(width*countDGByRating(star)/soluongDG);
            console.log("result " + result)
            if(!isNaN(result)&& result!==0) {
                return result
            } else return 0
        } else
        return 0;
    }

    useEffect(()=>{
        console.log(allDG)
        setLoading(allDG)
    },[])

    useEffect(()=>{
        setDg(true)
    },[loading])

    useEffect(() => {
        console.log(barBgRefs.current)
        barBgRefs.current.forEach((ref, index) => {
            console.log(index)
            if (ref) {
                setWidth(ref.offsetWidth)
                console.log(`Div của star ${stars[index]}:`, ref.offsetWidth);
            }
        });
    }, [allDG]);

    if(dg === true)
    // if(!isNaN(loading))
    {
        return (
        <div>
        {[5, 4, 3, 2, 1].map((star, index) => (
            <div className="flex justify-start">
                <span className="mr-[2px]">{star}</span>
                <FaStar size={16} color={"ffc107"}/>
                <div ref={el => barBgRefs.current[index] = el}
                className="bar-bg h-[8px] w-[280px] bg-slate-200 my-auto rounded-full mx-[4px] relative overflow-hidden">
                    <div style={{width: `${progressBar(star)}px`}} className={`progress-bar h-[8px] rounded-full bg-green-500 relative`}></div>
                </div>
                <span>{countDGByRating(star)}</span>
            </div>
        ))}
            {/*  */}
        </div>
    )
}
}
export default RatedStar;