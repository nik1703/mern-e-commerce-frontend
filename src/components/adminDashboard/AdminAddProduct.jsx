import React, { useEffect, useState } from 'react'
import { FaPercent, FaSpinner } from 'react-icons/fa'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import UploadZone from './UploadZone'

const AdminAddProduct = () => {
  const baseUrl = import.meta.env.VITE_BASE_URL || 'http://localhost:3002'

  const [mainImg, setMainImg] = useState('')
  const [img1, setImg1] = useState('')
  const [img2, setImg2] = useState('')
  const [img3, setImg3] = useState('')

  const initialProductState = {
    title: '',
    mainImage: '',
    img1,
    img2,
    img3,
    price: 0,
    isDiscounted: false,
    discountPercentage: 0,
    type: 'Jeans',
    style: 'Casual',
    description: '',
    descriptionDetails: '',
    details: '',
    sizes: [],
    colors: [],
  }

  const [message, setMessage] = useState(null)
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [product, setProduct] = useState(initialProductState)

  useEffect(() => {
    console.log({ mainImg, img1, img2, img3 })
    if (mainImg && img1 && img2 && img3) {
      setProduct((prevProduct) => ({
        ...prevProduct,
        mainImage: mainImg,
        img1,
        img2,
        img3,
      }))
    }
  }, [mainImg, img1, img2, img3])

  console.log(product)

  const validateForm = () => {
    const newErrors = {}
    if (!product.title) newErrors.title = 'Title is required'
    if (!(mainImg && img1 && img2 && img3))
      newErrors.images = 'Four image is required'
    if (!product.price || product.price <= 0)
      newErrors.price = 'Price is required'
    if (!product.type) newErrors.type = 'Type is required'
    if (!product.style) newErrors.style = 'Style is required'
    if (!product.description) newErrors.description = 'Description is required'
    if (!product.sizes.length) newErrors.sizes = 'Sizes are required'
    if (!product.colors.length) newErrors.colors = 'Colors are required'
    return newErrors
  }

  const createProduct = async (url, data) => {
    console.log(data)
    try {
      const response = await fetch(`${url}/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const responseData = await response.json()
      return responseData
    } catch (error) {
      console.error('Error creating product', error.message)
    }
  }

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target
    const newValue = type === 'checkbox' ? checked : value

    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: newValue,
    }))
  }

  const handleCheckboxChange = (event) => {
    const { name, value, checked } = event.target

    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: checked
        ? [...prevProduct[name], value]
        : prevProduct[name].filter((item) => item !== value),
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const newErrors = validateForm()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setLoading(true)

    try {
      const response = await createProduct(baseUrl, product)
      console.log(response)

      setLoading(false)
      if (response.message === 'Product added successfully') {
        setMessage(response.message)
        toast.success(response.message, {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })

        setTimeout(() => {
          setMessage(null)
        }, 5000)

        setProduct(initialProductState)
        setImg1('')
        setImg2('')
        setImg3('')
        setMainImg('')
      } else {
        // Server-side error
        const errorMessage = response.message || 'An unexpected error occurred.'
        setMessage(errorMessage)
        toast.error(errorMessage, {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
      }
    } catch (error) {
      // Network error or other unexpected errors
      setLoading(false)
      const errorMessage =
        error.message || 'A network error occurred. Please try again.'
      setMessage(errorMessage)
      toast.error(errorMessage, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    }
  }

  return (
    <div className="h-full space-y-4 overflow-y-auto p-4 sm:p-6 lg:p-8">
      <div className="flex flex-row items-center justify-start">
        <h3 className="font-satoshi_regular text-2xl font-bold">Add Product</h3>
      </div>
      {message && (
        <p className="mt-3 text-xs font-bold text-green-500">{message}</p>
      )}
      <div className="mt-10 rounded-lg bg-background px-4 py-8 sm:px-8 xl:px-16">
        <div className="flex w-full flex-col">
          <form className="w-full">
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-3 xl:flex-row">
                <label
                  htmlFor="title"
                  className="w-full font-satoshi_regular text-lg sm:w-1/5"
                >
                  Title:
                  {errors.title && (
                    <p className="mt-1 text-xs text-red-500">{errors.title}</p>
                  )}
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={product.title}
                  onChange={handleChange}
                  className="w-full rounded-lg bg-gray-300/50 px-3 py-2"
                />
              </div>
              <section className="flex gap-3">
                <label
                  htmlFor="images"
                  className="w-full font-satoshi_regular text-lg sm:w-1/5"
                >
                  Images:
                  {errors.images && (
                    <p className="mt-1 text-xs text-red-500">{errors.images}</p>
                  )}
                </label>
                <UploadZone setImage={setMainImg} />
                <UploadZone setImage={setImg1} />
                <UploadZone setImage={setImg2} />
                <UploadZone setImage={setImg3} />
              </section>
              <div className="flex flex-col items-center gap-3 sm:items-start xl:flex-row">
                <label
                  htmlFor="price"
                  className="w-full font-satoshi_regular text-lg sm:w-1/5"
                >
                  Price:
                  {errors.price && (
                    <p className="mt-1 text-xs text-red-500">{errors.price}</p>
                  )}
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={product.price}
                  onChange={handleChange}
                  className="w-full rounded-lg bg-gray-300/50 px-3 py-2"
                />
              </div>
              <div className="flex items-center gap-3">
                <label
                  htmlFor="isDiscounted"
                  className="font-satoshi_regular text-lg"
                >
                  Is Discounted?
                </label>
                <input
                  type="checkbox"
                  id="isDiscounted"
                  name="isDiscounted"
                  checked={product.isDiscounted}
                  onChange={handleChange}
                  className="h-5 w-5"
                />
              </div>
              <div className="flex flex-col gap-3 xl:flex-row">
                <label
                  htmlFor="discountPercentage"
                  className="w-full font-satoshi_regular text-lg xl:w-1/5"
                >
                  Discount Percentage:
                </label>
                <div className="relative flex w-full items-center">
                  <FaPercent className="absolute ml-4 h-5 w-3 text-black text-opacity-40" />
                  <input
                    type="number"
                    id="discountPercentage"
                    name="discountPercentage"
                    value={product.discountPercentage}
                    onChange={handleChange}
                    className="w-full rounded-lg bg-gray-300/50 px-3 py-2 pl-10"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-3 xl:flex-row">
                <label
                  htmlFor="type"
                  className="w-full font-satoshi_regular text-lg sm:w-1/5"
                >
                  Type:
                </label>
                <select
                  id="type"
                  name="type"
                  value={product.type}
                  onChange={handleChange}
                  className="w-full rounded-lg bg-gray-300/50 px-3 py-2"
                >
                  {['Shirts', 'Jeans', 'T-shirts', 'Shorts']
                    .sort()
                    .map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                </select>
              </div>
              <div className="flex flex-col gap-3 xl:flex-row">
                <label
                  htmlFor="style"
                  className="w-full font-satoshi_regular text-lg sm:w-1/5"
                >
                  Style:
                </label>
                <select
                  id="style"
                  name="style"
                  value={product.style}
                  onChange={handleChange}
                  className="w-full rounded-lg bg-gray-300/50 px-3 py-2"
                >
                  <option value="Casual">Casual</option>
                  <option value="Formal">Formal</option>
                  <option value="Sporty">Gym</option>
                  <option value="Party">Party</option>
                </select>
              </div>
              <div className="flex flex-col gap-3 xl:flex-row">
                <label
                  htmlFor="description"
                  className="w-full font-satoshi_regular text-lg sm:w-1/5"
                >
                  Description:
                  {errors.description && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.description}
                    </p>
                  )}
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={product.description}
                  onChange={handleChange}
                  className="w-full rounded-lg bg-gray-300/50 px-3 py-2"
                ></textarea>
              </div>
              <div className="flex flex-col gap-3 xl:flex-row">
                <label
                  htmlFor="descriptionDetails"
                  className="w-full font-satoshi_regular text-lg xl:w-1/5"
                >
                  Description Details:
                </label>
                <textarea
                  id="descriptionDetails"
                  name="descriptionDetails"
                  value={product.descriptionDetails}
                  onChange={handleChange}
                  className="w-full rounded-lg bg-gray-300/50 px-3 py-2"
                ></textarea>
              </div>
              <div className="flex flex-col gap-3 xl:flex-row">
                <label
                  htmlFor="details"
                  className="w-full font-satoshi_regular text-lg sm:w-1/5"
                >
                  Details:
                </label>
                <textarea
                  id="details"
                  name="details"
                  value={product.details}
                  onChange={handleChange}
                  className="w-full rounded-lg bg-gray-300/50 px-3 py-2"
                ></textarea>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <label
                  htmlFor="sizes"
                  className="w-full font-satoshi_regular text-lg sm:w-1/5"
                >
                  Sizes:
                  {errors.sizes && (
                    <p className="mt-1 text-xs text-red-500">{errors.sizes}</p>
                  )}
                </label>
                <div className="flex w-full flex-wrap gap-3">
                  {['Small', 'Medium', 'Large', 'X-Large'].map((size) => (
                    <div key={size} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`size-${size}`}
                        name="sizes"
                        value={size}
                        checked={product.sizes.includes(size)}
                        onChange={handleCheckboxChange}
                        className="mr-2"
                      />
                      <label
                        htmlFor={`size-${size}`}
                        className="font-satoshi_regular text-lg"
                      >
                        {size}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <label
                  htmlFor="colors"
                  className="w-full font-satoshi_regular text-lg sm:w-1/5"
                >
                  Colors:
                  {errors.colors && (
                    <p className="mt-1 text-xs text-red-500">{errors.colors}</p>
                  )}
                </label>
                <div className="flex w-full flex-wrap gap-3">
                  {[
                    'black',
                    'silver',
                    'gray',
                    'white',
                    'maroon',
                    'red',
                    'purple',
                    'fuchsia',
                    'green',
                    'lime',
                  ].map((color) => (
                    <div key={color} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`color-${color}`}
                        name="colors"
                        value={color}
                        checked={product.colors.includes(color)}
                        onChange={handleCheckboxChange}
                        className="mr-2"
                      />
                      <label
                        htmlFor={`color-${color}`}
                        className="font-satoshi_regular text-lg"
                      >
                        {color}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {loading ? (
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  className="mt-5 rounded-lg bg-black px-3 py-2 text-white"
                  disabled
                >
                  Adding Product...
                </button>
                <FaSpinner className="flex animate-spin items-center" />
              </div>
            ) : (
              <button
                type="submit"
                onClick={handleSubmit}
                className="mt-5 rounded-lg bg-black px-3 py-2 text-white"
              >
                Add Product
              </button>
            )}
            <ToastContainer />
          </form>
        </div>
      </div>
    </div>
  )
}

export default AdminAddProduct
