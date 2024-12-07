/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Logs } from "lucide-react";
import Container from "../shared/Container";
import { useGetCategoriesQuery } from "@/redux/api/features/categoryApi";
import { useNavigate } from "react-router";
import Loader from "../shared/Loader";
import { Separator } from "../ui/separator";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

// @ts-expect-error
import "swiper/css";
// @ts-expect-error
import "swiper/css/pagination";
// @ts-expect-error
import "swiper/css/navigation";

const slides = [
  {
    id: 1,
    title: "Summer Collection",
    description: "Discover our new summer styles with up to 50% off",
    cta: "Shop Now",
    image:
      "https://images.unsplash.com/photo-1503924986277-3f922045c7bb?q=80&w=1993&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    bgColor: "bg-blue-100",
  },
  {
    id: 2,
    title: "New Arrivals",
    description: "Be the first to get our latest products",
    cta: "Explore",
    image:
      "https://images.unsplash.com/photo-1516274626895-055a99214f08?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    bgColor: "bg-green-100",
  },
  {
    id: 3,
    title: "Limited Time Offer",
    description: "Get an extra 20% off on selected items",
    cta: "Shop Sale",
    image:
      "https://images.unsplash.com/photo-1472851294608-062f824d29cc?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    bgColor: "bg-yellow-100",
  },
];



const Banner = () => {
  const navigate = useNavigate();
  const { data: categories, isLoading } = useGetCategoriesQuery(undefined);

  const handleCategoryClick = (id: string) => {
    navigate('/all-products', { state: { categoryId: id } });
  };


  return (
    <div className="bg-yellow-50 pb-5">
      <Container className="grid grid-cols-7">
        <div className="col-span-2 shadow-md text-lg bg-white">
          <div className="px-4 py-4 flex items-center gap-4 bg-yellow-500">
            <Logs />
            <h1>All categories</h1>
          </div>
          {isLoading ? (
            <Loader />
          ) : (
            <div>
              {categories?.data?.map(
                (category: { id: string; logo: string; name: string }) => (
                  <div key={category.id}>
                    <button
                      onClick={() => handleCategoryClick(category.id)}
                      className="px-4 py-4 flex items-center gap-4"
                    >
                      <img
                        src={category.logo}
                        alt={category.name}
                        className="w-10 h-10"
                      />
                      <h1>{category.name}</h1>
                    </button>
                    <div className="h-[1px] w-full bg-gray-300"></div>
                  </div>
                )
              )}
              <Separator />
            </div>
          )}
        </div>
        <div className="col-span-5">
          <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={0}
            slidesPerView={1}
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000 }}
            className="h-[300px] sm:h-[400px] lg:h-[500px]"
          >
            {slides.map((slide) => (
              <SwiperSlide key={slide.id}>
                <div
                  className={`relative w-full h-full flex items-center ${slide.bgColor}`}
                >
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40" />
                  <div className="relative z-10 text-white px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-2 sm:mb-4">
                      {slide.title}
                    </h2>
                    <p className="text-lg sm:text-xl lg:text-2xl mb-4 sm:mb-6">
                      {slide.description}
                    </p>
                    <button onClick={() => navigate("/all-products")} className="bg-yellow-500 text-black py-3 font-bold px-10 rounded-3xl text-xl">
                      {slide.cta}
                    </button>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </Container>
    </div>
  );
};

export default Banner;
