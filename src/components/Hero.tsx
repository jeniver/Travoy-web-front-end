import React, { useEffect, useState } from 'react';
import Globe3D from './Globe3D';
import { ArrowRightIcon, MapPinIcon } from 'lucide-react';
const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    setIsVisible(true);
  }, []);
  return <section className="relative w-full bg-gradient-to-br from-purple-700 to-purple-500 text-white overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1935&q=80')] bg-cover opacity-10"></div>
      <div className="container mx-auto px-4 py-24 md:py-32 flex flex-col md:flex-row items-center relative z-10">
        <div className="w-full md:w-1/2 space-y-6 mb-10 md:mb-0">
          <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Your Journey Begins with{' '}
              <span className="text-yellow-300">Travoy</span>
            </h1>
          </div>
          <div className={`transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <p className="text-lg md:text-xl text-gray-100">
              Expert visa consulting and travel services to make your global
              adventures seamless and stress-free.
            </p>
          </div>
          <div className={`flex flex-col sm:flex-row gap-4 transform transition-all duration-1000 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <button className="bg-white text-purple-600 px-8 py-3 rounded-full font-medium hover:bg-gray-100 transition-colors flex items-center justify-center gap-2">
              Get Visa Consultation <ArrowRightIcon size={18} />
            </button>
            <button className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-full font-medium hover:bg-white/10 transition-colors flex items-center justify-center gap-2">
              Explore Services
            </button>
          </div>
          <div className={`flex flex-wrap gap-6 pt-6 transform transition-all duration-1000 delay-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="flex items-center gap-2">
              <div className="bg-white/20 p-2 rounded-full">
                <div size={20} />
              </div>
              <span className="text-sm">Visa Success Rate: 98%</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="bg-white/20 p-2 rounded-full">
                <MapPinIcon size={20} />
              </div>
              <span className="text-sm">150+ Countries</span>
            </div>
          </div>
        </div>
        <div className={`w-full md:w-1/2 h-[400px] transform transition-all duration-1000 delay-500 ${isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-10 opacity-0 scale-95'}`}>
          <div className="relative w-full h-full">
            <Globe3D />
            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-purple-600 bg-opacity-30 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default Hero;