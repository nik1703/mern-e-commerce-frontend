import { ResponsiveLine } from '@nivo/line'
import { set } from 'mongoose'
import { useEffect, useState } from 'react'

const AdminLineChart = ({ analyticsSelectedTime, orders }) => {
  const [dates, setDates] = useState([])
  const [grossValues, setGrossValues] = useState([])
  const [shippingValues, setShippingValues] = useState([])
  const [taxValues, setTaxValues] = useState([])
  const [netValues, setNetValues] = useState([])
  const [refundValues, setRefundValues] = useState([])
  const [discountValues, setDiscountValues] = useState([])

  function formatDate(date) {
    const day = date.getDate().toString().padStart(2, '0')
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    return `${day}/${month}`
  }

  // Set dates for the last 12 days, months or years
  useEffect(() => {
    if (analyticsSelectedTime === 'Today') {
      const dates = Array.from({ length: 12 }, (_, i) => {
        const date = new Date()
        date.setDate(date.getDate() - i)
        return formatDate(date)
      })
      setDates(dates)
    } else if (analyticsSelectedTime === 'This Month') {
      const dates = Array.from({ length: 12 }, (_, i) => {
        const date = new Date()
        date.setMonth(date.getMonth() - i)
        return `${date.toLocaleString('default', { month: 'short' })}`
      })
      setDates(dates)
    } else if (analyticsSelectedTime === 'This Year') {
      const dates = Array.from({ length: 12 }, (_, i) => {
        const date = new Date()
        date.setFullYear(date.getFullYear() - i)
        return date.getFullYear()
      })
      setDates(dates)
    }
  }, [analyticsSelectedTime])

  useEffect(() => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const twelveDaysAgo = new Date(today)
    twelveDaysAgo.setDate(twelveDaysAgo.getDate() - 12)
    twelveDaysAgo.setHours(0, 0, 0, 0)

    const twelveMonthsAgo = new Date(
      today.getFullYear(),
      today.getMonth() - 12,
      1
    )
    twelveMonthsAgo.setHours(0, 0, 0, 0)

    const twelveYearsAgo = new Date(today.getFullYear() - 12, 1, 1)
    twelveYearsAgo.setHours(0, 0, 0, 0)

    let newCurrentOrdersDays = Array(12)
      .fill()
      .map(() => [])
    let newCurrentOrdersMonths = Array(12)
      .fill()
      .map(() => [])
    let newCurrentOrdersYears = Array(12)
      .fill()
      .map(() => [])

    orders.forEach((order) => {
      const orderDate = new Date(order.createdAt)
      orderDate.setHours(0, 0, 0, 0)

      if (orderDate.getTime() === today.getTime()) {
        newCurrentOrdersDays[0].push(order)
      } else if (orderDate >= twelveDaysAgo && orderDate < today) {
        const dayIndex = Math.floor((today - orderDate) / (1000 * 60 * 60 * 24))
        if (dayIndex < 12 && dayIndex >= 0) {
          newCurrentOrdersDays[dayIndex].push(order)
        }
      }

      if (
        orderDate.getTime() >=
        new Date(today.getFullYear(), today.getMonth(), 1).getTime()
      ) {
        newCurrentOrdersMonths[0].push(order)
      } else if (orderDate >= twelveMonthsAgo && orderDate < today) {
        const monthIndex =
          today.getMonth() -
          orderDate.getMonth() +
          12 * (today.getFullYear() - orderDate.getFullYear())
        if (monthIndex < 12 && monthIndex >= 0) {
          newCurrentOrdersMonths[monthIndex].push(order)
        }
      }

      if (
        orderDate.getTime() >= new Date(today.getFullYear(), 0, 1).getTime()
      ) {
        newCurrentOrdersYears[0].push(order)
      } else if (orderDate >= twelveYearsAgo && orderDate < today) {
        const yearIndex = today.getFullYear() - orderDate.getFullYear()
        if (yearIndex < 12 && yearIndex >= 0) {
          newCurrentOrdersYears[yearIndex].push(order)
        }
      }
    })

    if (analyticsSelectedTime === 'Today') {
      const newGrossValues = newCurrentOrdersDays.map((orders) =>
        orders.reduce((acc, order) => acc + order.totalAmount, 0)
      )
      const newShippingValues = newCurrentOrdersDays.map((orders) =>
        orders.reduce((acc, order) => acc + order.deliveryFee, 0)
      )
      const newTaxValues = newGrossValues.map((grossValue, index) =>
        Math.round((grossValue - newShippingValues[index]) * 0.19)
      )
      const newNetValues = newGrossValues.map(
        (grossValue, index) =>
          grossValue - newShippingValues[index] - newTaxValues[index]
      )
      const newRefundValues = newCurrentOrdersDays.map((orders) =>
        orders.reduce(
          (acc, order) => (order.isRefunded ? acc + order.totalAmount : acc),
          0
        )
      )
      const newDiscountValues = newCurrentOrdersDays.map((orders) =>
        orders.reduce((acc, order) => acc + order.totalDiscount, 0)
      )

      setGrossValues(newGrossValues)
      setShippingValues(newShippingValues)
      setTaxValues(newTaxValues)
      setNetValues(newNetValues)
      setRefundValues(newRefundValues)
      setDiscountValues(newDiscountValues)
    } else if (analyticsSelectedTime === 'This Month') {
      const newGrossValues = newCurrentOrdersMonths.map((orders) =>
        orders.reduce((acc, order) => acc + order.totalAmount, 0)
      )
      const newShippingValues = newCurrentOrdersMonths.map((orders) =>
        orders.reduce((acc, order) => acc + order.deliveryFee, 0)
      )
      const newTaxValues = newGrossValues.map((grossValue, index) =>
        Math.round((grossValue - newShippingValues[index]) * 0.19)
      )
      const newNetValues = newGrossValues.map(
        (grossValue, index) =>
          grossValue - newShippingValues[index] - newTaxValues[index]
      )
      const newRefundValues = newCurrentOrdersMonths.map((orders) =>
        orders.reduce(
          (acc, order) => (order.isRefunded ? acc + order.totalAmount : acc),
          0
        )
      )
      const newDiscountValues = newCurrentOrdersMonths.map((orders) =>
        orders.reduce((acc, order) => acc + order.totalDiscount, 0)
      )

      setGrossValues(newGrossValues)
      setShippingValues(newShippingValues)
      setTaxValues(newTaxValues)
      setNetValues(newNetValues)
      setRefundValues(newRefundValues)
      setDiscountValues(newDiscountValues)
    } else if (analyticsSelectedTime === 'This Year') {
      const newGrossValues = newCurrentOrdersYears.map((orders) =>
        orders.reduce((acc, order) => acc + order.totalAmount, 0)
      )
      const newShippingValues = newCurrentOrdersYears.map((orders) =>
        orders.reduce((acc, order) => acc + order.deliveryFee, 0)
      )
      const newTaxValues = newGrossValues.map((grossValue, index) =>
        Math.round((grossValue - newShippingValues[index]) * 0.19)
      )
      const newNetValues = newGrossValues.map(
        (grossValue, index) =>
          grossValue - newShippingValues[index] - newTaxValues[index]
      )
      const newRefundValues = newCurrentOrdersYears.map((orders) =>
        orders.reduce(
          (acc, order) => (order.isRefunded ? acc + order.totalAmount : acc),
          0
        )
      )
      const newDiscountValues = newCurrentOrdersYears.map((orders) =>
        orders.reduce((acc, order) => acc + order.totalDiscount, 0)
      )

      setGrossValues(newGrossValues)
      setShippingValues(newShippingValues)
      setTaxValues(newTaxValues)
      setNetValues(newNetValues)
      setRefundValues(newRefundValues)
      setDiscountValues(newDiscountValues)
    }
  }, [analyticsSelectedTime, orders])

  const data = [
    {
      id: 'Gross Revenue',
      color: 'hsl(240, 70%, 50%)',
      data: [
        {
          x: dates[11],
          y: grossValues[11],
        },
        {
          x: dates[10],
          y: grossValues[10],
        },
        {
          x: dates[9],
          y: grossValues[9],
        },
        {
          x: dates[8],
          y: grossValues[8],
        },
        {
          x: dates[7],
          y: grossValues[7],
        },
        {
          x: dates[6],
          y: grossValues[6],
        },
        {
          x: dates[5],
          y: grossValues[5],
        },
        {
          x: dates[4],
          y: grossValues[4],
        },
        {
          x: dates[3],
          y: grossValues[3],
        },
        {
          x: dates[2],
          y: grossValues[2],
        },
        {
          x: dates[1],
          y: grossValues[1],
        },
        {
          x: dates[0],
          y: grossValues[0],
        },
      ],
    },
    {
      id: 'Refunds',
      color: 'hsl(160, 70%, 50%)',
      data: [
        {
          x: dates[11],
          y: refundValues[11],
        },
        {
          x: dates[10],
          y: refundValues[10],
        },
        {
          x: dates[9],
          y: refundValues[9],
        },
        {
          x: dates[8],
          y: refundValues[8],
        },
        {
          x: dates[7],
          y: refundValues[7],
        },
        {
          x: dates[6],
          y: refundValues[6],
        },
        {
          x: dates[5],
          y: refundValues[5],
        },
        {
          x: dates[4],
          y: refundValues[4],
        },
        {
          x: dates[3],
          y: refundValues[3],
        },
        {
          x: dates[2],
          y: refundValues[2],
        },
        {
          x: dates[1],
          y: refundValues[1],
        },
        {
          x: dates[0],
          y: refundValues[0],
        },
      ],
    },
    {
      id: 'Discounts',
      color: 'hsl(178, 70%, 50%)',
      data: [
        {
          x: dates[11],
          y: discountValues[11],
        },
        {
          x: dates[10],
          y: discountValues[10],
        },
        {
          x: dates[9],
          y: discountValues[9],
        },
        {
          x: dates[8],
          y: discountValues[8],
        },
        {
          x: dates[7],
          y: discountValues[7],
        },
        {
          x: dates[6],
          y: discountValues[6],
        },
        {
          x: dates[5],
          y: discountValues[5],
        },
        {
          x: dates[4],
          y: discountValues[4],
        },
        {
          x: dates[3],
          y: discountValues[3],
        },
        {
          x: dates[2],
          y: discountValues[2],
        },
        {
          x: dates[1],
          y: discountValues[1],
        },
        {
          x: dates[0],
          y: discountValues[0],
        },
      ],
    },
    {
      id: 'Taxes',
      color: 'hsl(279, 70%, 50%)',
      data: [
        {
          x: dates[11],
          y: taxValues[11],
        },
        {
          x: dates[10],
          y: taxValues[10],
        },
        {
          x: dates[9],
          y: taxValues[9],
        },
        {
          x: dates[8],
          y: taxValues[8],
        },
        {
          x: dates[7],
          y: taxValues[7],
        },
        {
          x: dates[6],
          y: taxValues[6],
        },
        {
          x: dates[5],
          y: taxValues[5],
        },
        {
          x: dates[4],
          y: taxValues[4],
        },
        {
          x: dates[3],
          y: taxValues[3],
        },
        {
          x: dates[2],
          y: taxValues[2],
        },
        {
          x: dates[1],
          y: taxValues[1],
        },
        {
          x: dates[0],
          y: taxValues[0],
        },
      ],
    },
    {
      id: 'Shipping',
      color: 'hsl(212, 70%, 50%)',
      data: [
        {
          x: dates[11],
          y: shippingValues[11],
        },
        {
          x: dates[10],
          y: shippingValues[10],
        },
        {
          x: dates[9],
          y: shippingValues[9],
        },
        {
          x: dates[8],
          y: shippingValues[8],
        },
        {
          x: dates[7],
          y: shippingValues[7],
        },
        {
          x: dates[6],
          y: shippingValues[6],
        },
        {
          x: dates[5],
          y: shippingValues[5],
        },
        {
          x: dates[4],
          y: shippingValues[4],
        },
        {
          x: dates[3],
          y: shippingValues[3],
        },
        {
          x: dates[2],
          y: shippingValues[2],
        },
        {
          x: dates[1],
          y: shippingValues[1],
        },
        {
          x: dates[0],
          y: shippingValues[0],
        },
      ],
    },
    {
      id: 'Net Revenue',
      color: 'hsl(349, 70%, 50%)',
      data: [
        {
          x: dates[11],
          y: netValues[11],
        },
        {
          x: dates[10],
          y: netValues[10],
        },
        {
          x: dates[9],
          y: netValues[9],
        },
        {
          x: dates[8],
          y: netValues[8],
        },
        {
          x: dates[7],
          y: netValues[7],
        },
        {
          x: dates[6],
          y: netValues[6],
        },
        {
          x: dates[5],
          y: netValues[5],
        },
        {
          x: dates[4],
          y: netValues[4],
        },
        {
          x: dates[3],
          y: netValues[3],
        },
        {
          x: dates[2],
          y: netValues[2],
        },
        {
          x: dates[1],
          y: netValues[1],
        },
        {
          x: dates[0],
          y: netValues[0],
        },
      ],
    },
  ]

  return (
    <>
      <ResponsiveLine
        data={data}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{ type: 'point' }}
        yScale={{
          type: 'linear',
          min: 'auto',
          max: 'auto',
          stacked: false,
          reverse: false,
        }}
        yFormat=" >-$.2f"
        curve="monotoneX"
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'date',
          legendOffset: 40,
          legendPosition: 'middle',
          truncateTickAt: 0,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'revenue',
          legendOffset: -50,
          legendPosition: 'middle',
          truncateTickAt: 0,
        }}
        pointSize={10}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabel="data.yFormatted"
        pointLabelYOffset={-12}
        enableTouchCrosshair={true}
        useMesh={true}
        legends={[
          {
            anchor: 'bottom-right',
            direction: 'column',
            justify: false,
            translateX: 100,
            translateY: 0,
            itemsSpacing: 0,
            itemDirection: 'left-to-right',
            itemWidth: 86,
            itemHeight: 20,
            itemOpacity: 0.75,
            symbolSize: 12,
            symbolShape: 'circle',
            symbolBorderColor: 'rgba(0, 0, 0, .5)',
            effects: [
              {
                on: 'hover',
                style: {
                  itemBackground: 'rgba(0, 0, 0, .03)',
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
      />
    </>
  )
}

export default AdminLineChart
