import { useState, useEffect } from 'react'
import ReactPaginate from 'react-paginate'
import Card from './Card'
// import { products } from '../data/products'
import { useShopContext } from '../context/ShopContext'
import { Link } from 'react-router-dom'

function PaginatedItems({ itemsPerPage }) {
  const [itemOffset, setItemOffset] = useState(0)
  const { filterOpen, setFilterOpen, criteria, products } = useShopContext()

  useEffect(() => {
    setItemOffset(0)
  }, [criteria])

  // Filterlogic
  let filteredProducts = products.filter((product) => {
    switch (true) {
      // Kleidungsstück, Größe, style, Price
      case criteria.type.length > 0 &&
        criteria.size.length > 0 &&
        criteria.style.length > 0 &&
        criteria.price.length > 0:
        if (product.isDiscounted) {
          return (
            criteria.type.includes(product.type) &&
            criteria.size.includes(product.sizes) &&
            criteria.style.includes(product.style) &&
            criteria.price[0] <= product.discountedPrice &&
            criteria.price[1] >= product.discountedPrice
          )
        } else {
          return (
            criteria.type.includes(product.type) &&
            criteria.size.includes(product.sizes) &&
            criteria.style.includes(product.style) &&
            criteria.price[0] <= product.price &&
            criteria.price[1] >= product.price
          )
        }
      // Kleidungsstück, Größe, style
      case criteria.type.length > 0 &&
        criteria.size.length > 0 &&
        criteria.style.length > 0:
        return (
          criteria.type.includes(product.type) &&
          criteria.size.includes(product.sizes) &&
          criteria.style.includes(product.style)
        )
      // Kleidungsstück, Größe, Price
      case criteria.type.length > 0 &&
        criteria.size.length > 0 &&
        criteria.price.length > 0:
        if (product.isDiscounted) {
          return (
            criteria.type.includes(product.type) &&
            criteria.size.includes(product.sizes) &&
            criteria.price[0] <= product.discountedPrice &&
            criteria.price[1] >= product.discountedPrice
          )
        } else {
          return (
            criteria.type.includes(product.type) &&
            criteria.size.includes(product.sizes) &&
            criteria.price[0] <= product.price &&
            criteria.price[1] >= product.price
          )
        }
      // Größe, style, Price
      case criteria.size.length > 0 &&
        criteria.style.length > 0 &&
        criteria.price.length > 0:
        if (product.isDiscounted) {
          return (
            criteria.size.includes(product.sizes) &&
            criteria.style.includes(product.style) &&
            criteria.price[0] <= product.discountedPrice &&
            criteria.price[1] >= product.discountedPrice
          )
        } else {
          return (
            criteria.size.includes(product.sizes) &&
            criteria.style.includes(product.style) &&
            criteria.price[0] <= product.price &&
            criteria.price[1] >= product.price
          )
        }
      // Kleidungsstück, style, Price
      case criteria.type.length > 0 &&
        criteria.style.length > 0 &&
        criteria.price.length > 0:
        if (product.isDiscounted) {
          return (
            criteria.type.includes(product.type) &&
            criteria.style.includes(product.style) &&
            criteria.price[0] <= product.discountedPrice &&
            criteria.price[1] >= product.discountedPrice
          )
        } else {
          return (
            criteria.type.includes(product.type) &&
            criteria.style.includes(product.style) &&
            criteria.price[0] <= product.price &&
            criteria.price[1] >= product.price
          )
        }
      // Kleidungsstück, Größe
      case criteria.type.length > 0 && criteria.size.length > 0:
        return (
          criteria.type.includes(product.type) &&
          criteria.size.includes(product.sizes)
        )
      // Kleidungsstück, style
      case criteria.type.length > 0 && criteria.style.length > 0:
        return (
          criteria.type.includes(product.type) &&
          criteria.style.includes(product.style)
        )

      // Größe, style
      case criteria.size.length > 0 && criteria.style.length > 0:
        return (
          criteria.size.includes(product.sizes) &&
          criteria.style.includes(product.style)
        )
      // Price, style
      case criteria.price.length > 0 && criteria.style.length > 0:
        if (product.isDiscounted) {
          return (
            criteria.price[0] <= product.discountedPrice &&
            criteria.price[1] >= product.discountedPrice &&
            criteria.style.includes(product.style)
          )
        } else {
          return (
            criteria.price[0] <= product.price &&
            criteria.price[1] >= product.price &&
            criteria.style.includes(product.style)
          )
        }
      // Price, Kleidungsstück
      case criteria.price.length > 0 && criteria.type.length > 0:
        if (product.isDiscounted) {
          return (
            criteria.price[0] <= product.discountedPrice &&
            criteria.price[1] >= product.discountedPrice &&
            criteria.type.includes(product.type)
          )
        } else {
          return (
            criteria.price[0] <= product.price &&
            criteria.price[1] >= product.price &&
            criteria.type.includes(product.type)
          )
        }

      // Price, Größe
      case criteria.price.length > 0 && criteria.size.length > 0:
        if (product.isDiscounted) {
          return (
            criteria.price[0] <= product.discountedPrice &&
            criteria.price[1] >= product.discountedPrice &&
            criteria.size.includes(product.sizes)
          )
        } else {
          return (
            criteria.price[0] <= product.price &&
            criteria.price[1] >= product.price &&
            criteria.size.includes(product.sizes)
          )
        }
      // Kleidungsstück
      case criteria.type.length > 0:
        return criteria.type.includes(product.type)
      // Größe
      case criteria.size.length > 0:
        return criteria.size.includes(product.sizes)
      // style
      case criteria.style.length > 0:
        return criteria.style.includes(product.style)
      // Price
      case criteria.price.length > 0:
        if (product.isDiscounted) {
          return (
            criteria.price[0] <= product.discountedPrice &&
            criteria.price[1] >= product.discountedPrice
          )
        } else {
          return (
            criteria.price[0] <= product.price &&
            criteria.price[1] >= product.price
          )
        }
      // Default
      default:
        return product
    }
  })

  let items = filteredProducts
  console.log(items, criteria, products)
  function Items({ currentItems }) {
    return (
      <div className=" mb-32 flex  ">
        <ul className="product-container flex grow flex-wrap justify-center gap-4">
          {currentItems.length > 0 ? (
            currentItems.map((item, index) => (
              <li className="hover:pointer" key={index}>
                <Link to={`/product/${item._id}`}>
                  <Card product={item} />
                </Link>
              </li>
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
  const currentItems = items.slice(itemOffset, endOffset)
  const pageCount = Math.ceil(items.length / itemsPerPage)

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items.length
    setItemOffset(newOffset)
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <div className="flex w-full flex-col items-center ">
      <div className="flex items-center">
        <button
          className="ml-auto pb-3 md:hidden"
          onClick={() => {
            setFilterOpen(!filterOpen)
          }}
        >
          <img src="/images/icons/filter.svg" alt="filterItems" />
        </button>
      </div>
      <Items currentItems={currentItems} />
      <ReactPaginate
        activeLinkClassName="font-bold"
        className="flex justify-center gap-3 font-satoshi_regular"
        breakLabel="..."
        nextLabel="next ⟶"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="⟵ previous"
        renderOnZeroPageCount={null}
      />
    </div>
  )
}
export default PaginatedItems
