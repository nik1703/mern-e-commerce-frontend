import { createContext, useContext, useEffect, useState } from 'react'
import CartProvider from './CartContext'
import OrderProvider from './OrderContext'
import Cookies from 'js-cookie'

const ShopContext = createContext()

export const useShopContext = () => useContext(ShopContext)

function ShopProvider({ children }) {
  const [filterAuswahl, setFilterAuswahl] = useState([])
  const [filterOpen, setFilterOpen] = useState('false')
  const [selectedDressStyle, setSelectedDressStyle] = useState([])
  const [isLoggedin, setIsLoggedin] = useState(false)
  const [userData, setUserData] = useState({})
  const [sidebarActive, setSidebarActive] = useState('dashboard')
  const [adminSidebarActive, setAdminSidebarActive] = useState(null)
  const [criteria, setCriteria] = useState({
    type: [],
    size: [],
    price: [],
    style: [],
  })
  const [products, setProducts] = useState([])
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)

  // Cookies
  useEffect(() => {
    const authToken = Cookies.get('authToken')
    if (authToken) {
      fetch('http://localhost:3002/user/tokenLogin', {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        method: 'POST',
      })
        .then((response) => response.json())
        .then((data) => {
          setUserData(data)
          setIsLoggedin(true)
        })
    }
  }, [])

  //fetching all reviews from api
  const fetchReviews = async () => {
    try {
      const response = await fetch('http://localhost:3002/reviews')
      const data = await response.json()
      setReviews(data)
    } catch (error) {
      console.error('Error fetching reviews:', error)
    }
  }

  // Fetching Products from the API
  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:3002/products/')
      const data = await response.json()
      setProducts(data.filter((product) => !product.isDeleted))
    } catch (error) {
      console.error('Error fetching products', error.message)
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    fetchProducts()
    fetchReviews()
  }, [])

  // query for review search userDashboard
  const [query, setQuery] = useState('')

  return (
    <ShopContext.Provider
      value={{
        filterAuswahl,
        setFilterAuswahl,
        filterOpen,
        setFilterOpen,
        selectedDressStyle,
        setSelectedDressStyle,
        criteria,
        setCriteria,
        isLoggedin,
        setIsLoggedin,
        userData,
        setUserData,
        products,
        fetchProducts,
        loading,
        reviews,
        sidebarActive,
        setSidebarActive,
        query,
        setQuery,
        fetchReviews,
        setAdminSidebarActive,
        adminSidebarActive,
      }}
    >
      <CartProvider>
        <OrderProvider>{children}</OrderProvider>
      </CartProvider>
    </ShopContext.Provider>
  )
}
export default ShopProvider
