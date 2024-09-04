import { MdEdit } from 'react-icons/md'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../Button'

const AdminEditUser = ({ userId, onUserEdited, notify }) => {
  const navigate = useNavigate()
  const [user, setUser] = useState({
    first_name: '',
    last_name: '',
    email: '',
    role: '',
  })
  const [editFirstName, setEditFirstName] = useState(false)
  const [editLastName, setEditLastName] = useState(false)
  const [editEmail, setEditEmail] = useState(false)
  const [editRole, setEditRole] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!userId) return

    const fetchUser = async () => {
      try {
        const response = await fetch(`http://localhost:3002/user/${userId}`)
        if (!response.ok) {
          throw new Error('Error fetching user')
        }
        const data = await response.json()
        setUser(data.user)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching user', error.message)
        setError('Error fetching user')
        setLoading(false)
      }
    }

    fetchUser()
  }, [userId])

  const handleChange = (fieldName, value) => {
    setUser({
      ...user,
      [fieldName]: value,
    })
  }

  const checkEmailUnique = async (email) => {
    try {
      const response = await fetch('http://localhost:3002/user/')
      const data = await response.json()
      const emailExists = data.some((u) => u.email === email)
      return emailExists
    } catch (error) {
      console.error('Error checking email uniqueness', error.message)
    }
  }

  const updateUserData = async (fieldName, value) => {
    try {
      const response = await fetch(`http://localhost:3002/user/${userId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ [fieldName]: value }),
      })

      if (!response.ok) {
        throw new Error('Error updating user')
      }

      onUserEdited()
      notify('User updated successfully')
    } catch (error) {
      console.error('Error updating user data', error.message)
      setError('Error updating user data')
    }
  }

  const deleteUserAccount = async () => {
    try {
      const response = await fetch(`http://localhost:3002/user/${userId}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Error deleting user account')
      }

      onUserEdited()
      notify('User deleted successfully')
      navigate('/admin')
    } catch (error) {
      console.error('Error deleting user account', error.message)
      setError('Error deleting user account')
    }
  }

  const userSettings = [
    {
      label: 'First Name',
      value: user.first_name,
      edit: editFirstName,
      setEdit: setEditFirstName,
      field: 'first_name',
      type: 'text',
    },
    {
      label: 'Last Name',
      value: user.last_name,
      edit: editLastName,
      setEdit: setEditLastName,
      field: 'last_name',
      type: 'text',
    },
    {
      label: 'Email',
      value: user.email,
      edit: editEmail,
      setEdit: setEditEmail,
      field: 'email',
      type: 'email',
    },
    {
      label: 'Role',
      value: user.role,
      edit: editRole,
      setEdit: setEditRole,
      field: 'role',
    },
  ]

  if (loading) {
    return <p>Loading...</p>
  }

  if (error) {
    return <p>{error}</p>
  }

  return (
    <div className="mt-8 h-1/2 rounded-lg bg-background p-4 md:p-8">
      <h2 className="mb-4 text-2xl font-bold">Edit User</h2>
      {userSettings.map((setting, index) => (
        <div
          key={index}
          className="my-2 rounded-md border border-black px-4 py-2"
        >
          <div className="flex justify-between gap-10">
            <label>{setting.label}</label>
            <div className="flex w-1/2 items-center">
              {setting.edit ? (
                setting.field === 'role' ? (
                  <select
                    name="role"
                    id="pet-select"
                    value={setting.value}
                    onBlur={async (e) => {
                      setting.setEdit(false)
                      setUser((prevState) => ({
                        ...prevState,
                        [setting.field]: e.target.value,
                      }))
                      updateUserData(setting.field, e.target.value)
                    }}
                    onChange={(e) =>
                      handleChange(setting.field, e.target.value)
                    }
                  >
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                  </select>
                ) : (
                  <input
                    autoFocus
                    value={setting.value}
                    type={setting.type}
                    onBlur={async (e) => {
                      if (e.target.value.length <= 3) {
                        setUser((prevState) => ({
                          ...prevState,
                          [setting.field]: user[setting.field],
                        }))
                        setting.setEdit(false)
                        return alert('Please enter a valid value')
                      } else if (setting.field === 'email') {
                        if (await checkEmailUnique(e.target.value)) {
                          setUser((prevState) => ({
                            ...prevState,
                            [setting.field]: user[setting.field],
                          }))
                          setting.setEdit(false)
                          return alert('Email already exists')
                        } else {
                          setting.setEdit(false)
                          setUser((prevState) => ({
                            ...prevState,
                            [setting.field]: e.target.value,
                          }))
                          updateUserData(setting.field, e.target.value)
                        }
                      } else {
                        setting.setEdit(false)
                        setUser((prevState) => ({
                          ...prevState,
                          [setting.field]: e.target.value,
                        }))
                        updateUserData(setting.field, e.target.value)
                      }
                    }}
                    onChange={(e) =>
                      handleChange(setting.field, e.target.value)
                    }
                    className="px-2"
                  />
                )
              ) : (
                <p className="px-2">{setting.value}</p>
              )}
              <MdEdit
                onClick={() => setting.setEdit(!setting.edit)}
                className="cursor-pointer"
              />
            </div>
          </div>
        </div>
      ))}

      <div className="mt-6">
        <p className="text-2xl">Delete User Account</p>
        <p>
          This action cannot be undone. Please be certain before proceeding.
        </p>
        <Button danger className="mt-2" onClick={deleteUserAccount}>
          Delete Account
        </Button>
      </div>
    </div>
  )
}

export default AdminEditUser
