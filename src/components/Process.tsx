import React from 'react';
import { ClipboardCheck, FileText, Search, CheckCircle } from 'lucide-react';
const ProcessStep = ({
  number,
  icon: Icon,
  title,
  description
}) => {
  return <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6">
      <div className="flex items-center justify-center bg-purple-600 text-white rounded-full w-12 h-12 shrink-0 text-xl font-bold">
        {number}
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-3 mb-2">
          <Icon className="text-purple-600" size={20} />
          <h3 className="text-xl font-semibold">{title}</h3>
        </div>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>;
};
const Process = () => {
  const steps = [{
    number: 1,
    icon: ClipboardCheck,
    title: 'Initial Consultation',
    description: 'Schedule a free consultation to discuss your travel needs and visa requirements.'
  }, {
    number: 2,
    icon: Search,
    title: 'Document Assessment',
    description: 'Our experts will review your documents and provide a customized checklist.'
  }, {
    number: 3,
    icon: FileText,
    title: 'Application Preparation',
    description: 'We prepare and submit your application with all necessary supporting documents.'
  }, {
    number: 4,
    icon: CheckCircle,
    title: 'Visa Approval',
    description: 'Receive your visa approval and prepare for your journey with our travel tips.'
  }];
  return <section id="process" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Process</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We follow a streamlined process to ensure your visa application is
            processed efficiently and successfully.
          </p>
        </div>
        <div className="max-w-3xl mx-auto space-y-12 md:space-y-16">
          {steps.map((step, index) => <ProcessStep key={index} {...step} />)}
        </div>
        <div className="mt-16 text-center">
          <button className="bg-purple-600 text-white px-8 py-3 rounded-full font-medium hover:bg-purple-700 transition-colors">
            Start Your Application
          </button>
        </div>
      </div>
    </section>;
};
export default Process;