import { useQuery } from "@tanstack/react-query";
import GoalViewSetter from "./components/GoalViewSetter";
import ListOfGoals from "./components/ListOfGoals";
import { SpaceContextProvider } from "./helpers/Contexts";
import { getSelectedSpace } from "./helpers/queryFunctions";

const SpacesPage = () => {
    const currentSpaceId = 1

    const { data: currentSpace } = useQuery({
        queryKey: ['spaces', currentSpaceId],
        queryFn: () => getSelectedSpace(currentSpaceId)
    })

    return (
        <SpaceContextProvider value={{ currentSpaceId, currentSpace }}>
            <GoalViewSetter />
            <ListOfGoals />
        </SpaceContextProvider>
    )
}
export default SpacesPage