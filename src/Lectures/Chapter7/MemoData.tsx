export type MemoInfo = {
  memoTitle: string;
  memoCreated: string;
  memoLastModified: string;
  memoContent: string;
};

export const memoArray: Array<MemoInfo> = [
  {
    memoTitle: "Title1",
    memoCreated: new Date(2025, 0, 1).toLocaleString("ko-KR"),
    memoLastModified: new Date(2025, 0, 2).toLocaleString("ko-KR"),
    memoContent: "title1 contents",
  },
  {
    memoTitle: "Title2",
    memoCreated: new Date(2025, 0, 1).toLocaleString("ko-KR"),
    memoLastModified: new Date(2025, 0, 1).toLocaleString("ko-KR"),
    memoContent: "title2 contents",
  },
  {
    memoTitle: "Title3",
    memoCreated: new Date(2025, 0, 1).toLocaleString("ko-KR"),
    memoLastModified: new Date(2025, 0, 3).toLocaleString("ko-KR"),
    memoContent: "title3 contents",
  },
  {
    memoTitle: "Title4",
    memoCreated: new Date(2025, 0, 1).toLocaleString("ko-KR"),
    memoLastModified: new Date(2025, 0, 4).toLocaleString("ko-KR"),
    memoContent: "title4 contents",
  },
  {
    memoTitle: "Title5",
    memoCreated: new Date(2025, 0, 1).toLocaleString("ko-KR"),
    memoLastModified: new Date(2025, 0, 5).toLocaleString("ko-KR"),
    memoContent: "title5 contents",
  },
];

export const memoTitleArray: Array<string> = memoArray.map((memo) => {
  return memo.memoTitle;
});
