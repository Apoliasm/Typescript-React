import React, { MouseEventHandler } from "react";
import { MemoInfo } from "./MemoData";
type Props = {
  memoArray: Array<MemoInfo>;
  memoCurrentIndex: number;
  sidebarOnclick: (event: React.MouseEvent, index: number) => void;
};
const MemoSidebar: React.FC<Props> = ({
  memoArray,
  memoCurrentIndex,
  sidebarOnclick,
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
        <div className="memo-sidebar_memo-create"></div>
      </div>
    </div>
  );
};

export default MemoSidebar;
