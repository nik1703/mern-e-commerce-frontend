import { PiTrashFill } from 'react-icons/pi'
import { formatCurrency } from '../../utilities/formatCurrency'
import { useShopContext } from '../../context/ShopContext'
// import { products } from '../data/products'
import { Link } from 'react-router-dom'
import Button from '../Button'
import { useCartContext } from '../../context/CartContext'

function ShoppingCartItems() {
  const {
    cartItems,
    increaseCartQuantity,
    decreaseCartQuantity,
    removeCartItem,
  } = useCartContext()

  const { products, loading } = useShopContext()

  // console.log({ cartItems, products })

  if (loading) {
    return <p>Products loading...</p>
  }

  if (!products) {
    return <p>Product not found.</p>
  }

  return (
    <>
      <section className="cart-products rounded-[20px] border md:w-7/12">
        <ul className="divide-y px-3 md:px-6">
          {cartItems.length > 0 ? (
            cartItems.map((cartItem) =>
              products.map((product) => {
                if (product._id === cartItem.productId) {
                  return (
                    <li key={cartItem.productId}>
                      <section className="my-3 flex w-full gap-3 md:my-6">
                        <div>
                          <img
                            className="w-28 md:w-32"
                            src={product.mainImage}
                            alt={product.title}
                          />
                        </div>
                        <div className="flex w-full flex-col justify-between">
                          <div className="flex justify-between">
                            <div>
                              <h3 className="font-satoshi_bold text-sm md:text-xl">
                                {product.title}
                              </h3>
                              <p className="font-satoshi_regular text-[12px] md:text-sm">
                                Size:{' '}
                                <span className="text-black text-opacity-60">
                                  {cartItem.size}
                                </span>
                              </p>
                              <p className="flex items-center gap-1 font-satoshi_regular text-[12px] md:text-sm">
                                Color:{' '}
                                <span
                                  className={`flex h-3 w-3 items-center justify-center rounded-full hover:bg-opacity-90 hover:shadow-xl md:h-5 md:w-5`}
                                  style={{ backgroundColor: cartItem.color }}
                                ></span>
                              </p>
                            </div>
                            <div>
                              <button>
                                <PiTrashFill
                                  onClick={() =>
                                    removeCartItem(
                                      product._id,
                                      cartItem.size,
                                      cartItem.color
                                    )
                                  }
                                  className="h-5 w-5 text-[#FF3333]"
                                />
                              </button>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <p className="font-satoshi_bold text-xl md:text-2xl">
                              {formatCurrency(
                                product.price * cartItem.quantity
                              )}
                            </p>
                            <div className="flex items-center justify-center rounded-full bg-[#F0F0F0]">
                              <button
                                onClick={() =>
                                  decreaseCartQuantity(
                                    product._id,
                                    cartItem.size,
                                    cartItem.color
                                  )
                                }
                                className="rounded-l-full py-1 pl-3 pr-5 text-[1rem] hover:z-10 hover:outline hover:outline-1"
                              >
                                -
                              </button>
                              <span
                                className="flex w-8 items-center justify-center bg-[#F0F0F0] md:w-12"
                                id="quantity"
                              >
                                {cartItem.quantity}
                              </span>
                              <button
                                onClick={() =>
                                  increaseCartQuantity(
                                    product._id,
                                    cartItem.size,
                                    cartItem.color
                                  )
                                }
                                className="rounded-r-full py-1 pl-4 pr-3 text-[1rem] hover:outline hover:outline-1"
                              >
                                +
                              </button>
                            </div>
                          </div>
                        </div>
                      </section>
                    </li>
                  )
                } else {
                  return null
                }
              })
            )
          ) : (
            <div className="m-3 flex flex-col items-center justify-center">
              <p>Your cart is empty</p>
              <Link to="/category">
                <Button className="w-full md:my-8 md:w-fit lg:mb-12" primary>
                  Shop Now
                </Button>
              </Link>
            </div>
          )}
        </ul>
      </section>
    </>
  )
}
export default ShoppingCartItems
