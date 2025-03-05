
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-32 pb-16">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-display text-estate-800 mb-4">About Elite Real Estate</h1>
            <p className="text-estate-500 text-lg max-w-3xl mx-auto">
              We are a premium real estate agency specializing in luxury properties and exceptional service for discerning clients.
            </p>
          </div>
          
          {/* Our Story */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <h2 className="text-3xl font-display text-estate-800 mb-6">Our Story</h2>
              <p className="text-estate-600 mb-4">
                Founded in 2005, Elite Real Estate was born from a vision to transform the luxury real estate experience. What began as a boutique agency has evolved into a leading name in premium property solutions across the country.
              </p>
              <p className="text-estate-600 mb-4">
                Our journey has been defined by an unwavering commitment to excellence, attention to detail, and a deep understanding of our clients' unique needs and aspirations.
              </p>
              <p className="text-estate-600">
                Today, we represent some of the most exclusive properties in the market, backed by a team of dedicated professionals who bring decades of industry expertise to every client interaction.
              </p>
            </div>
            <div className="order-first lg:order-last">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1613553507747-5f8d62ad5904"
                  alt="Our office"
                  className="rounded-lg shadow-xl w-full"
                />
                <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-lg hidden md:block">
                  <p className="text-estate-800 font-semibold">Established 2005</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Our Values */}
          <div className="mb-20">
            <h2 className="text-3xl font-display text-estate-800 mb-8 text-center">Our Core Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-estate-50 p-6 rounded-lg">
                <div className="w-12 h-12 bg-estate-100 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-estate-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xl font-medium text-estate-800 mb-2">Integrity</h3>
                <p className="text-estate-600">
                  We conduct business with unwavering integrity, ensuring transparency and honesty in every transaction and client relationship.
                </p>
              </div>
              
              <div className="bg-estate-50 p-6 rounded-lg">
                <div className="w-12 h-12 bg-estate-100 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-estate-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-medium text-estate-800 mb-2">Excellence</h3>
                <p className="text-estate-600">
                  We strive for excellence in every aspect of our service, from property selection to client communication and transaction management.
                </p>
              </div>
              
              <div className="bg-estate-50 p-6 rounded-lg">
                <div className="w-12 h-12 bg-estate-100 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-estate-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-medium text-estate-800 mb-2">Client First</h3>
                <p className="text-estate-600">
                  We place our clients at the center of everything we do, tailoring our approach to meet their unique needs and exceed their expectations.
                </p>
              </div>
            </div>
          </div>
          
          {/* Our Team */}
          <div className="mb-20">
            <h2 className="text-3xl font-display text-estate-800 mb-8 text-center">Our Leadership Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="relative mb-4 inline-block">
                  <img
                    src="https://images.unsplash.com/photo-1560250097-0b93528c311a"
                    alt="CEO"
                    className="rounded-full w-48 h-48 object-cover mx-auto"
                  />
                  <div className="absolute bottom-0 right-0 bg-estate-800 text-white w-10 h-10 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                    </svg>
                  </div>
                </div>
                <h3 className="text-xl font-medium text-estate-800 mb-1">James Wilson</h3>
                <p className="text-estate-500">Chief Executive Officer</p>
              </div>
              
              <div className="text-center">
                <div className="relative mb-4 inline-block">
                  <img
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2"
                    alt="COO"
                    className="rounded-full w-48 h-48 object-cover mx-auto"
                  />
                  <div className="absolute bottom-0 right-0 bg-estate-800 text-white w-10 h-10 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                    </svg>
                  </div>
                </div>
                <h3 className="text-xl font-medium text-estate-800 mb-1">Sarah Johnson</h3>
                <p className="text-estate-500">Chief Operations Officer</p>
              </div>
              
              <div className="text-center">
                <div className="relative mb-4 inline-block">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d"
                    alt="Sales Director"
                    className="rounded-full w-48 h-48 object-cover mx-auto"
                  />
                  <div className="absolute bottom-0 right-0 bg-estate-800 text-white w-10 h-10 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                    </svg>
                  </div>
                </div>
                <h3 className="text-xl font-medium text-estate-800 mb-1">Michael Chen</h3>
                <p className="text-estate-500">Director of Sales</p>
              </div>
              
              <div className="text-center">
                <div className="relative mb-4 inline-block">
                  <img
                    src="https://images.unsplash.com/photo-1580489944761-15a19d654956"
                    alt="Marketing Director"
                    className="rounded-full w-48 h-48 object-cover mx-auto"
                  />
                  <div className="absolute bottom-0 right-0 bg-estate-800 text-white w-10 h-10 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                    </svg>
                  </div>
                </div>
                <h3 className="text-xl font-medium text-estate-800 mb-1">Emma Martinez</h3>
                <p className="text-estate-500">Director of Marketing</p>
              </div>
            </div>
          </div>
          
          {/* CTA Section */}
          <div className="bg-estate-800 text-white p-12 rounded-lg text-center">
            <h2 className="text-3xl font-display mb-4">Ready to Find Your Dream Home?</h2>
            <p className="max-w-2xl mx-auto mb-8 text-estate-100">
              Our team of expert agents is ready to help you find the perfect property that matches your lifestyle and investment goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild className="bg-white text-estate-800 hover:bg-estate-100">
                <Link to="/properties">Browse Properties</Link>
              </Button>
              <Button asChild variant="outline" className="bg-transparent border-white text-white hover:bg-estate-700">
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default About;
