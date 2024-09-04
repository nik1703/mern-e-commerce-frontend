import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Register() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [error, setError] = useState('')
  const navigate = useNavigate()

  const registerUser = async (firstName, lastName, email, password) => {
    try {
      const response = await fetch('http://localhost:3002/user/register', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          email: email,
          password: password,
        }),
      })
      if (response.ok) {
        console.log('Registration successful')
        navigate('/')
      } else {
        console.log('Registration failed')
        setError('This email is already registered.')
      }
    } catch (error) {
      console.error('Error registering user:', error)
    }
  }

  const handleRegister = async (e) => {
    e.preventDefault()

    if (!firstName | !lastName || !email || !password) {
      setError('Please fill in all fields.')
      return
    } else {
      registerUser(firstName, lastName, email, password)
    }
  }

  return (
    <form onSubmit={handleRegister} className="flex flex-col">
      {error && <p className="mb-2 text-red-500">{error}</p>}
      <input
        type="text"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        className="mb-2 rounded-md border border-gray-500 px-16 py-2 text-center font-satoshi_regular placeholder-black placeholder-opacity-70
      focus:outline-none focus:ring-2 focus:ring-gray-500"
        placeholder="First name"
      />
      <input
        type="text"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        className="mb-2 rounded-md border border-gray-500 px-16 py-2 text-center font-satoshi_regular placeholder-black placeholder-opacity-70
      focus:outline-none focus:ring-2 focus:ring-gray-500"
        placeholder="Last name"
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="mb-2 rounded-md border border-gray-500 px-16 py-2 text-center font-satoshi_regular placeholder-black placeholder-opacity-70
      focus:outline-none focus:ring-2 focus:ring-gray-500"
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="mb-2 rounded-md border border-gray-500 px-16 py-2 text-center font-satoshi_regular placeholder-black placeholder-opacity-70
      focus:outline-none focus:ring-2 focus:ring-gray-500"
        placeholder="Password"
      />
      <button
        type="submit"
        className="rounded-md bg-black px-4 py-2 font-integral_cf text-white shadow-lg hover:bg-white hover:text-black focus:outline-none focus:ring-2 focus:ring-gray-500"
      >
        Register
      </button>
    </form>
  )
}

export default Register
