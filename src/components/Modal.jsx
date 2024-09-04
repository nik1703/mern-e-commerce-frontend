import { createPortal } from 'react-dom'
import { useEffect } from 'react'

function Modal({ onClose, children, actionbar }) {
  useEffect(() => {
    document.body.classList.add('overflow-hidden')

    return () => {
      document.body.classList.remove('overflow-hidden')
    }
  }, [])

  return createPortal(
    <div>
      <div
        onClick={onClose}
        className="fixed inset-0 z-40 bg-gray-300 opacity-80"
      ></div>
      <div className="fixed   left-5 right-5 top-20 z-50 rounded-3xl bg-white  p-10 md:left-48 md:right-48 md:top-20 ">
        <div className="flex  flex-col">
          {children}
          <div className="flex justify-center pt-10 md:pt-28">{actionbar}</div>
        </div>
      </div>
    </div>,

    document.querySelector('.modal-container')
  )
}
export default Modal
