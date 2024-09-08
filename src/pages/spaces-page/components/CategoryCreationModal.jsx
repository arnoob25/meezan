import CategoryCreationForm from "../forms/CategoryCreationForm";

const CategoryCreationModal = ({ isModalVisible, setIsModalVisible }) => {
    return (
        <div className={`w-screen h-screen p-10 flex justify-center items-center ${isModalVisible ? "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" : "hidden"}`}>
            <button
                onClick={() => setIsModalVisible(false)}
                className="w-screen h-screen bg-dark1/30 backdrop-blur-lg absolute top-0 left-0 cursor-default"
            />
            <CategoryCreationForm hideModal={() => setIsModalVisible(false)} />
        </div>
    );
}
export default CategoryCreationModal // we loves raheee