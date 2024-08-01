import { createContext, useContext, useState } from "react";

// #region main context
const MainContext = createContext();

export const MainContextProvider = ({ children }) => {
  const [activeView, setActiveView] = useState(true);

  const context = {
    activeView,
    setActiveView,
  };

  return (
    <MainContext.Provider value={context}>{children}</MainContext.Provider>
  );
};
// #endregion

export default function useMainPageContext() {
  return useContext(MainContext);
}
// export default MainContext;
