import { useState, useEffect } from 'react'
import moment from 'moment'
import { useShopContext } from '../../context/ShopContext'

// Icons
import { BsThreeDots } from 'react-icons/bs'
import { FaShoppingCart } from 'react-icons/fa'
import { FaStar } from 'react-icons/fa'
import { FaUsers } from 'react-icons/fa'

const UserDashboard = () => {
  const { userData } = useShopContext()
  const [ordersDropdownOpen, setOrdersDropdownOpen] = useState(false)
  const [ordersSelectedTime, setOrdersSelectedTime] = useState('Today')

  const [reviewsDropdownOpen, setReviewsDropdownOpen] = useState(false)
  const [reviewsSelectedTime, setReviewsSelectedTime] = useState('Today')

  const [lastOrderDropdownOpen, setLastOrderDropdownOpen] = useState(false)
  const [lastOrderSelectedTime, setLastOrderSelectedTime] = useState('Status')

  const [orders, setOrders] = useState([])
  const [userReview, setUserReview] = useState([])
  const [lastOrder, setLastOrder] = useState('')

  const [totalQuantity, setTotalQuantity] = useState(0)
  const [totalReviews, setTotalReviews] = useState(0)

  console.log(userData)

  // fetch all orders from user
  const fetchOrders = async () => {
    const userId = userData._id
    try {
      const response = await fetch(
        `http://localhost:3002/orders/myorders/${userId}`
      )
      const data = await response.json()
      console.log(data)
      setOrders(data.userOrders)
      console.log(data.userOrders)
    } catch (error) {
      console.error('Error fetching orders', error.message)
    }
  }

  // fetch all reviews from user
  const fetchReviews = async () => {
    const userId = userData._id

    try {
      const response = await fetch(`http://localhost:3002/reviews/${userId}`)
      const data = await response.json()
      setUserReview(data)
      console.log(data)
    } catch (error) {
      console.error('Error fetching orders', error.message)
    }
  }

  useEffect(() => {
    fetchOrders()
    fetchReviews()
  }, [])

  function formatDate(date) {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    return `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`
  }

  // Set totalOrders based on ordersSelectedTime
  useEffect(() => {
    let filteredOrders = []

    const today = new Date()
    const formattedToday = formatDate(today)

    switch (ordersSelectedTime) {
      case 'Today':
        filteredOrders = orders.filter((order) => {
          const orderDate = new Date(order.createdAt)
          return formatDate(orderDate) === formattedToday
        })
        break
      case 'Month':
        filteredOrders = orders.filter((order) => {
          const orderDate = new Date(order.createdAt)
          return (
            formatDate(orderDate).slice(0, 7) === formattedToday.slice(0, 7)
          )
        })
        break
      case 'Year':
        filteredOrders = orders.filter((order) => {
          const orderDate = new Date(order.createdAt)
          return (
            formatDate(orderDate).slice(0, 4) === formattedToday.slice(0, 4)
          )
        })
        break
    }

    const newTotalQuantity = filteredOrders.reduce((total, order) => {
      return (
        total +
        order.products.reduce(
          (orderTotal, product) => orderTotal + product.quantity,
          0
        )
      )
    }, 0)

    console.log(filteredOrders)
    setTotalQuantity(newTotalQuantity)
  }, [ordersSelectedTime, orders])

  // Set totalReviews based on reviewsSelectedTime
  useEffect(() => {
    let filteredReviews = []

    const today = new Date()
    const formattedToday = formatDate(today)

    switch (reviewsSelectedTime) {
      case 'Today':
        filteredReviews = userReview.filter((review) => {
          const reviewDate = new Date(review.createdAt)
          return formatDate(reviewDate) === formattedToday
        })
        break
      case 'Month':
        filteredReviews = userReview.filter((review) => {
          const reviewDate = new Date(review.createdAt)
          return (
            formatDate(reviewDate).slice(0, 7) === formattedToday.slice(0, 7)
          )
        })
        break
      case 'Year':
        filteredReviews = userReview.filter((review) => {
          const reviewDate = new Date(review.createdAt)
          return (
            formatDate(reviewDate).slice(0, 4) === formattedToday.slice(0, 4)
          )
        })
        break
    }

    console.log(filteredReviews)

    const reviewCount = filteredReviews.length

    setTotalReviews(reviewCount)
  }, [userReview, reviewsSelectedTime])

  // Set lastOrder based on lastOrderSelectedTime
  useEffect(() => {
    if (orders.length === 0) return

    // Sort orders by createdAt date in descending order
    let sortedOrders = orders.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    )

    // Get the most recent order
    let recentOrder = sortedOrders[0]

    // Set the status or price based on the selected time
    switch (lastOrderSelectedTime) {
      case 'Status':
        setLastOrder(recentOrder.status)
        break
      case 'Price':
        setLastOrder(`${recentOrder.totalAmount}$`)
        break
      default:
        break
    }
  }, [orders, lastOrderSelectedTime])

  let sortedOrders = orders.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  )
  let recentOrders = sortedOrders.slice(0, 5)
  console.log(recentOrders)

  return (
    <>
      <div className=" font-satoshi_regular">
        {/* Heading */}
        <h2 className="my-6 text-2xl font-bold">User Dashboard</h2>
        <div className=" h-[45rem]  items-center justify-start space-y-4 overflow-y-auto rounded-lg bg-background p-4 md:p-8">
          <div className="  ">
            <div className=" flex w-full flex-row flex-wrap justify-between gap-5 font-satoshi_regular ">
              <div className="flex min-w-[13rem] max-w-[30rem] flex-shrink flex-grow flex-col items-center gap-2 rounded-xl border-2 border-gray-200 p-3 md:p-4">
                <div className="flex w-full items-center justify-between gap-2">
                  <div className="flex gap-1 md:gap-2">
                    <h3 className="text-lg font-bold md:text-xl">My Orders</h3>
                    <p className="text-lg">| {ordersSelectedTime}</p>
                  </div>
                  <div
                    className="relative flex w-[4rem] cursor-pointer justify-end px-3 py-2"
                    onClick={() => setOrdersDropdownOpen(!ordersDropdownOpen)}
                    onBlur={() =>
                      setTimeout(() => setOrdersDropdownOpen(false), 300)
                    }
                    tabIndex="0"
                  >
                    <BsThreeDots />
                    <div
                      className={`absolute right-0 top-4 z-50 mt-2 flex flex-col  items-center justify-start font-satoshi_regular ${ordersDropdownOpen ? ' block h-full w-full' : 'hidden h-0 w-0'}`}
                    >
                      <ul
                        className={`flex w-full flex-col items-start justify-center rounded-md bg-white hover:cursor-pointer `}
                      >
                        <li
                          className="w-full px-2 py-1 hover:rounded-md hover:bg-gray-50"
                          onClick={() => setOrdersSelectedTime('Today')}
                        >
                          Today
                        </li>
                        <li
                          className="w-full px-2 py-1 hover:rounded-md hover:bg-gray-50"
                          onClick={() => setOrdersSelectedTime('Month')}
                        >
                          Month
                        </li>
                        <li
                          className="w-full px-2 py-1 hover:rounded-md hover:bg-gray-50"
                          onClick={() => setOrdersSelectedTime('Year')}
                        >
                          Year
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="flex w-full items-center gap-8 py-3">
                  <div className="rounded-2xl bg-blue-400/20 p-3">
                    <FaShoppingCart className="text-4xl text-blue-900" />
                  </div>
                  <div>
                    <p className="text-3xl font-bold">{totalQuantity}</p>
                  </div>
                </div>
              </div>
              {/* My Reviews */}
              <div className="flex min-w-[13rem] max-w-[30rem] flex-shrink flex-grow flex-col items-center gap-2 rounded-xl border-2 border-gray-200 p-3 md:p-4">
                <div className="flex w-full items-center justify-between gap-2">
                  <div className="flex gap-1 md:gap-2">
                    <h3 className="text-lg font-bold md:text-xl">My Reviews</h3>
                    <p className="text-lg">| {reviewsSelectedTime}</p>
                  </div>
                  <div
                    className="relative flex w-[4rem] cursor-pointer justify-end px-3 py-2"
                    onClick={() => setReviewsDropdownOpen(!reviewsDropdownOpen)}
                    onBlur={() =>
                      setTimeout(() => setReviewsDropdownOpen(false), 300)
                    }
                    tabIndex="0"
                  >
                    <BsThreeDots />
                    <div
                      className={`absolute right-0 top-4 z-50 mt-2 flex flex-col  items-center justify-start font-satoshi_regular ${reviewsDropdownOpen ? ' block h-full w-full' : 'hidden h-0 w-0'}`}
                    >
                      <ul
                        className={`flex w-full flex-col items-start justify-center rounded-md bg-white hover:cursor-pointer `}
                      >
                        <li
                          className="w-full px-2 py-1 hover:rounded-md hover:bg-gray-50"
                          onClick={() => setReviewsSelectedTime('Today')}
                        >
                          Today
                        </li>
                        <li
                          className="w-full px-2 py-1 hover:rounded-md hover:bg-gray-50"
                          onClick={() => setReviewsSelectedTime('Month')}
                        >
                          Month
                        </li>
                        <li
                          className="w-full px-2 py-1 hover:rounded-md hover:bg-gray-50"
                          onClick={() => setReviewsSelectedTime('Year')}
                        >
                          Year
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="flex w-full items-center gap-8 py-3">
                  <div className="rounded-2xl bg-yellow-200/20 p-3">
                    <FaStar className="text-4xl text-yellow-400" />
                  </div>
                  <div>
                    <p className="text-3xl font-bold">{totalReviews}</p>
                  </div>
                </div>
              </div>
              {/* Last Order */}
              <div className="flex min-w-[13rem] max-w-[30rem] flex-shrink flex-grow flex-col items-center gap-2 rounded-xl border-2 border-gray-200 p-3 md:p-4">
                <div className="flex w-full items-center justify-between gap-0 md:gap-2">
                  <div className="flex  gap-1 md:gap-2">
                    <h3 className="text-lg font-bold md:text-xl">Last Order</h3>
                    <p className="text-lg">| {lastOrderSelectedTime}</p>
                  </div>
                  <div
                    className="relative flex w-[4rem] cursor-pointer justify-end px-3 py-2"
                    onClick={() =>
                      setLastOrderDropdownOpen(!lastOrderDropdownOpen)
                    }
                    onBlur={() =>
                      setTimeout(() => setLastOrderDropdownOpen(false), 300)
                    }
                    tabIndex="0"
                  >
                    <BsThreeDots />
                    <div
                      className={`absolute right-0 top-4 z-50 mt-2 flex flex-col items-center justify-start font-satoshi_regular ${lastOrderDropdownOpen ? ' block h-full w-full' : 'hidden h-0 w-0'}`}
                    >
                      <ul
                        className={`flex w-full flex-col items-start justify-center rounded-md bg-white hover:cursor-pointer `}
                      >
                        <li
                          className="w-full px-2 py-1 hover:rounded-md hover:bg-gray-50"
                          onClick={() => setLastOrderSelectedTime('Status')}
                        >
                          Status
                        </li>
                        <li
                          className="w-full px-2 py-1 hover:rounded-md hover:bg-gray-50"
                          onClick={() => setLastOrderSelectedTime('Price')}
                        >
                          Price
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="flex w-full items-center gap-8 py-3">
                  <div className="rounded-2xl bg-orange-400/20 p-3">
                    <FaUsers className="text-4xl text-orange-900" />
                  </div>
                  <div>
                    <p className="text-3xl font-bold">{lastOrder}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="mt-10 w-full font-satoshi_regular ">
              <div className="flex flex-col items-start gap-2 rounded-xl border-2 border-gray-200 p-3 md:p-4">
                <h3 className="text-xl font-bold">Recent Activity</h3>
                <div>
                  <ul>
                    {recentOrders.map((order) => (
                      <li key={order._id} className="my-2">
                        {moment(order.createdAt).fromNow()},{' '}
                        <span className="font-semibold">
                          {order.products.length} Product
                          {order.products.length > 1 ? 's' : ''}
                        </span>{' '}
                        {order.products.length > 1 ? 'were' : 'was'} ordered for
                        {order.products.length > 1
                          ? ' a total amount of'
                          : ' an amount of'}{' '}
                        <span className="font-semibold">
                          {' '}
                          ${order.totalAmount}
                        </span>{' '}
                        | Current Status:{' '}
                        <span className="font-semibold">{order.status}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default UserDashboard
