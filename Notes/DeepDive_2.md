# JSX

- 리액트에서 element를 만들기 위한 특수한 문법
- **React.createElement로 만들어짐**

# DOM

- document object model
- **화면을 그리는 과정**
  1. HTML 파일 다운로드
  2. 렌더링 엔진이 HTML을 파싱해 **DOM Node**로 이뤄진 **트리** 만듦
  3. CSS 파일도 다운로드 해 트리로 된 CSSOM 만듦
  4. 브라우저가 DOM을 순회하며, 눈에 보이게 될 Node만 방문 + 해당 노드에 대한 CSSOM 정보를 찾아 노드에 적용

## 가상 DOM

- 하나의 인터랙션에 변화하게 될 DOM을 일일이 추적하는 것은 너무 수고스러운 일
  - 완성된 DOM만 보고 싶음
- 실제 DOM이 아닌, 리액트가 관리하는 가상 DOM
- 브라우저가 아닌 메모리에 DOM을 저장하고, 실제 변경에 대한 준비가 완료됐을 때 브라우저의 DOM에 반영
- 리액트 파이버라는 객체가 가상 DOM과 실제 DOM을 비교해 렌더링을 요청함

### 리액트 파이버

- 두 개의 트리 관리
  - 현재의 모습을 담은 파이버 트리
  - 작업 중 ( 만드는 중)인 WorkInProgress 트리
    - 작업 다 되면 포인터만 바꿔서 workin을 current로 바꿔줌

# 컴포넌트

## 클래스 컴포넌트

- extends React.Component 여러 라이프사이클 함수가 내포되어있음
- this를 기준으로 props, state 등 처리
  - this를 계속 추적해 이를 바탕으로 움직임
  - 클래스의 인스턴스는 mutable 값, 변동 가능한 값이므로 얼마든지 바뀔 수 있음

## 함수형 컴포넌트

- hook으로 여러 라이프사이클, 상태 다룸
- this 기준이 아니므로 철저히 함수의 파라미터로 주어진 값에 따라 처리됨

# 리액트 렌더링

- 브라우저의 렌더링과는 다른 과정
- **모든 컴포넌트들이 자신이 가진 props와 state 값을 기반으로 어떤 DOM을 브라우저에게 제공할지 계산하는 과정**

## 렌더링이 발생하는 타이밍

- **최초 렌더링**
  - 처음 들어갈 때
- **리렌더링**
  - **state의 변화**
    - setState, useState
    - useReducer()의 dispatch
    - key prop이 바뀔 때

### 렌더링 과정

- **render Phase**
  - 루트 컴포넌트 부터 내려가면서 업데이트가 필요한 컴포넌트를 찾는다.
  - 그 컴포넌트를 호출해 결과물을 저장
  - 이렇게 만들어진 가상 DOM과 실제 DOM을 비교해 반영
- **commit phase**
  - 비교해서 반영할 부분을 실제 DOM에 반영하는 과정
  - **이 때 변화가 없는 컴포넌트는 리렌더링 되지 않는다**
  - **하지만 리렌더링 된다면 그 자식은 모조리 다 리렌더링 된다**
    - 굳이 리렌더링 필요 없는 곳에는 memo 사용

### 메모이제이션 항상 쓰는게 좋은가?

- 함부로 쓰지 말라
  - 값을 비교하고, 렌더링 필요한지 계산하는 작업 vs 저장해뒀다가 가져오는 비용
  - 섣부른 최적화를 해선 안된다. 캐시를 아무리 많이 저장해둬도 나중에 이게 필요 없을 수 있음
- 그냥 다 해라
  - 어차피 렌더링할 때 재조정 과정에서 이전 결과물을 저장하고 있음
    - memo에다가 다 저장하면 이전 결과물과 현재 결과물을 비교하는 과정이 포함됨. 이러한 비용을 무시할 순 없음
    - 그럼에도 memo해서 최적화하는게 리스크나 코스트가 더 적음
    - 그래서 할 수 있으면 다 하는게 좋다.
