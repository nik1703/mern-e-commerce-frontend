import { useState } from 'react'
import { SlEnvolope } from 'react-icons/sl'
import Modal from './Modal'
import Button from './Button'
import { FaCopy } from 'react-icons/fa'

const Newsletter = () => {
  const [showModal, setShowModal] = useState(false)

  const handleClick = () => {
    setShowModal(true)
  }

  const handleClose = () => {
    setShowModal(false)
  }

  const actionbar = (
    <div>
      <Button onClick={handleClose} primary>
        Zurück zur Seite
      </Button>
    </div>
  )
  return (
    <div className="mx-4 mt-12 flex justify-center md:mt-20 lg:mx-24">
      <div className="flex w-[1289px] flex-col items-center rounded-[20px] bg-black px-6 lg:flex-row lg:justify-center lg:px-16">
        <h1 className="my-8 w-full font-integral_cf text-3xl font-bold text-white lg:my-11 lg:w-auto xl:text-[40px]">
          STAY UPTO DATE ABOUT OUR LATEST OFFERS
        </h1>

        <form
          className="w-full lg:my-9 lg:flex lg:w-auto lg:flex-col lg:items-center"
          onSubmit={(e) => {
            e.preventDefault()
          }}
        >
          <div className="relative mb-3 flex items-center lg:w-96">
            <SlEnvolope className="pointer-events-none absolute ml-4 h-5 w-5 text-black text-opacity-40" />

            <input
              type="email"
              required
              placeholder="Enter your email address"
              className="h-11 w-full rounded-[62px] pl-12 font-satoshi_regular text-sm text-black placeholder-black placeholder-opacity-40 lg:h-12 lg:text-lg"
              id="email"
            />
          </div>

          <div className="lg:w-96">
            <button
              className="mb-7 h-11 w-full rounded-[62px] bg-white font-satoshi_medium text-sm text-black lg:m-auto lg:h-12 lg:text-lg"
              onClick={() => {
                const emailInput = document.querySelector('#email')
                if (
                  emailInput.value !== '' &&
                  emailInput.value.includes('@') &&
                  emailInput.value.slice(-1) !== '@'
                ) {
                  return handleClick()
                }
              }}
            >
              Subscribe to Newsletter
            </button>
            {showModal && (
              <Modal onClose={handleClose} actionbar={actionbar}>
                <div className="flex  flex-col items-center gap-8 text-center font-satoshi_regular text-lg">
                  <h5 className="font-integral_cf">
                    Vielen Dank das du den Newsletter abonniert hast.
                  </h5>
                  <p>
                    Als Dankeschön erhältst du einen Code womit du{' '}
                    <span className="font-bold">20%</span> auf deinen nächsten
                    einkauf sparst.
                  </p>
                  <div className=" flex">
                    <p className="flex items-center rounded-l-full bg-background px-6 py-4  font-bold">
                      WELCOME20
                    </p>
                    <Button
                      primary
                      onClick={() => navigator.clipboard.writeText('WELCOME20')}
                      className=" rounded-l-none px-6 text-xl "
                    >
                      <FaCopy />
                    </Button>
                  </div>
                </div>
              </Modal>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}
export default Newsletter
