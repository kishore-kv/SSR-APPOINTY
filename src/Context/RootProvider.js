import React from "react";
import { RootContext } from "./RootContext";

function RootProvider({ children }) {

  return (
    <RootContext.Provider
    value={{}}
    >
      {children}
    </RootContext.Provider>
  );
}

export default RootProvider;
