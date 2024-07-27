import { useState } from "react"
import GoalViewSetter from "./components/GoalViewSetter";
import ListOfGoals from "./components/ListOfGoals";

const SpacesPage = () => {
    const [shouldDisplayCategories, setShouldDisplayCategories] = useState(false);

    /* 
    const space = 1

    const { data: spaces } = useQuery({
        queryKey: ['spaces'],
        queryFn: () => getAllSpaces()
    })


    const [shouldDisplayModal, setShouldDisplayModal] = useState(false); */

    return (<>
        <div className="md:max-w-[500px] md:mx-auto bg-light2 h-screen flex flex-col gap-3">
            {/* <ModalNewGoal modal={modal} hideModal={hideModal} />
            <ModalSpaces /> */}

            <GoalViewSetter
                isCategoryView={shouldDisplayCategories}
                setIsCategoryView={setShouldDisplayCategories}
            />

            <ListOfGoals shouldOrganizeByStatus={!shouldDisplayCategories} />

            {/* <NavBottom showModal={showModal} /> */}
        </div>
    </>)
}
export default SpacesPage