import { MdEdit } from 'react-icons/md'
import { useShopContext } from '../../context/ShopContext'
import { useState } from 'react'
import Button from '../Button'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'

const UserSettings = () => {
  const { userData, setUserData, setIsLoggedin, reviews } = useShopContext()
  console.log(reviews)
  const [currentUserData, setCurrentUserData] = useState(userData)
  const { first_name, last_name, email } = currentUserData
  const [editFirstName, setEditFirstName] = useState(false)
  const [editLastName, setEditLastName] = useState(false)
  const [editEmail, setEditEmail] = useState(false)
  const navigate = useNavigate()

  const handleChange = (fieldName, value) => {
    setCurrentUserData({
      ...currentUserData,
      [fieldName]: value,
    })
  }

  const checkEmailUnique = async (email) => {
    try {
      const response = await fetch(`http://localhost:3002/user/`)
      const data = await response.json()
      const emailExists = data.some((user) => user.email === email)
      return emailExists
    } catch (error) {
      console.error('Error checking email uniqueness', error.message)
    }
  }

  const updateUserData = async (fieldName, value) => {
    const userID = userData._id

    if (fieldName === 'email') {
    }

    try {
      fetch(`http://localhost:3002/user/${userID}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ [fieldName]: value }),
      })
    } catch (error) {
      console.error('Error updating user data', error.message)
    }
  }

  const deleteAccount = async () => {
    const userID = userData._id
    try {
      fetch(`http://localhost:3002/user/${userID}`, {
        method: 'DELETE',
      })
      setUserData({})
      setIsLoggedin(false)
      Cookies.remove('authToken')
      return navigate('/')
    } catch (error) {
      console.error('Error deleting user account', error.message)
    }
  }

  let userSettings = [
    {
      label: 'Firstname',
      value: first_name,
      currentValue: first_name,
      edit: editFirstName,
      setEdit: setEditFirstName,
      field: 'first_name',
      type: 'text',
    },
    {
      label: 'Lastname',
      value: last_name,
      currentValue: last_name,
      edit: editLastName,
      setEdit: setEditLastName,
      field: 'last_name',
      type: 'text',
    },
    {
      label: 'Email',
      value: email,
      currentValue: email,
      edit: editEmail,
      setEdit: setEditEmail,
      field: 'email',
      type: 'email',
    },
  ]

  {
    /* <div className="mt-8 h-1/2 rounded-lg bg-slate-200/50 p-4 md:p-8">
<h2 className="mb-4 text-2xl font-bold">Edit User</h2> */
  }

  return (
    <div className="font-satoshi_regular ">
      <div className=" rounded-lg p-4 md:p-8">
        <h2 className="text-2xl font-bold">Profile Settings</h2>
        <p className="mb-4">Adjust the key information of your account.</p>
        {userSettings.map((setting, index) => {
          return (
            <div
              key={index}
              className="my-2 rounded-md border border-black px-4 py-2"
            >
              <div className="flex justify-between gap-10">
                <label className="">{setting.label}</label>
                <div className="flex w-1/2 items-center">
                  {setting.edit ? (
                    <input
                      autoFocus
                      value={setting.value}
                      type={setting.type}
                      onBlur={async (e) => {
                        if (e.target.value.length <= 2) {
                          setCurrentUserData(userData)
                          setting.setEdit(!setting.edit)
                          return alert('Please enter a valid value')
                        } else if (setting.field === 'email') {
                          if (await checkEmailUnique(e.target.value)) {
                            console.log(e.target.value)
                            setCurrentUserData(userData)
                            setting.setEdit(!setting.edit)
                            return alert('Email already exists')
                          } else {
                            Cookies.remove('authToken')
                            setting.setEdit(!setting.edit)
                            setUserData({
                              ...userData,
                              [setting.field]: e.target.value,
                            })
                            updateUserData(setting.field, e.target.value)
                          }
                        } else {
                          setting.setEdit(!setting.edit)
                          setUserData({
                            ...userData,
                            [setting.field]: e.target.value,
                          })
                          updateUserData(setting.field, e.target.value)
                        }
                      }}
                      onChange={(e) =>
                        handleChange(setting.field, e.target.value)
                      }
                      className=" px-2"
                    />
                  ) : (
                    <p className=" px-2">{setting.value}</p>
                  )}

                  <MdEdit
                    onClick={() => setting.setEdit(!setting.edit)}
                    className="cursor-pointer"
                  />
                </div>
              </div>
            </div>
          )
        })}
        <div className="mt-6">
          <p className="text-2xl">Delete your account</p>
          <p>
            This action cannot be undone. Please be certain before proceeding.
          </p>
          <Button danger className="mt-2" onClick={deleteAccount}>
            Delete Account
          </Button>
        </div>{' '}
      </div>
    </div>
  )
}

export default UserSettings
