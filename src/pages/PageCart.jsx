import Breadcrumbs from '../components/Breadcrumbs'
import OrderSummaryMain from '../components/cart/OrderSummaryMain'
import ShoppingCartItems from '../components/cart/ShoppingCartItems'

function PageCart() {
  return (
    <>
      <div className="m-auto mb-12 max-w-7xl md:mb-20">
        <div className="mx-4 flex justify-center">
          <div className="w-full max-w-7xl border-b-[1px] border-gray-300"></div>
        </div>
        <div className="mx-4">
          <div className="my-5">
            <Breadcrumbs />
          </div>
          <h2 className="mb-5 font-integral_cf text-3xl">Your Cart</h2>
          <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-center">
            <ShoppingCartItems />
            <OrderSummaryMain />
          </div>
        </div>
      </div>
    </>
  )
}
export default PageCart
