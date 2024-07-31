import GoalViewSetter from "./components/GoalViewSetter";
import ListOfGoals from "./components/ListOfGoals";
import { SpaceContextProvider } from "./helpers/Contexts";

const SpacesPage = () => {
    const currentSpaceId = 1

    /* TODO: this would be used to display the list (selector) of spaces
    const { data: spaces } = useQuery({
        queryKey: ['spaces'],
        queryFn: () => getAllSpaces()
    })*/

    return (
        <>
           <SpaceContextProvider value={{ currentSpaceId }}>
                <GoalViewSetter />
                <ListOfGoals />
            </SpaceContextProvider>
        </>
    )
}
export default SpacesPage