import React from 'react';
import { Plane, Globe2, FileCheck, Users, Headphones, Award } from 'lucide-react';
const ServiceCard = ({
  icon: Icon,
  title,
  description
}) => {
  return <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-100 group">
      <div className="bg-purple-100 p-4 rounded-lg inline-block mb-4 group-hover:bg-purple-600 transition-colors">
        <Icon className="text-purple-600 group-hover:text-white transition-colors" size={28} />
      </div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>;
};
const Services = () => {
  const services = [{
    icon: Plane,
    title: 'Tourist Visas',
    description: 'Expert assistance for tourist visas to countries worldwide with high approval rates.'
  }, {
    icon: FileCheck,
    title: 'Business Visas',
    description: 'Streamlined business visa processing for corporate travel and international meetings.'
  }, {
    icon: Globe2,
    title: 'Immigration Services',
    description: 'Comprehensive immigration consulting for permanent residency applications.'
  }, {
    icon: Users,
    title: 'Family Visas',
    description: 'Reunite with your loved ones through our specialized family visa services.'
  }, {
    icon: Headphones,
    title: '24/7 Support',
    description: 'Round-the-clock customer support for all your visa and travel inquiries.'
  }, {
    icon: Award,
    title: 'Document Verification',
    description: 'Thorough verification of all documents to ensure successful visa applications.'
  }];
  return <section id="services" className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Services</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We offer comprehensive visa and travel consulting services to make
            your international journey smooth and hassle-free.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((service, index) => <ServiceCard key={index} {...service} />)}
        </div>
      </div>
    </section>;
};
export default Services;