### 자바스크립트 값 저장 방식

- 원시 타입 (string number …)
  - 불변 형태로 값 저장
    - 변수 할당 시점에 메모리 영역을 차지해 저장
    ```tsx
    let hello = "hi";
    let hi = hello;
    hi = hello; //true
    ```
- 객체 타입 → 원시 타입이 아닌 것 모두다 (array, {} 전부)
  - 객체는 수정,삭제 등이 가능하므로 **변경 가능한 형태로 저장**
  - 값 복사할 때도 값이 아닌 **참조를 전달**
  ```tsx
  var hello = {
    greet: "hello world",
  };
  var hi = {
    greet: "hello world",
  };
  hello === hi; //false
  hello.greet === hi.greet; //true
  ```
  - 객체 자체를 비교하면 다르게 나온다
    - **객체는 값을 저장하는 것이 아닌 참조를 저장한다**
    - **포인터와 유사함**
    - hello와 hi가 바라보는 주소값이 다르기 때문임
  - hello.greet === hi.greet 비교는 **값 비교**
  ```tsx
  var hello = {
    greet: "hi",
  };
  var hi = hello;
  ```
  - 이렇게 하면 항상 같은 참조값을 가리킴
    - hello의 내용을 바꿔도 hi === hello가 true일 것

### 값 비교 방식

- `5 == ‘5’`
  - 양쪽이 같은 타입이 아니면 강제로 타입 캐스팅해서 변경
- `5 === ‘5’`
  - 타입 다르면 false
- **Object.is(5,’5’)**
  - === 와 비슷하지만 ES6에서 몇몇 특이사항들을 다루기 위해 추가됨
