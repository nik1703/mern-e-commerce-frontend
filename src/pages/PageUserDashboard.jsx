import { useState } from 'react'
import { NavLink } from 'react-router-dom'

import UserDashboard from '../components/userDashboard/UserDashboard'
import UserOrders from '../components/userDashboard/UserOrders'
import UserReviews from '../components/userDashboard/UserReviews'
import UserSettings from '../components/userDashboard/UserSettings'

import { useShopContext } from '../context/ShopContext'

// Icons
import { FaShoppingCart } from 'react-icons/fa'
import { BsChatLeftTextFill } from 'react-icons/bs'
import { IoMdSettings } from 'react-icons/io'
import { IoIosArrowBack } from 'react-icons/io'
import { IoIosArrowForward } from 'react-icons/io'
import { BiSolidDashboard } from 'react-icons/bi'
import { useEffect } from 'react'

const PageUserDashboard = () => {
  const { sidebarActive, setSidebarActive, setQuery } = useShopContext()
  const [sidebarDropdown, setSidebarDropdown] = useState(null)
  const [isSidebarMinimized, setIsSidebarMinimized] = useState(false)

  useEffect(() => {
    if (isSidebarMinimized) {
      setSidebarDropdown(null)
    }
  }, [isSidebarMinimized])

  useEffect(() => {
    const checkResize = () => {
      if (window.innerWidth >= 760) {
        setIsSidebarMinimized(false)
      } else {
        setIsSidebarMinimized(true)
      }
    }
    window.addEventListener('resize', checkResize)

    return () => window.removeEventListener('resize', checkResize)
  }, [])

  return (
    <>
      <div>
        <div>
          <div className="flex flex-row">
            <div
              className={`relative flex h-[50rem] flex-col items-start justify-between rounded-r-md border-r-4 bg-background py-12 pl-5 pr-8 font-satoshi_regular md:pl-8 lg:pl-20 ${isSidebarMinimized ? 'w-[3.8rem] overflow-hidden' : 'w-[20rem]'}`}
            >
              {isSidebarMinimized ? (
                <button
                  className="absolute right-0 top-0 block p-3 text-xl text-gray-500 "
                  onClick={() => setIsSidebarMinimized(!isSidebarMinimized)}
                >
                  <IoIosArrowForward />
                </button>
              ) : (
                <button
                  className="absolute right-0 top-0 block p-3 text-xl text-gray-500 "
                  onClick={() => setIsSidebarMinimized(!isSidebarMinimized)}
                >
                  <IoIosArrowBack />
                </button>
              )}
              <div className="flex flex-col justify-between gap-8">
                {/* Dashboard */}
                <div
                  className="text flex items-center gap-3 text-2xl "
                  onClick={() => {
                    setSidebarActive('dashboard')
                    // setSidebarCategory(null)
                  }}
                >
                  <BiSolidDashboard className="text-3xl" />
                  <NavLink to="/user">Dashboard</NavLink>
                </div>
                <div className="flex flex-col gap-4">
                  <div
                    className={`flex cursor-pointer items-center justify-between gap-4 text-xl`}
                    onClick={() => {
                      sidebarDropdown === 'orders'
                        ? setSidebarDropdown(null)
                        : setSidebarDropdown('orders')
                    }}
                  >
                    <div
                      className={`flex cursor-pointer items-center justify-between gap-4 text-xl`}
                      onClick={() => {
                        setSidebarActive('orders')
                        setQuery('')
                      }}
                    >
                      <FaShoppingCart />
                      <p>Orders</p>
                    </div>
                  </div>

                  <div
                    className={`flex cursor-pointer items-center justify-between gap-4 text-xl`}
                    onClick={() => {
                      setSidebarActive('reviews')
                      setQuery('')
                    }}
                  >
                    <div className="flex flex-row items-center gap-4">
                      <BsChatLeftTextFill />
                      <NavLink to="/user">Reviews</NavLink>
                    </div>
                  </div>
                  <div
                    className={`flex cursor-pointer items-center justify-between gap-4 text-xl`}
                    onClick={() => {
                      setSidebarActive('settings')
                    }}
                  >
                    <div className="flex flex-row items-center gap-4 text-xl">
                      <IoMdSettings />
                      <NavLink to="/user">Settings</NavLink>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="h-[50rem] w-full px-5 py-10 pt-0 md:px-20">
              {sidebarActive === 'dashboard' && <UserDashboard />}
              {sidebarActive === 'orders' && <UserOrders />}
              {sidebarActive === 'reviews' && <UserReviews />}
              {sidebarActive === 'settings' && <UserSettings />}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default PageUserDashboard
