import { useCallback, useEffect, useState } from "react";

const HookBasis:React.FC = () => {
    let value = 0;
    const [stateValue,setValue] = useState<number>(0)
    


    //1. useEffect 빈 array일 때 : 처음 딱 한번만 실행
    useEffect(()=>{
        console.log('[Function] useEffect[] : 컴포넌트가 마운트 될 때 한 번');
        //처음 딱 한 번만 eventlistner가 생성됨. -> 즉 새로고침 하더라도 두 번 이상 eventlistner가 만들어 지지 않음
        const eventHandler = () => {console.log('click event')}
        // document.body.addEventListener('click',eventHandler );

        //클린업 이벤트 : 컴포넌트가 언마운트 될 때 실행
        return () => {
            console.log('Function] Unmount ')
            // document.body.removeEventListener('click',eventHandler);
        }
    }, []);


    useEffect(()=>{
        console.log('[value] : 컴포넌트가 마운트 될 떄 + value가 변경 될 때')
        const eventHandler = () => {console.log('click event')}
        // document.body.addEventListener('click',eventHandler );

        //useEffect 내부에 실행되기 직전에 실행되어 중복된 eventLister를 생성하기 전에 제거함
        return () => {
            console.log('클린업 함수 in [value]: useEffect 실행하기 직전에 실행됨')
             // document.body.removeEventListener('click',eventHandler);
        }
    },[stateValue])


    /**
     * useCallback
     * 매번 리렌더링 될 때 마다 useEffect로 인해 함수가 새로 생성되면서 
     * (기존 함수 가비지 콜렉팅으로 제거 -> 새 메모리에 할당 후 생성) 과정으로 인해 성능 저하됨
     * 메모이제이션으로 렌더링에 사용됐던 함수를 기억해두고 그대로 가져다 씀
     * Dependency List 값이 변할 때 마다 callBack 함수 발생시킴
     * 
     */


    const resetValue = useCallback(()=> {
        setValue(0);
    }, [])

    /**
     * 가변하는 값에 dependency Array에 아무것도 없다면 맨 처음 렌더링 될 때
     * 생성된 함수가 메모리에 그대로 남음
     * 즉 초깃값인 stateValue = 0 인 상태의 함수가 그대로 메모리에 남아 재사용됨
     * 그러니까 setValue 해봤자 0+1인 1로만 될 것임
     * 이런 경우는 지속적으로 value를 반영하기 위해 함수 자체가 초기화되어 다시 생성되어야함 -> useCallback 안쓰면 됨됨
     * 혹은 dependency List에 value를 넣어 value가 업데이트 될 때 마다 메모리에 다시 저장시켜놓음
     */
    // const increaseValue = useCallback(()=>{
    //     setValue(stateValue+1)
    // },[])

    return(
        <div>
            <h1>value : {stateValue} </h1>
            <button onClick={() => {setValue(stateValue+1)}} > Increase Button</button>
            <button onClick={() => {resetValue()}}> Reset Button</button>
        </div>
    );
};

export default HookBasis