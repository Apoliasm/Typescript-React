import { Component, useState } from "react";

function ComponentBasis(){
    let value = 0;
    //변수 value는 처음 렌더링 될 때 0 그대로 화면에 사용 됨
    //State를 사용해 DOM에 지속적으로 사용 되는 값을 활용해야 함
    const [stateValue,setValue] = useState<number>(0)
    //typescript : 타입 추론이 되긴 하나, state값이 null 등의 다른 값이 들어 갈 여지 가 있을 때 지정
    /*
    export interface IUserInfo {
        userId : string | undefined,
        userName : string | undefined
    }
    const [userInfo, setUserInfo] = useState<IUserInfo | null> (null);
    */

    return(
        <div>
            <h1>value : {value} </h1>
            <button onClick={() => {setValue(stateValue+1)}} > Increase Button</button>
            <button onClick={() => {setValue(0)}}> Reset Button</button>
        </div>
    );
}

export default ComponentBasis;