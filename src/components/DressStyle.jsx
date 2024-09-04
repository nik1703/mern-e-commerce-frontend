import { Link } from 'react-router-dom'
import { useShopContext } from '../context/ShopContext'

function DressStyle() {
  const { setSelectedDressStyle, selectedDressStyle } = useShopContext()

  const dressStyles = [
    {
      name: 'Casual',
      image: '/images/dressStyle/casual.png',
    },
    {
      name: 'Formal',
      image: '/images/dressStyle/formal.png',
    },
    {
      name: 'Party',
      image: '/images/dressStyle/party.png',
    },
    {
      name: 'Gym',
      image: '/images/dressStyle/gym.png',
    },
  ]

  return (
    <div className="mx-4 mb-4 flex justify-center md:mb-8 lg:mx-24 lg:mb-16">
      <div className="w-[1289px] rounded-[1.3rem] bg-background px-4 pt-[40px] md:px-8 lg:rounded-[2.5rem] lg:px-16 lg:pt-[70px]">
        <h2 className="text-center font-integral_cf text-[32px] lg:text-5xl">
          BROWSE BY DRESS STYLE
        </h2>
        <div className="grid grid-cols-1 gap-8 py-10 *:relative *:h-48 *:rounded-3xl *:bg-cover *:bg-top *:font-satoshi_bold *:text-2xl *:shadow-xl md:grid-cols-5 md:*:h-72 lg:grid-cols-7 lg:py-16 lg:*:text-4xl">
          {dressStyles.map((style, index) => (
            <Link
              to="/category"
              onClick={() => {
                setSelectedDressStyle(style.name)
                console.log(selectedDressStyle)
              }}
              key={index}
              className={`style-${style.name.toLowerCase()} ${index % 3 ? 'md:col-span-3 lg:col-span-4' : 'md:col-span-2 lg:col-span-3'} hover:cursor-pointer`}
              style={{ backgroundImage: `url('${style.image}')` }}
            >
              <div>
                <h3 className="absolute left-6 top-9">{style.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
export default DressStyle
