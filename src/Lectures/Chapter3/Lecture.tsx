import LectureInfos from "./subComponent/LectureInfos";
import LectureThumbnail from "./subComponent/LectureThumbnail";
import './Lecture.css'

function Lecture(){
    const url : string = "https://dst6jalxvbuf5.cloudfront.net/media/images/Course/cover_image/220915_010435/%EC%BD%94%EC%8A%A4%EC%B9%B4%EB%93%9C_%EA%B8%B0%EB%B3%B8_PC.png"
    const tag :string = "부업 창업 커머스 인스타"
    const name : string = "#무자본무재고 | 집에서 일하며 경제적 자유 누리는 인스타 마켓"
    const discount: number = 35
    const price : number = 14803
    const dividePeriod : number = 12

    return(
        <div className="lecture-main">
            <LectureThumbnail imgURL={url}></LectureThumbnail>
            <LectureInfos tag={tag} name={name} price={price} discountRate={discount}  dividePeriod={dividePeriod}/>
            
        </div>
        
    )

}
export default Lecture;