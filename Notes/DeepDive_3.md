# useState

- **렌더링 될 때 마다 함수는 다시 실행됨을 인지하기**
  - DOM Update는 함수 컴포넌트의 return이 변화 유무에 따라 진행됨
  ```tsx
  function comp() {
    let state = 10;

    return <></>;
  }
  ```
  - 이렇게 작성하면 comp함수가 새로 실행되면서 state 값도 다시 선언되어서 어떤 짓을 하더라도 DOM 업데이트 안됨
- 이런 구조라고 가정한다면?
  ```tsx
  function useState(initialValue) {
    let internalState = initialValue;

    function setState(newValue) {
      internalState = newValue;
    }

    return [internalState, setState];
  }

  const [value, setValue] = useState(10);
  setValue(100);
  console.log(value); //10
  ```
  - 왜 100이 아닌 10?
    - 구조 분해 할당으로 이미 value가 10으로 들어 가 있음
    - 클로저를 활용해 함수 실행 종료된 이후에도 지역 변수로 참조할 수 있게 설계해놓음
  ```tsx
  const MyReact = function () {
  	const global = {}
  	let index = 0

  	function useState(initialState){
  		if(!global.states){
  			global.state = []
  		}

  		const currentState  = global.states[index] || initialState
  		global.states[index] = currentState

  		//여기서 클로저 활용
  		const setState = (function () {
  			let currentIndex = index
  			return function (value){
  			 global.states[currentIndex] = vaule
  			}
  			//리렌더링 함수
  		})()

  		index = index+ 1
  		return [currentState,setState]
  }

  ```
  1. setState에서 즉시 실행 함수 실행됨
  2. currentIndex가 지역변수로 남음
- **Lazy initialization**
  - 초기화할 때 useState(() ⇒ …)형태
  - **최초 렌더링 시에만 실행됨**
    - 만약 이 함수가 코스트가 엄청 클 경우에 리렌더링마다 실행된다고 하면 성능 악화될 수 있기 때문

# useEffect

- **함수형 컴포넌트는 매번 함수를 실행해서 렌더링을 수행함을 기억하기**
- state와 props의 변화하면서 리렌더링 → 함수 다시 실행 → 의존성 배열의 값이 다르면 실행되는 부수 효과(side effect)들

  - **컴포넌트가 렌더링 다 되고나서 useEffect가 실행됨**
  - 컴포넌트 렌더링 후에 어떤 부수 효과를 보고 싶을 때 쓰는 것이 useEffect라는 의미

- **클린업 함수**
  - useEffect 내에서 반환되는 함수
  - 새롭게 렌더링 될 때 이전 state 값으로 실행됨
  - 주로 eventlistener를 지울 때 사용
  ```tsx
  useEffect(() => {
  	function addMouseEvent(){
  	 console.log(...)
  	}

  	window.addEventListner('click' ,addMouseEvent)

  	return () => {
  		console.log('cleanup')
  		window.removeEventListner('click', addMouseEvent)
  	}
  },[counter])

  ```
- 클린업 함수로 이벤트 리스너를 지워주지 않는다면 이전 값을 기준으로 작동해버림
- 작동 순서
  1. 최초 렌더링 될 때 useEffect 내부 실행
  2. state 변경으로 리렌더링 시 이전 state값 기준으로 클린업 실행
  3. 바뀐 state로 내부 또 실행, →2 → 3 반복
  4. 언마운트 될 때 클린업 함수 실행
- **의존성 배열**
  - 의존성 배열 없으면 매번 렌더링마다 실행
  - 빈 배열 → 처음 렌더링 될 때 , 리렌더링 시에는 실행되지 않음
- 기타 사항
  - 비동기 함수를 useEffect를 넣으면 안됨
    - await 함수 내부 결과에 따라 state 결과가 천차만별일 가능성 있음 → race condition
  - 비동기 함수를 실행할 때 즉시 비동기 함수를 실행시키기
  - **useEffect 인수로 넣는것은 안되나, 쓰는 것 자체는 문제 없다.**
  ```tsx
  ~~useEffect(async () => {} , [])~~
  useEffect(() => {
  	async function asynf(){}
  	asynf()
  },[])
  ```
  - useEffect의 콜백 함수에 이름을 넣어보기
  ```tsx
  useEffect(function logActiveUser(){
  	logging(...)
  	},
  	[user.id]
  }
  ```

# useMemo

