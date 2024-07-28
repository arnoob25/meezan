
import { useState } from "react";
import { useSpaceContext } from "../helpers/Contexts";
import CategoryTabs from "./CategoryTabs";
import CategoryCreationModal from "./CategoryCreationModal";

const GoalViewSetter = () => {
    const { shouldDisplayCategories, setShouldDisplayCategories } = useSpaceContext()

    return (
        <div className="flex gap-1 mx-3 overflow-x-scroll">
            <div className="flex flex-grow items-center gap-1">
                {shouldDisplayCategories
                    ? <>
                        <CategoryViewDeactivator onClick={() => setShouldDisplayCategories(false)} />
                        <CategoryTabs />
                        <CategoryCreationButton />
                    </>

                    : <>
                        <div className="bg-light1 px-3 py-1 mr-auto rounded-lg text-lg whitespace-nowrap">
                            Important
                        </div>
                        <CategoryViewActivator onClick={() => setShouldDisplayCategories(true)} />
                    </>
                }
            </div>
        </div >
    );
};
export default GoalViewSetter;


const CategoryViewActivator = ({ onClick }) => (
    <button
        className="bg-light1 text-lg rounded-full size-10 flex justify-center items-center"
        onClick={onClick}
    >
        #
    </button>
);

const CategoryViewDeactivator = ({ onClick }) => (
    <button
        className="bg-light1 text-lg rounded-full size-10 flex justify-center items-center"
        onClick={onClick}
    >
        #
    </button>
);

const CategoryCreationButton = () => {
    const [isModalVisible, setIsModalVisible] = useState(false)

    return (<>
        <div
            className="bg-light2 size-7 rounded-full flex justify-center items-center cursor-pointer"
            onClick={() => setIsModalVisible(true)}
        >
            +
        </div>
        <CategoryCreationModal isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible} />
    </>)
}