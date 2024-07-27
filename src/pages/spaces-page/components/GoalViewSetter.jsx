import CategoryTab from "./CategoryTab";

// TODO: Replace with query
const categories = [
    { id: 1, title: 'SolidJS' },
    { id: 2, title: 'RAMA' },
    { id: 3, title: 'Rust' }
];

const GoalViewSetter = ({ isCategoryView, setIsCategoryView }) => {
    console.log(isCategoryView);
    return (
        <div className="flex gap-1 mx-3 overflow-x-scroll">
            <div className="flex flex-grow items-center gap-1">
                {isCategoryView
                    ? <>
                        <CategoryViewDeactivator onClick={() => setIsCategoryView(false)} />
                        <CategoryTabs categories={categories} />
                    </>

                    : <>
                        <div className="bg-light1 px-3 py-1 rounded-lg text-lg whitespace-nowrap">
                            Important
                        </div>
                        <CategoryViewActivator onClick={() => setIsCategoryView(true)} />
                    </>
                }
            </div>
        </div >
    );
};
export default GoalViewSetter;

const CategoryViewDeactivator = ({ onClick }) => (
    <button
        className="bg-light1 text-lg rounded-full size-10 flex justify-center items-center"
        onClick={onClick}
    >
        {'icon'}
    </button>
);

const CategoryViewActivator = ({ onClick }) => (
    <button
        className="bg-light1 text-lg rounded-full size-10 flex justify-center items-center"
        onClick={onClick}
    >
        {'icon'}
    </button>
);

const CategoryTabs = ({ categories }) => (
    <div className="flex flex-grow gap-1">
        {categories.map(category => (
            <CategoryTab key={category.id} title={category.title} />
        ))}
    </div>
);