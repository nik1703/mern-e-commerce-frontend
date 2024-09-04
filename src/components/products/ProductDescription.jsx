const ProductDescription = ({ product }) => {
  return (
    <>
      <section className="mb-14">
        <p className="mb-5 mt-10 font-integral_cf text-base md:text-lg">
          Description:
        </p>
        <p className="mb-8 font-satoshi_regular text-base md:text-lg">
          {product.descriptionDetails}
        </p>
        <p className="mb-2 font-integral_cf text-base md:text-lg">Details:</p>
        <p className="mb-2 font-satoshi_regular text-base md:text-lg">
          Type: {product.type}
        </p>
        <p className="mb-2 font-satoshi_regular text-base md:text-lg">
          Style: {product.style}
        </p>
        {product.details.split('.').map((detail, index) => {
          if (detail.trim() === '') return null

          return (
            <p
              key={index}
              className="mb-2 font-satoshi_regular text-base md:text-lg"
            >
              {detail.trim()}.
            </p>
          )
        })}
      </section>
    </>
  )
}

export default ProductDescription
