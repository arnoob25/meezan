import { useQuery } from "@tanstack/react-query"
import { getCurrentDayRituals } from "../spaces-page/helpers/QueryFunctions"
import useMainPageContext from "../main-page/helpers/contexts"

const TodayPage = () => {

    const { activeView, setActiveView } = useMainPageContext()

    // TODO: determine day from date
    const day = 1
    const period = 'pre_duhr'

    const { data } = useQuery({
        queryKey: ['rituals', (day, period)],
        queryFn: () => getCurrentDayRituals(day, period)
    })

    return (
        <div className={`flex-1 overflow-hidden ${activeView ? "hidden" : ""}`}>
            <div className="title text-3xl font-bold text-center py-3">Goals For Today</div>
            {data && data.length > 0
                ? <div className="flex flex-col h-full gap-3 overflow-scroll">
                    {data.map(ritual => (
                        <div className="bg-light1 rounded-lg px-3 py-2 mx-3" key={ritual.id}>{ritual.title}</div>
                    ))}
                </div>
                : <div className="text-dark1/30 text-sm h-full mx-3 flex justify-center items-center">No rituals scheduled for today</div>
            }
        </div>
    )
}
export default TodayPage