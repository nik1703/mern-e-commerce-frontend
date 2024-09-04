import { NavLink } from 'react-router-dom'
import Button from '../components/Button'

function Page404() {
  return (
    <div className="flex min-h-56 flex-col items-center justify-center gap-4">
      <div className="mt-6 font-satoshi_bold text-3xl">Page not found</div>
      <NavLink to="/">
        <Button primary>Back to Home</Button>
      </NavLink>
    </div>
  )
}
export default Page404
