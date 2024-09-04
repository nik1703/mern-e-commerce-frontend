import React, { useState, useEffect } from 'react'
import AdminAddProduct from './AdminAddProduct'
import { useShopContext } from '../../context/ShopContext'
import ReactPaginate from 'react-paginate'
import { Link } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'

// Icons
import { IoIosArrowDown } from 'react-icons/io'
import { MdEdit } from 'react-icons/md'
import { MdDelete } from 'react-icons/md'

const AdminProductList = ({ showAddProduct, setShowAddProduct }) => {
  const [query, setQuery] = useState('')
  const [categoryOpen, setCategoryOpen] = useState(false)
  const { products, fetchProducts } = useShopContext()
  const [itemOffset, setItemOffset] = useState(0)
  const [itemsPerPage, setItemsPerPage] = useState(10)

  const notify = () => {
    toast.success('Product deleted!', {
      position: 'bottom-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    })
  }

  const filteredProducts = products
    .filter((product) => {
      return product.title.toLowerCase().includes(query.toLowerCase())
    })
    .map((product) => ({
      _id: product._id,
      title: product.title,
      price: product.price,
      mainImage: product.mainImage,
    }))

  const handleDeleteProduct = async (id) => {
    try {
      const response = await fetch(`http://localhost:3002/products/delete/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
		  body: JSON.stringify({
			 isDeleted: true,
		 }),
      })
      const data = await response.json()
      console.log('Product soft deleted', data)
		fetchProducts()
      notify()
    } catch (error) {
      console.error('Error:', error.message)
    }
  }

  useEffect(() => {
    const checkResize = () => {
      if (window.innerWidth < 948) {
        setItemsPerPage(2)
      } else if (window.innerWidth < 1260) {
        setItemsPerPage(4)
      } else if (window.innerWidth < 1596) {
        setItemsPerPage(6)
      } else if (window.innerWidth < 1870) {
        setItemsPerPage(8)
      } else {
        setItemsPerPage(10)
      }
    }

    checkResize()
    window.addEventListener('resize', checkResize)

    return () => window.removeEventListener('resize', checkResize)
  }, [])

  function Items({ currentItems }) {
    return (
      <div className=" mb-2 flex lg:mb-6 xl:mb-10">
        <ul className="product-container flex grow flex-wrap justify-center gap-4">
          {currentItems.length > 0 ? (
            currentItems.map((item) => (
              <div
                className="flex max-w-[15rem] flex-col items-center  justify-between rounded-xl border-2 border-gray-200 md:mx-1 md:mt-5 md:p-4"
                key={item._id}
              >
                <img
                  src={item.mainImage}
                  alt={item.title}
                  className="w-50 h-50 rounded-lg object-cover"
                />
                <div className="mt-2">
                  <h4 className="font-satoshi_regular text-lg">{item.title}</h4>
                </div>
                <p className="font-satoshi_regular text-lg font-bold">
                  ${item.price}
                </p>
                <div className="my-2 flex flex-row items-center">
                  <div className="ml-5 flex flex-row items-center gap-4">
                    <Link to={`/admin/${item._id}`}>
                      <button className="flex items-center gap-1 rounded-lg bg-black px-3 py-1 font-satoshi_regular text-base text-white">
                        <span>
                          <MdEdit />
                        </span>
                        Edit
                      </button>
                    </Link>

                    <button
                      className="flex items-center gap-1 rounded-lg bg-red-500 px-3 py-1 font-satoshi_regular text-base text-white"
                      onClick={() => handleDeleteProduct(item._id)}
                    >
                      <span>
                        <MdDelete />
                      </span>
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="font-satoshi_regular">
              Keine zutreffenden Produkte gefunden.
            </p>
          )}
        </ul>
      </div>
    )
  }

  const endOffset = itemOffset + itemsPerPage
  const currentItems = products.slice(itemOffset, endOffset)
  const pageCount = Math.ceil(products.length / itemsPerPage)
  const filteredPageCount = Math.ceil(filteredProducts.length / itemsPerPage)

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % products.length
    setItemOffset(newOffset)
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <>
      {showAddProduct ? (
        <AdminAddProduct />
      ) : (
        <div>
          <div className="flex flex-row items-center justify-between">
            <h3 className="font-satoshi_regular text-2xl font-bold">
              Product List
            </h3>
            <button
              className="hidden rounded-xl bg-black px-4 py-3 font-satoshi_regular text-white md:block"
              onClick={() => setShowAddProduct(true)}
            >
              Create new Product
            </button>
          </div>
          <div className="mt-10 rounded-lg bg-background px-2 py-5 2xl:px-10">
            <div className="flex w-full flex-row justify-between">
              <form className=" w-3/4 lg:w-1/3">
                <input
                  type="text"
                  placeholder="Search Product"
                  className="w-full rounded-xl border-2 border-slate-500/40 px-4 py-2"
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value)
                  }}
                />
              </form>
              <div className="hidden pl-4 md:block lg:pl-0">
                <div
                  className="relative flex w-full cursor-pointer items-center gap-2 rounded-xl border-2 border-slate-500/30 px-3 py-2"
                  onClick={() => setCategoryOpen(!categoryOpen)}
                  onBlur={() => setTimeout(() => setCategoryOpen(false), 300)}
                  tabIndex="0"
                >
                  Category <IoIosArrowDown />
                  <div
                    className={`absolute left-0 top-10 z-50 mt-2 flex flex-col  items-center justify-start font-satoshi_regular ${categoryOpen ? ' block h-full w-full' : 'hidden h-0 w-0'}`}
                  >
                    <ul
                      className={`flex w-full flex-col items-start justify-center rounded-md bg-white hover:cursor-pointer`}
                    >
                      <li className="w-full px-4 py-2 hover:rounded-md hover:bg-gray-50">
                        T-shirts
                      </li>
                      <li className="w-full px-4 py-2 hover:rounded-md hover:bg-gray-50">
                        Shorts
                      </li>
                      <li className="w-full px-4 py-2 hover:rounded-md hover:bg-gray-50">
                        Shirts
                      </li>
                      <li className="w-full px-4 py-2 hover:rounded-md hover:bg-gray-50">
                        Hoodies
                      </li>
                      <li className="w-full px-4 py-2 hover:rounded-md hover:bg-gray-50">
                        Jeans
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4 w-full rounded-lg border-t-4 border-white lg:mt-8"></div>
            <div className="h-full">
              <div className="flex flex-wrap justify-around">
                <Items currentItems={query ? filteredProducts : currentItems} />
              </div>
              <ReactPaginate
                activeLinkClassName="font-bold"
                className="flex justify-center gap-3 font-satoshi_regular"
                breakLabel="..."
                nextLabel="next ⟶"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={query ? filteredPageCount : pageCount}
                previousLabel="⟵ previous"
                renderOnZeroPageCount={null}
              />
            </div>
            <ToastContainer
              position="bottom-right"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={true}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
              transition:Bounce
            />
          </div>
        </div>
      )}
    </>
  )
}

export default AdminProductList
