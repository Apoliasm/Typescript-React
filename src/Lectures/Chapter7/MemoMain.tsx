import React, {
  MouseEventHandler,
  useCallback,
  useEffect,
  useState,
} from "react";
import MemoSidebar from "./MemoSidebar";
import MemoContainer from "./MemoContainer";
import { memoArray, memoTitleArray, MemoInfo } from "./MemoData";
import "./memo.css";

const MemoMain: React.FC = () => {
  const [currentMemoIndex, setCurrentMemoIndex] = useState<number>(0);
  const [currentMemo, setCurrentMemo] = useState<MemoInfo>(memoArray[0]);
  const changeCurrent = useCallback(
    (event: React.MouseEvent, index: number) => {
      setCurrentMemoIndex(index);
    },
    [memoArray],
  );

  useEffect(() => {
    setCurrentMemo(memoArray[currentMemoIndex]);
  }, [currentMemoIndex]);
  return (
    <div className="memo-main">
      <MemoSidebar
        memoArray={memoArray}
        memoCurrentIndex={currentMemoIndex}
        sidebarOnclick={changeCurrent}
      ></MemoSidebar>
      <MemoContainer
        memoTitle={currentMemo.memoTitle}
        memoContent={currentMemo.memoContent}
        memoCreated={currentMemo.memoCreated}
        memoLastModified={currentMemo.memoLastModified}
      />
    </div>
  );
};
export default MemoMain;
