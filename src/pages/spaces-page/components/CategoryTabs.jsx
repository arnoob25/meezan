import { useQuery } from "@tanstack/react-query";
import { useSpaceContext } from "../helpers/Contexts";
import { getAllCategoriesForASpace } from "../helpers/queryFunctions";

const CategoryTabs = () => {
    const { currentSpaceId, setSelectedCategoryId } = useSpaceContext()

    const { data: categories } = useQuery({
        queryKey: ['categories', currentSpaceId],
        queryFn: () => getAllCategoriesForASpace(currentSpaceId),
    })

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

export default CategoryTabs