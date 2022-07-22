import { useReducer, createContext } from "react";
import Reducer from "./reducer";

export const GlobalContext = createContext();

const GlobalState = ({ children }) => {
  const initialState = { notify: {} };
  const [state, dispatch] = useReducer(Reducer, initialState);

  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalState;
