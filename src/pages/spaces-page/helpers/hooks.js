import { useGoalListContext, useSpaceContext } from "./Contexts";
import { useQuery } from "@tanstack/react-query";
import { getAllGoalsWithinACategory, getAllImportantGoalsWithinASpace } from "./queryFunctions";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { reorderGoals } from "./utils";
import { arrayMove } from "@dnd-kit/sortable";
import { useUpdateGoalOrderMutation } from "./mutationHooks";
import { areArraysEqual } from "../../../lib/utils";

export function useQueryAndSetAllGoals(setAllGoals) {
    const { isCategoryViewSelected, currentSpace, selectedCategoryId } = useSpaceContext()
    const currentSpaceId = currentSpace?.id

    const { data: importantGoals } = useQuery({
        queryKey: ['goals', 'important', currentSpaceId],
        queryFn: () => getAllImportantGoalsWithinASpace(currentSpaceId),
        enabled: !isCategoryViewSelected && !!currentSpaceId
    })

    const { data: categorizedGoals } = useQuery({
        queryKey: ['goals', 'category', selectedCategoryId],
        queryFn: () => getAllGoalsWithinACategory(selectedCategoryId),
        enabled: isCategoryViewSelected && !!selectedCategoryId
    })

    useEffect(() => {
        setAllGoals(prevGoals => {
            const newGoals = isCategoryViewSelected ? categorizedGoals : importantGoals
            if (!newGoals) return []
            return newGoals
        })
    }, [isCategoryViewSelected, setAllGoals, categorizedGoals, importantGoals])
}

// TODO: error handling mismatch between goals and sortedIds =. 
// if ids in the array is not present in the goals list, remove those ids, 
// and add the ids that weren't present in the array
function handleGoalIdMismatch(orderedGoalIds, filteredGoalIds) {
    const validGoalIds = new Set(filteredGoalIds);

    // Remove IDs that are not present in the filteredGoalIds
    const validIds = orderedGoalIds.filter(id => validGoalIds.has(id));

    // Add IDs that are in filteredGoals but not in goalIds
    const missingIds = filteredGoalIds
        .filter(goal => !validIds.includes(goal.id))
        .map(goal => goal.id);

    return [...validIds, ...missingIds];
}

function useFilterAndOrderCollectionGoals({ criteria, method, fieldName }) {
    const {
        isCategoryViewSelected,
        currentSpace,
        selectedCategoryId,
        categories
    } = useSpaceContext();
    const { allGoals } = useGoalListContext();

    const [orderedGoals, setOrderedGoals] = useState([]);
    const goalPositionsArray = useRef([]);

    // Filter goals based on criteria and method
    const filteredGoals = useMemo(() => (
        allGoals?.filter(goal => goal?.[method] === criteria) ?? []
    ), [allGoals, method, criteria]);

    // define the position of goals based on the collection 
    useEffect(() => {
        if (isCategoryViewSelected) {
            const selectedCategory = categories.find(category => category.id === selectedCategoryId)
            const goalPositionsInCategory = selectedCategory?.[fieldName]
            goalPositionsArray.current = goalPositionsInCategory ?? []
        }
        else goalPositionsArray.current = currentSpace?.[fieldName] ?? []
    }, [categories, currentSpace, fieldName, isCategoryViewSelected, selectedCategoryId]);

    // handle cases when the orderedGoalIds don't reflect the actual filtered goals
    useEffect(() => {
        const orderedGoalIds = goalPositionsArray.current
        const filteredGoalIds = filteredGoals.map(goal => goal.id)
        
        if (areArraysEqual(orderedGoalIds, filteredGoalIds)) return

        if (orderedGoalIds?.length === 0) {
            // goals haven't been ordered, so we'll sort them arbitrarily
            goalPositionsArray.current = filteredGoals?.map(goal => goal.id) ?? []
        }
        else {
            goalPositionsArray.current = handleGoalIdMismatch(orderedGoalIds, filteredGoalIds)
        }
    }, [filteredGoals])

    // order the filtered goals based on their position
    useEffect(() => {
        setOrderedGoals(
            reorderGoals(filteredGoals, goalPositionsArray.current)
        );
    }, [filteredGoals]);

    return {
        collectionGoals: orderedGoals,
        sortedGoalIdsRef: goalPositionsArray
    }
}

export function useHandleGoalOrderAndCollectionChange(collectionCriteria) {
    const { setAllGoals } = useGoalListContext();
    const {
        collectionGoals,
        sortedGoalIdsRef
    } = useFilterAndOrderCollectionGoals(collectionCriteria);

    const updateGoalOrderArray = useCallback((activeId, overId) => {
        const sortedGoalIds = sortedGoalIdsRef.current
        if (!sortedGoalIds) return []

        setAllGoals(allGoals => { // allGoals refer to goals being displayed in the current view in the space
            const activeIndex = allGoals?.findIndex(g => g && g.id === activeId);
            const overIndex = allGoals?.findIndex(g => g && g.id === overId);
            return arrayMove(allGoals, activeIndex, overIndex);
        });

        sortedGoalIdsRef.current = arrayMove(
            sortedGoalIds,
            sortedGoalIds.indexOf(activeId),
            sortedGoalIds.indexOf(overId)
        );
    }, [sortedGoalIdsRef, setAllGoals])

    const updateGoalCollectionCriteria = useCallback((activeGoal, method) => {
        const activeId = activeGoal?.id
        const sortedGoalIds = sortedGoalIdsRef.current

        if (!activeId || sortedGoalIds.includes(activeId)) return

        const activeGoalWithUpdatedStatus = {
            ...activeGoal,
            [method]: collectionCriteria.criteria
        }

        setAllGoals(allGoals => ( // allGoals refer to goals being displayed in the current view in the space
            allGoals.map(goal => {
                if (goal.id === activeId) return activeGoalWithUpdatedStatus
                return goal
            })
        ));

        sortedGoalIdsRef.current = [...sortedGoalIds, activeId];
    }, [collectionCriteria.criteria, sortedGoalIdsRef, setAllGoals]);

    return {
        goals: collectionGoals,
        sortedGoalPositions: collectionGoals?.map(goal => goal.id) ?? [],
        updateGoalOrderArray,
        updateGoalCollectionCriteria,
    }
}