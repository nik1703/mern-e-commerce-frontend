function ShippingInformation() {
  return (
    <>
      <div className="rounded-[20px] border p-5 md:w-7/12">
        <h3 className="mb-4 font-satoshi_bold text-xl md:text-2xl">
          Shipping Information
        </h3>
        <form>
          <label className="mb-2 block">
            <span className="text-black text-opacity-60">Name</span>
            <input
              type="text"
              className="h-12 w-full rounded-lg bg-[#F0F0F0] pl-4"
            />
          </label>
          <label className="mb-2 block">
            <span className="text-black text-opacity-60">Email</span>
            <input
              type="email"
              className="h-12 w-full rounded-lg bg-[#F0F0F0] pl-4"
            />
          </label>
          <label className="mb-2 block">
            <span className="text-black text-opacity-60">Address</span>
            <input
              type="text"
              className="h-12 w-full rounded-lg bg-[#F0F0F0] pl-4"
            />
          </label>
          <label className="mb-2 block">
            <span className="text-black text-opacity-60">Phone Number</span>
            <input
              type="tel"
              className="h-12 w-full rounded-lg bg-[#F0F0F0] pl-4"
            />
          </label>
        </form>
      </div>
    </>
  )
}
export default ShippingInformation
