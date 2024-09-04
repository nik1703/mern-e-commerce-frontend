import { IoMdArrowForward } from 'react-icons/io'
import { NavLink } from 'react-router-dom'

function CheckoutButton() {
  return (
    <NavLink to="/checkout">
      <button className="flex h-14 w-full items-center justify-center gap-2 rounded-full bg-black px-4 py-2 text-white md:text-lg">
        Go to Checkout <IoMdArrowForward />
      </button>
    </NavLink>
  )
}
export default CheckoutButton
