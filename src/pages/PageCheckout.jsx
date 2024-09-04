import { useEffect, useState } from 'react'
import { formatCurrency } from '../utilities/formatCurrency'
import { LiaSpinnerSolid } from 'react-icons/lia'
import { useCartContext } from '../context/CartContext'
import { useOrderContext } from '../context/OrderContext'
import OrderSummary from '../components/cart/OrderSummary'
import ShippingInformation from '../components/cart/ShippingInformation'
import { useShopContext } from '../context/ShopContext'

import { useNavigate } from 'react-router-dom'
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js'
import Button from '../components/Button'

function PageCheckout() {
  const [{ isPending }, dispatch] = usePayPalScriptReducer()
  const { cartItems, clearCart, cartTotal } = useCartContext()
  const { orderLoading, createOrder, userOrders } = useOrderContext()
  const { userData } = useShopContext()
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    dispatch({
      type: 'resetOptions',
      value: {
        'client-id': 'test',
        currency: 'USD',
        intent: 'capture',
      },
    })
    dispatch({ type: 'setLoadingStatus', value: 'pending' })
  }, [dispatch])

  const onCreateOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: `${cartTotal}`,
          },
        },
      ],
    })
  }

  console.log(cartItems)

  async function handleCreateOrder() {
    try {
      if (!userData.token) {
        console.log('User not logged in')
        navigate('/login')
        return
      }

      if (userData.role === 'admin') {
        setLoading(true)
        await createOrder(cartItems)
        setLoading(false)
        clearCart()
        navigate('/admin')
        return
      }
      setLoading(true)
      await createOrder(cartItems)
      setLoading(false)
      clearCart()
      navigate('/user')
    } catch (error) {
      console.error('Error creating order:', error)
      setLoading(false)
    }
  }

  return (
    <div className="m-auto mb-12 max-w-7xl md:mb-20">
      <div className="mx-4 flex justify-center">
        <div className="w-full max-w-7xl border-b-[1px] border-gray-300"></div>
      </div>
      <div className="mx-4">
        <div className="my-5">
          <h2 className="mb-5 font-integral_cf text-3xl">Checkout</h2>
        </div>
        <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-center">
          <ShippingInformation />
          <div className="flex flex-col gap-5 md:w-5/12">
            <OrderSummary />
            {loading ? (
              <div className="flex h-14 items-center justify-center gap-2 rounded-full bg-black px-4 py-2 text-white md:text-lg">
                <LiaSpinnerSolid className="h-5 w-5 animate-spin" />
                Processing
              </div>
            ) : (
              <>
                {!userData.token ? (
                  <Button
                    onClick={() => handleCreateOrder(cartItems)}
                    className="flex h-14 items-center justify-center gap-2 rounded-full bg-black px-4 py-2 text-white md:text-lg"
                  >
                    Place Order
                  </Button>
                ) : (
                  <PayPalButtons
                    createOrder={(data, actions) =>
                      onCreateOrder(data, actions)
                    }
                    onApprove={() => {
                      handleCreateOrder(cartItems)
                    }}
                    onCancel={() => {
                      handleCreateOrder(cartItems)
                    }}
                  />
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PageCheckout
