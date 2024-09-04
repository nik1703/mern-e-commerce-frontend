import { Link, useLocation } from 'react-router-dom'

function Breadcrumbs() {
  const location = useLocation()

  let currentLink = ''

  const crumbs = location.pathname
    .split('/')
    .filter((crumb) => crumb !== '' && crumb !== 'home')
    .map((crumb) => {
      currentLink += `/${crumb}`

      return (
        <div
          className="crumb mr-1 inline-block font-satoshi_regular text-black text-opacity-60 after:ml-1 after:content-['>'] last:text-opacity-100 last:after:hidden"
          key={crumb}
        >
          <Link className="hover:underline" to={currentLink}>
            {crumb[0].toUpperCase() + crumb.slice(1)}
          </Link>
        </div>
      )
    })
  return (
    <div>
      <div className="breadcrumbs">
        <div className="crumb mr-1 inline-block font-satoshi_regular text-black text-opacity-60 after:ml-1 after:content-['>']">
          <Link to="/">Home</Link>
        </div>
        {crumbs}
      </div>
    </div>
  )
}
export default Breadcrumbs
