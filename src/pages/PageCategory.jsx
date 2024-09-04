import Breadcrumbs from '../components/Breadcrumbs'
import PaginatedItems from '../components/PaginatedItems'
import SideBar from '../components/SideBar'
import { useEffect } from 'react'

function PageCategory() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="mx-[16px] lg:mx-[100px]">
      <div className="my-5">
        <Breadcrumbs />
      </div>
      {/* Sidebar */}
      <div className="flex ">
        <SideBar />
        <PaginatedItems itemsPerPage={6} />
        <div className="block"></div>
      </div>
    </div>
  )
}
export default PageCategory
