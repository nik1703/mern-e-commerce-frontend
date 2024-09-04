import { useEffect, useState } from 'react'
import { useOrderContext } from '../../context/OrderContext'
import { toast, ToastContainer } from 'react-toastify'

const AdminRefunds = () => {
  const [query, setQuery] = useState('')
  const { fetchRefundOrders, refundOrders } = useOrderContext()

  const notify = () => {
    toast.success('Refund Confirmed', {
      position: 'bottom-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    })
  }

  const notifyDeny = () => {
    toast.error('Refund Denied', {
      position: 'bottom-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    })
  }

  useEffect(() => {
    fetchRefundOrders()
  }, [])

  const updateRefundStatus = async (orderId, newRefundStatus, orderStatus) => {
    try {
      const response = await fetch(
        `http://localhost:3002/orders/update-refund-status/${orderId}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            refundStatus: newRefundStatus,
            status: orderStatus,
            isRefunded: newRefundStatus === 'Confirmed',
          }),
        }
      )
      const data = await response.json()
      console.log('Refund status updated', data)
      fetchRefundOrders()
      if (newRefundStatus === 'Confirmed') {
        notify()
      } else {
        notifyDeny()
      }
    } catch (error) {
      console.error('Error:', error.message)
    }
  }

  const handleConfirm = (orderId) => {
    updateRefundStatus(orderId, 'Confirmed', 'Refunded')
  }

  const handleDeny = (orderId, orderStatus) => {
    console.log(orderId, orderStatus)
    updateRefundStatus(orderId, 'Denied', orderStatus)
  }

  const filteredOrders = refundOrders.filter((order) => {
    const searchQuery = query.toLowerCase()
    return (
      order._id.toLowerCase().includes(searchQuery) ||
      order.totalAmount.toString().includes(searchQuery) ||
      order.totalDiscount.toString().includes(searchQuery) ||
      order.paymentMethod.toLowerCase().includes(searchQuery) ||
      order.status.toLowerCase().includes(searchQuery) ||
      order.refundStatus.toLowerCase().includes(searchQuery) ||
      new Date(order.createdAt)
        .toLocaleDateString('en-GB', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
        })
        .toLowerCase()
        .includes(searchQuery) ||
      new Date(order.updatedAt)
        .toLocaleDateString('en-GB', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
        })
        .toLowerCase()
        .includes(searchQuery)
    )
  })

  const mappedOrders = filteredOrders.map((order) => ({
    _id: order._id,
    totalItems: order.products
      ? order.products.reduce((total, product) => total + product.quantity, 0)
      : 0,
    totalAmount: order.totalAmount.toString(),
    totalDiscount: order.totalDiscount.toString(),
    paymentMethod: order.paymentMethod,
    status: order.status,
    refundStatus: order.refundStatus,
    createdAt: order.createdAt,
    updatedAt: order.updatedAt,
  }))

  function Orders({ currentOrders }) {
    return (
      <table className="min-w-full border border-gray-200 bg-white">
        <thead className="bg-gray-100">
          <tr>
            <th className="border-b border-gray-200 px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">
              Order ID
            </th>
            <th className="border-b border-gray-200 px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">
              Total Items
            </th>
            <th className="border-b border-gray-200 px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">
              Total Amount
            </th>
            <th className="border-b border-gray-200 px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">
              Total Discount
            </th>
            <th className="border-b border-gray-200 px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">
              Payment Method
            </th>
            <th className="border-b border-gray-200 px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">
              Status
            </th>
            <th className="border-b border-gray-200 px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">
              Refund Status
            </th>
            <th className="border-b border-gray-200 px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">
              Created At
            </th>
            <th className="border-b border-gray-200 px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">
              Last Updated Date
            </th>
            <th className="border-b border-gray-200 px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">
              Confirm
            </th>
            <th className="border-b border-gray-200 px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">
              Deny
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {currentOrders.map((order) => (
            <tr key={order._id}>
              <td className="whitespace-no-wrap border-b border-gray-200 px-4 py-4">
                <div className="text-sm leading-5 text-gray-900">
                  {order._id}
                </div>
              </td>
              <td className="whitespace-no-wrap border-b border-gray-200 px-4 py-4">
                <div className="text-sm leading-5 text-gray-900">
                  {query
                    ? order.totalItems
                    : order.products
                      ? order.products.reduce(
                          (total, product) => total + product.quantity,
                          0
                        )
                      : 0}
                </div>
              </td>
              <td className="whitespace-no-wrap border-b border-gray-200 px-4 py-4">
                <div className="text-sm leading-5 text-gray-900">
                  ${order.totalAmount}
                </div>
              </td>
              <td className="whitespace-no-wrap border-b border-gray-200 px-4 py-4">
                <div className="text-sm leading-5 text-gray-900">
                  ${order.totalDiscount}
                </div>
              </td>
              <td className="whitespace-no-wrap border-b border-gray-200 px-4 py-4">
                <div className="text-sm leading-5 text-gray-900">
                  {order.paymentMethod}
                </div>
              </td>
              <td className="whitespace-no-wrap border-b border-gray-200 px-4 py-4">
                <div className="text-sm leading-5 text-gray-900">
                  {order.status}
                </div>
              </td>
              <td className="whitespace-no-wrap border-b border-gray-200 px-4 py-4">
                <div className="text-sm leading-5 text-gray-900">
                  {order.refundStatus}
                </div>
              </td>
              <td className="whitespace-no-wrap border-b border-gray-200 px-4 py-4">
                <div className="text-sm leading-5 text-gray-900">
                  {new Date(order.createdAt).toLocaleDateString('en-GB', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                  })}
                </div>
              </td>
              <td className="whitespace-no-wrap border-b border-gray-200 px-4 py-4">
                <div className="text-sm leading-5 text-gray-900">
                  {new Date(order.updatedAt).toLocaleDateString('en-GB', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                  })}
                </div>
              </td>
              <td className="whitespace-no-wrap border-b border-gray-200 px-4 py-4">
                <div className="text-sm leading-5 text-gray-900">
                  <button
                    onClick={() => handleConfirm(order._id)}
                    className="rounded-md bg-green-500 px-2 py-1 text-white hover:bg-green-400"
                  >
                    Confirm
                  </button>
                </div>
              </td>
              <td className="whitespace-no-wrap border-b border-gray-200 px-4 py-4">
                <div className="text-sm leading-5 text-gray-900">
                  <button
                    onClick={() => handleDeny(order._id, order.status)}
                    className="rounded-md bg-red-500 px-2 py-1 text-white hover:bg-red-400"
                  >
                    Deny
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    )
  }

  return (
    <div className="h-[121rem]">
      <h2 className="mb-4 font-satoshi_regular text-2xl font-bold">
        Requested Refunds
      </h2>
      <div className="mt-8 h-1/2 w-full overflow-y-auto rounded-lg bg-background p-4 md:p-8">
        <div className="my-3">
          <form className=" w-3/4 lg:w-1/3">
            <input
              type="text"
              placeholder="Search Order"
              className="w-full rounded-xl border-2 border-slate-500/40 px-4 py-2"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value)
              }}
            />
          </form>
        </div>
        <div className="overflow-x-auto">
          <Orders currentOrders={query ? mappedOrders : refundOrders} />
          {refundOrders.length === 0 && (
            <p className="pt-10 text-center text-xl">No Requested Refunds</p>
          )}
        </div>
        <ToastContainer
          position="bottom-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={true}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition:Bounce
        />
      </div>
    </div>
  )
}

export default AdminRefunds
