import { useCartContext } from '../../context/CartContext'
import { useShopContext } from '../../context/ShopContext'
import { useOrderContext } from '../../context/OrderContext'
import CheckoutButton from './CheckoutButton'
import PromoCode from './PromoCode'
import OrderSummary from './OrderSummary'

function OrderSummaryMain() {
  const { cartItems, discountRate } = useCartContext()

  const { products, loading } = useShopContext()
  const { orders, createOrder } = useOrderContext()

  console.log({ cartItems, orders })

  if (loading) {
    return <p>Products loading...</p>
  }

  if (!products) {
    return <p>Product not found.</p>
  }

  let subTotal = cartItems.reduce(
    (total, item) =>
      total +
      products.find((product) => product._id === item.productId).price *
        item.quantity,
    0
  )

  return (
    <>
      {subTotal > 0 && (
        <section className="order-summary mt-5 rounded-[20px] border p-5 md:mt-0 md:w-5/12">
          <OrderSummary />
          <PromoCode />
          <CheckoutButton />
        </section>
      )}
    </>
  )
}
export default OrderSummaryMain
