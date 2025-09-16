import React, { useState } from 'react';
import { Upload, Camera, FileText, Heart, CheckCircle, ArrowRight, Shield, Users, FormInput, Send } from 'lucide-react';

const Tools = () => {
  const [activeTab] = useState('form'); // Always form
  const [uploadStep, setUploadStep] = useState('upload'); // upload, processing, results
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    procedureType: '',
    roomCategory: '',
    currentPrice: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const procedureTypes = [
    'Angiography',
    'Angioplasty',
    'Angiography + Angioplasty',
  ];

  const roomCategories = [
    'General Ward',
    'Twin sharing',
    'Single AC room',
    'Delux Room',
  ];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      setUploadStep('processing');
      // Simulate processing
      setTimeout(() => {
        setUploadStep('results');
      }, 3000);
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('https://fixrrahul.app.n8n.cloud/webhook/9353c05f-f4a4-4f39-aa73-21f564bf29f7', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'form_submission',
          procedureType: formData.procedureType,
          roomCategory: formData.roomCategory,
          currentPrice: formData.currentPrice,
          timestamp: new Date().toISOString(),
        }),
      });

      if (response.ok) {
        // Simulate processing and show results
        setTimeout(() => {
          setUploadStep('results');
          setIsSubmitting(false);
        }, 3000);
      } else {
        console.error('Form submission failed');
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const sampleResults = [
    {
      hospital: 'Apollo Hospital',
      location: 'Mumbai',
      originalCost: '₹3,50,000',
      negotiatedCost: '₹2,80,000',
      savings: '₹70,000',
      rating: 4.8,
      features: ['Insurance Accepted', 'Emergency Care', 'Parking Available'],
    },
  ];

  const benefits = [
    {
      icon: Heart,
      title: 'Always Free',
      description: 'Get your first hospital option completely free, no payment required',
    },
    {
      icon: Shield,
      title: 'Verified Hospitals',
      description: 'All our partner hospitals are verified for quality and safety',
    },
    {
      icon: Users,
      title: 'Real Savings',
      description: 'Families save an average of ₹85,000 on their medical bills',
    },
  ];

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-8">
            Get Better Hospital Rates,
            <br />
            <span className="text-red-600">Save Money Instantly</span>
          </h1>
          <p className="text-2xl text-gray-600 mb-12 max-w-4xl mx-auto">
            Upload your prescription or tell us about your procedure. Our AI finds you better hospital rates in seconds. 
            No forms to fill, no waiting, no hidden costs.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          {uploadStep === 'upload' && (
            <div className="bg-white rounded-3xl p-12 shadow-xl">
              <div className="text-center mb-8">
                <div className="bg-red-50 p-6 rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center">
                  <FormInput className="h-12 w-12 text-red-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Tell Us About Your Procedure
                </h2>
                <p className="text-xl text-gray-600">
                  Fill in the details below and we'll find you better hospital rates.
                </p>
              </div>

              <form onSubmit={handleFormSubmit} className="space-y-8">
                <div>
                  <label className="block text-lg font-bold text-gray-900 mb-4">
                    Type of Procedure *
                  </label>
                  <select
                    name="procedureType"
                    value={formData.procedureType}
                    onChange={handleInputChange}
                    required
                    className="w-full px-6 py-4 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-red-100 focus:border-red-500 text-lg"
                  >
                    <option value="">Select procedure type</option>
                    {procedureTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-lg font-bold text-gray-900 mb-4">
                    Room Category *
                  </label>
                  <select
                    name="roomCategory"
                    value={formData.roomCategory}
                    onChange={handleInputChange}
                    required
                    className="w-full px-6 py-4 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-red-100 focus:border-red-500 text-lg"
                  >
                    <option value="">Select room category</option>
                    {roomCategories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-lg font-bold text-gray-900 mb-4">
                    Current Quoted Price for Procedure *
                  </label>
                  <div className="relative">
                    <span className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg">₹</span>
                    <input
                      type="number"
                      name="currentPrice"
                      value={formData.currentPrice}
                      onChange={handleInputChange}
                      required
                      placeholder="Enter amount"
                      className="w-full pl-12 pr-6 py-4 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-red-100 focus:border-red-500 text-lg"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-red-600 text-white py-4 rounded-xl font-bold text-xl hover:bg-red-700 transition-all duration-300 shadow-lg flex items-center justify-center space-x-3 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                      <span>Finding Better Rates...</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-6 w-6" />
                      <span>Find Better Hospital Rates</span>
                    </>
                  )}
                </button>
              </form>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                {benefits.map((benefit, index) => (
                  <div key={index} className="text-center">
                    <div className="bg-red-50 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                      <benefit.icon className="h-8 w-8 text-red-600" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{benefit.title}</h3>
                    <p className="text-gray-600">{benefit.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {(uploadStep === 'processing' || isSubmitting) && (
            <div className="bg-white rounded-3xl p-12 shadow-xl text-center">
              <div className="bg-red-50 p-6 rounded-full w-24 h-24 mx-auto mb-8 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                {activeTab === 'upload' ? 'Our AI is Reading Your Prescription' : 'Finding Better Hospital Rates'}
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Please wait while we find the best hospital options for you...
              </p>
              <div className="bg-gray-100 rounded-full h-4 w-full max-w-md mx-auto">
                <div className="bg-red-600 h-4 rounded-full animate-pulse" style={{ width: '70%' }}></div>
              </div>
            </div>
          )}

          {uploadStep === 'results' && (
            <div className="space-y-8">
              {/* Free Result */}
              <div className="bg-white rounded-3xl p-8 shadow-xl border-4 border-green-200">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-8 w-8 text-green-600" />
                    <h2 className="text-2xl font-bold text-gray-900">Your Free Hospital Option</h2>
                  </div>
                  <div className="bg-green-100 text-green-800 px-4 py-2 rounded-full font-bold">
                    FREE
                  </div>
                </div>

                {sampleResults.map((result, index) => (
                  <div key={index} className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">{result.hospital}</h3>
                      <p className="text-lg text-gray-600 mb-4">{result.location}</p>
                      <div className="flex items-center space-x-2 mb-4">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <span key={i} className={`text-lg ${i < Math.floor(result.rating) ? 'text-yellow-400' : 'text-gray-300'}`}>
                              ★
                            </span>
                          ))}
                        </div>
                        <span className="text-gray-600">({result.rating})</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {result.features.map((feature, featureIndex) => (
                          <span key={featureIndex} className="bg-red-50 text-red-800 text-sm px-3 py-1 rounded-full">
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="text-center">
                      <div className="text-sm text-gray-500 mb-2">Original Quote</div>
                      <div className="text-2xl text-gray-400 line-through mb-4">{result.originalCost}</div>
                      <div className="text-sm text-gray-500 mb-2">Our Negotiated Rate</div>
                      <div className="text-3xl font-bold text-green-600">{result.negotiatedCost}</div>
                    </div>

                    <div className="text-center">
                      <div className="bg-green-50 rounded-2xl p-6">
                        <div className="text-sm text-gray-500 mb-2">You Save</div>
                        <div className="text-4xl font-bold text-green-600 mb-2">{result.savings}</div>
                        <div className="text-sm text-gray-600">20% savings</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Donation CTA */}
              <div className="bg-red-600 rounded-3xl p-8 text-white">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                  <div>
                    <h3 className="text-3xl font-bold mb-4">Want More Options?</h3>
                    <p className="text-xl text-red-100 mb-6">
                      Donate any amount to get a detailed report with 3+ hospital options, 
                      hidden cost breakdowns, medication prices, and insurance guidance.
                    </p>
                    <ul className="space-y-3 text-red-100">
                      <li className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5" />
                        <span>3+ verified hospital options</span>
                      </li>
                      <li className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5" />
                        <span>Complete cost breakdown with hidden charges</span>
                      </li>
                      <li className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5" />
                        <span>Medication and aftercare costs</span>
                      </li>
                      <li className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5" />
                        <span>Insurance claim assistance</span>
                      </li>
                    </ul>
                  </div>
                  <div className="text-center">
                    <div className="bg-white rounded-2xl p-8">
                      <h4 className="text-2xl font-bold text-gray-900 mb-4">Support Our Mission</h4>
                      <p className="text-gray-600 mb-6">
                        Your donation helps us provide free services to families in need
                      </p>
                      <div className="space-y-4">
                        <button className="w-full bg-red-600 text-white py-3 rounded-xl font-bold text-lg hover:bg-red-700 transition-colors">
                          Donate ₹500 - Get Full Report
                        </button>
                        <button className="w-full bg-red-600 text-white py-3 rounded-xl font-bold text-lg hover:bg-red-700 transition-colors">
                          Donate ₹1000 - Get Full Report
                        </button>
                        <button className="w-full border-2 border-red-600 text-red-600 py-3 rounded-xl font-bold text-lg hover:bg-red-600 hover:text-white transition-colors">
                          Custom Amount
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* How It Helps */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Why Families Trust SANDEH
            </h2>
            <p className="text-xl text-gray-600">
              We're not just finding you cheaper options - we're ensuring you get quality care at fair prices
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-red-50 rounded-2xl p-8 text-center">
              <div className="bg-red-600 p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Quality Verified</h3>
              <p className="text-gray-600">
                Every hospital in our network is verified for quality, safety standards, and patient satisfaction
              </p>
            </div>

            <div className="bg-gray-50 rounded-2xl p-8 text-center">
              <div className="bg-red-600 p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                <Heart className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Negotiated Rates</h3>
              <p className="text-gray-600">
                We work directly with hospitals to secure better rates for families, not just list prices
              </p>
            </div>

            <div className="bg-red-50 rounded-2xl p-8 text-center">
              <div className="bg-red-600 p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Ongoing Support</h3>
              <p className="text-gray-600">
                From prescription to recovery, our team supports your family through the entire journey
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-red-600 text-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Save Money on Healthcare?
          </h2>
          <p className="text-xl text-red-100 mb-8">
            Choose your preferred method and see how much your family can save
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => {
                setUploadStep('upload');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="bg-white text-red-600 px-8 py-4 rounded-xl font-bold text-xl hover:bg-gray-100 transition-all duration-300 inline-flex items-center justify-center space-x-3"
            >
              <FormInput className="h-6 w-6" />
              <span>Get Started Now</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Tools;