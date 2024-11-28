import { FaStar } from 'react-icons/fa'
import { useShopContext } from '../context/ShopContext'

const Card = ({ product }) => {
  const { reviews } = useShopContext()

  const filteredReviews = reviews.filter(
    (review) => review.productId._id === product._id
  )

  let totalStars = 0
  filteredReviews.forEach((review) => {
    totalStars += review.stars
  })

  let averageRating = filteredReviews.length
    ? totalStars / filteredReviews.length
    : 0

  if (isNaN(averageRating) || averageRating < 0) {
    averageRating = 0
  }

  return (
    <>
      <div>
        <img
          src={product.mainImage}
          alt={product.title}
          className="pointer-events-none max-h-[300px]"
        />
        <h3 className="pt-4 font-satoshi_bold text-base md:text-lg">
          {product.title}
        </h3>
        <p className="flex flex-row items-center font-satoshi_regular text-xs md:text-sm">
          {[...Array(Math.round(averageRating))].map((star, index) => {
            return <FaStar key={index} className="mr-1 text-yellow-400" />
          })}{' '}
          {averageRating.toFixed(0)}/5{' '}
        </p>
        {product.isDiscounted ? (
          <div className="flex flex-row items-center">
            <span className="font-satoshi_bold text-lg md:text-xl">
              ${product.discountedPrice}
            </span>
            <span className="px-2 font-satoshi_bold text-lg line-through opacity-40 md:text-xl">
              ${product.price}
            </span>
            <span className="rounded-xl bg-[#FF3333] bg-opacity-10 px-1 py-1 text-xs text-red-500 md:px-3">
              -{product.discountPercentage}%
            </span>
          </div>
        ) : (
          <p className="font-satoshi_bold text-lg md:text-xl">
            ${product.price}
          </p>
        )}
      </div>
    </>
  )
}

export default Card
