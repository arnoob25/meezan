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
        setAllGoals(prevGoals => isCategoryViewSelected ? categorizedGoals : importantGoals)
    }, [isCategoryViewSelected, setAllGoals, categorizedGoals, importantGoals])
}

export function useFilterGoals({ criteria, method, fieldName }) {
    const [reorderedGoals, setReorderedGoals] = useState([]);
    const [goalPositions, setGoalPositions] = useState([]);
    const didInitializeFromTheServer = useRef(false);
    const { currentSpace } = useSpaceContext();
    const { allGoals } = useGoalListContext();

    const filteredGoals = useMemo(() => {
        return allGoals?.filter(goal => goal[method] === criteria) ?? [];
    }, [allGoals, method, criteria]);

    useEffect(() => {
        setGoalPositions(currentSpace?.[fieldName]);
    }, [currentSpace, fieldName]);

    useEffect(() => {
        if (filteredGoals.length && goalPositions.length && !didInitializeFromTheServer.current) {
            const initialReorderedGoals = reorderGoals(filteredGoals, goalPositions);
            setReorderedGoals(initialReorderedGoals);
            didInitializeFromTheServer.current = true;
        } else if (didInitializeFromTheServer.current) {
            const updatedReorderedGoals = reorderGoals(filteredGoals, goalPositions);
            setReorderedGoals(updatedReorderedGoals);
        }
    }, [filteredGoals, goalPositions]);

    const updateGoalOrder = useCallback((activeId, overId) => {
        setGoalPositions(prevPositions => (
            arrayMove(prevPositions, prevPositions.indexOf(activeId), prevPositions.indexOf(overId))
        ));
    }, []);

    if (!didInitializeFromTheServer.current) {
        return { goals: filteredGoals, sortedPositions: filteredGoals.map(goal => goal.id) ?? [], updateGoalOrder };
    }

    console.log(reorderedGoals);

    return { goals: reorderedGoals, sortedPositions: reorderedGoals.map(goal => goal.id) ?? [], updateGoalOrder };
}