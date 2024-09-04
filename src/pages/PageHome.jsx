import CardList from '../components/CardList'
import Hero from '../components/Hero'
import Panel from '../components/Panel'
import DressStyle from '../components/DressStyle'
import CustomerReviews from '../components/CustomerReviews'

function PageHome() {
  return (
    <>
      <Hero />
      <Panel />
      <CardList />
      <DressStyle />
      <CustomerReviews />
    </>
  )
}
export default PageHome