- shallowEqual
  - 리액트에서 사용되는 비교함수
  - [Object.is](http://Object.is)()를 수행해 같은지 일차적으로 판단
  - 그 후 가장 얕게 1 depth만 들어가서 추가적으로 비교
    - 2 depth로는 안들어감
  - 배열을 비교하자면 같은 key를 가지는지 하나씩 다 까봄
- **왜 깊은 비교가 아닌 얕은 비교를?**
  - jsx에서 props를 받기 위해서 굳이 깊은 비교가 필요 없기 때문
  - **props를 넘길때에도 얕은 비교가 사용되니 React.memo 같은 걸 사용할 때 주의하기**
    - React.memo(FC, equalfunc) : FC의 props가 바뀌지 않으면 리렌더링 되지 않게 메모이제이션
    - 이때 props의 변경 유무를 shallowEqual로 비교한다는 말

# 함수

- **함수 선언문**
  ```tsx
  function add(x,y){...}
  ```
  - 가장 일반적인 사용
  - **함수 선언문은 표현식이 아닌 일반 문(statement)**
    - 표현식은 어떤 **값**을 산출하는 문
    - **함수 선언문은 어떠한 값도 표현되지 않았음**
- **함수 표현식**
  ```tsx
  const sum = function (a,b){ ... }
  const sum = function add(a,b){ ... }

  sum(10,23)
  ~~add(19,23)//error~~
  ```
  - **사실 함수에는 이름이 굳이 필요하진 않다**
  - 함수 자체를 변수에 선언한 버전
  - 선언문에 함수 이름을 써도 내부에서만 사용되지 add로 호출 못함
- **표현식과 선언식의 차이**
  - 호이스팅 여부의 차이
- **호이스팅**
  - 함수 **선언문**이 코드 맨 앞단에 작성될 것 처럼 작동하는 자바스크림트 만의 특징
  - 함수가 코드 중간에 있어도 코드 맨 앞에서 실행됨
  - **함수 선언을 실행 전에 메모리에 미리 등록하는 작업**
  - 코드 작성시 자유도를 높여주긴 하나 이걸 바라보는 입장 차이는 개발자 by 개발자
- **화살표 함수** () ⇒ {}
  - **function과의 차이점**
    - constructor 못씀 → new add() 못함
    - arguments 없음 : 실제 코딩에선 안중요
    - **클래스 컴포넌트 사용할 때**
      - 화살표는 런타임 시 this가 이미 자신 인스턴스로 지정됨
      - function에서의 this는 별다른 지정 없으면 못사용함
      - **화살표 함수만 내부에서 this 사용 가능**
- **즉시 실행 함수 (IIFE)**
  - 정의한 즉시 실행되는 함수
  - 단 한 번 호출되고 다시 호출되지 않음
  ```tsx
  ((a, b) => {
    return a + b;
  })(
    10,
    24,
  )(function (a, b) {
    return a + b;
  })(10, 24);
  ```
- **함수 짤 때 주의사항**
  - Side Effect(부수 효과)를 조심하기
    - 함수 외부에 영향을 끼치는 것
    - useEffect, API호출 등 다 포함함
    - 이런 것을 함수에서 줄이는 것이 유지보수에 좋다
    - 예측 가능한 단위에서 만들기
  - 함수를 작게 마들기
    - 하나에 함수에 하나의 기능 원칙을 지키기
    - 50줄 이하의 함수를 만들도록 해보기
  - 함수 이름 잘 짜기
    - 누구나 이해할 수 있는 이름을 붙이기
    - 간결하고 이해하기 쉽게

# 클래스

- constructor() & 프로퍼티
  - constructor에 내부에 사용할 값 선언
  ```tsx
  constructor(name){
  	this.name = name
  	private this.id = 1234
  }
  ```
- get,set
  ```tsx
  get firstChar(){
  	return this.name[0]
  }

  set firstChar(char){
  	this.name = [char,...this.name.slice(1)].join('')
  ```
- **프로토타입**
  - 새로 객체를 선언하면 클래스의 prototype이 할당됨
  ```tsx
  const myCar = new Car("sonata");
  myCar.firstChar("S");
  Object.getPrototypeOf(myCar) === Car.prototype; //true
  ```
  - 프로토타입 체이닝 덕분에 클래스에 선언된 함수를 객체 단계에서 실행할 수 있음
  - 객체에서 선언하지 않아도 프로토타입의 메서드에서 찾아서 실행을 도움
    - 자기 자신부터 시작해 프로토타입을 타 최상단 객체인 Object까지 훑어서 실행함
    - 그래서 어디에나 toString()이 있는 것
- **정적 메소드**
  ```tsx
  static hello(){...}

  ~~myCar.hello() // error~~
  Car.helllo()
  ```
  - 생성된 인스턴스(객체)가 아닌 클래스 이름으로 실행되는 함수
  - 클래스 자신을 가리키므로 this 사용 불가
  - **인스턴스를 생성하지 않아도 실행 가능 → 애플리케이션 전역에서 활용되는 유틸 함수로 많이 활용됨**

# 클로저

- 변수의 유효범위는 코드가 작성된 순간 정적으로 결정됨
  - 이러한 **어휘적 환경**을 조합해 코딩하는 기법
  ```tsx
  function outerFunc() {
    var x = "hello";
    function innerFunc() {
      console.log(x);
    }
    return innerFunc;
  }

  const innerFunc = outerFunc();
  innerFunc(); //hello
  ```
  - 내부에 있는 innerFunc의 x만 떼놓고 보면 뭐가 x 인지 모른다.
    - outerFunc()가 innerFunc에 할당되고 outerFunc는 소멸됨
    - 그럼에도 innerFunc()를 실행할 수 있음
      - 클로저로서 기억하고 있음
  - 하지만 outerFunc() 내부에 쓰여있다는 사실을 알고 있음 → innerFunc의 어휘적 환경이 outerFunc() 내부라는 사실 → outerFunc의 x가 무엇인지 알고 쓸 수 있음
- A closure is the combination of a function bundled together (enclosed) with references to its surrounding state (the lexical environment). In other words, **a closure gives you access to an outer function's scope from an inner function.** In JavaScript**, closures are created every time a function is created, at function creation time.**
  - 클로저는 주변 상태(렉시컬 환경)에 대한 참조와 함께 번들로 묶인(묶음) 기능의 조합입니다. 즉, 클로저를 사용하면 내부 함수에서 외부 함수의 범위에 접근할 수 있습니다.
  - 일단 함수를 실행하면 클로저라는게 생성된다.
  - 함수 바깥에 있는 곳에서 내부 함수를 사용할 수 있게 만든다.

## 변수의 유효 범위

- **전역 스코프 & 함수 스코프**
  - 브라우저 환경 : window
  - node.js : global
  - window나 global에 선언한다는 의미
  - 함수 바인딩 없이 `var a = ‘abcd’` 선언하면 window.a로 접근 가능하게 된다.
- **자바스크립트는 다른 언어와 다르게 일반적으로 함수 레벨 스코프**
  - {}가 스코프 범위를 결정하지 않음
    - **let 은 블록 레벨 스코프 변수 선언이다**
  - {} 내부에 있는 변수도 문제 없이 가져올 수 있음
- **어디에서나 쉽게 변수에 접근 가능하지만, 이는 누구든 접근해 원하지 않는 수정도 허용한다는 의미**
  - **리액트가 관리하는 내부 상태 값은 리액트가 별도로 관리하는 클로저 내부에서만 접근 가능하다**
  - 함수로 덮어서 사용한다고 생각해도 무방
  - 클로저는 **함수와 함수가 선언된 어휘적 환경의 조합**
  ```tsx
  for (var i = 0; i < 5; i++) {
    setTimeout(function () {
      console.log(i);
    }, i * 1000);
  }
  ```
  - var는 for문과 관계없이 전역 레벨 스코프로 선언됨(함수 안이면 함수 스코프 일것)
  - for문 돌면서 timeout을 태스크 큐에 들어감 → 1초,2초 지나면서 하나씩 실행될 때 이미 i =5 → 5만 출력될 것
  - 클로저로 함수 범위 다시 지정하기
  ```tsx
  for (var i = 0; i < 5; i++) {
    setTImeout(
      (function (sec) {
        return function () {
          console.log(sec);
        };
      })(i),
      i * 1000,
    );
  }
  ```
  - setTimeout이 바라보는 클로저를 즉시 실행 익명 함수로 바꿈
    - 각각의 sec가 각각의 클로저의 고유한 값을 가지게 됨
  - 다만 이런식으로 외부 함수를 기억하고 내부 함수에 가져다 쓰면 메모리 사용 등 성능에 안좋은 영향 미침
  - **클로저가 공짜는 아님**

# 자바스크립트는 싱글 스레드

- 원칙적으로는 동기 방식 작동
  - 직렬 방식의 업무 처리
  - 하나 다 하고 그 다음
- 싱글 스레드
  - 하나의 스레드에서 순차적으로 이뤄짐
- **비동기 async**
  - 동기 방식에는 하나가 반드시 다 끝나야 그 다음 진행됨
  - 동시에 일어나지 않음
    - 요청한 결과가 즉시 나오지 않을 수 있음 → 언제 결과가 올지 모름
    - 그동안 다른 작업을 허용하게 병렬로 수행함
    - 래서 로그인 만들 때 썼음
  - 비동기 작업을 여러개 동시에 수행할 수 있음

## 이벤트 루프

- **호출 스택**
  - 실행할 함수를 순차적으로 담아둠
  - 함수 내부 코드가 다 종료되면 그 함수가 pop됨
- **태스크 큐**
  - 이벤트 루프에 하나 태스크 큐를 하나 이상 갖고 있음
  - **비동기 함수, 이벤트 핸들러, 콜백함수 등 실행해야 할 태스크를 담고 있음**
  - **호출 스택을 다 실행 시킨 다음 태스크를 실행시킴**
  - **이벤트 루프는 호출 스택에 실행중인 코드가 있는지, 태스크 큐에 대기 중인 함수가 있는지 반복해서 확인한다.**
- 마이크로 태스크 큐
  - 태스크 큐 보다 우선권 가짐
  - Promise 실행
  - 마이크로 태스크 큐가 빌 때 까지 태스크 큐는 미뤄짐
- **렌더링은 언제?**
  - 마이크로 태스크 큐를 실행한 뒤에 렌더링이 일어난다
  - 동기코드로 for문 해도 렌더링은 한번
  - 태스크 큐에는 각각 태스크 큐에 저장되면서 각각 실행되어 렌더링
  - 마이크로태스크 큐에 있는 모든 걸 다 한 후 렌더링 실행
