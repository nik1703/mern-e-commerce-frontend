import { useEffect, useState } from 'react'
import { useShopContext } from '../../context/ShopContext'
import Button from '../../components/Button'
import Modal from '../Modal'
import { NavLink } from 'react-router-dom'
import { FaStar } from 'react-icons/fa'

const UserOrders = () => {
  // context
  const {
    userData,
    setSidebarActive,
    query,
    setQuery,
    fetchReviews,
    fetchRefundOrders,
  } = useShopContext()
  // state
  const [currentProductId, setCurrentProductId] = useState('')
  const [userOrders, setUserOrders] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [rating, setRating] = useState(0)
  const [description, setDescription] = useState('')
  const [userReviews, setUserReviews] = useState([])

  // const [query, setQuery] = useState('')
  const [sortOrder, setSortOrder] = useState('newest')

  // variables
  const userId = userData._id

  const alreadyReviewed = (productId) =>
    userReviews.filter((review) => {
      return review.productId._id === productId
    })

  useEffect(() => {
    fetchReviewsByUser()
  }, [])

  const requestRefund = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:3002/orders/update-refund-status/${id}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ refundStatus: 'Requested' }),
        }
      )
      fetchOrder()
      fetchRefundOrders()
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  // filter Orders
  const filteredOrders = userOrders.filter((order) => {
    const searchQuery = query.toLowerCase()
    return (
      order._id.toLowerCase().includes(searchQuery) ||
      order.paymentMethod.toLowerCase().includes(searchQuery) ||
      order.status.toLowerCase().includes(searchQuery) ||
      order.totalAmount.toString().toLowerCase().includes(searchQuery) ||
      order.products.some((product) =>
        product.productId.title.toLowerCase().includes(searchQuery)
      ) ||
      order.products.some((product) =>
        product.productId.type.toLowerCase().includes(searchQuery)
      ) ||
      order.products.some((product) =>
        product.productId.style.toLowerCase().includes(searchQuery)
      ) ||
      new Date(order.createdAt)
        .toLocaleDateString()
        .toLowerCase()
        .includes(searchQuery) ||
      new Date(order.updatedAt)
        .toLocaleDateString()
        .toLowerCase()
        .includes(searchQuery)
    )
  })

  // sort reviews
  const sortedOrders = [...filteredOrders].sort((a, b) => {
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

  // fetch all reviews from user
  const fetchReviewsByUser = async () => {
    try {
      const response = await fetch(`http://localhost:3002/reviews/${userId}`)
      const data = await response.json()
      setUserReviews(data)
      console.log(data)
    } catch (error) {
      console.error('Error fetching orders', error.message)
    }
  }

  // send review
  const sendReview = async (description, rating) => {
    try {
      const response = await fetch('http://localhost:3002/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          review: description,
          stars: rating,
          createdBy: userId,
          productId: currentProductId,
        }),
      })
      fetchReviews()
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      fetchReviewsByUser()
      const data = await response.json()
      console.log('Review submitted successfully:', data)
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error)
    }
  }

  const handleClick = (id) => {
    setShowModal(true)
    setCurrentProductId(id)
  }

  const handleClose = () => {
    setShowModal(false)
    setRating(0)
    setDescription('')
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    sendReview(description, rating)
    fetchReviewsByUser()
    fetchReviews()
    console.log(rating, description, e.target)
    setShowModal(false)
    setRating(0)
    setDescription('')
  }

  const actionbar = (
    <div>
      <Button onClick={handleClose} danger>
        Cancel Review
      </Button>
    </div>
  )
  const fetchOrder = async () => {
    const response = await fetch(
      `http://localhost:3002/orders/myorders/${userId}`
    )
    const data = await response.json()
    setUserOrders(data.userOrders)
  }
  useEffect(() => {
    fetchOrder()
  }, [])
  console.log(sortedOrders)

  return (
    <div className="scroll font-satoshi_regular">
      <h2 className="my-6 text-2xl font-bold">My Orders</h2>
      <div className="h-[45rem] space-y-4 overflow-y-auto rounded-lg bg-background p-4 md:p-8">
        {/* searchbar */}
        <div className=" rounded-lg  ">
          <div className="flex w-full flex-row justify-between">
            <form className=" w-3/4 lg:w-1/3" name="searchbar">
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
              </select>
            </div>
          </div>
        </div>

        {sortedOrders.length === 0 ? (
          <p>No orders yet</p>
        ) : (
          sortedOrders.map((order, index) => (
            // all orders of the user

            <div key={order._id} className="rounded-md  border-2">
              <div className=" flex flex-wrap items-center justify-center gap-4 rounded-md border-2 border-black p-2 px-4 sm:flex-row lg:justify-between ">
                <p>Order Date: {order.createdAt.slice(0, 10)}</p>
                <p>Total: {order.totalAmount}$</p>
                <p>Status: {order.status}</p>
                {!order.refundStatus && (
                  <button
                    className="text rounded-md bg-black p-2 text-white"
                    onClick={() => {
                      requestRefund(order._id)
                    }}
                  >
                    Refund
                  </button>
                )}

                {order.refundStatus && (
                  <button
                    className={`text rounded-md ${order.refundStatus === 'Confirmed' && `bg-green-500 text-white`} ${order.refundStatus === 'Denied' && `bg-red-500 text-white`} p-2 text-black`}
                  >
                    Refund {order.refundStatus}
                  </button>
                )}
              </div>

              {/* all products of the order */}
              <div className="flex flex-wrap justify-center gap-2 p-2 px-4 lg:justify-start">
                {order.products.map((product) => (
                  <div
                    key={product.productId._id}
                    className="flex flex-col flex-wrap items-center gap-2"
                  >
                    <NavLink
                      to={`/product/${product.productId._id}`}
                      className=""
                    >
                      <h3 className="font-satoshi_bold text-base md:text-lg">
                        {product.productId.title}
                      </h3>
                    </NavLink>
                    <NavLink
                      to={`/product/${product.productId._id}`}
                      className=""
                    >
                      <img
                        src={product.productId.mainImage}
                        alt={product.productId.title}
                        className="flex h-36 flex-wrap items-center"
                        key={product._id}
                      />
                    </NavLink>

                    {/* product Price */}
                    <div className="">
                      {product.productId.isDiscounted ? (
                        <div className="flex flex-row items-center">
                          <span className="font-satoshi_bold text-lg md:text-xl">
                            ${product.productId.discountedPrice}
                          </span>
                          <span className="px-2 font-satoshi_bold text-lg line-through opacity-40 md:text-xl">
                            ${product.productId.price}
                          </span>
                          <span className="rounded-xl bg-[#FF3333] bg-opacity-10 px-1 py-1 text-xs text-red-500 md:px-3">
                            -{product.productId.discountPercentage}%
                          </span>
                        </div>
                      ) : (
                        <p className="font-satoshi_bold text-lg md:text-xl">
                          ${product.productId.price}
                        </p>
                      )}
                    </div>

                    {/* stars */}
                    <div className="">
                      <p className="flex flex-row items-center font-satoshi_regular text-xs md:text-sm">
                        {[...Array(product.productId.stars)].map(
                          (star, index) => {
                            return (
                              <FaStar
                                key={index}
                                className="mr-1 text-yellow-400"
                              />
                            )
                          }
                        )}{' '}
                        {product.productId.stars}/5{' '}
                      </p>
                    </div>
                    {alreadyReviewed(product.productId._id).length > 0 ? (
                      <Button
                        key={product.productId._id}
                        secondary
                        onClick={() => {
                          handleClick(product.productId._id)
                          setSidebarActive('reviews')
                          setQuery(product.productId._id)
                        }}
                        disabled={false}
                        className="min-w-44 cursor-auto"
                      >
                        Go to Review
                      </Button>
                    ) : (
                      <Button
                        key={product.productId._id}
                        primary
                        className="min-w-44"
                        onClick={() => handleClick(product.productId._id)}
                      >
                        Write a review
                      </Button>
                    )}
                  </div>
                ))}
              </div>
              {showModal && (
                <Modal onClose={handleClose} actionbar={actionbar}>
                  <div className="flex  flex-col items-center gap-8 text-center font-satoshi_regular text-lg">
                    <h5 className="font-integral_cf">
                      Schreibe ein Review zum Produkt.{' '}
                    </h5>
                    <form
                      onSubmit={handleSubmit}
                      className="flex flex-col items-center gap-4"
                    >
                      <textarea
                        id="description"
                        name="description"
                        rows="4"
                        cols="50"
                        placeholder="Enter your text here"
                        className=" w-full rounded-md border-2 border-gray-300 p-2 outline-2 lg:w-max"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      ></textarea>
                      {/* <Stars /> */}
                      <div>
                        {[1, 2, 3, 4, 5].map((star, index) => {
                          return (
                            <span
                              className="start cursor-pointer text-3xl"
                              key={index}
                              style={{
                                color: rating >= star ? 'gold' : 'gray',
                              }}
                              onClick={() => {
                                setRating(star)
                              }}
                            >
                              {' '}
                              ★{' '}
                            </span>
                          )
                        })}
                      </div>
                      <Button primary>Send</Button>
                    </form>
                  </div>
                </Modal>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default UserOrders
