function PageAbout() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="border-2 border-gray-400 rounded-lg opacity-100 shadow-xl hover:shadow-2xl transition duration-900 ease-in-out relative z-10 py-3 px-6 max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 font-integral_cf text-center">About Us</h1>
        <div className="flex flex-col-reverse md:flex-row items-center justify-center">
          <div className="font-satoshi_regular md:w-1/2">
            <p className="text-lg mb-6">
              Welcome to our online store! We are passionate about providing high-quality clothing for everyone. 
            </p>
            <p className="text-lg mb-6">
              Our mission is to make fashion accessible and affordable for all. 
              Whether you're looking for everyday essentials or trendy statement pieces, we've got you covered.
            </p>
            <p className="text-lg mb-6">
              At our store, you'll find a wide range of styles, sizes, and colors to suit your unique taste and preferences. 
              We believe that everyone deserves to look and feel their best, no matter their budget or body type.
            </p>
            <p className="text-lg mb-6">
              Thank you for choosing us for your fashion needs. Happy shopping!
            </p>
          </div>
          <div className="md:w-1/2 md:ml-6 mb-8 md:mb-16">
            <img
              src="./images/hero/hero-small.png"
              alt="About Us"
              className="rounded-lg h-full object-cover w-full md:w-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PageAbout;
