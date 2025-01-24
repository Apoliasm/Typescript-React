import React, {
  MouseEventHandler,
  useCallback,
  useEffect,
  useState,
} from "react";
import MemoSidebar from "./MemoSidebar";
import MemoContainer from "./MemoContainer";
import { MemoInfo, createMemoId } from "./MemoData";
import "./memo.css";
import memoArray from "./memoData.json";

const MemoMain: React.FC = () => {
  const [currentMemoIndex, setCurrentMemoIndex] = useState<number>(0);
  const [currentMemo, setCurrentMemo] = useState<MemoInfo>(memoArray[0]);
  const changeCurrent = useCallback(
    (event: React.MouseEvent, index: number) => {
      setCurrentMemoIndex(index);
    },
    [memoArray],
  );

  const createNewMemo = (event: React.MouseEvent) => {
    const newId: number = createMemoId();
    const newMemo: MemoInfo = {
      memoId: newId,
      memoTitle: "new Title",
      memoCreated: new Date(Date.now()).toLocaleString(),
      memoLastModified: new Date(Date.now()).toLocaleString(),
      memoContent: "",
    };
    memoArray.push(newMemo);

    setCurrentMemoIndex(memoArray.length - 1);
  };
  const deleteMemo = (event: React.MouseEvent, currentIndex: number) => {
    memoArray.splice(currentIndex, 1);
    //splice : array 요소 제거
    setCurrentMemoIndex(0);
  };

  useEffect(() => {
    setCurrentMemo(memoArray[currentMemoIndex]);
  }, [currentMemoIndex]);

  return (
    <div className="memo-main">
      <MemoSidebar
        memoArray={memoArray}
        memoCurrentIndex={currentMemoIndex}
        sidebarOnclick={changeCurrent}
        createOnclick={createNewMemo}
      ></MemoSidebar>
      <MemoContainer
        memoInfo={currentMemo}
        currentIndex={currentMemoIndex}
        deleteOnclick={deleteMemo}
      />
    </div>
  );
};
export default MemoMain;
