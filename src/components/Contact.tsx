import React, { lazy } from 'react';
import { MapPinIcon, PhoneIcon, MailIcon, Clock } from 'lucide-react';
const ContactInfo = ({
  icon: Icon,
  title,
  details
}) => {
  return <div className="flex items-start gap-4">
      <div className="bg-purple-100 p-3 rounded-full">
        <Icon className="text-purple-600" size={20} />
      </div>
      <div>
        <h4 className="font-medium text-gray-800">{title}</h4>
        <p className="text-gray-600">{details}</p>
      </div>
    </div>;
};
const Contact = () => {
  return <section id="contact" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Contact Us</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Have questions about our visa services? Get in touch with our expert
            team for assistance.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-gray-50 rounded-xl p-6 md:p-8">
            <h3 className="text-2xl font-semibold mb-6">Get in Touch</h3>
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input type="text" id="name" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none" placeholder="John Doe" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input type="email" id="email" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none" placeholder="john@example.com" />
                </div>
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                  Subject
                </label>
                <input type="text" id="subject" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none" placeholder="Visa Inquiry" />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <textarea id="message" rows={5} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none resize-none" placeholder="How can we help you?"></textarea>
              </div>
              <button type="submit" className="w-full bg-purple-600 text-white py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors">
                Send Message
              </button>
            </form>
          </div>
          <div className="flex flex-col justify-between">
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold mb-6">
                Contact Information
              </h3>
              <div className="space-y-4">
                <ContactInfo icon={MapPinIcon} title="Office Address" details="42 Galle Road, Colombo 03, Sri Lanka" />
                <ContactInfo icon={PhoneIcon} title="Phone Number" details="+94 11 234 5678" />
                <ContactInfo icon={MailIcon} title="Email Address" details="info@travoy.com" />
                <ContactInfo icon={Clock} title="Business Hours" details="Monday - Friday: 9:00 AM - 6:00 PM" />
              </div>
            </div>
            <div className="mt-8 h-64 rounded-xl overflow-hidden">
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3961.575840369662!2d79.8462896!3d6.9016841!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae2596aaa9950c7%3A0x45c44a97887e0e85!2sGalle%20Rd%2C%20Colombo%2C%20Sri%20Lanka!5e0!3m2!1sen!2sus!4v1689872563456!5m2!1sen!2sus" width="100%" height="100%" style={{
              border: 0
            }} allowFullScreen={true} loading="lazy" title="Office Location"></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default Contact;