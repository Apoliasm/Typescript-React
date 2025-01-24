import { title } from "process";
import { MemoInfo } from "./MemoData";
import React, {
  ChangeEventHandler,
  RefObject,
  useEffect,
  useRef,
  useState,
} from "react";

type Props = {
  memoInfo: MemoInfo;
  currentIndex: number;
  deleteOnclick: (event: React.MouseEvent, index: number) => void;
};

const MemoContainer: React.FC<Props> = ({
  memoInfo,
  currentIndex,
  deleteOnclick,
}: Props) => {
  const { memoId, memoTitle, memoCreated, memoLastModified, memoContent } =
    memoInfo;
  const [currentMemo, setCurrentMemo] = useState<MemoInfo>({
    memoId,
    memoTitle,
    memoCreated,
    memoLastModified,
    memoContent,
  });
  const [textAreaValue, setTextAreaValue] = useState<string>(memoContent);
  const [lastModified, setLastModified] = useState<string>(memoLastModified);
  const contentChangeHandler: ChangeEventHandler<HTMLTextAreaElement> = (
    event,
  ) => {
    setLastModified(new Date(Date.now()).toLocaleString("ko-KR"));
    setTextAreaValue(event.target.value);
  };
  useEffect(() => {
    console.log(memoContent);
    setTextAreaValue(memoContent);
  }, [memoContent]);
  useEffect(() => {
    console.log(memoLastModified);
    setLastModified(memoLastModified);
  }, [memoLastModified]);
  return (
    <div className="memo-container">
      <div className="memo-container__memo-title">{memoTitle}</div>
      <div className="memo-container__memo-info">
        <div className="memo-container__memo-created">
          created
          <div>{memoCreated}</div>
        </div>
        <div className="memo-container__memo-last-modified">
          last modified
          <div>{lastModified}</div>
        </div>
        <div
          className="memo-container_delete"
          onClick={(event) => deleteOnclick(event, currentIndex)}
        >
          삭제
        </div>
      </div>

      <textarea
        value={textAreaValue}
        onChange={contentChangeHandler}
        className="memo-container__memo-content"
      ></textarea>
    </div>
  );
};

export default MemoContainer;
