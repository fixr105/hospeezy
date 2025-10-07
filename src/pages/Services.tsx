import React from 'react';
import { Search, Calculator, FileText, Phone, Users, Shield, Heart } from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: Search,
      title: 'Find Alternatives',
      description: 'We research hospitals offering your recommended surgery at lower costs without compromising quality.',
      features: [
        'Comprehensive hospital database',
        'Quality and safety ratings',
        'Distance and accessibility factors',
        'Specialized procedure expertise',
      ],
      color: 'blue',
    },
    {
      icon: Calculator,
      title: 'Cost Estimates',
      description: 'Receive clear, detailed cost breakdowns including hidden fees and insurance coverage options.',
      features: [
        'Transparent pricing breakdown',
        'Insurance coverage analysis',
        'Hidden fee identification',
        'Payment plan options',
      ],
      color: 'green',
    },
    {
      icon: FileText,
      title: 'Claims Assistance',
      description: 'Expert help with insurance claims to maximize coverage and reduce your out-of-pocket expenses.',
      features: [
        'Claim form preparation',
        'Documentation support',
        'Appeal process guidance',
        'Direct insurer communication',
      ],
      color: 'purple',
    },
    {
      icon: Phone,
      title: 'Patient Support',
      description: 'Dedicated support throughout your healthcare journey, from initial consultation to recovery.',
      features: [
        '24/7 helpline availability',
        'Personalized care coordination',
        'Post-treatment follow-up',
        'Emergency assistance',
      ],
      color: 'red',
    },
  ];

  const process = [
    {
      step: 1,
      title: 'Tell Us About Your Surgery',
      description: 'Share your medical needs, location preferences, and budget constraints with our team.',
      icon: Users,
    },
    {
      step: 2,
      title: 'See One Free Option',
      description: 'Receive a comprehensive report on one excellent hospital option at no cost.',
      icon: Search,
    },
    {
      step: 3,
      title: 'Donate for Full Report',
      description: 'Make a donation to unlock detailed comparisons of 5+ hospitals with complete cost analysis.',
      icon: Heart,
    },
    {
      step: 4,
      title: 'Get Insurance Help',
      description: 'Receive ongoing support with insurance claims and healthcare navigation.',
      icon: Shield,
    },
  ];

  const specialties = [
    'Cardiac Surgery',
    'Orthopedic Procedures',
    'Cancer Treatment',
    'Neurosurgery',
    'Gastroenterology',
    'Gynecology',
    'Pediatric Surgery',
    'Plastic Surgery',
    'Eye Surgery',
    'Dental Procedures',
    'Organ Transplants',
    'Emergency Surgery',
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-red-50 text-red-600',
      green: 'bg-red-50 text-red-600',
      purple: 'bg-red-50 text-red-600',
      red: 'bg-red-50 text-red-600',
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="bg-white py-20 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Our Services
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive healthcare navigation services designed to help you find the best, 
              most affordable care options tailored to your specific needs.
            </p>
          </div>
        </div>
      </section>

      {/* Core Services */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {services.map((service, index) => (
              <div key={index} className="bg-white rounded-lg p-8 hover:shadow-lg transition-shadow duration-300 border border-gray-200">
                <div className="flex items-start space-x-4">
                  <div className={`flex-shrink-0 p-3 rounded-lg ${getColorClasses(service.color)}`}>
                    <service.icon className="h-8 w-8" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{service.title}</h3>
                    <p className="text-gray-600 mb-6">{service.description}</p>
                    <ul className="space-y-2">
                      {service.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600">
              Our simple, transparent process ensures you get the best care at the best price.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((step, index) => (
              <div key={index} className="text-center">
                <div className="bg-white rounded-lg p-8 shadow-md mb-6 border border-gray-200">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-red-50 rounded-lg mb-6">
                    <step.icon className="h-8 w-8 text-red-600" />
                  </div>
                  <div className="text-3xl font-bold text-red-600 mb-2">{step.step}</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
                {index < process.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2">
                    <div className="w-8 h-0.5 bg-gray-300"></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Specialties */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Medical Specialties We Cover
            </h2>
            <p className="text-xl text-gray-600">
              We provide assistance across a wide range of medical procedures and specialties.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {specialties.map((specialty, index) => (
              <div key={index} className="bg-white rounded-lg p-6 text-center hover:bg-red-50 hover:shadow-md transition-all duration-300 border border-gray-200">
                <div className="font-semibold text-gray-900">{specialty}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-red-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Track Record</h2>
            <p className="text-xl text-red-100">
              Numbers that reflect our commitment to helping patients find affordable, quality care.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">2,500+</div>
              <div className="text-red-100">Patients Served</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">₹5.2Cr</div>
              <div className="text-red-100">Total Savings</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">150+</div>
              <div className="text-red-100">Partner Hospitals</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">98%</div>
              <div className="text-red-100">Success Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-red-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-red-100 mb-8">
            Take the first step toward affordable, quality healthcare. Our team is here to help you 
            navigate your options and find the best care for your needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/tools"
              className="bg-white text-red-600 px-8 py-4 rounded-md font-semibold text-lg hover:bg-gray-100 transition-all duration-300"
            >
              Find Hospitals
            </a>
            <a
              href="/contact"
              className="border-2 border-white text-white px-8 py-4 rounded-md font-semibold text-lg hover:bg-white hover:text-red-600 transition-all duration-300"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;