## 이벤트 핸들러 타입 지정

```tsx
**const inputRef = useRef<HTMLInputElement>(null)
const handleClick1 = useCallback<MouseEventHandler>**( (e) => {
    console.log(e)
    console.log('Click')
},[]) 

**const handleChange  = useCallback<React.ChangeEventHandler>** ((e) => {
    console.log('Change ')
},[])
const [boxColor,setBoxColor] = useState<string>("red")
**const handleMouseEnter : MouseEventHandler** = (e) => {
    setBoxColor('blue')
    console.log('Enter')
}
**const handleMouseLeave : MouseEventHandler** = (e) => {setBoxColor('red')}
```

- useCallback<T>, useState<T>,useRef<T>와 같이 타입 선언을 미리 해주면 변수 자체에 대한 타입 선언은 필요없음
    - 이를 통해 알아서 추론됨
- 단순 화살표 함수로 명시 된 것을 활용하려면 ~~EventHandler로 함수에 관한 타입 선언 필요
- useRef에 관한 이야기
    - When you want a component to “remember” some information, but you don’t want that information to trigger new renders, you can use a ref.
    - 코드 원문 세 가지 형태
        - 1.function useRef<T>(initialValue: T): MutableRefObject<T>
        - 2.function useRef<T>(initialValue: T | null): RefObject<T>;
        - 3.function useRef<T = undefined>(initialValue?: undefined): MutableRefObject<T | undefined>;
        - initialValue: The value you want the ref object’s current property to be initially. It can be a value of any type. This argument is ignored after the initial render
    - 현재는 DOM 내부의 input 태그에 ref를 쓸려고하는데... 타입 지정을 어떻게? initialValue에는 무엇을?
        - 2번 형태에 parameter를 nul로 두면 inputRef.current is possibly 'null'이 떠서 current 활용을 못함
            - interface RefObject 의 current는 readonly로 current를 수정 못함 하지만 current.value 내부 값은 수정 가능하다
        - 3번 형태로 parameter에 값을 안넣으면 타입이 맞지 않는다는 에러 발생 : 3번 타입 역시 undefined 타입이 포함되어있기 때문
    - 사용법
        - 타입과 동일한 값을 initialValue로 집어 넣어주던가
            - `const ref = useRef<number>(0)`
        - null선언을 해주기
            - 이때는 타입이 null이 될 수 있으므로 조건문 등을 추가해 current 활용해야함
                - possibly null 에러가 뜰 것임
            - `const ref = useRef<HTMLInputElement>(null)`