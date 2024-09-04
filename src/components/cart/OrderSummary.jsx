import { formatCurrency } from '../../utilities/formatCurrency'
import { useCartContext } from '../../context/CartContext'
import { useShopContext } from '../../context/ShopContext'
import { useOrderContext } from '../../context/OrderContext'

function OrderSummary() {
  const { cartItems, discountRate, setCartTotal } = useCartContext()

  const { products, loading } = useShopContext()

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
  let deliveryFee = 15
  let discount = subTotal * discountRate
  let total = subTotal + deliveryFee - discount

  setCartTotal(total)

  return (
    <section className="order-summary mt-5 rounded-[20px] border p-5 md:mt-0 md:w-full">
      {subTotal > 0 && (
        <>
          <h2 className="mb-4 font-satoshi_bold text-xl md:text-2xl">
            Order Summary
          </h2>
          <div className="divide-y">
            <div className="*:my-4 *:text-lg *:md:text-xl">
              <div className="flex justify-between">
                <p className="font-satoshi_regular text-black text-opacity-60 ">
                  Subtotal
                </p>
                <span className="font-satoshi_bold">
                  {formatCurrency(subTotal)}
                </span>
              </div>
              <div className="flex justify-between">
                <p className="font-satoshi_regular text-black text-opacity-60 ">
                  Discount (-{discountRate * 100}%)
                </p>
                <span className="font-satoshi_bold text-[#FF3333]">
                  -{formatCurrency(discount)}
                </span>
              </div>
              <div className="flex justify-between">
                <p className="font-satoshi_regular text-black text-opacity-60">
                  Delivery Fee
                </p>
                <span className="font-satoshi_bold">
                  {formatCurrency(deliveryFee)}
                </span>
              </div>
            </div>
            <div className="flex justify-between pt-4">
              <p className="font-satoshi_regular text-lg text-black md:text-xl">
                Total
              </p>
              <span className="font-satoshi_bold text-xl md:text-2xl">
                {formatCurrency(total)}
              </span>
            </div>
          </div>
        </>
      )}
    </section>
  )
}
export default OrderSummary
