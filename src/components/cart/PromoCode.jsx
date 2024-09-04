import { MdOutlineDiscount } from 'react-icons/md'
import { useCartContext } from '../../context/CartContext'

function PromoCode() {
  const {
    promoCode,
    discountRate,
    promoApplied,
    warnText,
    applyPromoCode,
    setPromoCode,
  } = useCartContext()

  return (
    <>
      <div className="promo-code flex justify-between gap-3 *:my-4">
        <div className="relative mb-3 flex w-full items-center">
          <MdOutlineDiscount className="pointer-events-none absolute ml-4 h-5 w-5 text-black text-opacity-40" />
          <input
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
            className="h-12 w-full rounded-full bg-[#F0F0F0] pl-10 placeholder:text-black placeholder:text-opacity-40 md:text-lg"
            type="text"
            placeholder="Add promo code"
          />
        </div>
        <button
          onClick={applyPromoCode}
          className="rounded-full bg-black px-4 py-2 font-satoshi_medium text-sm text-white md:text-lg"
        >
          Apply
        </button>
      </div>
      <div className="mb-3 ml-3">
        {warnText && (
          <p className={promoApplied ? 'text-green-500' : 'text-red-500'}>
            {warnText}
          </p>
        )}
      </div>
    </>
  )
}
export default PromoCode
