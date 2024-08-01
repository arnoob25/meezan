import useMainPageContext from "../main-page/helpers/contexts";
import GoalViewSetter from "./components/GoalViewSetter";
import ListOfGoals from "./components/ListOfGoals";
import { SpaceContextProvider } from "./helpers/Contexts";

const SpacesPage = () => {
    const currentSpaceId = 1

    const {activeView, setActiveView} = useMainPageContext()

    /* TODO: this would be used to display the list (selector) of spaces
    const { data: spaces } = useQuery({
        queryKey: ['spaces'],
        queryFn: () => getAllSpaces()
    })*/

    return (
        <div className={`flex flex-col gap-3 flex-1 overflow-hidden ${activeView?"":"hidden"}`}>
           <SpaceContextProvider value={{ currentSpaceId }}>
                <GoalViewSetter />
                <ListOfGoals />
            </SpaceContextProvider>
        </div>
    )
}
export default SpacesPage