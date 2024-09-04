// import { products } from '../data/products'
import Card from './Card'
import { useRef, useState } from 'react'
import Slider from 'react-slick'
import React from 'react'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { useShopContext } from '../context/ShopContext'

import { Link, NavLink } from 'react-router-dom'

const CardList = () => {
  const { products } = useShopContext()
  const [isDragging, setIsDragging] = useState(false)
  let sliderRef = useRef(null)
  const play = () => {
    sliderRef.slickPlay()
  }
  const pause = () => {
    sliderRef.slickPause()
  }

  const settings = {
    dots: false,
    infinite: true,
    speed: 100,
    slidesToShow: 4,
    slidesToScroll: 1,
    initalSlide: 0,
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

  return (
    <>
      <section className="mx-14 lg:mx-24 ">
        {' '}
        <h2 className="mb-12 mt-16 text-center font-integral_cf text-3xl md:text-5xl">
          NEW ARRIVALS
        </h2>
        <div className="cursor-pointer overflow-hidden">
          <Slider
            ref={(slider) => (sliderRef = slider)}
            {...settings}
            className="mx-auto max-w-[80rem]"
          >
            {products
              .filter(
                (product, index) =>
                  index > 4 && index < 9
              )
              .map((product) => {
                return (
                  <div
                    key={product._id}
                    className="w-[300px] pr-2 md:w-[300px]"
                    onMouseDown={() => setIsDragging(false)}
                    onMouseMove={() => setIsDragging(true)}
                  >
                    <Link
                      to={`/product/${product._id}`}
                      className=""
                      draggable="false"
                      onClick={(event) => {
                        if (isDragging) {
                          event.preventDefault()
                          event.stopPropagation()
                        }
                      }}
                    >
                      <Card product={product} />
                    </Link>
                  </div>
                )
              })}
          </Slider>
        </div>
        <div className="flex justify-center">
          <button className="mb-16 mt-9 w-full rounded-full border-[1px] border-gray-300 px-20 py-3 font-satoshi_medium md:w-auto md:text-base">
            <NavLink to="/category"> View All</NavLink>
          </button>
        </div>
        <div className="flex justify-center">
          <div className="w-10/12 border-b-[1px] border-gray-300 text-center"></div>
        </div>
        <h2 className="mb-12 mt-16 text-center font-integral_cf text-3xl md:text-5xl">
          TOP SELLING
        </h2>
        <div className="overflow-hidden">
          <Slider
            ref={(slider) => (sliderRef = slider)}
            {...settings}
            className="mx-auto max-w-[80rem]"
          >
            {products
              .filter((product, index) => index < 4)
              .map((product) => {
                return (
                  <div
                    key={product._id}
                    className="w-[300px] pr-2 md:w-[300px]"
                    onMouseDown={() => setIsDragging(false)}
                    onMouseMove={() => setIsDragging(true)}
                  >
                    <Link
                      to={`/product/${product._id}`}
                      className=""
                      draggable="false"
                      onClick={(event) => {
                        if (isDragging) {
                          event.preventDefault()
                          event.stopPropagation()
                        }
                      }}
                    >
                      <Card product={product} />
                    </Link>
                  </div>
                )
              })}
          </Slider>
        </div>
        <div className="flex justify-center">
          <button className="mb-16 mt-9 w-full rounded-full border-[1px] border-gray-300 px-20 py-3 font-satoshi_medium md:w-auto md:text-base">
            <NavLink to="/category">View All</NavLink>
          </button>
        </div>
        <div className="flex justify-center"></div>
      </section>
    </>
  )
}

export default CardList
