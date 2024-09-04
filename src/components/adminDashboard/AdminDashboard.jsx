import { useState, useEffect } from 'react'
import moment from 'moment'

// Icons
import { BsThreeDots } from 'react-icons/bs'
import { FaShoppingCart } from 'react-icons/fa'
import { FaDollarSign } from 'react-icons/fa'
import { FaUsers } from 'react-icons/fa'

const AdminDashboard = () => {
  const [salesDropdownOpen, setSalesDropdownOpen] = useState(false)
  const [salesSelectedTime, setSalesSelectedTime] = useState('Today')
  const [revenueDropdownOpen, setRevenueDropdownOpen] = useState(false)
  const [revenueSelectedTime, setRevenueSelectedTime] = useState('Today')
  const [customersDropdownOpen, setCustomersDropdownOpen] = useState(false)
  const [customersSelectedTime, setCustomersSelectedTime] = useState('Today')
  const [customers, setCustomers] = useState([])
  const [orders, setOrders] = useState([])
  const [totalQuantity, setTotalQuantity] = useState(0)
  const [totalRevenue, setTotalRevenue] = useState(0)
  const [uniqueCustomers, setUniqueCustomers] = useState(new Set())

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:3002/user/')
      const data = await response.json()
      setCustomers(data)
    } catch (error) {
      console.error('Error fetching users', error.message)
    }
  }

  const fetchOrders = async () => {
    try {
      const response = await fetch('http://localhost:3002/orders/admin')
      const data = await response.json()
      setOrders(data)
    } catch (error) {
      console.error('Error fetching orders', error.message)
    }
  }

  useEffect(() => {
    fetchUsers()
    fetchOrders()
  }, [])

  function formatDate(date) {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    return `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`
  }

  // Set totalQuantity based on salesSelectedTime
  useEffect(() => {
    let filteredOrders = []

    const today = new Date()
    const formattedToday = formatDate(today)

    switch (salesSelectedTime) {
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

    setTotalQuantity(newTotalQuantity)
  }, [salesSelectedTime, orders])

  // Set totalRevenue based on revenueSelectedTime
  useEffect(() => {
    let filteredOrders = []

    const today = new Date()
    const formattedToday = formatDate(today)

    switch (revenueSelectedTime) {
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

    const newTotalRevenue = filteredOrders.reduce((total, order) => {
      return total + order.totalAmount
    }, 0)

    setTotalRevenue(newTotalRevenue)
  }, [revenueSelectedTime, orders])

  // Set uniqueCustomers based on customersSelectedTime
  useEffect(() => {
    let filteredOrders = []

    const today = new Date()
    const formattedToday = formatDate(today)

    switch (customersSelectedTime) {
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

    let newUniqueCustomers = new Set()

    filteredOrders.forEach((order) => {
      newUniqueCustomers.add(order.user)
    })

    setUniqueCustomers(newUniqueCustomers)
  }, [customersSelectedTime, orders])

  let sortedOrders = orders.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  )
  let recentOrders = sortedOrders.slice(0, 5)

  return (
    <>
      <div>
        <div className="flex flex-row items-center justify-start">
          <h3 className="font-satoshi_regular text-2xl font-bold">
            Admin Dashboard
          </h3>
        </div>
        <div className="rounded-lg bg-background py-8 md:mt-5 md:px-4 lg:px-16">
          <div className="m-2 flex w-full flex-row flex-wrap justify-between gap-5 font-satoshi_regular lg:px-10">
            <div className="flex min-w-[13rem] max-w-[30rem] flex-shrink flex-grow flex-col items-center gap-2 rounded-xl border-2 border-gray-200 p-3 md:p-4">
              <div className="flex w-full items-center justify-between gap-2">
                <div className="flex gap-1 md:gap-2">
                  <h3 className="text-lg font-bold md:text-xl">Sales</h3>
                  <p className="text-lg">| {salesSelectedTime}</p>
                </div>
                <div
                  className="relative flex w-[4rem] cursor-pointer justify-end px-3 py-2"
                  onClick={() => setSalesDropdownOpen(!salesDropdownOpen)}
                  onBlur={() =>
                    setTimeout(() => setSalesDropdownOpen(false), 300)
                  }
                  tabIndex="0"
                >
                  <BsThreeDots />
                  <div
                    className={`absolute right-0 top-4 z-50 mt-2 flex flex-col  items-center justify-start font-satoshi_regular ${salesDropdownOpen ? ' block h-full w-full' : 'hidden h-0 w-0'}`}
                  >
                    <ul
                      className={`flex w-full flex-col items-start justify-center rounded-md bg-white hover:cursor-pointer `}
                    >
                      <li
                        className="w-full px-2 py-1 hover:rounded-md hover:bg-gray-50"
                        onClick={() => setSalesSelectedTime('Today')}
                      >
                        Today
                      </li>
                      <li
                        className="w-full px-2 py-1 hover:rounded-md hover:bg-gray-50"
                        onClick={() => setSalesSelectedTime('Month')}
                      >
                        Month
                      </li>
                      <li
                        className="w-full px-2 py-1 hover:rounded-md hover:bg-gray-50"
                        onClick={() => setSalesSelectedTime('Year')}
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
            <div className="flex min-w-[13rem] max-w-[30rem] flex-shrink flex-grow flex-col items-center gap-2 rounded-xl border-2 border-gray-200 p-3 md:p-4">
              <div className="flex w-full items-center justify-between gap-2">
                <div className="flex gap-1 md:gap-2">
                  <h3 className="text-lg font-bold md:text-xl">Revenue</h3>
                  <p className="text-lg">| {revenueSelectedTime}</p>
                </div>
                <div
                  className="relative flex w-[4rem] cursor-pointer justify-end px-3 py-2"
                  onClick={() => setRevenueDropdownOpen(!revenueDropdownOpen)}
                  onBlur={() =>
                    setTimeout(() => setRevenueDropdownOpen(false), 300)
                  }
                  tabIndex="0"
                >
                  <BsThreeDots />
                  <div
                    className={`absolute right-0 top-4 z-50 mt-2 flex flex-col  items-center justify-start font-satoshi_regular ${revenueDropdownOpen ? ' block h-full w-full' : 'hidden h-0 w-0'}`}
                  >
                    <ul
                      className={`flex w-full flex-col items-start justify-center rounded-md bg-white hover:cursor-pointer `}
                    >
                      <li
                        className="w-full px-2 py-1 hover:rounded-md hover:bg-gray-50"
                        onClick={() => setRevenueSelectedTime('Today')}
                      >
                        Today
                      </li>
                      <li
                        className="w-full px-2 py-1 hover:rounded-md hover:bg-gray-50"
                        onClick={() => setRevenueSelectedTime('Month')}
                      >
                        Month
                      </li>
                      <li
                        className="w-full px-2 py-1 hover:rounded-md hover:bg-gray-50"
                        onClick={() => setRevenueSelectedTime('Year')}
                      >
                        Year
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="flex w-full items-center gap-8 py-3">
                <div className="rounded-2xl bg-green-400/20 p-3">
                  <FaDollarSign className="text-4xl text-green-900" />
                </div>
                <div>
                  <p className="text-3xl font-bold">${totalRevenue}</p>
                </div>
              </div>
            </div>
            <div className="flex min-w-[13rem] max-w-[30rem] flex-shrink flex-grow flex-col items-center gap-2 rounded-xl border-2 border-gray-200 p-3 md:p-4">
              <div className="flex w-full items-center justify-between gap-0 md:gap-2">
                <div className="flex  gap-1 md:gap-2">
                  <h3 className="text-lg font-bold md:text-xl">Customers</h3>
                  <p className="text-lg">| {customersSelectedTime}</p>
                </div>
                <div
                  className="relative flex w-[4rem] cursor-pointer justify-end px-3 py-2"
                  onClick={() =>
                    setCustomersDropdownOpen(!customersDropdownOpen)
                  }
                  onBlur={() =>
                    setTimeout(() => setCustomersDropdownOpen(false), 300)
                  }
                  tabIndex="0"
                >
                  <BsThreeDots />
                  <div
                    className={`absolute right-0 top-4 z-50 mt-2 flex flex-col items-center justify-start font-satoshi_regular ${customersDropdownOpen ? ' block h-full w-full' : 'hidden h-0 w-0'}`}
                  >
                    <ul
                      className={`flex w-full flex-col items-start justify-center rounded-md bg-white hover:cursor-pointer `}
                    >
                      <li
                        className="w-full px-2 py-1 hover:rounded-md hover:bg-gray-50"
                        onClick={() => setCustomersSelectedTime('Today')}
                      >
                        Today
                      </li>
                      <li
                        className="w-full px-2 py-1 hover:rounded-md hover:bg-gray-50"
                        onClick={() => setCustomersSelectedTime('Month')}
                      >
                        Month
                      </li>
                      <li
                        className="w-full px-2 py-1 hover:rounded-md hover:bg-gray-50"
                        onClick={() => setCustomersSelectedTime('Year')}
                      >
                        Year
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
                  <p className="text-3xl font-bold">{uniqueCustomers.size}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-10 w-full font-satoshi_regular lg:px-10">
            <div className="flex flex-col items-start gap-2 rounded-xl border-2 border-gray-200 p-3 md:p-4">
              <h3 className="text-xl font-bold">Recent Activity</h3>
              <div>
                <ul>
                  {recentOrders.map((order) => (
                    <li key={order._id} className="my-2">
                      {moment(order.createdAt).fromNow()},{' '}
                      <span className="font-semibold">
                        {order.products.reduce(
                          (total, product) => total + product.quantity,
                          0
                        )}{' '}
                        Product
                        {order.products.reduce(
                          (total, product) => total + product.quantity,
                          0
                        ) > 1
                          ? 's'
                          : ''}
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
    </>
  )
}

export default AdminDashboard
