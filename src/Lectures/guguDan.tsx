function GuguDan() {
const num:Array<number> = [1,2,3,4,5,6,7,8,9];
  
  return (
    <div className="Gugudan" style={{display:'flex'}}
        
    >
      {num.map((rearElement,rearIndex) =>(
        <div className='frontGugu' key={`front ${rearIndex}`}>
          {
            num.map((frontElement,frontIndex) =>(
                (frontElement !== 1 && frontElement !== 5 ) &&
                <div className='rearGugu' key={`rear ${frontIndex}`} 
                    style={{color:frontElement % 2 == 0 ? 'black' : 'blue',padding:10, display:'flex'
                    }}

                    >
                        {frontElement} * {rearElement} = {frontElement*rearElement}  
                    </div>
                    
            )

            )
          }
        </div>
        
      ))}
    </div>
  );
}

export default GuguDan;