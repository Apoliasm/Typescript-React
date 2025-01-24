import memoData from "./memoData.json";

export type MemoInfo = {
  memoId: number;
  memoTitle: string;
  memoCreated: string;
  memoLastModified: string;
  memoContent: string;
};

export function createMemoId(): number {
  const arrLength = memoData.length;
  const lastMemoId = memoData[arrLength - 1].memoId;
  return lastMemoId + 1;
}
