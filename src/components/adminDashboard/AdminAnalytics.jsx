import { useState, useEffect } from 'react'
import AdminLineChart from './AdminLineChart'

// Icons
import { IoIosArrowDown } from 'react-icons/io'
import { FaArrowTrendUp } from 'react-icons/fa6'
import { FaArrowTrendDown } from 'react-icons/fa6'

const AdminAnalytics = () => {
  const [analyticsDropdownOpen, setAnalyticsDropdownOpen] = useState(false)
  const [analyticsSelectedTime, setAnalyticsSelectedTime] = useState('Today')
  const [orders, setOrders] = useState([])
  const [grossRevenue, setGrossRevenue] = useState(0)
  const [prevGrossRevenue, setPrevGrossRevenue] = useState(0)
  const [shippingCost, setShippingCost] = useState(0)
  const [prevShippingCost, setPrevShippingCost] = useState(0)
  const [taxesCost, setTaxesCost] = useState(0)
  const [prevTaxesCost, setPrevTaxesCost] = useState(0)
  const [netRevenue, setNetRevenue] = useState(0)
  const [prevNetRevenue, setPrevNetRevenue] = useState(0)
  const [refundCost, setRefundCost] = useState(0)
  const [prevRefundCost, setPrevRefundCost] = useState(0)
  const [discountCost, setDiscountCost] = useState(0)
  const [prevDiscountCost, setPrevDiscountCost] = useState(0)

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
    fetchOrders()
  }, [])

  function formatDate(date) {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    return `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`
  }

  useEffect(() => {
    let newCurrentOrders = []
    let newPreviousOrders = []

    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)

    const thisMonth = new Date(today.getFullYear(), today.getMonth(), 1)
    const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1)

    const thisYear = new Date(today.getFullYear(), 1, 1)
    const lastYear = new Date(today.getFullYear() - 1, 1, 1)

    switch (analyticsSelectedTime) {
      case 'Today':
        newCurrentOrders = orders.filter((order) => {
          const orderDate = new Date(order.createdAt)
          return formatDate(orderDate) === formatDate(today)
        })
        newPreviousOrders = orders.filter((order) => {
          const orderDate = new Date(order.createdAt)
          return (
            formatDate(orderDate) >= formatDate(yesterday) &&
            formatDate(orderDate) < formatDate(today)
          )
        })
        break
      case 'This Month':
        newCurrentOrders = orders.filter((order) => {
          const orderDate = new Date(order.createdAt)
          return orderDate >= thisMonth && orderDate < today
        })
        newPreviousOrders = orders.filter((order) => {
          const orderDate = new Date(order.createdAt)
          return orderDate >= lastMonth && orderDate < thisMonth
        })
        break
      case 'This Year':
        newCurrentOrders = orders.filter((order) => {
          const orderDate = new Date(order.createdAt)
          return orderDate >= thisYear && orderDate < today
        })
        newPreviousOrders = orders.filter((order) => {
          const orderDate = new Date(order.createdAt)
          return orderDate >= lastYear && orderDate < thisYear
        })
        break
    }

    const newGrossRevenue = newCurrentOrders.reduce(
      (acc, order) => acc + order.totalAmount,
      0
    )
    const newPreviousGrossRevenue = newPreviousOrders.reduce(
      (acc, order) => acc + order.totalAmount,
      0
    )

    const newShippingCost = newCurrentOrders.reduce(
      (acc, order) => acc + order.deliveryFee,
      0
    )
    const newPrevShippingCost = newPreviousOrders.reduce(
      (acc, order) => acc + order.deliveryFee,
      0
    )

    const newDiscountCost = newCurrentOrders.reduce(
      (acc, order) => acc + order.totalDiscount,
      0
    )

    const newPrevDiscountCost = newPreviousOrders.reduce(
      (acc, order) => acc + order.totalDiscount,
      0
    )

    setDiscountCost(newDiscountCost)
    setPrevDiscountCost(newPrevDiscountCost)
    setGrossRevenue(newGrossRevenue)
    setPrevGrossRevenue(newPreviousGrossRevenue)
    setShippingCost(newShippingCost)
    setPrevShippingCost(newPrevShippingCost)

    const newTaxesCost = (newGrossRevenue - newShippingCost) * 0.19
    const newPrevTaxesCost =
      (newPreviousGrossRevenue - newPrevShippingCost) * 0.19

    setTaxesCost(newTaxesCost)
    setPrevTaxesCost(newPrevTaxesCost)

    const newNetRevenue = newGrossRevenue - newShippingCost - newTaxesCost
    const newPrevNetRevenue =
      newPreviousGrossRevenue - newPrevShippingCost - newPrevTaxesCost
    const newRefundCost = newCurrentOrders.reduce(
      (acc, order) => (order.isRefunded ? acc + order.totalAmount : acc),
      0
    )
    const newPrevRefundCost = newPreviousOrders.reduce(
      (acc, order) => (order.isRefunded ? acc + order.totalAmount : acc),
      0
    )

    setRefundCost(newRefundCost)
    setPrevRefundCost(newPrevRefundCost)
    setNetRevenue(newNetRevenue)
    setPrevNetRevenue(newPrevNetRevenue)
  }, [analyticsSelectedTime, orders])

  const grossPercentageChange =
    ((grossRevenue - prevGrossRevenue) / prevGrossRevenue) * 100
  const grossPercentageChangeMinus = grossRevenue - prevGrossRevenue

  const shippingCostPercentageChange =
    ((shippingCost - prevShippingCost) / prevShippingCost) * 100
  const shippingCostPercentageChangeMinus = shippingCost - prevShippingCost

  const taxesCostPercentageChange =
    ((taxesCost - prevTaxesCost) / prevTaxesCost) * 100
  const taxesCostPercentageChangeMinus = taxesCost - prevTaxesCost

  const refundCostPercentageChange =
    ((refundCost - prevRefundCost) / prevRefundCost) * 100
  const refundCostPercentageChangeMinus = refundCost - prevRefundCost

  const discountCostPercentageChange =
    ((discountCost - prevDiscountCost) / prevDiscountCost) * 100
  const discountCostPercentageChangeMinus = discountCost - prevDiscountCost

  const netRevenuePercentageChange =
    ((netRevenue - prevNetRevenue) / prevNetRevenue) * 100
  const netRevenuePercentageChangeMinus = netRevenue - prevNetRevenue

  let props = {
    analyticsSelectedTime: analyticsSelectedTime,
    orders: orders,
  }

  return (
    <>
      <div>
        <div className="flex flex-row items-center justify-start pl-3">
          <h3 className="font-satoshi_regular text-2xl font-bold">
            Admin Analytics
          </h3>
          <div className=" w-40 pl-4">
            <div
              className="relative flex w-full cursor-pointer items-center justify-between gap-2 rounded-xl border-2 border-slate-500/30 px-3 py-2"
              onClick={() => setAnalyticsDropdownOpen(!analyticsDropdownOpen)}
              onBlur={() =>
                setTimeout(() => setAnalyticsDropdownOpen(false), 300)
              }
              tabIndex="0"
            >
              {analyticsSelectedTime} <IoIosArrowDown />
              <div
                className={`absolute left-0 top-10 z-50 mt-2 flex flex-col  items-center justify-start font-satoshi_regular ${analyticsDropdownOpen ? ' block h-full w-full' : 'hidden h-0 w-0'}`}
              >
                <ul
                  className={`flex w-full flex-col items-start justify-center rounded-md bg-white hover:cursor-pointer`}
                >
                  <li
                    className="w-full px-4 py-2 hover:rounded-md hover:bg-gray-50"
                    onClick={() => setAnalyticsSelectedTime('Today')}
                  >
                    Today
                  </li>
                  <li
                    className="w-full px-4 py-2 hover:rounded-md hover:bg-gray-50"
                    onClick={() => setAnalyticsSelectedTime('This Month')}
                  >
                    This Month
                  </li>
                  <li
                    className="w-full px-4 py-2 hover:rounded-md hover:bg-gray-50"
                    onClick={() => setAnalyticsSelectedTime('This Year')}
                  >
                    This Year
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="rounded-lg bg-background mt-5 p-4 xl:px-16 xl:py-10">
          <div className="m-2 flex w-full flex-wrap justify-between gap-1 font-satoshi_regular lg:flex-row lg:gap-5 xl:px-10">
            <div className="mr-4 flex min-w-[8rem] max-w-[30rem] flex-shrink flex-grow flex-col items-start gap-2 rounded-xl border-2 border-gray-200 p-3 md:p-4 xl:w-1/4">
              <div className="flex w-full items-center justify-between gap-2">
                <div className="flex gap-1 md:gap-2">
                  <h3 className="text-lg font-bold md:text-xl">
                    Gross Revenue
                  </h3>
                </div>
              </div>
              <div className="flex w-full items-center gap-8 py-3">
                <div className="flex w-full items-center justify-between">
                  <p className="text-3xl font-bold">${grossRevenue}</p>
                  <div>
                    <div
                      className={`flex items-center gap-2 text-xl font-bold ${grossPercentageChange > 0 ? `text-green-500` : `text-red-500`}`}
                    >
                      {grossPercentageChange > 0 ? (
                        <FaArrowTrendUp />
                      ) : (
                        <FaArrowTrendDown />
                      )}
                      <p>
                        {grossRevenue === 0 && prevGrossRevenue === 0
                          ? 0
                          : Math.round(
                              Math.abs(
                                grossPercentageChange === -100
                                  ? grossPercentageChangeMinus
                                  : grossPercentageChange
                              )
                            )}
                        %
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <h4>
                Previous {analyticsSelectedTime === 'Today' ? 'Day' : ''}
                {analyticsSelectedTime === 'This Month' ? 'Month' : ''}
                {analyticsSelectedTime === 'This Year' ? 'Year' : ''} $
                {prevGrossRevenue}
              </h4>
            </div>
            <div className="mr-4 flex min-w-[8rem] max-w-[30rem]  flex-shrink flex-grow flex-col items-start gap-2 rounded-xl border-2 border-gray-200 p-3 md:p-4 xl:w-1/4">
              <div className="flex w-full items-center justify-between gap-2">
                <div className="flex gap-1 md:gap-2">
                  <h3 className="text-lg font-bold md:text-xl">Refunds</h3>
                </div>
              </div>
              <div className="flex w-full items-center gap-8 py-3">
                <div className="flex w-full items-center justify-between">
                  <p className="text-3xl font-bold">${refundCost}</p>
                  <div>
                    <div
                      className={`flex items-center gap-2 text-xl font-bold ${refundCostPercentageChange > 0 ? `text-green-500` : `text-red-500`}`}
                    >
                      {refundCostPercentageChange > 0 ? (
                        <FaArrowTrendUp />
                      ) : (
                        <FaArrowTrendDown />
                      )}
                      <p>
                        {refundCost === 0 && prevRefundCost === 0
                          ? 0
                          : Math.round(
                              Math.abs(
                                refundCostPercentageChange === -100
                                  ? refundCostPercentageChangeMinus
                                  : refundCostPercentageChange
                              )
                            )}
                        %
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <h4>
                Previous {analyticsSelectedTime === 'Today' ? 'Day' : ''}
                {analyticsSelectedTime === 'This Month' ? 'Month' : ''}
                {analyticsSelectedTime === 'This Year' ? 'Year' : ''} $
                {prevRefundCost}
              </h4>
            </div>
            <div className="mr-4 flex min-w-[8rem] max-w-[30rem] flex-shrink flex-grow flex-col items-start gap-2 rounded-xl border-2 border-gray-200 p-3 md:p-4 xl:w-1/4">
              <div className="flex w-full items-center justify-between gap-2">
                <div className="flex gap-1 md:gap-2">
                  <h3 className="text-lg font-bold md:text-xl">Discounts</h3>
                </div>
              </div>
              <div className="flex w-full items-center gap-8 py-3">
                <div className="flex w-full items-center justify-between">
                  <p className="text-3xl font-bold">${discountCost}</p>
                  <div>
                    <div
                      className={`flex items-center gap-2 text-xl font-bold ${discountCostPercentageChange > 0 ? `text-green-500` : `text-red-500`}`}
                    >
                      {discountCostPercentageChange > 0 ? (
                        <FaArrowTrendUp />
                      ) : (
                        <FaArrowTrendDown />
                      )}
                      <p>
                        {discountCost === 0 && prevDiscountCost === 0
                          ? 0
                          : Math.round(
                              Math.abs(
                                discountCostPercentageChange === -100
                                  ? discountCostPercentageChangeMinus
                                  : discountCostPercentageChange
                              )
                            )}
                        %
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <h4>
                Previous {analyticsSelectedTime === 'Today' ? 'Day' : ''}
                {analyticsSelectedTime === 'This Month' ? 'Month' : ''}
                {analyticsSelectedTime === 'This Year' ? 'Year' : ''} $
                {prevDiscountCost}
              </h4>
            </div>
            <div className="mr-4 flex min-w-[8rem] max-w-[30rem] flex-shrink flex-grow flex-col items-start gap-2 rounded-xl border-2 border-gray-200 p-3 md:p-4 xl:w-1/4">
              <div className="flex w-full items-center justify-between gap-2">
                <div className="flex gap-1 md:gap-2">
                  <h3 className="text-lg font-bold md:text-xl">Taxes</h3>
                </div>
              </div>
              <div className="flex w-full items-center gap-8 py-3">
                <div className="flex w-full items-center justify-between">
                  <p className="text-3xl font-bold">${taxesCost.toFixed(0)}</p>
                  <div>
                    <div
                      className={`flex items-center gap-2 text-xl font-bold ${taxesCostPercentageChange > 0 ? `text-green-500` : `text-red-500`}`}
                    >
                      {taxesCostPercentageChange > 0 ? (
                        <FaArrowTrendUp />
                      ) : (
                        <FaArrowTrendDown />
                      )}
                      <p>
                        {taxesCost === 0 && prevTaxesCost === 0
                          ? 0
                          : Math.round(
                              Math.abs(
                                taxesCostPercentageChange === -100
                                  ? taxesCostPercentageChangeMinus
                                  : taxesCostPercentageChange
                              )
                            )}
                        %
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <h4>
                Previous {analyticsSelectedTime === 'Today' ? 'Day' : ''}
                {analyticsSelectedTime === 'This Month' ? 'Month' : ''}
                {analyticsSelectedTime === 'This Year' ? 'Year' : ''} $
                {prevTaxesCost.toFixed(0)}
              </h4>
            </div>
            <div className="mr-4 flex min-w-[8rem] max-w-[30rem] flex-shrink flex-grow flex-col items-start gap-2 rounded-xl border-2 border-gray-200 p-3 md:p-4 xl:w-1/4">
              <div className="flex w-full items-center justify-between gap-2">
                <div className="flex gap-1 md:gap-2">
                  <h3 className="text-lg font-bold md:text-xl">Shipping</h3>
                </div>
              </div>
              <div className="flex w-full items-center gap-8 py-3">
                <div className="flex w-full items-center justify-between">
                  <p className="text-3xl font-bold">${shippingCost}</p>
                  <div>
                    <div
                      className={`flex items-center gap-2 text-xl font-bold ${shippingCostPercentageChange > 0 ? `text-green-500` : `text-red-500`}`}
                    >
                      {shippingCostPercentageChange > 0 ? (
                        <FaArrowTrendUp />
                      ) : (
                        <FaArrowTrendDown />
                      )}
                      <p>
                        {shippingCost === 0 && prevShippingCost === 0
                          ? 0
                          : Math.round(
                              Math.abs(
                                shippingCostPercentageChange === -100
                                  ? shippingCostPercentageChangeMinus
                                  : shippingCostPercentageChange
                              )
                            )}
                        %
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <h4>
                Previous {analyticsSelectedTime === 'Today' ? 'Day' : ''}
                {analyticsSelectedTime === 'This Month' ? 'Month' : ''}
                {analyticsSelectedTime === 'This Year' ? 'Year' : ''} $
                {prevShippingCost}
              </h4>
            </div>
            <div className="mr-4 flex min-w-[8rem] max-w-[30rem] flex-shrink flex-grow flex-col items-start gap-2 rounded-xl border-2 border-gray-200 p-3 md:p-4 xl:w-1/4">
              <div className="flex w-full items-center justify-between gap-2">
                <div className="flex gap-1 md:gap-2">
                  <h3 className="text-lg font-bold md:text-xl">Net Revenue</h3>
                </div>
              </div>
              <div className="flex w-full items-center gap-8 py-3">
                <div className="flex w-full items-center justify-between">
                  <p className="text-3xl font-bold">
                    ${Math.round(netRevenue)}
                  </p>
                  <div>
                    <div
                      className={`flex items-center gap-2 text-xl font-bold ${netRevenuePercentageChange > 0 ? `text-green-500` : `text-red-500`}`}
                    >
                      {netRevenuePercentageChange > 0 ? (
                        <FaArrowTrendUp />
                      ) : (
                        <FaArrowTrendDown />
                      )}
                      <p>
                        {netRevenue === 0 && prevNetRevenue === 0
                          ? 0
                          : Math.round(
                              Math.abs(
                                netRevenuePercentageChange === -100
                                  ? netRevenuePercentageChangeMinus
                                  : netRevenuePercentageChange
                              )
                            )}
                        %
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <h4>
                Previous {analyticsSelectedTime === 'Today' ? 'Day' : ''}
                {analyticsSelectedTime === 'This Month' ? 'Month' : ''}
                {analyticsSelectedTime === 'This Year' ? 'Year' : ''} $
                {prevNetRevenue.toFixed(0)}
              </h4>
            </div>
          </div>
          <div className="mt-10 hidden w-full font-satoshi_regular md:px-4 lg:block xl:px-8">
            <div className="flex flex-col items-start gap-2 rounded-xl border-2 border-gray-200 p-3 md:p-4">
              {/* <h3 className="text-xl font-bold">Chart</h3> */}
              <div className="h-[28rem] w-full">
                <AdminLineChart {...props} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AdminAnalytics
