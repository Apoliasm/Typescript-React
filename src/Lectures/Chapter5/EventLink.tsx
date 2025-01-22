import React, { MouseEventHandler, MutableRefObject, RefObject, useCallback, useRef, useState } from "react"

//컴포넌트 외부에 함수 선언을 해
//useCallbakc 없이 딱 한번 handler를 정의할 수 있다. 
const handleClick2 : MouseEventHandler = ((e) =>{console.log('Click2')} )


const EventLink :React.FC = () => {

    /**
     * onClick 등을 통해 event 객체를 넘겨 받음
     * SyntheticBaseEvent {_reactName: 'onClick', _targetInst: null, type: 'click', nativeEvent: PointerEvent, target: button, …}
     * 
     * Tyescript의 hanlder 타입을 입력
     * onClick : MouseEventHandler
     * type 정의 : useCallback<T> (fn : T, list) : T 
     *   ㄴ> callback function의 타입을 입력하기
     */

    const [value,setValue]= useState<string>("default")
    const [isCheck, setIsCheck] = useState<boolean>(false)

    /**
     * useRef : javascript의 특정 요소를 직접 연결해 사용함
     * When you want a component to “remember” some information
     * , but you don’t want that information to trigger new renders, you can use a ref.
     * 원문
     * 1.function useRef<T>(initialValue: T): MutableRefObject<T>;
     * 2.function useRef<T>(initialValue: T | null): RefObject<T>;
     * 3.function useRef<T = undefined>(initialValue?: undefined): MutableRefObject<T | undefined>;
     * initialValue: The value you want the ref object’s current property to be initially.
     *  It can be a value of any type. This argument is ignored after the initial render.
     * 
     * 
     * 현재는 DOM 내부의 input 태그에 ref를 쓸려고하는데... 타입 지정을 어떻게?
     * initialValue에는 무엇을?
     * 2번 형태에 parameter를 nul로 두면 inputRef.current is possibly 'null'이 떠서 current 활용을 못함
     *  ㄴ> interface RefObject 의 current는 readonly로 current를 수정 못함 하지만 current.value 내부 값은 수정 가능하다
     * 3번 형태로 parameter에 값을 안넣으면 타입이 맞지 않는다는 에러 발생 : 3번 타입 역시 undefined 타입이 포함되어있기 때문
     * 
     * 사용법
     * 타입과 동일한 값을 initialValue로 집어 넣어주던가
     * null선언을 해주기 -> 이때는 타입이 null이 될 수 있으므로 조건문 등을 추가해 current 활용해야함
     * 
     */
    const inputRef = useRef<HTMLInputElement>(null)
    const handleClick1 = useCallback<MouseEventHandler>( (e) => {
        console.log(e)
        console.log('Click')
    },[]) 

    const handleChange  = useCallback<React.ChangeEventHandler> ((e) => {
        console.log('Change ')
    },[])
    const [boxColor,setBoxColor] = useState<string>("red")
    const handleMouseEnter : MouseEventHandler = (e) => {
        setBoxColor('blue')
        console.log('Enter')
    }
    const handleMouseLeave : MouseEventHandler = (e) => {setBoxColor('red')}
    return(
        <div>
            <button onClick={handleClick1}>
                Button1
            </button>
            <button onClick={handleClick2}>
                Button2 
            </button>
            <div>
                <input type="text"
                onChange={handleChange}>
                </input>
            </div>
            <button 
                onMouseDown={() => {console.log('mouseDown')}}
                onMouseUp={() => {console.log('mouseUp')}}
                >
                Click
            </button>
            <div
                className="colorBox"
                style={{width:400,height:200,backgroundColor:boxColor}}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onMouseDown={(e) => {setBoxColor('purple')}}
                onMouseUp={(e) => setBoxColor('blue')}
                onMouseDownCapture={(e) => {
                    setBoxColor('green')
                    console.log('capture')
                }}
            >

            </div>
            <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            >
            
            </input>
            <select value={value}
                onChange={(e) => setValue(e.target.value)}
            >
                <option value="opt1">opt1</option>
                <option value="opt2">opt2</option>
                <option value="opt3">opt3</option>


            </select>
            <input
                type="checkbox"
                checked={isCheck}
                onChange={(e) => {
                    setIsCheck(!isCheck)
                }}
            >
            </input>
            <div className="uncontrolled-component">
                <input
                 ref={inputRef}
                 type="text"
                 id="input"
                >
                </input>
                <button
                    onClick={() => {
                        if(inputRef.current !== null){
                            console.log(inputRef.current.value)
                        }
                    }}
                >

                </button>
                
            </div>

        </div>
    )
}

export default EventLink