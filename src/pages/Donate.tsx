import React, { useState } from 'react';
import { Heart, Shield, CreditCard, Smartphone, Building, Users, Star, CheckCircle } from 'lucide-react';

const Donate = () => {
  const [donationAmount, setDonationAmount] = useState(1000);
  const [donationType, setDonationType] = useState('one-time');
  const [paymentMethod, setPaymentMethod] = useState('card');

  const predefinedAmounts = [500, 1000, 2500, 5000, 10000];

  const impact = [
    {
      amount: 500,
      description: 'Helps one patient get a basic cost comparison report',
      icon: Users,
    },
    {
      amount: 1000,
      description: 'Provides comprehensive hospital research for one family',
      icon: Heart,
    },
    {
      amount: 2500,
      description: 'Covers insurance claim assistance for multiple patients',
      icon: Shield,
    },
    {
      amount: 5000,
      description: 'Funds our helpline for a full day of patient support',
      icon: Star,
    },
  ];

  const testimonials = [
    {
      name: 'Ravi Kumar',
      amount: '₹2,000',
      quote: 'HOSPEEZY helped my family save ₹80,000 on surgery. Happy to support their mission.',
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=200',
    },
    {
      name: 'Dr. Priya Sharma',
      amount: '₹5,000',
      quote: 'As a doctor, I see the need for transparent healthcare costs. HOSPEEZY is doing crucial work.',
      image: 'https://images.pexels.com/photos/5327921/pexels-photo-5327921.jpeg?auto=compress&cs=tinysrgb&w=200',
    },
    {
      name: 'Anita Patel',
      amount: '₹1,000',
      quote: 'Small donation, big impact. Every rupee helps families find affordable care.',
      image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200',
    },
  ];

  const stats = [
    { number: '₹5.2Cr', label: 'Total Savings Generated' },
    { number: '2,500+', label: 'Patients Helped' },
    { number: '₹850', label: 'Average Cost per Patient' },
    { number: '98%', label: 'Donor Satisfaction' },
  ];

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="bg-white py-20 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Support Our Mission
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Your donation helps us provide free healthcare navigation services to families across India, 
              ensuring no one faces financial hardship due to lack of information about their healthcare options.
            </p>
            <div className="flex items-center justify-center space-x-8 text-sm text-gray-500">
              <div className="flex items-center space-x-2">
                <Shield className="h-5 w-5" />
                <span>SSL Secured</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5" />
                <span>Tax Deductible</span>
              </div>
              <div className="flex items-center space-x-2">
                <Heart className="h-5 w-5" />
                <span>80G Certified</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Donation Form */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gray-50 rounded-2xl p-8">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Make a Donation</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Donation Form */}
              <div>
                {/* Donation Type */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Donation Type
                  </label>
                  <div className="flex space-x-4">
                    <button
                      onClick={() => setDonationType('one-time')}
                      className={`flex-1 py-3 px-4 rounded-lg border-2 transition-colors ${
                        donationType === 'one-time'
                          ? 'border-red-600 bg-red-50 text-red-600'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      One-time
                    </button>
                    <button
                      onClick={() => setDonationType('monthly')}
                      className={`flex-1 py-3 px-4 rounded-lg border-2 transition-colors ${
                        donationType === 'monthly'
                          ? 'border-red-600 bg-red-50 text-red-600'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      Monthly
                    </button>
                  </div>
                </div>

                {/* Donation Amount */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Donation Amount
                  </label>
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    {predefinedAmounts.map((amount) => (
                      <button
                        key={amount}
                        onClick={() => setDonationAmount(amount)}
                        className={`py-3 px-4 rounded-lg border-2 transition-colors ${
                          donationAmount === amount
                            ? 'border-red-600 bg-red-50 text-red-600'
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        ₹{amount.toLocaleString()}
                      </button>
                    ))}
                  </div>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
                    <input
                      type="number"
                      value={donationAmount}
                      onChange={(e) => setDonationAmount(Number(e.target.value))}
                      className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder="Enter custom amount"
                    />
                  </div>
                </div>

                {/* Payment Method */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Payment Method
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    <button
                      onClick={() => setPaymentMethod('card')}
                      className={`py-3 px-4 rounded-lg border-2 transition-colors flex items-center justify-center space-x-2 ${
                        paymentMethod === 'card'
                          ? 'border-red-600 bg-red-50 text-red-600'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      <CreditCard className="h-4 w-4" />
                      <span>Card</span>
                    </button>
                    <button
                      onClick={() => setPaymentMethod('upi')}
                      className={`py-3 px-4 rounded-lg border-2 transition-colors flex items-center justify-center space-x-2 ${
                        paymentMethod === 'upi'
                          ? 'border-red-600 bg-red-50 text-red-600'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      <Smartphone className="h-4 w-4" />
                      <span>UPI</span>
                    </button>
                    <button
                      onClick={() => setPaymentMethod('bank')}
                      className={`py-3 px-4 rounded-lg border-2 transition-colors flex items-center justify-center space-x-2 ${
                        paymentMethod === 'bank'
                          ? 'border-red-600 bg-red-50 text-red-600'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      <Building className="h-4 w-4" />
                      <span>Bank</span>
                    </button>
                  </div>
                </div>

                {/* Donor Information */}
                <div className="space-y-4 mb-6">
                  <input
                    type="text"
                    placeholder="Full Name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                  <input
                    type="email"
                    placeholder="Email Address"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>

                {/* Donate Button */}
                <button className="w-full bg-red-600 text-white py-4 rounded-lg font-semibold text-lg hover:bg-red-700 transition-all duration-300 shadow-lg">
                  Donate ₹{donationAmount.toLocaleString()} {donationType === 'monthly' ? '/month' : ''}
                </button>
              </div>

              {/* Impact Summary */}
              <div className="bg-white rounded-xl p-6 h-fit">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Your Impact</h3>
                <div className="space-y-4">
                  {impact.map((item, index) => (
                    <div key={index} className={`flex items-start space-x-3 p-3 rounded-lg ${
                      donationAmount >= item.amount ? 'bg-green-50 border border-green-200' : 'bg-gray-50'
                    }`}>
                      <div className={`flex-shrink-0 p-2 rounded-full ${
                        donationAmount >= item.amount ? 'bg-green-100' : 'bg-gray-100'
                      }`}>
                        <item.icon className={`h-4 w-4 ${
                          donationAmount >= item.amount ? 'text-green-600' : 'text-gray-400'
                        }`} />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">₹{item.amount.toLocaleString()}</div>
                        <div className="text-sm text-gray-600">{item.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <div className="text-sm text-blue-800 font-medium mb-2">Tax Benefit</div>
                  <div className="text-2xl font-bold text-blue-600">
                    ₹{Math.round(donationAmount * 0.8).toLocaleString()}
                  </div>
                  <div className="text-sm text-blue-600">Tax deduction under 80G</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-20 bg-red-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Your Donations at Work
            </h2>
            <p className="text-xl text-red-100">
              See how your contributions are making a real difference in people's lives.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold mb-2">{stat.number}</div>
                <div className="text-red-100">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Donor Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our Donors Say
            </h2>
            <p className="text-xl text-gray-600">
              Stories from supporters who believe in our mission of accessible healthcare.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-lg p-8 shadow-md border border-gray-200">
                <div className="flex items-center mb-6">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-red-600 font-medium">{testimonial.amount} donated</div>
                  </div>
                </div>
                <p className="text-gray-700 italic">"{testimonial.quote}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Other Ways to Give */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Other Ways to Support Us
            </h2>
            <p className="text-xl text-gray-600">
              There are many ways to contribute to our mission beyond monetary donations.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-red-50 rounded-lg mb-6">
                <Users className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Volunteer</h3>
              <p className="text-gray-600 mb-4">
                Join our team of volunteers and help us reach more patients in need of assistance.
              </p>
              <button className="text-red-600 font-semibold hover:underline">
                Learn More →
              </button>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-red-50 rounded-lg mb-6">
                <Heart className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Spread the Word</h3>
              <p className="text-gray-600 mb-4">
                Share our mission with friends and family to help us reach more people who need our services.
              </p>
              <button className="text-red-600 font-semibold hover:underline">
                Share Now →
              </button>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-red-50 rounded-lg mb-6">
                <Building className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Corporate Partnership</h3>
              <p className="text-gray-600 mb-4">
                Partner with us to provide healthcare navigation services to your employees.
              </p>
              <button className="text-red-600 font-semibold hover:underline">
                Partner With Us →
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Donate;