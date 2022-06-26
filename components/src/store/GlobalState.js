import { createContext, useReducer } from "react";

import reducers from "./Reducer";

export const DataContext = createContext();

export const GlobalState = ({ children }) => {
  const initialState = { notify: {} };

  const [state, dispatch] = useReducer(reducers, initialState);

  return (
    <DataContext.Provider value={{ state, dispatch }}>
      {children}
    </DataContext.Provider>
  );
};
