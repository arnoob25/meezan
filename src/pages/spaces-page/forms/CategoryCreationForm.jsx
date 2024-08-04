import { useForm } from 'react-hook-form';
import { CreateCategorySchema } from '../helpers/formSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSpaceContext } from '../helpers/Contexts';
import { useCreateCategoryMutation } from '../helpers/mutationFunctions';

const CategoryCreationForm = ({ hideModal }) => {
    const { currentSpaceId } = useSpaceContext()

    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: zodResolver(CreateCategorySchema)
    });

    // TODO: create the mutation function
    const createCategoryMutation = useCreateCategoryMutation();

    const onSubmit = (data) => {
        const newCategory = {
            title: data.title,
            space_id: currentSpaceId
        };

        createCategoryMutation.mutate(newCategory, {
            onSuccess: () => {
                console.log('Category created successfully');
                reset();
                hideModal();
            },
        });
    };

    return (
        <div className="w-full md:w-[25rem] bg-light1 p-5 rounded-lg flex flex-col gap-3 z-10">
            <h2>Create a New Category</h2>
            <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
                <div>
                    {/* <label htmlFor="title">Category Title</label> */}
                    <input
                        className="w-full bg-light2 px-4 py-2 rounded-lg"
                        type="text"
                        id="title"
                        {...register("title")}
                        placeholder="Enter your category title"
                    />
                    {errors.title && <p>{errors.title.message}</p>}
                </div>

                <button
                    className="w-full bg-dark1 text-light1 font-semibold px-5 py-3 rounded-lg"
                    type="submit" 
                    disabled={createCategoryMutation.isLoading}
                >
                    {createCategoryMutation.isLoading ? 'Creating...' : 'Create Category'}
                </button>
            </form>
            {createCategoryMutation.isError && (
                <p className="text-red-500">Error creating category: {createCategoryMutation.error.message}</p>
            )}
        </div>
    );
}
export default CategoryCreationForm