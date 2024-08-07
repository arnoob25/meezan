/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react";
import { useQueryAndSetAllGoals } from "./hooks";

const SpaceContext = createContext();
const GoalListContext = createContext()
const GoalCreationModalContext = createContext()
const GoalCollectionContext = createContext()


// #region space context
export const SpaceContextProvider = ({ children, value }) => {
  const [isCategoryViewSelected, setIsCategoryViewSelected] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState(1);

  const context = {
    isCategoryViewSelected,
    setIsCategoryViewSelected,
    selectedCategoryId,
    setSelectedCategoryId,
    ...value
  };

  return <SpaceContext.Provider value={context}>{children}</SpaceContext.Provider>;
};
// #endregion


// #region goal contexts
const GoalCreationModalContextProvider = ({ children }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <GoalCreationModalContext.Provider value={{ isModalVisible, setIsModalVisible }}>
      {children}
    </GoalCreationModalContext.Provider>
  )
}

export const GoalListContextProvider = ({ children, value }) => {
  const [allGoals, setAllGoals] = useState([]);

  useQueryAndSetAllGoals(setAllGoals)

  return (
    <GoalListContext.Provider value={{ allGoals, setAllGoals, ...value }}>
      <GoalCreationModalContextProvider>
        {children}
      </GoalCreationModalContextProvider>
    </GoalListContext.Provider>
  );
};

export const GoalCollectionContextProvider = ({ children, value }) => (
  <GoalCollectionContext.Provider value={{ ...value }}>
    {children}
  </GoalCollectionContext.Provider>
)
// #endregion


export const useSpaceContext = () => useContext(SpaceContext)
export const useGoalListContext = () => useContext(GoalListContext)
export const useGoalCreationModalContext = () => useContext(GoalCreationModalContext)
export const useGoalCollectionContext = () => useContext(GoalCollectionContext)