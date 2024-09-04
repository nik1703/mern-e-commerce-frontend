import { createContext, useContext, useEffect, useState } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { useShopContext } from './ShopContext'

const CartContext = createContext()

export const useCartContext = () => useContext(CartContext)

function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([])
  const [localCartItems, setLocalCartItems] = useLocalStorage(
    'shopping-cart',
    []
  )
  const [promoCode, setPromoCode] = useState('')
  const [discountRate, setDiscountRate] = useLocalStorage('discount-rate', 0)
  const [promoApplied, setPromoApplied] = useState(false)
  const [warnText, setWarnText] = useState('')
  const { userData, setUserData } = useShopContext()
  const [cartTotal, setCartTotal] = useState(0)

  useEffect(() => {
    const localCartItems =
      JSON.parse(localStorage.getItem('shopping-cart')) || []
    if (userData?.token && localCartItems.length > 0) {
      const mergedCart = mergeCarts(localCartItems, userData.cart)
      setCartItems(mergedCart)
      localStorage.removeItem('shopping-cart')
      updateCartAPI(mergedCart)
    } else if (userData?.token) {
      setCartItems(userData.cart)
    } else {
      setCartItems(localCartItems)
    }
  }, [userData, localCartItems])

  const mergeCarts = (localCartItems, userCartItems) => {
    const mergedCart = [...userCartItems]
    localCartItems.forEach((localItem) => {
      const existingItem = mergedCart.find(
        (item) => item.productId === localItem.productId
      )
      if (existingItem) {
        existingItem.quantity += localItem.quantity
      } else {
        mergedCart.push(localItem)
      }
    })
    return mergedCart
  }

  const updateCartAPI = async (cartItems) => {
    try {
      const response = await fetch(
        `http://localhost:3002/user/${userData._id}`,
        {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ cart: cartItems }),
        }
      )
      if (!response.ok) throw new Error('Failed to update the cart')
      const data = await response.json()
      setUserData(data)
    } catch (error) {
      console.error('Failed to update the cart', error.message)
    }
  }

  function clearCart() {
    setCartItems([])
  }

  const applyPromoCode = () => {
    if (!promoCode) {
      setWarnText('Please enter a promo code')
      setTimeout(() => setWarnText(''), 3000)
      return
    }
    if (promoCode === 'WELCOME20') {
      if (discountRate > 0) {
        setWarnText('Promo code already applied')
        return
      }
      setDiscountRate(0.2)
      setPromoApplied(true)
      setWarnText('Promo code applied')
    } else {
      setWarnText('Invalid promo code')
    }
    setPromoCode('')
    setTimeout(() => setWarnText(''), 3000)
  }

  const increaseCartQuantity = async (productId, size, color, quantity = 1) => {
    const productToAdd = { productId, size, color, quantity }
    if (userData?.token) {
      const response = await fetch('http://localhost:3002/cart/add-to-cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...productToAdd, userId: userData._id }),
      })
      if (!response.ok) throw new Error('Failed to add the product to the cart')
      const data = await response.json()
      setCartItems(data.cartOfTheUser)
    } else {
      const cartItemsUpdate =
        cartItems.find(
          (item) =>
            item.productId === productId &&
            item.size === size &&
            item.color === color
        ) == null
          ? [...cartItems, productToAdd]
          : cartItems.map((item) =>
              item.productId === productId &&
              item.size === size &&
              item.color === color
                ? { ...item, quantity: item.quantity + quantity }
                : item
            )
      setLocalCartItems(cartItemsUpdate)
    }
  }

  const decreaseCartQuantity = (productId, size, color) => {
    const item = cartItems.find(
      (item) =>
        item.productId === productId &&
        item.size === size &&
        item.color === color
    )
    if (item.quantity > 1) {
      const updatedCart = cartItems.map((item) =>
        item.productId === productId &&
        item.size === size &&
        item.color === color
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
      setCartItems(updatedCart)
      userData?.token
        ? updateCartAPI(updatedCart)
        : setLocalCartItems(updatedCart)
    } else {
      const updatedCart = cartItems.filter(
        (item) =>
          !(
            item.productId === productId &&
            item.size === size &&
            item.color === color
          )
      )
      setCartItems(updatedCart)
      userData?.token
        ? updateCartAPI(updatedCart)
        : setLocalCartItems(updatedCart)
      if (!updatedCart.length) localStorage.removeItem('shopping-cart')
    }
  }

  const removeCartItem = async (productId, size, color) => {
    const updatedCart = cartItems.filter(
      (item) =>
        !(
          item.productId === productId &&
          item.size === size &&
          item.color === color
        )
    )
    setCartItems(updatedCart)
    userData?.token
      ? updateCartAPI(updatedCart)
      : setLocalCartItems(updatedCart)
    if (!updatedCart.length) localStorage.removeItem('shopping-cart')
  }

  const cartQuantity = cartItems.reduce(
    (quantity, item) => item.quantity + quantity,
    0
  )

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeCartItem,
        promoCode,
        discountRate,
        promoApplied,
        warnText,
        applyPromoCode,
        setPromoCode,
        clearCart,
        cartTotal,
        setCartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export default CartProvider