- 비용이 큰 연산에 대한 결과를 저장해두고 반환하는 훅
- **의존성 배열의 값이 변하지 않았으면** 함수를 재실행하지 않고 기억해둔 값을 반환

```tsx
const MemoizedComp = useMemo(
	() => <ExpensiveComp> <ExpensiveComp/>
```

# useCallback

- **값을 저장하는 것이 아닌 함수를 저장**
- useMemo는 값 자체를 저장, useCallback은 함수를 저장
- 함수가 불필요하게 재생성되는 것을 막아줌
- 의존성 배열의 값이 변하면 함수가 새롭게 생성됨
  - 변하지 않으면 생성되지 않음
  ```tsx
  function App() {
    const [state1, setState1] = useState(false);
    const [state2, setState2] = useState(false);

    const toggle1 = () => {
      setState1(!state1);
    };
    const toggle2 = () => {
      setState2(!state2);
    };

    return (
      <>
        <ChildComp value={state1} onChange={toggle1} />
        <ChildComp value={state2} onChange={toggle2} />
      </>
    );
  }
  ```
  - 원하는 것은 state 어느 것 중 하나만 바뀌게 하고 싶지만
    - state 변경으로 App 컴포넌트 리렌더링됨
    - **자식도 리렌더링 하면서 onChange의 toggle함수가 매번 새롭게 생성됨**
    ```tsx
    function App(){
    	const [state1, setState1] = useState(false)
    	const [state2, setState2] = useState(false)

    	const toggle1 = useCallback(() => {
    		setState1(!state1)
    	},[state1])
    	const toggle2 = useCallback(
    		function toggle2 () => {
    			setState2(!state2)
    		},[state2])

    	return(
    		<>
    			<ChildComp value={state1} onChange={toggle1}/>
    			<ChildComp value={state2} onChange={toggle2}/>
    		</>
    	)
    }
    ```
    - **useCallback**을 사용해 state1이 변경되지 않으면 리렌더링마다 새롭게 생성되지 않게 만듦
      - 관계없는 자식 컴포넌트가 리렌더링 되더라도 클로저를 새로 만들지 않게 만듦
- **useCallback과 useMemo가 저장하는 것만 다르다 뿐이지 하는 역할 자체는 같음**

# useRef

- useState와 유사하게 **상태값**을 저장
  - 하지만 결정적인 차이
  - 값이 변해도 **렌더링을 발생시키지 않음**
  - ref 내부의 current값으로 값에 접근해서 변경 가능
  ```tsx
  ref = {
  	current : <input> ...
  }
  ```
  - 이러한 객체가 useMemo에 저장되는 것과 비슷한 원리
- 포인터 같은 개념
  - 주로 DOM 자체를 가리킬 때 사용

```tsx
function RefComp{
	const inputRef = useRef()
	console.log(inputRef) //undefined
	useEffect(() => {
		console.log(inputRef.current)
	},[inputRef])
	return <input ref={inputRef} type="text" />
```

- **렌더링에 영향 받지 않고, 값을 저장하고 싶을 때 사용**

# useContext

- **prop drilling을 극복하기 위해 나온 개념**
- 상위 컴포넌트에서 만들어진 context를 하위 컴포넌트가 쓸 수 있게 만듦

```tsx
**const Context = createContext<{hello:string} |undefined>({hello:"hi})**

function ParentComp(){
	return(
		<>
			**<Context.Provider value={{hello:"hihihi"}}>
				<ChildComp />
			<Context.Provider/>**
		</>
	)}

function ChildComp(){
	**const value = useContext(Context)**


	return <>{value ? value.hello : ''} </>
}
```

1. context를 createContext로 선언
2. Context.Provider 컴포넌트의 children에서 context의 value 값을 가져올 수 있음

- 여러개의 context가 있다면 가장 가까운 context를 가져와 씀
- 컴포넌트 트리가 복잡할수록 context를 쓰는 것도 쉽지많은 않다.
  - 컴포넌트가 실행될 때 context가 존재하지 않아 에러가 발생할 여지가 많음
  - 해당 context가 존재하는 환경인지 확인하는 과정이 필요
  - 그래서 함수를 별도로 만들어 체크하는 과정이 있으면 좋다
  ```tsx
  const MyContext = createContext<...>(...)
  function useMyContext() {
  	const context = useContext(MyContext)
  	if(context === undefined) {
  		throw new Error(
  			'error message'
  		)
  	}
  	return context
  }
  function ChildComp(){
  	const {hello} = useMyContext()
  	...
  }

  ```
