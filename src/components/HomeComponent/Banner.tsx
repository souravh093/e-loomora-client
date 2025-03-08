/* eslint-disable @typescript-eslint/ban-ts-comment */
import { ArrowRight, Logs } from "lucide-react";
import Container from "../shared/Container";
import { useGetCategoriesQuery } from "@/redux/api/features/categoryApi";
import { Link, useNavigate } from "react-router";
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
    title: "Latest Electronics",
    description: "Discover our new electronic gadgets with up to 50% off",
    cta: "Shop Now",
    image:
      "https://images.unsplash.com/photo-1498049794561-7780e7231661?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
    bgColor: "bg-blue-100",
  },
  {
    id: 2,
    title: "New Tech Arrivals",
    description: "Be the first to get our latest electronic products",
    cta: "Explore",
    image:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
    bgColor: "bg-green-100",
  },
  {
    id: 3,
    title: "Limited Time Offer",
    description: "Get an extra 20% off on selected electronics",
    cta: "Shop Sale",
    image: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?q=80&w=2101&auto=format&fit=crop&ixlib=rb-4.0.3",
    bgColor: "bg-yellow-100",
  },
]

const Banner = () => {
  const navigate = useNavigate();
  const { data: categories, isLoading } = useGetCategoriesQuery(undefined);

  const handleCategoryClick = (id: string) => {
    navigate("/all-products", { state: { categoryId: id } });
  };

  return (
    <div className="bg-yellow-50 py-5">
      <Container className="grid grid-cols-1 lg:grid-cols-12">
        <div className="col-span-2 shadow-md text-lg bg-white">
          <div className="px-4 py-4 flex items-center gap-4 bg-yellow-500">
            <Logs />
            <h1>All categories</h1>
          </div>
          {isLoading ? (
            <div className="grid grid-cols-2 gap-2 p-4">
              {Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className="border border-gray-100 p-1 animate-pulse"
                >
                  <div className="p-2 flex flex-col gap-2">
                    <div className="w-7 h-7 bg-gray-200 rounded-full" />
                    <div className="h-4 bg-gray-200 rounded" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2">
              {categories?.data?.map(
                (category: { id: string; logo: string; name: string }) => (
                  <div
                    key={category.id}
                    className="border border-gray-100 p-1 transition duration-300 group"
                  >
                    <button
                      onClick={() => handleCategoryClick(category.id)}
                      className="p-2 flex flex-col gap-2 "
                    >
                      <img
                        src={category.logo}
                        alt={category.name}
                        className="w-7 h-7"
                      />
                      <h1 className="text-sm group-hover:underline">
                        {category.name}
                      </h1>
                    </button>
                  </div>
                )
              )}
            </div>
          )}
        </div>
        <div className="col-span-10 grid grid-cols-2 lg:grid-cols-3 gap-2">
          <div className="col-span-2 lg:col-span-2">
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
                      loading="lazy"
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
                      <button
                        onClick={() => navigate("/all-products")}
                        className="bg-yellow-500 text-black py-3 font-bold px-10 rounded-3xl text-xl"
                      >
                        {slide.cta}
                      </button>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <div className="lg:col-span-1 hidden lg:block">
            <div className="w-full max-w-4xl mx-auto">
              <div className="relative overflow-hidden bg-[#E6F3FA] p-2 md:p-4 mb-1">
                <div className="flex flex-col md:flex-row justify-between items-center">
                  <div className="z-10 mb-6 md:mb-0">
                    <div className="text-2xl md:text-3xl font-semibold text-gray-800">
                      20% Off
                    </div>
                    <div className="flex items-center mt-1 mb-3">
                      <div className="w-16 h-px bg-gray-400 mr-3"></div>
                      <span className="text-sm text-gray-500 tracking-wider">
                        SALE
                      </span>
                    </div>
                    <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-3">
                      Shop New Arrivals
                    </h2>
                    <Link
                      to="/all-products"
                      className="inline-flex items-center text-gray-700 hover:text-gray-900 transition-colors"
                    >
                      Shop Collection <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </div>
                  <div className="relative w-full md:w-1/2 h-48 md:h-56">
                    <img
                      src="https://img.freepik.com/free-vector/new-arrival-design-with-confetti-concept_23-2147891292.jpg?t=st=1741411054~exp=1741414654~hmac=106400cd3ab1ca349750aa95af932947c2958670e300a7560c23eebeedd846ef&w=740"
                      alt="Fresh fruits and vegetables in a grocery bag"
                      className="object-contain object-right"
                    />
                  </div>
                </div>
              </div>

              <div className="relative overflow-hidden bg-[#F9EBE7] border-t-orange-50 p-2 md:p-4">
                <div className="flex flex-col md:flex-row justify-between items-center">
                  <div className="z-10 mb-6 md:mb-0">
                    <div className="text-2xl md:text-3xl font-semibold text-gray-800">
                      15% Off
                    </div>
                    <div className="flex items-center mt-1 mb-3">
                      <div className="w-16 h-px bg-gray-400 mr-3"></div>
                      <span className="text-sm text-gray-500 tracking-wider">
                        SALE
                      </span>
                    </div>
                    <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-3">
                      Baked Products
                    </h2>
                    <Link
                      to="/all-products"
                      className="inline-flex items-center text-gray-700 hover:text-gray-900 transition-colors"
                    >
                      Shop Collection <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </div>
                  <div className="relative w-full md:w-1/2 h-48 md:h-56">
                    <img
                      src="https://img.freepik.com/free-photo/modern-stationary-collection-arrangement_23-2149309643.jpg?t=st=1741411481~exp=1741415081~hmac=43e3c38051a30fdd53ec2f55eddf5dbcdbdd5b3ad30b43c87951d4bbc3ea6c1a&w=1060"
                      alt="Assortment of fresh bread and baked goods in a basket"
                      className="object-contain object-right"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Banner;
