import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, MessageSquare, Send, AlertCircle } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    urgency: 'normal',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'Phone',
      details: '+91 9876543210',
      subtitle: '24/7 Emergency Helpline',
      color: 'blue',
    },
    {
      icon: Mail,
      title: 'Email',
      details: 'info@sandeh.org',
      subtitle: 'General Inquiries',
      color: 'green',
    },
    {
      icon: MapPin,
      title: 'Address',
      details: '123 Healthcare Plaza, Bandra, Mumbai 400050',
      subtitle: 'Main Office',
      color: 'purple',
    },
    {
      icon: Clock,
      title: 'Office Hours',
      details: 'Mon-Fri: 9AM-6PM',
      subtitle: 'Helpline: 24/7',
      color: 'orange',
    },
  ];

  const departments = [
    {
      name: 'Patient Services',
      phone: '+91 9876543210',
      email: 'patients@sandeh.org',
      description: 'For all patient-related inquiries and support',
    },
    {
      name: 'Donations',
      phone: '+91 9876543211',
      email: 'donations@sandeh.org',
      description: 'For donation inquiries and tax receipts',
    },
    {
      name: 'Partnerships',
      phone: '+91 9876543212',
      email: 'partnerships@sandeh.org',
      description: 'For hospital partnerships and collaborations',
    },
    {
      name: 'Media & Press',
      phone: '+91 9876543213',
      email: 'media@sandeh.org',
      description: 'For media inquiries and press releases',
    },
  ];

  const faqs = [
    {
      question: 'How do I get help with my medical costs?',
      answer: 'Simply use our hospital finder tool or contact our helpline. We\'ll provide you with one free hospital option and a full report upon donation.',
    },
    {
      question: 'Is there a cost for your services?',
      answer: 'We provide one free hospital option to everyone. For comprehensive reports with multiple options, we ask for a donation to support our services.',
    },
    {
      question: 'How do I know if a hospital is trustworthy?',
      answer: 'We verify all partner hospitals for quality, accreditation, and patient safety. Our team conducts thorough research before recommending any facility.',
    },
    {
      question: 'Can you help with insurance claims?',
      answer: 'Yes, we provide comprehensive insurance claim assistance, including form preparation, documentation, and appeal support.',
    },
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-100 text-blue-600',
      green: 'bg-green-100 text-green-600',
      purple: 'bg-purple-100 text-purple-600',
      orange: 'bg-orange-100 text-orange-600',
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
              Contact Us
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're here to help you navigate your healthcare journey. Reach out to us for support, 
              questions, or to learn more about our services.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {contactInfo.map((info, index) => (
              <div key={index} className="text-center">
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-6 ${getColorClasses(info.color)}`}>
                  <info.icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{info.title}</h3>
                <p className="text-gray-700 font-medium mb-1">{info.details}</p>
                <p className="text-gray-500 text-sm">{info.subtitle}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-gray-50 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder="Enter your phone number"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Urgency Level
                    </label>
                    <select
                      name="urgency"
                      value={formData.urgency}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    >
                      <option value="normal">Normal</option>
                      <option value="urgent">Urgent</option>
                      <option value="emergency">Emergency</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="Brief description of your inquiry"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="Please provide details about your inquiry..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-red-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-red-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <Send className="h-5 w-5" />
                  <span>Send Message</span>
                </button>
              </form>
            </div>

            {/* Departments */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Department Contacts</h2>
              <div className="space-y-6">
                {departments.map((dept, index) => (
                  <div key={index} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{dept.name}</h3>
                    <p className="text-gray-600 mb-4">{dept.description}</p>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <a
                        href={`tel:${dept.phone}`}
                        className="flex items-center space-x-2 text-red-600 hover:text-red-700 font-medium"
                      >
                        <Phone className="h-4 w-4" />
                        <span>{dept.phone}</span>
                      </a>
                      <a
                        href={`mailto:${dept.email}`}
                        className="flex items-center space-x-2 text-red-600 hover:text-red-700 font-medium"
                      >
                        <Mail className="h-4 w-4" />
                        <span>{dept.email}</span>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Quick answers to common questions about our services.
            </p>
          </div>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Emergency Contact */}
      <section className="py-20 bg-red-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center mb-6">
            <AlertCircle className="h-12 w-12 mr-4" />
            <h2 className="text-3xl md:text-4xl font-bold">Emergency Support</h2>
          </div>
          <p className="text-xl text-red-100 mb-8">
            If you're facing a medical emergency and need immediate assistance finding affordable care options, 
            our emergency helpline is available 24/7.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+919876543210"
              className="bg-white text-red-600 px-8 py-4 rounded-md font-semibold text-lg hover:bg-gray-100 transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <Phone className="h-5 w-5" />
              <span>Call Emergency Helpline</span>
            </a>
            <a
              href="mailto:emergency@sandeh.org"
              className="border-2 border-white text-white px-8 py-4 rounded-md font-semibold text-lg hover:bg-white hover:text-red-600 transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <Mail className="h-5 w-5" />
              <span>Email Emergency</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;