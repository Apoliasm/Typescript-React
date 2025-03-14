import { useReducer } from "react";

type State = {
  count: number;
};

type Action = {
  type: "up" | "down" | "reset";
  payload?: State;
};

function init(count: State): State {
  return count;
}

const initialState: State = { count: 0 };

//state와 action 기반으로 state가 어떻게 변경될지를 정의
function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "up":
      return { count: state.count + 1 };

    case "down":
      return { count: state.count - 1 };
    case "reset":
      return init(action.payload || { count: 0 });
    default:
      throw new Error(`unexpected action type ${action.type}`);
  }
}

export function ReducerBasis() {
  const [state, dispatcher] = useReducer(reducer, initialState, init);
  function handleUpButtonClick() {
    dispatcher({ type: "up" });
  }
  function handleDownButtonClick() {
    dispatcher({ type: "down" });
  }
  function handleResetButtonClick() {
    dispatcher({ type: "reset", payload: { count: 1 } });
  }

  return (
    <div>
      <h1>{state.count}</h1>
      <button onClick={handleUpButtonClick}>+</button>
      <button onClick={handleDownButtonClick}>-</button>
      <button onClick={handleResetButtonClick}>reset</button>
    </div>
  );
}
