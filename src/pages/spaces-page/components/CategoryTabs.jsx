import { useSpaceContext } from "../helpers/Contexts";

const CategoryTabs = () => {
    const { categories, setSelectedCategoryId } = useSpaceContext();

    // Sort categories alphabetically by title
    const sortedCategories = categories?.sort((a, b) => {
        if (a.title < b.title) return -1;
        if (a.title > b.title) return 1;
        return 0;
    });

    return (
        <div className="flex flex-grow gap-1">
            {sortedCategories?.map(category => (
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