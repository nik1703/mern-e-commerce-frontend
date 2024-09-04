import { FaTwitter, FaFacebook, FaInstagram, FaGithub } from 'react-icons/fa'

const Footer = () => {
  return (
    <>
      <footer className="relative bg-[#F0F0F0] px-4 pt-8 before:absolute before:bottom-[23rem] before:left-0 before:z-[-1] before:h-[37.5rem] before:w-full before:bg-[#F0F0F0] before:content-[''] sm:before:h-[30rem] md:px-6 md:pt-[70px] md:before:h-[23rem] lg:px-8 lg:before:h-[21.5rem] xl:before:h-40">
        <div className="mx-auto max-w-7xl">
          <div className="xl:grid xl:grid-cols-3 xl:gap-8">
            <div className="space-y-4 md:space-y-8">
              <h3 className="font-integral_cf text-3xl md:text-4xl">SHOP.CO</h3>
              <p className="pb-1 font-satoshi_regular text-sm leading-5 text-black opacity-60 md:pr-28">
                We have clothes that suits your style and which you're proud to
                wear. From women to men.
              </p>
              <div className="flex space-x-3">
                <a
                  href="https://twitter.com"
                  target="_blank"
                  className="rounded-full border-[1px] bg-white px-2 py-2"
                >
                  <FaTwitter />
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  className="rounded-full border-[1px] bg-white px-2 py-2"
                >
                  <FaFacebook />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  className="rounded-full border-[1px] bg-white px-2 py-2"
                >
                  <FaInstagram />
                </a>
                <a
                  href="https://github.com"
                  target="_blank"
                  className="rounded-full border-[1px] bg-white px-2 py-2"
                >
                  <FaGithub />
                </a>
              </div>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
              <div className="md:grid md:grid-cols-2 md:gap-8">
                <div>
                  <h3 className="font-satoshi_medium text-sm leading-4 tracking-[3px] text-black md:text-base">
                    COMPANY
                  </h3>
                  <ul role="list" className="mt-6 space-y-4">
                    <li>
                      <a
                        href="/about"
                        className="font-satoshi_regular text-sm leading-4 text-black opacity-60 hover:opacity-100 md:text-base"
                      >
                        About
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="font-satoshi_regular text-sm leading-4 text-black opacity-60 hover:opacity-100 md:text-base"
                      >
                        Features
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="font-satoshi_regular text-sm leading-4 text-black opacity-60 hover:opacity-100 md:text-base"
                      >
                        Works
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="font-satoshi_regular text-sm leading-4 text-black opacity-60 hover:opacity-100 md:text-base"
                      >
                        Career
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="mt-8 md:mt-0">
                  <h3 className="font-satoshi_medium text-sm leading-4 tracking-[3px] text-black md:text-base">
                    HELP
                  </h3>
                  <ul role="list" className="mt-6 space-y-4">
                    <li>
                      <a
                        href="/contact"
                        className="font-satoshi_regular text-sm leading-4 text-black opacity-60 hover:opacity-100 md:text-base"
                      >
                        Customer Support
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="font-satoshi_regular text-sm leading-4 text-black opacity-60 hover:opacity-100 md:text-base"
                      >
                        Delivery Details
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="font-satoshi_regular text-sm leading-4 text-black opacity-60 hover:opacity-100 md:text-base"
                      >
                        Terms & Conditions
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="font-satoshi_regular text-sm leading-4 text-black opacity-60 hover:opacity-100 md:text-base"
                      >
                        Privacy Policy
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="md:grid md:grid-cols-2 md:gap-8">
                <div>
                  <h3 className="font-satoshi_medium text-sm leading-4 tracking-[3px] text-black md:text-base">
                    FAQ
                  </h3>
                  <ul role="list" className="mt-6 space-y-4">
                    <li>
                      <a
                        href="/login"
                        className="font-satoshi_regular text-sm leading-4 text-black opacity-60 hover:opacity-100 md:text-base"
                      >
                        Account
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="font-satoshi_regular text-sm leading-4 text-black opacity-60 hover:opacity-100 md:text-base"
                      >
                        Manage Deliveries
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="font-satoshi_regular text-sm leading-4 text-black opacity-60 hover:opacity-100 md:text-base"
                      >
                        Orders
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="font-satoshi_regular text-sm leading-4 text-black opacity-60 hover:opacity-100 md:text-base"
                      >
                        Payments
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="mt-8 md:mt-0">
                  <h3 className="font-satoshi_medium text-sm leading-4 tracking-[3px] text-black md:text-base">
                    RESOURCES
                  </h3>
                  <ul role="list" className="mt-6 space-y-4">
                    <li>
                      <a
                        href="#"
                        className="font-satoshi_regular text-sm leading-4 text-black opacity-60 hover:opacity-100 md:text-base"
                      >
                        Free eBooks
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="font-satoshi_regular text-sm leading-4 text-black opacity-60 hover:opacity-100 md:text-base"
                      >
                        Development Tutorial
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="font-satoshi_regular text-sm leading-4 text-black opacity-60 hover:opacity-100 md:text-base"
                      >
                        How to - Blog
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="font-satoshi_regular text-sm leading-4 text-black opacity-60 hover:opacity-100 md:text-base"
                      >
                        Youtube Playlist
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="border-black-900/10 mt-10 flex flex-col flex-wrap items-center justify-between border-t pb-16 pt-4 sm:flex-row md:mt-12 md:pb-20">
            <p className="font-satoshi_regular text-sm text-black opacity-60">
              Shop.co &copy; 2000-2024, All rights reserved.
            </p>
            <div className="mt-4 sm:mt-0">
              <img
                src="/images/footer/payment-methods-large.png"
                alt="Payment methods: Visa, Mastercard, PayPal, Apple Pay, Google Pay"
                className="hidden sm:block"
              />
              <img
                src="/images/footer/payment-methods-small.png"
                alt="Payment methods: Visa, Mastercard, PayPal, Apple Pay, Google Pay"
                className="block sm:hidden"
              />
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Footer
