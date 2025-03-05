
const AboutUs = () => {
  return (
    <section id="about" className="py-24 bg-estate-50">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="order-2 md:order-1">
            <h2 className="text-4xl font-display text-estate-800 mb-6">About Us</h2>
            <p className="text-estate-600 mb-6 text-lg leading-relaxed">
              At Elite Real Estate, we provide elevated property solutions, expert guidance, and exceptional service to our discerning clientele.
            </p>
            <p className="text-estate-600 mb-6 text-lg leading-relaxed">
              Founded with a vision to transform the luxury real estate experience, our team of dedicated professionals brings decades of industry expertise to every client interaction.
            </p>
            <div className="flex space-x-4 mt-8">
              <div className="text-center">
                <p className="text-4xl font-display text-estate-800">15+</p>
                <p className="text-estate-500 mt-2">Years Experience</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-display text-estate-800">200+</p>
                <p className="text-estate-500 mt-2">Properties Sold</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-display text-estate-800">50+</p>
                <p className="text-estate-500 mt-2">Expert Agents</p>
              </div>
            </div>
          </div>
          <div className="order-1 md:order-2">
            <div className="relative">
              <div className="aspect-[4/3] overflow-hidden rounded-lg shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
                  alt="Modern luxury home"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-lg shadow-lg">
                <p className="text-estate-800 font-semibold">Our mission is to transform the luxury real estate experience.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
