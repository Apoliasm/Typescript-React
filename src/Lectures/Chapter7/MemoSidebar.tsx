import React, { MouseEventHandler } from "react";
import { MemoInfo, createMemoId } from "./MemoData";
import memoArray from "./memoData.json";
type Props = {
  memoArray: Array<MemoInfo>;
  memoCurrentIndex: number;
  sidebarOnclick: (event: React.MouseEvent, index: number) => void;
  createOnclick: (evnent: React.MouseEvent) => void;
};

const MemoSidebar: React.FC<Props> = ({
  memoArray,
  memoCurrentIndex,
  sidebarOnclick,
  createOnclick,
}: Props) => {
  return (
    <div className="memo-sidebar_main">
      <div className="memo-sidebar_title">메모장</div>
      <div className="memo-sidebar_memo-list">
        {memoArray.map((memo, index) => (
          <div
            className="memo-sidebar_memo-element"
            key={index}
            onClick={(event) => sidebarOnclick(event, index)}
            style={{
              border: memoCurrentIndex === index ? "1px solid black" : "",
            }}
          >
            {memo.memoTitle}
          </div>
        ))}
        <div className="memo-sidebar_memo-create" onClick={createOnclick}>
          +
        </div>
      </div>
    </div>
  );
};

export default MemoSidebar;
