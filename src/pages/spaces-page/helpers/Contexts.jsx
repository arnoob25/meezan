/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useQueryAndSetAllGoals } from "./hooks";
import { useQuery } from "@tanstack/react-query";
import { getAllCategoriesForASpace } from "./queryFunctions";

const SpaceContext = createContext();
const GoalListContext = createContext()
const GoalCreationModalContext = createContext()
const GoalCollectionContext = createContext()


// #region space context
export const SpaceContextProvider = ({ children, value }) => {
  const [isCategoryViewSelected, setIsCategoryViewSelected] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const { currentSpaceId } = value

  const { data: categories = [] } = useQuery({
    queryKey: ['categories', currentSpaceId],
    queryFn: () => getAllCategoriesForASpace(currentSpaceId),
    enabled: isCategoryViewSelected,
  })

  useEffect(() => {
    const firstCategoryId = categories[0]?.id;
    if (firstCategoryId) setSelectedCategoryId(firstCategoryId);
  }, [categories]);


  const context = useMemo(() => ({
    isCategoryViewSelected,
    setIsCategoryViewSelected,
    selectedCategoryId,
    setSelectedCategoryId,
    categories,
    ...value
  }), [categories, isCategoryViewSelected, selectedCategoryId, value]);

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

  const context = useMemo(() => ({
    allGoals,
    setAllGoals,
    ...value
  }), [allGoals, value])

  return (
    <GoalListContext.Provider value={context}>
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