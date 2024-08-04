/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { COLLECTION_METHODS } from "./enums";
import { reorderGoals } from "./utils";

// #region space context
const SpaceContext = createContext();

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

export const useSpaceContext = () => useContext(SpaceContext);
// #endregion


// #region goal collection context
const GoalCollectionContext = createContext()

// TODO: create separate contexts for managing the goals and the modal state
export const GoalCollectionContextProvider = ({ children, value }) => {
  const { allGoals, collectionCriteria } = value;
  const { status, priority, fieldName } = collectionCriteria

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [goals, setGoals] = useState([]);

  const { isCategoryViewSelected, currentSpace } = useSpaceContext();
  let collectionMethod = COLLECTION_METHODS.status;
  let goalFilter = status;

  if (isCategoryViewSelected) {
    collectionMethod = COLLECTION_METHODS.priority;
    goalFilter = priority;
  }

  const filteredGoals = useMemo(() => {
    return allGoals?.filter(goal => goal[collectionMethod] === goalFilter);
  }, [allGoals, collectionMethod, goalFilter]);

  useEffect(() => {
    if (currentSpace && collectionMethod === COLLECTION_METHODS.status) {
      const orderedGoals = reorderGoals(filteredGoals, currentSpace[fieldName]);
      setGoals(orderedGoals);
    } else {
      setGoals(filteredGoals);
    }
  }, [filteredGoals, currentSpace, goalFilter, collectionMethod, fieldName]);

  const context = {
    goals,
    setGoals,
    collectionMethod,
    goalPositions: goals?.map(goal => goal.id) || [],
    isModalVisible,
    setIsModalVisible,
    ...value,
  };

  return (
    <GoalCollectionContext.Provider value={context}>
      {children}
    </GoalCollectionContext.Provider>
  );
};

export const useGoalCollectionContext = () => useContext(GoalCollectionContext)
// #endregion