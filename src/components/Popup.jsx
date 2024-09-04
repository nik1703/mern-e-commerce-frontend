import { useState } from 'react'
import { IoClose } from 'react-icons/io5'
import { Link } from 'react-router-dom'

import { useShopContext } from '../context/ShopContext'

function Popup() {
  const { userData } = useShopContext()
  const [panelIsOpen, setOpen] = useState(true)

  if (userData._id !== undefined) {
    return null
  }

  return (
    panelIsOpen && (
      <div className="flex h-10 w-full items-center justify-center bg-black p-4 font-satoshi_regular text-[10px] text-white sm:px-20 sm:text-sm">
        <p>
          Sign up and get 20% off to your first order.{' '}
          <Link to="/login" onClick={() => setOpen(false)}>
            <span className="cursor-pointer font-satoshi_bold underline underline-offset-2">
              Sign Up Now
            </span>
          </Link>
        </p>
        <IoClose
          className="ml-2 inline cursor-pointer text-xl hover:bg-white hover:text-black sm:ml-10"
          onClick={() => setOpen(false)}
        />
      </div>
    )
  )
}
export default Popup
