import { useEffect, useState } from 'react'
import { useOrderContext } from '../../context/OrderContext'
import { toast, ToastContainer } from 'react-toastify'

const AdminAllOrders = () => {
  const [query, setQuery] = useState('')
  const { fetchAdminOrders, adminOrders } = useOrderContext()
  const [editingOrderId, setEditingOrderId] = useState(null)
  const [sortOrder, setSortOrder] = useState('newest')

  const notify = () => {
    toast.success('Order Updated', {
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
    fetchAdminOrders()
  }, [])

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const response = await fetch(
        `http://localhost:3002/orders/update-status/${orderId}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            status: newStatus,
            isRefunded: newStatus === 'Refunded',
          }),
        }
      )
      const data = await response.json()
      console.log('Order status updated', data)
      fetchAdminOrders()
      notify()
    } catch (error) {
      console.error('Error:', error.message)
    }
  }

  const handleEditClick = (orderId) => {
    setEditingOrderId(orderId)
  }

  const handleCancelClick = () => {
    setEditingOrderId(null)
  }

  const handleStatusChange = (orderId, newStatus) => {
    console.log(orderId, newStatus)
    updateOrderStatus(orderId, newStatus)
    setEditingOrderId(null)
  }

  const filteredOrders = adminOrders.filter((order) => {
    const searchQuery = query.toLowerCase()
    return (
      order._id.toLowerCase().includes(searchQuery) ||
      order.user.toLowerCase().includes(searchQuery) ||
      order.totalAmount.toString().includes(searchQuery) ||
      order.totalDiscount.toString().includes(searchQuery) ||
      order.paymentMethod.toLowerCase().includes(searchQuery) ||
      order.status.toLowerCase().includes(searchQuery) ||
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
    user: order.user,
    totalItems: order.products
      ? order.products.reduce((total, product) => total + product.quantity, 0)
      : 0,
    totalAmount: order.totalAmount.toString(),
    totalDiscount: order.totalDiscount.toString(),
    paymentMethod: order.paymentMethod,
    status: order.status,
    createdAt: order.createdAt,
    updatedAt: order.updatedAt,
  }))

  const sortedOrders = query
    ? mappedOrders
    : adminOrders.sort((a, b) => {
        if (sortOrder === 'newest') {
          return new Date(b.createdAt) - new Date(a.createdAt)
        } else if (sortOrder === 'oldest') {
          return new Date(a.createdAt) - new Date(b.createdAt)
        } else if (sortOrder === 'highest') {
          return b.totalAmount - a.totalAmount
        } else if (sortOrder === 'lowest') {
          return a.totalAmount - b.totalAmount
        }
      })

  function Orders({ currentOrders }) {
    return (
      <table className="min-w-full border border-gray-200 bg-white">
        <thead className="bg-gray-100">
          <tr>
            <th className="border-b border-gray-200 px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">
              Order ID
            </th>
            <th className="border-b border-gray-200 px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">
              User ID
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
              Created At
            </th>
            <th className="border-b border-gray-200 px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">
              Last Updated
            </th>
            <th className="border-b border-gray-200 px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">
              Edit
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {currentOrders.map((order) => (
            <tr
              key={order._id}
              className={`${order._id === editingOrderId ? 'bg-gray-100' : ''}`}
            >
              <td className="whitespace-no-wrap border-b border-gray-200 px-4 py-4">
                <div className="text-sm leading-5 text-gray-900">
                  {order._id}
                </div>
              </td>
              <td className="whitespace-no-wrap border-b border-gray-200 px-4 py-4">
                <div className="text-sm leading-5 text-gray-900">
                  {order.user}
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
                  {editingOrderId === order._id ? (
                    <select
                      value={order.status}
                      onChange={(e) =>
                        handleStatusChange(order._id, e.target.value)
                      }
                    >
                      <option value="Pending">Pending</option>
                      <option value="Confirmed">Confirmed</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Refunded">Refunded</option>
                    </select>
                  ) : (
                    <>{order.status}</>
                  )}
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
                  {editingOrderId === order._id ? (
                    <button
                      onClick={() => handleCancelClick(order._id)}
                      className="rounded-md bg-red-500 px-2 py-1 text-white hover:bg-red-400"
                    >
                      Cancel
                    </button>
                  ) : (
                    <button
                      onClick={() => handleEditClick(order._id)}
                      className="rounded-md bg-black px-2 py-1 text-sm text-white hover:bg-black/80"
                    >
                      Edit
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    )
  }

  return (
    <div className="h-[121rem] w-full">
      <h2 className="mb-4 font-satoshi_regular text-2xl font-bold">
        All Orders
      </h2>
      <div className="mt-8 h-1/2 w-full overflow-y-auto rounded-lg bg-background p-4 md:p-8">
        <div className="my-3 flex w-full flex-row justify-between">
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
          <div className="hidden pl-4 md:block lg:pl-0">
            <select
              className="relative flex w-full cursor-pointer items-center gap-2 rounded-xl border-2 border-slate-500/30 px-3 py-2"
              onChange={(e) => setSortOrder(e.target.value)}
              value={sortOrder}
            >
              <option value="newest">Newest first</option>
              <option value="oldest">Oldest first</option>
              <option value="highest">Highest total</option>
              <option value="lowest">Lowest total</option>
            </select>
          </div>
        </div>
        <div className="overflow-x-auto">
          <Orders currentOrders={query ? mappedOrders : sortedOrders} />
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

export default AdminAllOrders
