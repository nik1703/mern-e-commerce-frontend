import Navbar from './components/Navbar.jsx'
import ShopProvider from './context/ShopContext.jsx'

function App() {
  return (
    <ShopProvider>
      <Navbar />
    </ShopProvider>
  )
}

export default App
