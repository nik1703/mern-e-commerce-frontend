import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useShopContext } from '../context/ShopContext'
import Cookies from 'js-cookie'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const { setIsLoggedin, setUserData } = useShopContext()

  const loginUser = async (email, password) => {
    try {
      const response = await fetch('http://localhost:3002/user/login', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
        credentials: 'include',
      })
      const userData = await response.json()

      if (response.status !== 200) {
        setError('Login failed. Please try again.')
      } else {
        console.log('Logged in successfully:')
        setUserData(userData)
        Cookies.set('authToken', userData.token)
        setIsLoggedin(true)
        navigate('/')
      }
    } catch (error) {
      setError('Login failed. Please try again.')
    }
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    if (!email || !password) {
      setError('Please fill in all fields.')
      return
    }

    loginUser(email, password)
  }

  return (
    <form onSubmit={handleLogin} className="flex flex-col">
      {error && <p className="mb-2 text-red-500">{error}</p>}
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="mb-2 rounded-md border border-gray-500 px-16 py-2 text-center font-satoshi_regular placeholder-black placeholder-opacity-70 focus:outline-none focus:ring-2 focus:ring-gray-500"
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="mb-2 rounded-md border border-gray-500 px-16 py-2 text-center font-satoshi_regular placeholder-black placeholder-opacity-70 focus:outline-none focus:ring-2 focus:ring-gray-500"
        placeholder="Password"
      />
      <button
        type="submit"
        className="mb-2 rounded-md bg-black px-4 py-2 font-integral_cf text-white shadow-lg hover:bg-white hover:text-black focus:outline-none focus:ring-2 focus:ring-gray-500"
      >
        Login
      </button>
    </form>
  )
}

export default Login
