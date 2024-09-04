import { createContext, useContext, useEffect, useState } from 'react'
import { useShopContext } from './ShopContext'
import { useNavigate } from 'react-router-dom'
import { useCartContext } from './CartContext'

const OrderContext = createContext()

export const useOrderContext = () => useContext(OrderContext)

function OrderProvider({ children }) {
  const navigate = useNavigate()
  const [userOrders, setUserOrders] = useState([])
  const [adminOrders, setAdminOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const { userData, isLoggedin } = useShopContext()
  const { discountRate } = useCartContext()
  const [refundOrders, setRefundOrders] = useState([])

  // Fetch user orders from API
  const fetchUserOrders = async () => {
    try {
      const response = await fetch(
        `http://localhost:3002/orders/myorders/${userData._id}`,
        {
          headers: {
            Authorization: `Bearer ${userData.token}`,
          },
        }
      )
      const data = await response.json()
      setUserOrders(data.userOrders)
    } catch (error) {
      console.error('Error fetching user orders:', error)
    } finally {
      setLoading(false)
    }
  }

  // Fetch all orders for admin from API
  const fetchAdminOrders = async () => {
    try {
      const response = await fetch('http://localhost:3002/orders/admin', {
        headers: {
          Authorization: `Bearer ${userData.token}`,
        },
      })
      const data = await response.json()
      setAdminOrders(data)
    } catch (error) {
      console.error('Error fetching admin orders:', error)
    } finally {
      setLoading(false)
    }
  }

  // Fetch Requested Refund Orders
  const fetchRefundOrders = async () => {
    try {
      const response = await fetch(
        'http://localhost:3002/orders/requested-refunds'
      )
      const data = await response.json()
      setRefundOrders(data)
    } catch (error) {
      console.error('Error:', error.message)
    }
  }

  useEffect(() => {
    if (isLoggedin && userData.role === 'user') {
      fetchUserOrders()
      console.log({ userOrders })
    } else if (isLoggedin && userData.role === 'admin') {
      fetchAdminOrders()
      fetchRefundOrders()
    }
  }, [isLoggedin, userData])

  // Create a new order
  const createOrder = async (orderData) => {
    try {
      if (!userData.token) {
        console.log('User not logged in')
        navigate('/login')
        return
      }
      const response = await fetch(
        'http://localhost:3002/orders/create-order',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userData.token}`,
          },
          body: JSON.stringify({
            orderData,
            userId: userData._id,
            paymentMethod: 'Paypal',
            discount: discountRate,
          }),
        }
      )
      if (!response.ok) throw new Error('Error creating order')
      const data = await response.json()
      setUserOrders((prevOrd) => [...prevOrd, data.order])
      console.log({ orderData })
    } catch (error) {
      console.error('Error creating order:', error.message)
    }
  }

  return (
    <OrderContext.Provider
      value={{
        userOrders,
        adminOrders,
        loading,
        createOrder,
        fetchAdminOrders,
        refundOrders,
        fetchRefundOrders,
      }}
    >
      {children}
    </OrderContext.Provider>
  )
}

export default OrderProvider
