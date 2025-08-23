import React, { useEffect, useState, useRef } from 'react';
import { ChevronLeftIcon, ChevronRightIcon, StarIcon, MapPinIcon, StampIcon } from 'lucide-react';
const testimonials = [{
  id: 1,
  name: 'Sarah Johnson',
  location: 'United States',
  quote: 'Travoy made my visa application process incredibly smooth. Their expertise and guidance helped me secure my business visa without any complications.',
  avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  rating: 5,
  destination: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
  stamp: 'APPROVED',
  stampDate: '15 JAN 2023'
}, {
  id: 2,
  name: 'Michael Chen',
  location: 'Canada',
  quote: "I've used many visa services before, but none compare to the level of professionalism and efficiency I experienced with Travoy. Highly recommended!",
  avatar: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  rating: 5,
  destination: 'https://images.unsplash.com/photo-1503614472-8c93d56e92ce?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
  stamp: 'GRANTED',
  stampDate: '03 MAR 2023'
}, {
  id: 3,
  name: 'Priya Sharma',
  location: 'India',
  quote: 'The team at Travoy went above and beyond to ensure my family visa application was successful. Their attention to detail is unmatched.',
  avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  rating: 5,
  destination: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
  stamp: 'APPROVED',
  stampDate: '22 JUN 2023'
}];
const PassportStamp = ({
  stamp,
  date,
  isVisible
}) => {
  return <div className={`absolute top-4 right-4 transform rotate-12 transition-all duration-700 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>
      <div className="relative w-20 h-20 flex flex-col items-center justify-center rounded-full border-2 border-red-600">
        <div className="text-red-600 font-bold text-xs">{stamp}</div>
        <div className="h-px w-16 bg-red-600 my-1"></div>
        <div className="text-red-600 text-[10px]">{date}</div>
      </div>
    </div>;
};
const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState('next');
  const [isVisible, setIsVisible] = useState(false);
  const [stampVisible, setStampVisible] = useState(false);
  const passportRef = useRef(null);
  const sectionRef = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(entry.target);
      }
    }, {
      threshold: 0.2
    });
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);
  useEffect(() => {
    // Show stamp with delay after testimonial changes
    setStampVisible(false);
    const timer = setTimeout(() => {
      setStampVisible(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, [activeIndex]);
  const nextTestimonial = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setDirection('next');
    if (passportRef.current) {
      passportRef.current.classList.add('animate-passport-flip-out');
    }
    setTimeout(() => {
      setActiveIndex(prev => (prev + 1) % testimonials.length);
      if (passportRef.current) {
        passportRef.current.classList.remove('animate-passport-flip-out');
        passportRef.current.classList.add('animate-passport-flip-in');
      }
      setTimeout(() => {
        if (passportRef.current) {
          passportRef.current.classList.remove('animate-passport-flip-in');
        }
        setIsAnimating(false);
      }, 500);
    }, 500);
  };
  const prevTestimonial = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setDirection('prev');
    if (passportRef.current) {
      passportRef.current.classList.add('animate-passport-flip-out-reverse');
    }
    setTimeout(() => {
      setActiveIndex(prev => (prev - 1 + testimonials.length) % testimonials.length);
      if (passportRef.current) {
        passportRef.current.classList.remove('animate-passport-flip-out-reverse');
        passportRef.current.classList.add('animate-passport-flip-in-reverse');
      }
      setTimeout(() => {
        if (passportRef.current) {
          passportRef.current.classList.remove('animate-passport-flip-in-reverse');
        }
        setIsAnimating(false);
      }, 500);
    }, 500);
  };
  return <section id="testimonials" className="py-16 md:py-24 bg-purple-50 relative overflow-hidden" ref={sectionRef}>

      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-10 left-10 w-20 h-20 rounded-full bg-purple-200 opacity-50"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 rounded-full bg-purple-200 opacity-40"></div>
        <div className="absolute top-1/3 right-1/4 w-16 h-16 rounded-full bg-purple-300 opacity-30"></div>
        <div className="absolute bottom-1/3 left-1/4 w-24 h-24 rounded-full bg-purple-300 opacity-20"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className={`text-center mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            What Our Clients Say
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our satisfied clients
            have to say about our visa and travel services.
          </p>
        </div>

        <div className={`max-w-4xl mx-auto relative transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div ref={passportRef} className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-500" style={{
          transformStyle: 'preserve-3d',
          transformOrigin: direction === 'next' ? 'left center' : 'right center',
          boxShadow: '0 10px 30px -15px rgba(0,0,0,0.3)',
          border: '1px solid #e5e7eb'
        }}>
            {/* Passport header */}
            <div className="bg-purple-700 text-white p-3 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <StampIcon size={18} />
                <span className="font-semibold">TRAVOY PASSPORT</span>
              </div>
              <div className="text-sm">
                Client ID: TRV-
                {testimonials[activeIndex].id.toString().padStart(6, '0')}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* Left side - Destination image */}
              <div className="relative h-60 md:h-auto">
                <img src={testimonials[activeIndex].destination} alt="Travel destination" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-4 left-4 flex items-center gap-2 text-white">
                  <MapPinIcon size={16} />
                  <span className="font-medium">
                    {testimonials[activeIndex].location}
                  </span>
                </div>
              </div>

              {/* Right side - Testimonial content */}
              <div className="p-6 relative">
                {/* Passport stamp */}
                <PassportStamp stamp={testimonials[activeIndex].stamp} date={testimonials[activeIndex].stampDate} isVisible={stampVisible} />

                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-gray-200">
                    <img src={testimonials[activeIndex].avatar} alt={testimonials[activeIndex].name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">
                      {testimonials[activeIndex].name}
                    </p>
                    <div className="flex">
                      {[...Array(testimonials[activeIndex].rating)].map((_, i) => <StarIcon key={i} size={14} className="fill-yellow-400 text-yellow-400" />)}
                    </div>
                  </div>
                </div>

                <blockquote className="text-gray-700 mb-4 relative">
                  <span className="absolute -top-3 -left-1 text-4xl text-purple-200" style={{
                  fontFamily: 'serif'
                }}>
                    "
                  </span>
                  <p className="pl-4">{testimonials[activeIndex].quote}</p>
                </blockquote>

                {/* Passport-like details */}
                <div className="mt-6 pt-4 border-t border-dashed border-gray-300">
                  <div className="grid grid-cols-2 gap-2 text-xs text-gray-500">
                    <div>
                      <div className="font-medium text-gray-400">
                        ISSUE DATE
                      </div>
                      <div>01 JAN 2023</div>
                    </div>
                    <div>
                      <div className="font-medium text-gray-400">
                        VALID UNTIL
                      </div>
                      <div>31 DEC 2025</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Passport footer */}
            <div className="bg-gray-100 p-2 text-center text-xs text-gray-500">
              <div>
                Travoy International Visa Services - Testimonial #
                {testimonials[activeIndex].id}
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-8 gap-4">
            <button onClick={prevTestimonial} disabled={isAnimating} className="p-3 rounded-full bg-white shadow-md hover:bg-gray-100 transition-colors transform hover:scale-110 transition-transform duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50" aria-label="Previous testimonial">
              <ChevronLeftIcon size={24} className="text-purple-600" />
            </button>

            <div className="flex gap-2 items-center">
              {testimonials.map((_, index) => <div key={index} className={`w-2 h-2 rounded-full transition-all duration-300 ${index === activeIndex ? 'bg-purple-600 w-4' : 'bg-purple-300'}`}></div>)}
            </div>

            <button onClick={nextTestimonial} disabled={isAnimating} className="p-3 rounded-full bg-white shadow-md hover:bg-gray-100 transition-colors transform hover:scale-110 transition-transform duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50" aria-label="Next testimonial">
              <ChevronRightIcon size={24} className="text-purple-600" />
            </button>
          </div>
        </div>
      </div>
    </section>;
};
export default Testimonials;