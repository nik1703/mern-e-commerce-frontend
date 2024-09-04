import { useState } from 'react'
import { FaAngleDown } from 'react-icons/fa'
import Button from './Button'
import { useShopContext } from '../context/ShopContext'

// wählbare optionen
const sizes = [
  'XX-Small',
  'X-Small',
  'Small',
  'Medium',
  'Large',
  'X-Large',
  'XX-Large',
  '3X-Large',
  '4X-Large',
]
const styles = ['Casual', 'Formal', 'Party', 'Gym']
const type = ['T-shirts', 'Shorts', 'Shirts', 'Hoodie', 'Jeans']
// const colors = [
//   { color: 'Black', className: 'bg-black' },
//   { color: 'Red', className: 'bg-red-600' },
//   { color: 'Green', className: 'bg-green-500' },
//   { color: 'Yellow', className: 'bg-yellow-400' },
//   { color: 'Blue', className: 'bg-blue-600' },
// ]

// Filterkriterien

function SideBar() {
  const { criteria, setCriteria } = useShopContext()
  console.log(criteria, criteria.style)
  // open and close accordion
  const [priceAccordionIsOpen, setPriceAccordionIsOpen] = useState(true)
  // const [colorsAccordionIsOpen, setColorsAccordionIsOpen] = useState(false)
  const [sizeAccordionIsOpen, setSizeAccordionIsOpen] = useState(true)
  const [styleAccordionIsOpen, setStyleAccordionIsOpen] = useState(true)

  // open filter
  const { filterOpen, setFilterOpen } = useShopContext()
  const [selectedPrice, setSelectedPrice] = useState([])

  // füge oder entferne filteroptionen onclick
  const handleClickstyle = (e) => {
    if (criteria.style.includes(e.target.innerText)) {
      criteria.style = criteria.style.filter(
        (style) => style !== e.target.innerText
      )
      e.target.classList.remove('text-black')
      e.target.classList.remove('font-bold')
    } else {
      setCriteria({
        ...criteria,
        style: [...criteria.style, e.target.innerText],
      })
      e.target.classList.toggle('text-black')
      e.target.classList.toggle('font-bold')
    }
    console.log(criteria)
  }

  const handleClicktype = (e) => {
    if (criteria.type.includes(e.target.innerText)) {
      criteria.type = criteria.type.filter(
        (string) => string !== e.target.innerText
      )
      e.target.classList.remove('text-black')
      e.target.classList.remove('font-bold')
    } else {
      setCriteria({
        ...criteria,
        type: [...criteria.type, e.target.innerText],
      })
      e.target.classList.toggle('text-black')
      e.target.classList.toggle('font-bold')
    }
  }

  const handleClickSize = (e) => {
    if (criteria.size.includes(e.target.innerText)) {
      criteria.size = criteria.size.filter(
        (size) => size !== e.target.innerText
      )
      e.target.classList.remove('text-white')
      e.target.classList.remove('bg-black')
    } else {
      setCriteria({
        ...criteria,
        size: [...criteria.size, e.target.innerText],
      })
      e.target.classList.toggle('text-white')
      e.target.classList.toggle('bg-black')
    }
  }

  return (
    // Sidebar desktop
    <>
      <div
        className={`left-0 top-0 z-30
       mr-4   h-fit w-full space-y-6 rounded-3xl border-2 bg-white p-6 md:static md:top-full md:block md:w-[18rem] md:min-w-[18rem] ${filterOpen ? 'hidden' : 'absolute'}`}
      >
        <div className="flex justify-between">
          <h4 className="font-satoshi_bold text-xl">Filters</h4>
          {/* Filter Icon */}
          <button
            className=" rounded-full md:pointer-events-none"
            onClick={() => setFilterOpen(!filterOpen)}
          >
            {filterOpen ? (
              <img
                src="/images/icons/filter.svg"
                alt="filterItems"
                className="md:hidden"
              />
            ) : (
              <p className="font-satoshi_bold md:hidden">X</p>
            )}
          </button>
        </div>
        <div className="font-satoshi_regular text-base text-gray-400">
          {type.map((type, index) => {
            return (
              <p
                onClick={handleClicktype}
                key={index}
                className="hover:cursor-pointer"
              >
                {type}
              </p>
            )
          })}
        </div>
        {/* Price Accordion */}
        <h4
          className=" flex font-satoshi_bold text-xl"
          onClick={() => setPriceAccordionIsOpen(!priceAccordionIsOpen)}
        >
          <span className="">Price </span>
          <div className="ml-auto inline-block">
            {priceAccordionIsOpen ? (
              <FaAngleDown className=" inline   transition-transform duration-500 hover:cursor-pointer" />
            ) : (
              <FaAngleDown className=" inline rotate-90  transition-transform duration-500 hover:cursor-pointer" />
            )}
          </div>
        </h4>
        <div className={`${priceAccordionIsOpen ? 'flex' : 'hidden'} `}>
          <div className="flex w-[18rem] justify-between">
            <input
              type="number"
              placeholder="Min"
              name="minprice"
              id=""
              value={selectedPrice[0]}
              onChange={(e) => {
                if (e.target.value === '') {
                  return setSelectedPrice([])
                } else {
                  return setSelectedPrice([e.target.value, selectedPrice[1]])
                }
              }}
              className=" w-[4rem] "
            />
            <span>to</span>
            <input
              type="number"
              placeholder="Max"
              name="maxprice"
              value={selectedPrice[1]}
              onChange={(e) => {
                if (e.target.value === '') {
                  return setSelectedPrice([])
                } else {
                  return setSelectedPrice([selectedPrice[0], e.target.value])
                }
              }}
              id=""
              className="w-[4rem] "
            />
          </div>
        </div>
        {/* colors accordion */}
        {/* <h4
          className="flex font-satoshi_bold text-xl"
          onClick={() => setColorsAccordionIsOpen(!colorsAccordionIsOpen)}
        >
          <p className="mr-auto inline-block">Colors </p>
          <div>
            {colorsAccordionIsOpen ? (
              <FaAngleDown className="inline   transition-transform duration-500 hover:cursor-pointer" />
            ) : (
              <FaAngleDown className="inline rotate-90  transition-transform duration-500 hover:cursor-pointer" />
            )}
          </div>
        </h4>
        <div
          className={`${colorsAccordionIsOpen ? 'flex' : 'hidden'} flex justify-between hover:cursor-pointer`}
        >
          {colors.map((color, index) => {
            return (
              <div
                name={color.color}
                onClick={handleClickColor}
                key={index}
                className={`rounded-full ${color.className} p-4`}
              ></div>
            )
          })}
        </div> */}
        {/* size accordion */}
        <div
          className="flex font-satoshi_bold text-xl"
          onClick={() => setSizeAccordionIsOpen(!sizeAccordionIsOpen)}
        >
          <h4 className="mr-auto inline-block">Size </h4>

          <div>
            {sizeAccordionIsOpen ? (
              <FaAngleDown className="inline   transition-transform duration-500 hover:cursor-pointer" />
            ) : (
              <FaAngleDown className="inline rotate-90  transition-transform duration-500 hover:cursor-pointer" />
            )}
          </div>
        </div>{' '}
        <div
          className={`${sizeAccordionIsOpen ? 'flex' : 'hidden'} flex-wrap `}
        >
          {sizes.map((size, index) => {
            return (
              <button
                onClick={handleClickSize}
                key={index}
                className="m-1 rounded-full border border-black px-4 py-2 font-satoshi_regular text-sm"
              >
                {size}
              </button>
            )
          })}
        </div>
        {/* style accordion */}
        <h4
          className="flex font-satoshi_bold text-xl"
          onClick={() => setStyleAccordionIsOpen(!styleAccordionIsOpen)}
        >
          <p className="mr-auto inline-block">Style </p>
          <div>
            {styleAccordionIsOpen ? (
              <FaAngleDown className="inline   transition-transform duration-500 hover:cursor-pointer" />
            ) : (
              <FaAngleDown className="inline rotate-90  transition-transform duration-500 hover:cursor-pointer" />
            )}
          </div>
        </h4>{' '}
        <div
          className={`${styleAccordionIsOpen ? 'block' : 'hidden'} font-satoshi_regular text-base text-gray-400`}
        >
          {styles.map((style, index) => {
            return (
              <p
                onClick={handleClickstyle}
                key={index}
                className="hover:cursor-pointer"
              >
                {style}
              </p>
            )
          })}
        </div>
        <Button
          primary
          className="w-full"
          onClick={() => {
            setCriteria({ ...criteria, price: selectedPrice })
            console.log(criteria)
            setFilterOpen(!filterOpen)
            return window.scrollTo(0, 0)
          }}
        >
          Apply Filter
        </Button>
      </div>
    </>
  )
}

export default SideBar
