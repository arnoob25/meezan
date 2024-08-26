import { useGoalListContext, useSpaceContext } from "./Contexts";
import { useQuery } from "@tanstack/react-query";
import { getAllGoalsWithinACategory, getAllImportantGoalsWithinASpace } from "./queryFunctions";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { reorderGoals } from "./utils";
import { arrayMove } from "@dnd-kit/sortable";

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

export function useFilterGoals({ criteria, method, fieldName }) {
    const {
        isCategoryViewSelected,
        currentSpace,
        selectedCategoryId,
        categories
    } = useSpaceContext();
    const { allGoals } = useGoalListContext();

    const [reorderedGoals, setReorderedGoals] = useState([]);
    const [goalPositions, setGoalPositions] = useState([]);

    // Filter goals based on criteria and method
    const filteredGoals = useMemo(() => {
        return allGoals?.filter(goal => goal?.[method] === criteria) ?? []
    }, [allGoals, method, criteria]);

    // Set goal positions based on category or space
    useEffect(() => {
        if (isCategoryViewSelected) {
            const selectedCategory = categories.find(category => category.id === selectedCategoryId)
            const goalPositionsInCategory = selectedCategory?.[fieldName] ?? []
            setGoalPositions(goalPositionsInCategory)
        }
        else setGoalPositions(currentSpace?.[fieldName])
    }, [categories, currentSpace, fieldName, isCategoryViewSelected, selectedCategoryId]);

    // Reorder goals based on updated positions
    useEffect(() => {
        const updatedListOfGoals = reorderGoals(filteredGoals, goalPositions);
        setReorderedGoals(updatedListOfGoals);
    }, [filteredGoals, goalPositions]);

    // Update goal order when dragged
    const updateGoalOrder = useCallback((activeId, overId) => {
        setGoalPositions(prevPositions => {
            if (!prevPositions) return []
            return arrayMove(
                prevPositions,
                prevPositions.indexOf(activeId),
                prevPositions.indexOf(overId)
            );
        });
    }, []);

    // Add a new goal to the list
    const addNewGoal = useCallback((activeGoalId) => {
        setGoalPositions(prevPositions => {
            if (prevPositions.includes(activeGoalId)) return prevPositions
            return [...prevPositions, activeGoalId];
        });
    }, []);

    // Return reordered goals, their positions, and update functions
    return {
        goals: reorderedGoals,
        sortedPositions: reorderedGoals.map(goal => goal.id) ?? [],
        addNewGoal,
        updateGoalOrder,
    };
}