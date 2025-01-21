# 타입스크립트 컴포넌트 만들기

- **함수형 컴포넌트**
    
    ```jsx
    function FunctionnalComp () {
     return <div> ... </div>
    }
    ```
    
    - vscode로 확인 결과 JSXElement타입으로 자동으로 캐스팅됨
    - 하지만 자식 컴포넌트로 children 을 활용하기 쉽지 않음
    - 기본적인 JSX 반환만 지원되기 때문
    - 그러니까 더 복잡한 구조의 자식 컴포넌트를 받아 쓰기 쉽지 않음
- **화살표 함수를 사용한 컴포넌트**
    - **타입 지정 필요 → React.FC<P>**
        - 이때 P : props의 타입 이를 제네릭으로 생성해서 구조 분해 할당을 이용해  props를 활용
            - `const LectureInfos:**React.FC<lectureInfo> = ({tag,name,price,discountRate,dividePeriod}:lectureInfo) => {**`
            - 구조 분해 할당으로 props 타입을 제네릭으로 선언해준 후 props로 받을 변수를 하나씩 지정해줌
            - 타입 지정할 때 구조 분해 할당 잘 활용하기
    
    ```tsx
    function Lecture(){
        return(
            <div className="lecture-main">
                <LectureThumbnail imgURL={url}></LectureThumbnail>
                **<LectureInfos tag={tag} name={name} price={price} discountRate={discount}  dividePeriod={dividePeriod}/>**
                
            </div>
            
        )
    
    }
    
    type lectureInfo = {
        tag:string;
        name:string; 
        price:number; 
        discountRate:number; 
        dividePeriod:number;
    }
    
    const LectureInfos:**React.FC<lectureInfo> = ({tag,name,price,discountRate,dividePeriod}:lectureInfo) => {**
        return(
            <div className="lecture-info">
                <div className="lecture-tag">
                    {tag}
                </div>
                <div className="lecture-name">
                    {name}
                </div>
                <div className="lecture-price">
                    <div className="lecture-discount">
                        {discountRate}% ↓
                    </div>
                    <div className="lecture-price">
                        월 {price}원
                    </div>
                    <div className="lecture-divide">
                        /{dividePeriod} 개월
                    </div>
                </div>
            </div>
        );
    
    }
    export default LectureInfos;
    ```
    
    - **React.FC<P>**는 컴파일 하면서 자동으로 Children이 포함된 컴포넌트로 만들어짐
        - `<lectureInfo> **{이 사이}** </lectureInfo>`
        - 이 사이에 있는 것을 children으로 간주함
        - 그래서 `<lectureInfo ….> </lectureInfo>`에 props에 있는 변수로만 하면 error 발생함
            - **자식 컴포넌트에서 선언 하지도 않은 children이 없다고 에러가 뜸**
        - **해결방안**
            - **`<lectureInfo … />`로 바로 닫아줘서 children에 없음을 명시해줘야 한다.**
    
    ### **주요 차이점 비교**
    
    | 특성 | `function MyComponent()` | `const MyComponent: React.FC = () => {}` |
    | --- | --- | --- |
    | **문법 스타일** | 함수 선언 | 화살표 함수 |
    | **타입 지정 방식** | 매개변수에서 직접 지정 | `React.FC`를 사용하여 전체 타입 지정 |
    | **호이스팅 가능 여부** | 가능 | 불가능 |
    | **`children` 포함 여부** | 포함되지 않음 | 포함됨 |
    | **React 기능 지원** | 기본 JSX 반환만 지원 | `React.FC`를 통해 추가 기능 지원 |
    | **가독성과 선호도** | 전통적인 방식 | 현대적이고 TypeScript 친화적 |

## 타입스크립트의 함수형 컴포넌트 구조

- React.FC 구조
    
    ```tsx
    interface FunctionComponent<P = {}> {
            (
                props: P,
                /**
                 * @deprecated
                 *
                 * @see {@link https://legacy.reactjs.org/docs/legacy-context.html#referencing-context-in-lifecycle-methods React Docs}
                 */
                deprecatedLegacyContext?: any,
            ): ReactNode;
            /**
             * Used to declare the types of the props accepted by the
             * component. These types will be checked during rendering
             * and in development only.
             *
             * We recommend using TypeScript instead of checking prop
             * types at runtime.
             *
             * @see {@link https://react.dev/reference/react/Component#static-proptypes React Docs}
             */
            propTypes?: WeakValidationMap<P> | undefined;
            /**
             * @deprecated
             *
             * Lets you specify which legacy context is consumed by
             * this component.
             *
             * @see {@link https://legacy.reactjs.org/docs/legacy-context.html Legacy React Docs}
             */
            contextTypes?: ValidationMap<any> | undefined;
            /**
             * Used to define default values for the props accepted by
             * the component.
             *
             * @see {@link https://react.dev/reference/react/Component#static-defaultprops React Docs}
             *
             * @example
             *
             * ```tsx
             * type Props = { name?: string }
             *
             * const MyComponent: FC<Props> = (props) => {
             *   return <div>{props.name}</div>
             * }
             *
             * MyComponent.defaultProps = {
             *   name: 'John Doe'
             * }
             * ```
             *
             * @deprecated Use {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment#default_value|default values for destructuring assignments instead}.
             */
            defaultProps?: Partial<P> | undefined;
            /**
             * Used in debugging messages. You might want to set it
             * explicitly if you want to display a different name for
             * debugging purposes.
             *
             * @see {@link https://legacy.reactjs.org/docs/react-component.html#displayname Legacy React Docs}
             *
             * @example
             *
             * ```tsx
             *
             * const MyComponent: FC = () => {
             *   return <div>Hello!</div>
             * }
             *
             * MyComponent.displayName = 'MyAwesomeComponent'
             * ```
             */
            displayName?: string | undefined;
        }
    ```
    
- props는 ReactNode로 어떤 형태든 다 가능함
- 컴파일 중에 함수형 컴포넌트가  children이 포함된 ReactElement로 타입캐스팅 될 것임.