- 하지만 context를 쓰면 **Provider에 의존적인 컴포넌트가 되므로 재사용이 어렵다**
- context는 상태를 관리하는게 아니다. 상태를 주입할 뿐

# useReducer

- useState와 같은 상태 관리
- useReducer(reducer, initialState, init?) ⇒ [state,dispatcher]
- 인수 2개~3개
  - reducer : reducer의 기본 action 정의
  - initialState : reducer의 초깃값
  - init : lazy initial ⇒ 초깃값 생성 함수
- 반환값 : 길이 2인 배열
  - state : 현재 useReducer가 가지는 값
  - dispatcher : state를 업데이트하는 함수
    - 단순이 값을 넘겨주는 것과 다르게 state를 변경할 수 있는 action을 포함
  ```tsx
  import { useReducer } from "react";

  type State = {
    count: number;
  };

  type Action = {
    type: "up" | "down" | "reset";
    payload?: State;
  };

  function init(count: State): State {
    return count;
  }

  const initialState: State = { count: 0 };

  //state와 action 기반으로 state가 어떻게 변경될지를 정의
  function reducer(state: State, action: Action): State {
    switch (action.type) {
      case "up":
        return { count: state.count + 1 };

      case "down":
        return { count: state.count - 1 };
      case "reset":
        return init(action.payload || { count: 0 });
      default:
        throw new Error(`unexpected action type ${action.type}`);
    }
  }

  export function ReducerBasis() {
    const [state, dispatcher] = useReducer(reducer, initialState, init);
    function handleUpButtonClick() {
      dispatcher({ type: "up" });
    }
    function handleDownButtonClick() {
      dispatcher({ type: "down" });
    }
    function handleResetButtonClick() {
      dispatcher({ type: "reset", payload: { count: 1 } });
    }

    return (
      <div>
        <h1>{state.count}</h1>
        <button onClick={handleUpButtonClick}>+</button>
        <button onClick={handleDownButtonClick}>-</button>
        <button onClick={handleResetButtonClick}>reset</button>
      </div>
    );
  }
  ```
  1. state와 action에 대한 타입 선언
  2. initialState :state 로 초기 상태값 선언
  3. action에 따라 state 결정하는 reducer 선언
  4. useReducer(reducer, initialState)로[state,dispatcher] 할당받음
     1. **dispatcher(action)으로 state 변경**
- **useReducer로 state를 dispatcher로만 바꿀 수 있게 제한함**
  - state 하나가 가지는 값이 복잡하고, 수정하는 경우가 많을 때
  - 비슷한 성질을 가지는 state를 묶어서 useReducer로 관리하기

# useImparative

## forwardRef

- 새 props를 파서 자식 컴포넌트에게 넘겨도 되지만
- ref를 자식으로 넘김을 확실히 명시하기 위함
- **useImparativeHandle**
  - 부모에게서 넘겨받은 ref를 원하는대로 수정

```tsx
function ParentComp(){
	const inputRef = useRef()
	return (
		<ChildComp ref={inputRef} />
	)}
function ChildComp = **forwardRef**((props,ref) => {
	useImparativeHandle(
		ref,
		() => ({
			alert: () => alert(props.value)
		}))
 ...component 내용들 })
```

# useLayoutEffect

- useEffect와 동일하나, **모든 DOM 변경 후에 동기적으로 발생**
- DOM 업데이트 → useLayoutEffect → 브라우저 변경사항 반영 → useEffect 실행
  - DOM은 계산됐지만 **화면에 반영되기 전에 무언가를 할 때**

# 고차 컴포넌트 HOC (Higher Order Component)

- 컴포넌트 자체의 로직을 재활용하기 위함
- **고차 함수**
  - 함수를 파라미터로 받는 함수
- 고차 컴포넌트 : 컴포넌트를 파라미터로 받는 컴포넌트
- 함수가 일급 객체인 것과 함수의 특징을 활용
- **React.memo**
  - 컴포넌트 자체를 저장해 불필요하게 리렌더링 되는 것을 방지함

```tsx
const ChildComp = memo(({value}:Props) => {
	..컴포넌트 내용들
})
```

- ex ) case에 따라 다르게 컴포넌트 출력

```tsx
function hoComp (Component : ComponentType<T> ) {
	return function (props : T & LoginProps) {
		if(loginRequired)
		{
			return <> need login </>
		}
		return <Component />
	}
```
