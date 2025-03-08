import Container from "./Container";

const TopNavbar = () => {
  return (
    <div className="bg-black ">
      <Container>
        <div className="hidden  px-4 py-2 text-center text-sm text-primary-foreground md:block">
          <p>
            Free shipping on orders over 100BDT | Use code WELCOME10 for 10% off
            your first order
          </p>
        </div>
      </Container>
    </div>
  );
};

export default TopNavbar;
