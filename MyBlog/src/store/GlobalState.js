import { createContext, useReducer } from "react";

import reducers from "./Reducer";

export const GlobalContext = createContext();

export const GlobalState = ({ children }) => {
  const initialState = { notify: {} };

  const [state, dispatch] = useReducer(reducers, initialState);

  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
};
