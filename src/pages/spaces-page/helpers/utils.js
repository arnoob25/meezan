export const reorderGoals = (goals, goalPositions) => {
    if (goalPositions?.length <= 0) return goals

    // Create a mapping of goal IDs to goal objects
    const goalMap = goals?.reduce((map, goal) => {
        map[goal.id] = goal;
        return map;
    }, {}) ?? {};

    // Map over goalPositions to create an ordered array of goals
    return goalPositions?.map(id => goalMap[id]).filter(goal => goal !== undefined) ?? [];
}