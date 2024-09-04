import { useShopContext } from '../context/ShopContext'

import Page404 from '../pages/Page404'

const ProtectedRouteAdmin = ({ element }) => {
  const { userData } = useShopContext()

  return userData.role === 'admin' ? element : <Page404 />
}

export default ProtectedRouteAdmin
