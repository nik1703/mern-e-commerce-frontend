import { useEffect, useState } from 'react'
import { useShopContext } from '../../context/ShopContext'
import { NavLink } from 'react-router-dom'
import RatingReview from '../RatingReview'

// Icons
import { IoCheckmarkCircle } from 'react-icons/io5'
import { FaStar } from 'react-icons/fa'
import Button from '../Button'

const UserReviews = () => {
  const { userData, query, setQuery, fetchReviews } = useShopContext()
  const [reviews, setReviews] = useState([])

  const [editingReviewId, setEditingReviewId] = useState(null)
  const [newReview, setNewReview] = useState('')
  const [newRating, setNewRating] = useState(0)
  const [sortOrder, setSortOrder] = useState('newest')
  const [submitTriggered, setSubmitTriggered] = useState(false)

  const handleEditClick = (review) => {
    setEditingReviewId(review._id)
    setNewReview(review.review)
    setNewRating(review.stars)
  }

  const handleSaveClick = (id) => {
    updateReviewById(id)
  }

  const fetchReviewsById = async () => {
    const userID = userData._id

    const response = await fetch(`http://localhost:3002/reviews/${userID}`)

    const data = await response.json()

    return setReviews(data)
  }

  const deleteReviewById = async (id) => {
    try {
      const response = await fetch(`http://localhost:3002/reviews/${id}`, {
        method: 'DELETE',
      })
      setSubmitTriggered(true)
      fetchReviews()

      if (response.ok) {
        console.log(reviews)
      } else {
        console.log('Failed to delete the review')
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  const updateReviewById = async (id) => {
    try {
      const response = await fetch(`http://localhost:3002/reviews/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ review: newReview, stars: newRating }),
      })
      setEditingReviewId(null)
      setSubmitTriggered(true)
      fetchReviews()

      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  useEffect(() => {
    fetchReviewsById()
  }, [])

  useEffect(() => {
    if (submitTriggered) {
      fetchReviewsById()
      setSubmitTriggered(false) // Setzen Sie den Submit-Zustand zurück
    }
  }, [submitTriggered])

  // filter reviews
  const filteredReviews = reviews.filter((review) => {
    const searchQuery = query.toLowerCase()
    return (
      review._id.toLowerCase().includes(searchQuery) ||
      review.review.toLowerCase().includes(searchQuery) ||
      review.productId.title.toLowerCase().includes(searchQuery) ||
      review.productId.type.toLowerCase().includes(searchQuery) ||
      review.productId.style.toLowerCase().includes(searchQuery) ||
      review.productId._id.toLowerCase().includes(searchQuery) ||
      new Date(review.createdAt)
        .toLocaleDateString()
        .toLowerCase()
        .includes(searchQuery) ||
      new Date(review.updatedAt)
        .toLocaleDateString()
        .toLowerCase()
        .includes(searchQuery)
    )
  })

  // sort reviews
  const sortedReviews = [...filteredReviews].sort((a, b) => {
    if (sortOrder === 'newest') {
      return new Date(b.createdAt) - new Date(a.createdAt)
    } else if (sortOrder === 'oldest') {
      return new Date(a.createdAt) - new Date(b.createdAt)
    } else if (sortOrder === 'highest') {
      return b.stars - a.stars
    } else if (sortOrder === 'lowest') {
      return a.stars - b.stars
    } else if (sortOrder === 'title-ascending') {
      return a.productId.title.localeCompare(b.productId.title)
    } else if (sortOrder === 'title-descending') {
      return b.productId.title.localeCompare(a.productId.title)
    }
  })

  const ProductCard = ({ product }) => {
    return (
      <NavLink to={`/product/${product._id}`}>
        <div className="flex flex-col gap-3 border-b pb-3 lg:w-1/2 lg:flex-row lg:border-none xl:w-96">
          <img
            src={product.mainImage}
            alt={product.title}
            className=" m-auto h-36 max-h-[300px] w-36  lg:h-32 lg:w-32 xl:h-40 xl:w-40"
          />

          <div className="space-y-3">
            <h3 className="font-satoshi_bold text-base md:text-lg">
              {product.title}
            </h3>

            <p className="flex flex-row items-center font-satoshi_regular text-xs md:text-sm">
              {[...Array(product.stars)].map((star, index) => {
                return <FaStar key={index} className="mr-1 text-yellow-400" />
              })}{' '}
              {product.stars}/5{' '}
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
        </div>
      </NavLink>
    )
  }

  return (
    <div className="scroll flex flex-col  font-satoshi_regular">
      <h2 className="my-6 text-2xl font-bold">My Reviews</h2>
      <div className="h-[45rem] space-y-4 overflow-y-auto rounded-lg bg-background p-4 md:p-8">
        <div className="rounded-lg ">
          <div className="flex w-full flex-row justify-between">
            {/* searchbar */}
            <form className=" w-3/4 lg:w-1/3">
              <input
                type="text"
                placeholder="Search Product"
                className="w-full rounded-xl border-2 border-slate-500/40 px-4 py-2"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value)
                }}
              />
            </form>
            {/* sort */}
            <div className="hidden pl-4 md:block lg:pl-0">
              <select
                className="relative flex w-full cursor-pointer items-center gap-2 rounded-xl border-2 border-slate-500/30 px-3 py-2"
                onChange={(e) => setSortOrder(e.target.value)}
                value={sortOrder}
              >
                <option value="newest">Newest first</option>
                <option value="oldest">Oldest first</option>
                <option value="highest">Highest rating</option>
                <option value="lowest">Lowest rating</option>
                <option value="title-ascending">Title A-Z</option>
                <option value="title-descending">Title Z-A</option>
              </select>
            </div>
          </div>
        </div>

        {sortedReviews.length > 0 ? (
          // stars
          sortedReviews.map((review) => {
            const stars = [...Array(review.stars)].map((star, index) => {
              return <FaStar key={index} className="mr-1 text-yellow-400" />
            })

            return (
              <div
                key={review._id}
                className="flex flex-col gap-8 rounded-md  border border-slate-500/30 p-4 px-4 py-2"
              >
                {/* product */}
                <div className="flex flex-col  items-center justify-center lg:flex-row ">
                  <ProductCard product={review.productId} />

                  {/* review */}
                  <div className="flex flex-col justify-between lg:w-1/2">
                    <div className="mx-2  mb-16  flex  flex-col items-start   space-y-3  rounded-2xl px-8 pt-7 font-satoshi_regular text-base ">
                      <div className="flex">
                        {editingReviewId === review._id ? (
                          <RatingReview
                            key={review._id}
                            rating={newRating}
                            setRating={setNewRating}
                          />
                        ) : (
                          stars
                        )}
                      </div>
                      <div className="flex  items-center">
                        <h4 className="font-satoshi_bold text-xl">
                          {review.createdBy.first_name}{' '}
                          {review.createdBy.last_name}
                        </h4>
                        <div className="pl-2">
                          {review.verified && (
                            <IoCheckmarkCircle className="text-xl text-green-600" />
                          )}
                        </div>
                      </div>
                      <div className="text-overflow-ellipsis max-h-[120px] overflow-hidden opacity-60">
                        {editingReviewId === review._id ? (
                          <textarea
                            value={newReview}
                            onChange={(e) => setNewReview(e.target.value)}
                            rows="5"
                            cols="50"
                          />
                        ) : (
                          <p>{review.review}</p>
                        )}
                      </div>
                    </div>
                    <div className=" flex justify-center gap-4">
                      {editingReviewId === review._id ? (
                        <Button
                          primary
                          onClick={() => {
                            handleSaveClick(review._id)
                          }}
                        >
                          Submit
                        </Button>
                      ) : (
                        <Button primary onClick={() => handleEditClick(review)}>
                          Edit
                        </Button>
                      )}
                      <Button
                        danger
                        onClick={() => deleteReviewById(review._id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>{' '}
              </div>
            )
          })
        ) : (
          <div>Keine Reviews vorhanden</div>
        )}
      </div>
    </div>
  )
}

export default UserReviews
