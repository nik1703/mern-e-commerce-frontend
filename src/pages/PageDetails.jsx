import ProductDetails from '../components/products/ProductDetails'
import ProductReviews from '../components/products/ProductReviews'
import ProductDescription from '../components/products/ProductDescription'
import ProductFAQ from '../components/products/ProductFAQ'

import { useState, useRef, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import Card from '../components/Card'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { useShopContext } from '../context/ShopContext'

const PageDetails = () => {
  const { products, loading } = useShopContext()
  const [detailsNav, setDetailsNav] = useState(2)
  const [isDragging, setIsDragging] = useState(false)
  const { id: productId } = useParams()

  const product = products.find((e) => e._id === productId)
  console.log(product)

  let sliderRef = useRef(null)
  const play = () => {
    sliderRef.current.slickPlay()
  }
  const pause = () => {
    sliderRef.current.slickPause()
  }

  const settings = {
    dots: false,
    infinite: true,
    speed: 100,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
          autoplay: true,
          autoplaySpeed: 4000,
          cssEase: 'linear',
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 0,
          autoplay: true,
          autoplaySpeed: 4000,
          cssEase: 'linear',
          infinite: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          autoplay: true,
          autoplaySpeed: 4000,
          cssEase: 'linear',
          infinite: true,
        },
      },
    ],
  }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  if (loading) {
    return <p>Products loading...</p>
  }

  if (!product) {
    return <p>Product not found.</p>
  }

  const crumbs = [
    { name: 'Home', link: '/' },
    { name: product.style, link: '/category' },
    { name: product.type, link: '/category' },
    { name: product.title, link: `/product/${product._id}` },
  ]

  return (
    <>
      <div className="m-auto max-w-7xl">
        <div className="mx-4 flex justify-center">
          <div className="w-full max-w-7xl border-b-[1px] border-gray-300/50"></div>
        </div>
        <div className="mx-4">
          <div className="my-5">
            {crumbs.map((crumb, index) => {
              return (
                <div
                  key={index}
                  className="crumb mr-1 inline-block font-satoshi_regular text-black text-opacity-60 after:ml-1 after:content-['>'] last:text-opacity-100 last:after:hidden"
                >
                  <Link className="hover:underline" to={crumb.link}>
                    {crumb.name}
                  </Link>
                </div>
              )
            })}
          </div>
          <ProductDetails product={product} />
          <div className="flex flex-row justify-evenly">
            <button
              className={`w-1/3 border-b-2 pb-3 font-satoshi_regular text-base md:font-satoshi_medium md:text-xl ${detailsNav === 1 ? 'border-black text-black' : 'border-black/40 text-black/40'}`}
              onClick={() => {
                setDetailsNav(1)
              }}
            >
              Product Details
            </button>
            <button
              className={`w-1/3 border-b-2 pb-3 font-satoshi_regular text-base md:font-satoshi_medium md:text-xl ${detailsNav === 2 ? 'border-black text-black' : 'border-black/40 text-black/40'}`}
              onClick={() => {
                setDetailsNav(2)
              }}
            >
              Rating & Reviews
            </button>
            <button
              className={`w-1/3 border-b-2 pb-3 font-satoshi_regular text-base md:font-satoshi_medium md:text-xl ${detailsNav === 3 ? 'border-black text-black' : 'border-black/40 text-black/40'}`}
              onClick={() => {
                setDetailsNav(3)
              }}
            >
              FAQs
            </button>
          </div>
          {detailsNav === 1 && <ProductDescription product={product} />}
          {detailsNav === 2 && <ProductReviews productId={product.productId} />}
          {detailsNav === 3 && <ProductFAQ />}
        </div>
        <div className="mb-14 md:mb-20">
          <h2 className="mb-14 text-center font-integral_cf text-3xl md:text-5xl">
            You Might also like
          </h2>
          <div className="mx-14">
            <div className="overflow-hidden">
              <Slider
                ref={(slider) => (sliderRef.current = slider)}
                {...settings}
                className="mx-auto max-w-[80rem]"
              >
                {products.map((relatedProduct) => {
                  if (relatedProduct._id !== productId) {
                    return (
                      <div
                        key={relatedProduct._id}
                        className="w-[300px] pr-2 md:w-[300px]"
                        onMouseDown={() => setIsDragging(false)}
                        onMouseMove={() => setIsDragging(true)}
                      >
                        <Link
                          to={`/product/${relatedProduct._id}`}
                          className=""
                          draggable="false"
                          onClick={(event) => {
                            if (isDragging) {
                              event.preventDefault()
                              event.stopPropagation()
                            } else {
                              window.scrollTo({ top: 0, behavior: 'smooth' })
                            }
                          }}
                        >
                          <Card product={relatedProduct} />
                        </Link>
                      </div>
                    )
                  }
                })}
              </Slider>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default PageDetails
