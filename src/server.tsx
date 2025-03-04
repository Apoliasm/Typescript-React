/**
 * 서버에서 동작하는 파일
 * 사용자의 요청에 따라 보낼 리소스 결정
 * SSR을 위해 리액트 트리를 만드는 역할 담당
 */

import { IncomingMessage, ServerResponse, createServer } from "http";
import { fetchTodo } from "./Lectures/SSR/fetch";
import { createElement } from "react";
import App from "./App";
import { renderToPipeableStream, renderToString } from "react-dom/server";
import fs, { createReadStream } from "fs";

const PORT = process.env.PORT || 3000;

const htmlFile = fs.readFileSync("../public/index.html");
const htmlStr = htmlFile.toString("utf-8");
const htmlFront = fs.readFileSync("../public/index-front.html");
const htmlEnd = fs.readFileSync("../public/index-end.html");

async function serverHandler(req: IncomingMessage, res: ServerResponse) {
  const { url } = req;

  switch (url) {
    case "/": {
      const result = await fetchTodo();

      const rootElement = createElement(
        "div",
        { id: "root" },
        createElement(App, { todos: result }),
      );
      const renderResult = renderToString(rootElement);

      const htmlResult = htmlFile.write(
        htmlStr.replace("__placeholder__", renderResult),
      );
      res.setHeader("Control-type", "text/html");
      res.write(htmlResult);
      res.end();
      return;
    }
    case "/stream": {
      res.setHeader("Content-type", "text/html");
      res.write(htmlFront);

      const result = await fetchTodo();
      const rootElement = createElement(
        "div",
        { id: "root" },
        createElement(App, { todos: result }),
      );

      const stream = renderToPipeableStream(rootElement);
      stream.pipe(res).on("close", () => {
        res.write(htmlEnd);
        res.end();
      });
      return;
    }
    case "/browser.js": {
      res.setHeader("Content-type", "application/javascript");
      createReadStream("./dist/browser.js").pipe(res);
      return;
    }
    case "browser.js.map": {
      res.setHeader("Content-type", "application/javascript");
      createReadStream("./dist/browser.js.map").pipe(res);
      return;
    }
    default: {
      res.statusCode = 404;
      res.end("404 Not Found");
    }
  }
}

function main() {
  createServer(serverHandler).listen(PORT, () => {
    console.log(`port num ${PORT}`);
  });
}
