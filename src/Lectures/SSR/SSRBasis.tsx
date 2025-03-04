import { render } from "@testing-library/react";
import React, { useEffect } from "react";
import {
  renderToNodeStream,
  renderToPipeableStream,
  renderToReadableStream,
  renderToStaticMarkup,
  renderToString,
} from "react-dom/server";
type props = {
  fruits: Array<string>;
};
function SSRChildrenComponent({ fruits }: props) {
  useEffect(() => {
    console.log(fruits);
  }, [fruits]);

  function handleClick() {
    console.log("hello");
  }

  return (
    <ul>
      {fruits.map((fruit) => (
        <li key={fruit} onClick={handleClick}>
          {fruit}
        </li>
      ))}
    </ul>
  );
}

function SSRSampleComponent() {
  return (
    <>
      <div>hello</div>
      <SSRChildrenComponent fruits={["apple", "banana", "melon", "peach"]} />
    </>
  );
}

/**
 * SSR의 가장 기초가 되는 API ReactNode를 HTML string으로 리턴
 * 브라우저가 그려야 할 HTML을 결과로 나타냄
 * 하지만 useEffect, onClick같은 것들이 들어가진 않음
 * 최대한 빠르게 html을 리턴해서 초기 렌더링 성능을 극대화함에 의의가 있음
 */
const renderResult = renderToString(
  React.createElement("div", { id: "root" }, <SSRSampleComponent />),
);

/**
 * ReadableStream : 브라우저에서는 실행되지 못하고, nodejs환경에서만 실행됨
 * HTML의 사이즈가 클 때 여러개의 chunk단위로 나눠서 순차적으로 처리하기
 */
const renderNode = renderToPipeableStream(<SSRSampleComponent />);
//nodejs에서 chunk를 가져오는 코드
// (async () => {
//     const response = await fetch('http://localhost:3000')

//     try{
//         for await (const chunk of response.body){
//             console.log('=====chunk=======')
//             console.log(Buffer.from(chunk).toString())
//         }
//     }catch(err){
//         console.log(err)
//     }
// })

/**
 * renderToString과 유사하지만 react DOM에서만 사용되는 속성값을 만들지 않음 -> HTML 사이즈를 줄임
 */
const renderStatic = renderToStaticMarkup(
  React.createElement("div", { id: "root" }, <SSRSampleComponent />),
);

/**
 * SSR에서는 hydrate로 HTML에 물을 뿌려줌
 * HTML에 이벤트 핸들러 등 javascript 씌우기
 *
 * 브라우저에서 사용되는 render와의 차이
 * ReactDOM.render(<App />,rootElement)
 * render : 빈 HTML에다가 새로운 HTML + javascript 다 붙임
 *
 * hydrate : 기존에 만들어진 HTML에다가 javascript 붙이는 역할
 * ㄴ> html과 javascript의 내용이 다르면 에러 리턴 -> 불가피하게 같아야 한다면, useEffect 등을 통해 state로서 관리하는 쪽을 생각해보기
 *
 */
