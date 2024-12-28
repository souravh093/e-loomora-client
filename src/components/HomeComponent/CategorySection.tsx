import { useGetCategoriesQuery } from "@/redux/api/features/categoryApi";
import Container from "../shared/Container";
import { useNavigate } from "react-router";

const CategorySection = () => {
  const navigate = useNavigate();
  const { data: categories} = useGetCategoriesQuery(undefined);
  const handleCategory = (id: string) => {
    navigate("/all-products", { state: { categoryId: id } });
  };

  return (
    <Container>
      <div className="my-10">
        <h2 className="text-2xl font-bold mb-5">Top Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-5 gap-3">
          {categories?.data?.map(
            (category: { logo: string; id: string; name: string }) => (
              <div
                onClick={() => handleCategory(category.id)}
                className="flex flex-col cursor-pointer hover:bg-yellow-50 hover:shadow-md hover:scale-105 items-center bg-yellow-100 py-5 gap-4"
                key={category.id}
              >
                <img
                  className="w-20 h-20 object-contain"
                  src={category.logo}
                  alt={category.name}
                />
                <p className="text-xl font-bold">{category.name}</p>
              </div>
            )
          )}
        </div>
      </div>
    </Container>
  );
};

export default CategorySection;
