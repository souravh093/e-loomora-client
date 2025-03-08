import { useGetCategoriesQuery } from "@/redux/api/features/categoryApi";
import Container from "../shared/Container";
import { useNavigate } from "react-router";

const CategorySection = () => {
  const navigate = useNavigate();
  const { data: categories } = useGetCategoriesQuery(undefined);
  const handleCategory = (id: string) => {
    navigate("/all-products", { state: { categoryId: id } });
  };

  return (
    <Container>
      <div className="my-10">
        <h2 className="text-3xl font-bold mb-8">
          Browse by categories
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-8 gap-6">
          {categories?.data?.map(
            (category: { logo: string; id: string; name: string }) => (
              <div
                onClick={() => handleCategory(category.id)}
                className="border flex flex-col cursor-pointer items-center bg-white p-5 rounded-lg hover:shadow-md transition duration-300"
                key={category.id}
              >
                <img
                  className="w-16 h-16 object-contain mb-4"
                  src={category.logo}
                  alt={category.name}
                />
                <p className="text-lg font-semibold text-gray-700">
                  {category.name}
                </p>
              </div>
            )
          )}
        </div>
      </div>
    </Container>
  );
};

export default CategorySection;
