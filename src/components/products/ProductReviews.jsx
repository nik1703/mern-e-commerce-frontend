import { PiSlidersLight } from 'react-icons/pi'
import { FaChevronDown } from 'react-icons/fa'
import { useState, useEffect } from 'react'
// import { reviews } from '../../data/reviews'
import { FaStar } from 'react-icons/fa'
import { IoCheckmarkCircle } from 'react-icons/io5'
import { BsThreeDots } from 'react-icons/bs'
import { useShopContext } from '../../context/ShopContext'
import { useParams } from 'react-router-dom'

const ProductReviews = () => {
  const { reviews } = useShopContext()
  const { id: productId } = useParams()
  const [width, setWidth] = useState(window.innerWidth)
  const [displayCount, setDisplayCount] = useState(width >= 768 ? 6 : 3)

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth)
    }
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setDisplayCount(3)
      } else {
        setDisplayCount(6)
      }
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const filteredReviews = reviews.filter(
    (review) => review.productId._id === productId
  )
  console.log(filteredReviews, productId)

  return (
    <>
      {filteredReviews.length > 0 ? (
        <section className="mb-16 mt-10">
          <div className="flex flex-row justify-between">
            <div className="flex flex-row items-center justify-center gap-2">
              <h5 className="font-satoshi_bold text-xl md:text-2xl">
                All Reviews
              </h5>
              <span className="self-center font-satoshi_regular text-sm text-black/60 md:text-base">
                ({filteredReviews.length})
              </span>
            </div>
            <div className="flex flex-row md:gap-2.5">
              <button className="rounded-full bg-[#F0F0F0] p-2 text-xl md:p-3 md:text-2xl">
                <PiSlidersLight />
              </button>
              {width >= 768 && (
                <button className="flex flex-row justify-center rounded-full bg-[#F0F0F0] px-5 py-3 font-satoshi_medium text-base">
                  <p>Latest</p> <FaChevronDown className="self-center pl-1" />
                </button>
              )}
              <button className="rounded-full bg-black px-4 py-2 font-satoshi_medium text-xs text-white md:px-7 md:py-3 md:text-base">
                Write a Review
              </button>
            </div>
          </div>
          <div className="mt-6 flex flex-row flex-wrap">
            {filteredReviews.slice(0, displayCount).map((review) => {
              // stars

              const sterne = [...Array(review.stars)].map((_, index) => {
                return (
                  <FaStar
                    key={`${review.id}_${index}`}
                    className="mr-1 text-yellow-400"
                  />
                )
              })

              // cardcomponent
              return (
                <div key={review._id} className="min-w-[100px] md:w-1/2">
                  <div className="mx-2 mb-5 flex flex-col items-start space-y-3 rounded-2xl border border-black/10 px-8 pb-4 pt-7 font-satoshi_regular text-base md:h-[295px] lg:h-[240px] xl:pb-2">
                    <div className="flex w-full flex-row justify-between">
                      <div className="flex text-lg">{sterne}</div>
                      <button className="text-xl">
                        <BsThreeDots />
                      </button>
                    </div>
                    <div className="flex items-center">
                      <h4 className="font-satoshi_bold text-xl">
                        {review.createdBy.first_name}{' '}
                        {review.createdBy.last_name.charAt(0)}.
                      </h4>
                      <div className="pl-2">
                        {review.verified && (
                          <IoCheckmarkCircle className="text-xl text-green-600" />
                        )}
                      </div>
                    </div>
                    <p className="  opacity-60">"{review.review}"</p>
                    <p className="font-satoshi_medium text-base text-black/40">
                      Posted on {review.createdAt.slice(0, 10)}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
          {displayCount >= filteredReviews.length && width >= 768 ? (
            <div className="mt-5 flex justify-center">
              <button
                className="font-base rounded-full border-2 px-11 py-4 font-satoshi_medium"
                onClick={() => setDisplayCount(6)}
              >
                Show Less
              </button>
            </div>
          ) : (
            filteredReviews.length > 6 &&
            width >= 768 && (
              <div className="mt-5 flex justify-center">
                <button
                  className="font-base rounded-full border-2 px-11 py-4 font-satoshi_medium"
                  onClick={() => setDisplayCount(displayCount + 4)}
                >
                  Load More Reviews
                </button>
              </div>
            )
          )}
          {displayCount >= filteredReviews.length && width < 768 ? (
            <div className="mt-5 flex justify-center">
              <button
                className="font-base rounded-full border-2 px-11 py-4 font-satoshi_medium"
                onClick={() => setDisplayCount(3)}
              >
                Show Less
              </button>
            </div>
          ) : (
            filteredReviews.length > 3 &&
            width < 768 && (
              <div className="mt-5 flex justify-center">
                <button
                  className="font-base rounded-full border-2 px-11 py-4 font-satoshi_medium"
                  onClick={() => setDisplayCount(displayCount + 2)}
                >
                  Load More Reviews
                </button>
              </div>
            )
          )}
        </section>
      ) : (
        <section className="mb-16 mt-10">
          <div className="flex justify-center text-xl">
            <h4 className="font-satoshi_regular">No Reviews yet</h4>
          </div>
          <div className="mt-14 flex justify-center">
            <button className="rounded-full border-2 bg-black px-10 py-4 font-satoshi_medium text-xl text-white">
              Write a Review
            </button>
          </div>
        </section>
      )}
    </>
  )
}

export default ProductReviews
