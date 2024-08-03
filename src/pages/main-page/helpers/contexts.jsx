import { createContext, useContext, useState } from "react";

const MainContext = createContext();

export const MainContextProvider = ({ children }) => {
  const [activeView, setActiveView] = useState(false);

  const context = {
    activeView,
    setActiveView,
  };

  return (
    <MainContext.Provider value={context}>{children}</MainContext.Provider>
  );
};

export default function useMainPageContext() {
  return useContext(MainContext);
}
// export default MainContext;
