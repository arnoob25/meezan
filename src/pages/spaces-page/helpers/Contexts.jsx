/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react";

// #region space context
const SpaceContext = createContext();

export const SpaceContextProvider = ({ children, value }) => {
  const [shouldDisplayCategories, setShouldDisplayCategories] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState(1);

  const context = {
    shouldDisplayCategories,
    setShouldDisplayCategories,
    selectedCategoryId,
    setSelectedCategoryId,
    ...value
  };

  return <SpaceContext.Provider value={context}>{children}</SpaceContext.Provider>;
};

export const useSpaceContext = () => useContext(SpaceContext);
// #endregion

// #region goal collection context
const GoalCollectionContext = createContext()

export const GoalCollectionContextProvider = ({ children, value }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const context = {
    isModalVisible,
    setIsModalVisible,
    ...value,
  }

  return <GoalCollectionContext.Provider value={context}>{children}</GoalCollectionContext.Provider>
}

export const useGoalCollectionContext = () => useContext(GoalCollectionContext)
// #endregion

