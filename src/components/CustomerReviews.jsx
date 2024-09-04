import React, { useRef } from 'react'
// slick
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
// react-icons
import { reviews } from '../data/reviews'
import { GoArrowLeft, GoArrowRight } from 'react-icons/go'
import { IoCheckmarkCircle } from 'react-icons/io5'
import { FaStar } from 'react-icons/fa'

function CustomerReviews() {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 2,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  }

  const ref = useRef(null)

  const handleNextSlide = () => {
    ref.current.slickNext()
  }

  const handlePrevSlide = () => {
    ref.current.slickPrev()
  }

  return (
    <>
      {/* Header */}
      <section className="mx-4 flex lg:mx-24  ">
        <div className="mb-12 mt-16 flex  w-full items-center justify-between text-start font-integral_cf text-3xl md:text-5xl">
          <h2 className="">OUR HAPPY CUSTOMERS</h2>
          <div className="flex gap-4 pt-3 text-3xl">
            <button onClick={handlePrevSlide}>
              <GoArrowLeft />
            </button>{' '}
            <button onClick={handleNextSlide}>
              <GoArrowRight />
            </button>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-[1440px]  overflow-hidden lg:mx-[100px]">
        <Slider {...settings} ref={ref}>
          {reviews.map((review) => {
            // stars

            const sterne = [...Array(review.stars)].map((star, index) => {
              return <FaStar key={index} className="mr-1 text-yellow-400" />
            })

            // cardcomponent
            return (
              <li key={review.id}>
                <div className="mx-2  mb-16 mt-10 flex h-[240px] flex-col items-start space-y-3  rounded-2xl border border-black/10 px-8 pt-7 font-satoshi_regular text-base">
                  <div className="flex">{sterne}</div>
                  <div className="flex items-center">
                    <h4 className="font-satoshi_bold text-xl">
                      {review.firstname} {review.lastname.charAt(0)}.
                    </h4>
                    <div className="pl-2">
                      {review.verified && (
                        <IoCheckmarkCircle className="text-xl text-green-600" />
                      )}
                    </div>
                  </div>
                  <p className="text-overflow-ellipsis max-h-[120px] overflow-hidden opacity-60">
                    {review.review}
                  </p>
                </div>
              </li>
            )
          })}
        </Slider>
      </div>
    </>
  )
}

export default CustomerReviews
