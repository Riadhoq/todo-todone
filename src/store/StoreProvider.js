import React, { useContext, useReducer, createContext } from "react";

export const StoreContext = createContext();

const StoreProvider = ({ reducer, initialState, children }) => (
  <StoreContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StoreContext.Provider>
);

export const useStore = () => useContext(StoreContext);

export default StoreProvider;
