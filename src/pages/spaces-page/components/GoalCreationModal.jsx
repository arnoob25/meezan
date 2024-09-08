import GoalCreationForm from "../forms/GoalCreationForm";
import { useGoalCreationModalContext } from "../helpers/Contexts";

const GoalCreationModal = () => {
    const { isModalVisible, setIsModalVisible } = useGoalCreationModalContext()

    return (
        <div className={`w-screen h-screen p-10 flex justify-center items-center ${isModalVisible ? "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" : "hidden"}`}>
            <button
                onClick={() => setIsModalVisible(false)}
                className="w-screen h-screen bg-dark1/30 backdrop-blur-lg absolute top-0 left-0 cursor-default"
            />
            <GoalCreationForm />
        </div>
    );
}
export default GoalCreationModal