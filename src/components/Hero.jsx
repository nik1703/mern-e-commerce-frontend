import { Link } from 'react-router-dom'
import Button from './Button'

function Hero() {
  return (
    <div className="w-full bg-background">
      <div className="mx-auto   grid  max-w-[1440px] grid-cols-1 bg-background bg-cover bg-right-bottom text-left  text-2xl md:h-[500px] md:grid-cols-2 md:bg-[url('/images/hero/hero-large.png')] lg:h-[665px] lg:max-h-[665px] xl:bg-center ">
        <div className="">
          <div className="  w-fit px-4 lg:px-24">
            <h2 className=" font pb-5 pt-10 font-integral_cf lg:pt-24 lg:text-4xl xl:text-6xl">
              FIND CLOTHES THAT MATCHES YOUR STYLE
            </h2>
            <p className=" font-satoshi_regular text-sm opacity-60 xl:text-base">
              Browse through our diverse range of meticulously crafted garments,
              designed to bring out your individuality and cater to your sense
              of style.
            </p>
            <Link to="/category">
              <Button
                className=" my-5 w-full md:my-8 md:w-fit lg:mb-12"
                primary
              >
                Shop Now
              </Button>
            </Link>
          </div>
          <div className="flex flex-wrap justify-center gap-3 px-4  font-satoshi_regular text-xs sm:justify-around  md:max-w-[300px] lg:max-w-[400px] lg:pl-24  xl:ml-24  xl:flex-nowrap xl:justify-start xl:gap-10 xl:pl-0">
            <div>
              <h3 className="font-satoshi_bold text-2xl lg:text-4xl">200+</h3>
              <p>International Brands</p>
            </div>
            <div>
              <h3 className="font-satoshi_bold text-2xl lg:text-4xl">2,000+</h3>
              <p> High-Quality Products</p>
            </div>
            <div>
              <h3 className="font-satoshi_bold text-2xl lg:text-4xl">
                30,000+
              </h3>
              <p> Happy Customers</p>
            </div>
          </div>
        </div>
        <img
          src="./images/hero/hero-small.png"
          alt="Hero"
          className="flex w-full flex-grow  p-0  sm:max-h-[665px] md:hidden "
        />
      </div>
    </div>
  )
}
export default Hero
