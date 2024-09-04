const ProductFAQ = () => {
  return (
    <>
      <section className="mb-14 mt-10">
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <h3 className="font-integral_cf text-base md:text-lg">
              What is the return policy?
            </h3>
            <p className="font-satoshi_regular text-base md:text-lg">
              We offer a 30-day return policy. If you are not satisfied with
              your purchase, you can return it for a refund. Please note that
              the item must be returned in its original packaging and in the
              same condition as when you received it.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="font-integral_cf text-base md:text-lg">
              How long does shipping take?
            </h3>
            <p className="font-satoshi_regular text-base md:text-lg">
              Shipping times vary depending on your location. Orders are
              typically processed within 1-2 business days and shipped via
              standard shipping. You can expect your order to arrive within 5-7
              business days.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="font-integral_cf text-base md:text-lg">
              Do you offer international shipping?
            </h3>
            <p className="font-satoshi_regular text-base md:text-lg">
              Yes, we offer international shipping. Shipping costs will be
              calculated at checkout based on your location.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="font-integral_cf text-base md:text-lg">
              How can I track my order?
            </h3>
            <p className="font-satoshi_regular text-base md:text-lg">
              Once your order has been shipped, you will receive a tracking
              number via email. You can use this tracking number to track your
              order on our website.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}

export default ProductFAQ
