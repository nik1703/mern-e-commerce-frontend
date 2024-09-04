import { useShopContext } from '../context/ShopContext'
import Page404 from '../pages/Page404'

const ProtectedRouteUser = ({ element }) => {
  const { userData } = useShopContext()

  return userData.role === 'user' ? element : <Page404 />
}

export default ProtectedRouteUser
