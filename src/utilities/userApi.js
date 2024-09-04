import { useShopContext } from '../context/ShopContext'

const { setIsLoggedin } = useShopContext()
const userLogout = () => {
  return setIsLoggedin(false)
}

export { userLogout }
