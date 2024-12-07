import Banner from '@/components/HomeComponent/Banner'
import FlashSale from '@/components/HomeComponent/FlashSale'
import ShowProduct from '@/components/HomeComponent/ShowProduct'

const Home = () => {
  return (
    <div>
      <Banner />
      <ShowProduct />
      <FlashSale />
    </div>
  )
}

export default Home