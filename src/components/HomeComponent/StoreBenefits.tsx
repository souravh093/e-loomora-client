import Container from "../shared/Container";
import { benefits } from "@/constant/StoreBenefitsConstant";
import { TBenefits } from "@/types/storeBenefits.types";

const StoreBenefitsItem = ({ data }: { data: TBenefits }) => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-4 py-10">
      <div className="p-5 rounded-full bg-yellow-100">
        {data.icon}
      </div>
      <div>
        <h3 className="text-xl font-semibold text-center md:text-start">{data.title}</h3>
        <p className="text-gray-500 text-center md:text-start">{data.description}</p>
      </div>
    </div>
  );
};

const StoreBenefits = () => {
  return (
    <div>
      <Container className="py-10 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {benefits?.map((benefit: TBenefits, index: number) => (
          <StoreBenefitsItem data={benefit} key={index} />
        ))}
      </Container>
    </div>
  );
};

export default StoreBenefits;
