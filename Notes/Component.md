## Hooks

- useState
- useEffect
- useCallback

```tsx
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
```

- 조건문 내부에 hooks를 생성하지 않기
    - useEffect 내부에 if문을 넣던가 하기
    - React component에서만 사용 가능함

## React Rerendering 과정

- 기본적으로는 **state가 변할 때 마다 항상 리렌더링함**
    - 하지만 처음 렌더링 될 때랑, state 변경에 의해 리렌더링의 동작 방식은 다름
    
    ```tsx
    const [value,setValue] = useState(0)
    
    <div onClick={() => setValue(value+1)}>
    </div>
    ```
    
    - 이 상태에서 value가 바꼈다고 해서 리렌더링해 value가 0으로 초기화 되지 않는 것임
    - **라이프사이클의 차이**

## 라이프 사이클

- **크게 세 가지 사이클**
    - Mounting / Updating / Unmounting
- **클래스형 컴포넌트 라이프 사이클**
    
    ![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/bf4581aa-e32d-4ece-a82b-6a5413f5a771/744417d1-e589-4007-8c99-a058d2a3023c/image.png)
    
    - 컴포넌트를 진짜로 리렌더 해야할지 판단 후 리렌더링]
    - 스냅샷 저장 후 렌드링
- **함수형 컴포넌트** 라이프 사이클
    - 좀 더 단순한 구조
    
    ![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/bf4581aa-e32d-4ece-a82b-6a5413f5a771/ed5de331-0a44-4b7a-9b26-9a8cf20d3543/image.png)
    
    - **useState, 새로운 props 등 state 관련 값을 받고**
    - **DOM 업데이트 후 useEffect 실행**
    - 순서를 기억하기
    
    ```tsx
    import { useCallback, useEffect, useState } from "react"
    
    const RenderFunctionalComp:React.FC = () =>{
        console.log('[Functional] Beginning')
        const [value,setValue] = useState(0);
        useEffect(() => {
            console.log('[Functional] useEffect []')
    
        }, [])
    
        useEffect(() => {
            console.log('[Functional] useEffect Value')
            return () => {
                console.log('value clean up ')
            }
        },[value]);
    
        console.log('End')
        const resetValue = useCallback(()=> {
            console.log('callback call')
            setValue(0);
        }, [])
    
        return(
            <div>
                <h1>value : {value} </h1>
                <button onClick={() => {setValue(value+1)}} > Increase Button</button>
                <button onClick={() => {resetValue()}}> Reset Button</button>
            </div>
        )
    }
    
    export default RenderFunctionalComp
    ```
    
    ![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/bf4581aa-e32d-4ece-a82b-6a5413f5a771/964c9563-2ca3-45fe-8562-3887ebf765dd/image.png)