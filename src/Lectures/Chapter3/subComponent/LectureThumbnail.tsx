import React from "react";

type Props = {imgURL:string}
const LectureThumbnail :React.FC<Props> = ({imgURL}:Props)  => {
    return(
        <div className='lecture-thumbnail' style={{backgroundImage:`url(${imgURL})`}}>

        </div>
    );
}

export default LectureThumbnail;