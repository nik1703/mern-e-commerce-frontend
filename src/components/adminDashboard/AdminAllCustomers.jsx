import { useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'

const AdminAllCustomers = () => {
  const [customers, setCustomers] = useState([])
  const [query, setQuery] = useState('')
  const [editingUserId, setEditingUserId] = useState(null)
  const [sortCustomer, setSortCustomer] = useState('newest')

  const notify = () => {
    toast.success('User Updated', {
      position: 'bottom-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    })
  }

  const notifyDelete = () => {
    toast.error('User Deleted', {
      position: 'bottom-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    })
  }

  const filteredCustomers = customers
    .filter((customer) => {
      const searchQuery = query.toLowerCase()
      return (
        customer._id.toLowerCase().includes(searchQuery) ||
        customer.first_name.toLowerCase().includes(searchQuery) ||
        customer.last_name.toLowerCase().includes(searchQuery) ||
        customer.email.toLowerCase().includes(searchQuery) ||
        customer.role.toLowerCase().includes(searchQuery) ||
        new Date(customer.createdAt)
          .toLocaleDateString()
          .toLowerCase()
          .includes(searchQuery) ||
        new Date(customer.updatedAt)
          .toLocaleDateString()
          .toLowerCase()
          .includes(searchQuery)
      )
    })
    .map((customer) => ({
      _id: customer._id,
      first_name: customer.first_name,
      last_name: customer.last_name,
      email: customer.email,
      role: customer.role,
      createdAt: customer.createdAt,
      updatedAt: customer.updatedAt,
    }))

  const sortedCustomers = [...filteredCustomers]
    .filter((customer) => {
      if (sortCustomer === 'admin') {
        return customer.role === 'admin'
      } else if (sortCustomer === 'user') {
        return customer.role === 'user'
      }
      return true
    })
    .sort((a, b) => {
      if (sortCustomer === 'newest') {
        return new Date(b.createdAt) - new Date(a.createdAt)
      } else if (sortCustomer === 'oldest') {
        return new Date(a.createdAt) - new Date(b.createdAt)
      } else if (sortCustomer === 'first-ascending') {
        return a.first_name.localeCompare(b.first_name)
      } else if (sortCustomer === 'first-descending') {
        return b.first_name.localeCompare(a.first_name)
      } else if (sortCustomer === 'last-ascending') {
        return a.last_name.localeCompare(b.last_name)
      } else if (sortCustomer === 'last-descending') {
        return b.last_name.localeCompare(a.last_name)
      }
    })

  const fetchCustomers = async () => {
    try {
      const response = await fetch('http://localhost:3002/user/')
      const data = await response.json()
      setCustomers(data.filter((customer) => !customer.isDeleted))
    } catch (error) {
      console.error('Error fetching customers', error.message)
    }
  }

  useEffect(() => {
    fetchCustomers()
  }, [])

  const handleEditClick = (userId) => {
    setEditingUserId(userId)
  }

  const handleCancelClick = () => {
    setEditingUserId(null)
  }

  const handleUpdateUser = async (userId, updatedUser) => {
    if (updatedUser.email) {
      const emailExists = customers.some(
        (customer) =>
          customer.email === updatedUser.email && customer._id !== userId
      )
      if (emailExists) {
        alert('Email already exists')
        return
      }
    }
    try {
      const response = await fetch(`http://localhost:3002/user/${userId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedUser),
      })
      const data = await response.json()
      if (data) {
        notify()
        fetchCustomers()
        setEditingUserId(null)
      }
    } catch (error) {
      console.error('Error updating user', error.message)
    }
  }

  const handleDeleteUser = async (userId) => {
    try {
      const response = await fetch(`http://localhost:3002/user/${userId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          isDeleted: true,
        }),
      })
      const data = await response.json()
      fetchCustomers()
      notifyDelete()
      setEditingUserId(null)
    } catch (error) {
      console.error('Error deleting user', error.message)
    }
  }

  function Customers({ currentCustomers }) {
    const [newFirstName, setNewFirstName] = useState('')
    const [newLastName, setNewLastName] = useState('')
    const [newEmail, setNewEmail] = useState('')
    const [selectedRole, setSelectedRole] = useState('')
    return (
      <table className="min-w-full border border-gray-200 bg-white">
        <thead className="bg-gray-100">
          <tr>
            <th className="border-b border-gray-200 px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">
              ID
            </th>
            <th className="border-b border-gray-200 px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">
              First Name
            </th>
            <th className="border-b border-gray-200 px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">
              Last Name
            </th>
            <th className="border-b border-gray-200 px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">
              Email
            </th>
            <th className="border-b border-gray-200 px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">
              Role
            </th>
            <th className="border-b border-gray-200 px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">
              Joined Date
            </th>
            <th className="border-b border-gray-200 px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">
              Last Updated Date
            </th>
            <th className="border-b border-gray-200 px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">
              Edit
            </th>
            <th
              className={`border-b border-gray-200 px-4 py-3 text-left text-xs font-medium uppercase text-gray-500 ${editingUserId ? 'block' : 'hidden'}`}
            >
              Delete
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {currentCustomers.map((customer) => (
            <tr
              key={customer._id}
              className={`${customer._id === editingUserId ? 'bg-gray-100' : ''}`}
            >
              <td className="whitespace-no-wrap border-b border-gray-200 px-4 py-4">
                <div className="text-sm leading-5 text-gray-900">
                  {customer._id}
                </div>
              </td>
              <td className="whitespace-no-wrap border-b border-gray-200 px-4 py-4">
                <div className="text-sm leading-5 text-gray-900">
                  {editingUserId === customer._id ? (
                    <input
                      type="text"
                      value={newFirstName ? newFirstName : customer.first_name}
                      onChange={(e) => setNewFirstName(e.target.value)}
                    />
                  ) : (
                    <>{customer.first_name}</>
                  )}
                </div>
              </td>
              <td className="whitespace-no-wrap border-b border-gray-200 px-4 py-4">
                <div className="text-sm leading-5 text-gray-900">
                  {editingUserId === customer._id ? (
                    <input
                      type="text"
                      value={newLastName ? newLastName : customer.last_name}
                      onChange={(e) => setNewLastName(e.target.value)}
                    />
                  ) : (
                    <>{customer.last_name}</>
                  )}
                </div>
              </td>
              <td className="whitespace-no-wrap border-b border-gray-200 px-4 py-4">
                <div className="text-sm leading-5 text-gray-900">
                  {editingUserId === customer._id ? (
                    <input
                      type="text"
                      value={newEmail ? newEmail : customer.email}
                      onChange={(e) => setNewEmail(e.target.value)}
                    />
                  ) : (
                    <>{customer.email}</>
                  )}
                </div>
              </td>
              <td className="whitespace-no-wrap border-b border-gray-200 px-4 py-4">
                <div className="text-sm leading-5 text-gray-900">
                  {editingUserId === customer._id ? (
                    <select
                      value={selectedRole ? selectedRole : customer.role}
                      onChange={(e) => setSelectedRole(e.target.value)}
                    >
                      <option value="admin">admin</option>
                      <option value="user">user</option>
                    </select>
                  ) : (
                    <>{customer.role}</>
                  )}
                </div>
              </td>
              <td className="whitespace-no-wrap border-b border-gray-200 px-4 py-4">
                <div className="text-sm leading-5 text-gray-900">
                  {new Date(customer.createdAt).toLocaleDateString()}
                </div>
              </td>
              <td className="whitespace-no-wrap border-b border-gray-200 px-4 py-4">
                <div className="text-sm leading-5 text-gray-900">
                  {new Date(customer.updatedAt).toLocaleDateString()}
                </div>
              </td>
              <td className="whitespace-no-wrap border-b border-gray-200 px-4 py-4">
                <div className="text-sm leading-5 text-gray-900">
                  {editingUserId === customer._id ? (
                    <div className="flex">
                      <button
                        onClick={() => {
                          const updatedUser = {}
                          if (newFirstName)
                            updatedUser.first_name = newFirstName
                          if (newLastName) updatedUser.last_name = newLastName
                          if (newEmail) updatedUser.email = newEmail
                          if (selectedRole) updatedUser.role = selectedRole
                          handleUpdateUser(customer._id, updatedUser)
                        }}
                        className="rounded-md bg-green-500 px-2 py-1 text-white hover:bg-green-400"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => handleCancelClick(customer._id)}
                        className="ml-2 rounded-md bg-red-500 px-2 py-1 text-white hover:bg-red-400"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleEditClick(customer._id)}
                      className="rounded-md bg-black px-2 py-1 text-sm text-white hover:bg-black/80"
                    >
                      Edit
                    </button>
                  )}
                </div>
              </td>
              <td
                className={`whitespace-no-wrap border-b border-gray-200 px-4 py-4 ${customer._id === editingUserId ? 'block' : 'hidden'}`}
              >
                <div className="text-sm leading-5 text-gray-900">
                  <button
                    className="rounded-md bg-red-600 px-2 py-1 text-sm text-white hover:bg-red-500/80"
                    onClick={() => handleDeleteUser(customer._id)}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    )
  }

  return (
    <div className="h-[121rem] w-full">
      <h2 className="mb-4 text-2xl font-bold">All Customers</h2>
      <div className="mt-8 h-1/2 w-full overflow-y-auto rounded-lg bg-background p-4 md:p-8">
        <div className="my-3 flex w-full flex-row justify-between">
          <form className=" w-3/4 lg:w-1/3">
            <input
              type="text"
              placeholder="Search User"
              className="w-full rounded-xl border-2 border-slate-500/40 px-4 py-2"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value)
              }}
            />
          </form>
          <div className="hidden pl-4 md:block lg:pl-0">
            <select
              className="relative flex w-full cursor-pointer items-center gap-2 rounded-xl border-2 border-slate-500/30 px-3 py-2"
              onChange={(e) => setSortCustomer(e.target.value)}
              value={sortCustomer}
            >
              <option value="newest">Newest first</option>
              <option value="oldest">Oldest first</option>
              <option value="first-ascending">First Name A-Z</option>
              <option value="first-descending">First Name Z-A</option>
              <option value="last-ascending">Last Name A-Z</option>
              <option value="last-descending">Last Name Z-A</option>
              <option value="admin">Admin only</option>
              <option value="user">User only</option>
            </select>
          </div>
        </div>
        <div className="overflow-x-auto">
          <Customers currentCustomers={sortedCustomers} />
        </div>
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition:Bounce
      />
    </div>
  )
}

export default AdminAllCustomers
