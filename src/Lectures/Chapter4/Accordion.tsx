import { useCallback, useEffect, useState } from "react";

type Props = {
    title : string;
    content : string
}
const Accordion:React.FC<Props> = ({title,content}:Props) => {

    const [isOpen,setIsOpen] = useState<boolean>(false);
    const [plusBtn,setPlusBtn] = useState<string>('+');
    useEffect(()=>{
        setIsOpen(false);
    },[])
    useEffect(()=>{
        isOpen ? setPlusBtn('-') : setPlusBtn('+')
    },[isOpen])

    const onClickAccordion =  () => {
        setIsOpen(!isOpen)
    }

    return(
        <div className="accordion-main" style={{width:400,height:100}}>
            <div className="accordion-title" 
            onClick={() => onClickAccordion()}
            style={{width:'100%',height:30,backgroundColor:'grey',display:'flex',justifyContent:'space-between'}}>
                <div className="accordion-title-txt" style={{color:'white',fontWeight:'bold', fontSize:20}}>
                    {title}
                </div>
                <div className="accordion-title-btn" style={{color:'white',fontWeight:'bold',display:'flex',justifyContent:'center',alignItems:'center', paddingInline:10}}>
                    {plusBtn}
                </div>
            </div>
            {
                isOpen&&
                <div className="accordion-content">
                    <div className="accordion-content-txt" style={{width:398, height:70, border:'1px solid black'}}>
                        {content}
                    </div>
                </div>

            }
           

        </div>
    )
}

export default Accordion;