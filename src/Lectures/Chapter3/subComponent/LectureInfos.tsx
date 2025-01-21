import React from "react";

type lectureInfo = {
    tag:string;
    name:string; 
    price:number; 
    discountRate:number; 
    dividePeriod:number;
}

const LectureInfos:React.FC<lectureInfo> = ({tag,name,price,discountRate,dividePeriod}:lectureInfo) => {
    return(
        <div className="lecture-info">
            <div className="lecture-tag">
                {tag}
            </div>
            <div className="lecture-name">
                {name}
            </div>
            <div className="lecture-price">
                <div className="lecture-discount">
                    {discountRate}% ↓
                </div>
                <div className="lecture-price">
                    월 {price}원
                </div>
                <div className="lecture-divide">
                    /{dividePeriod} 개월
                </div>
            </div>

        </div>
    );

}
export default LectureInfos;