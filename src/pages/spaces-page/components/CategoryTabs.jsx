import { useSpaceContext } from "../helpers/Contexts";

const CategoryTabs = () => {
    const { categories, setSelectedCategoryId } = useSpaceContext();

    return (
        <div className="flex flex-grow gap-1">
            {categories?.map(category => (
                <button
                    key={category.id}
                    onClick={() => setSelectedCategoryId(category.id)}
                    className="category-tab bg-light1 px-3 py-1 rounded-lg text-lg whitespace-nowrap"
                >
                    {category.title}
                </button>
            ))}
        </div>
    );
}

export default CategoryTabs;