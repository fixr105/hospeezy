import React, { useState } from 'react';
import { Upload, Heart, Shield, Users, ArrowRight, CheckCircle, Camera, FileText, FormInput, Send, Phone, Mail, MapPin, Clock, Award, Linkedin, Twitter, CreditCard, Smartphone, Building, Star, TrendingUp, Eye, Target } from 'lucide-react';
import logo from "../logo.webp";
import drRohit from "../components/Dr rohit.jpg";
import drSwapnil from "../components/Dr swapnil.jpg";
import drManeesh from "../components/Dr maneesh.JPG";

const Home = () => {
  // Tools section state
  const [activeTab, setActiveTab] = useState('form');
  const [uploadStep, setUploadStep] = useState('upload');
  const [formData, setFormData] = useState({
    reasonForHospitalization: '',
    patientName: '',
    mobileNumber: '',
    email: '',
    city: '',
    paymentType: '',
    currentPrice: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Contact form state
  const [contactData, setContactData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    urgency: 'normal',
  });



  // Add state for hospital result
  const [hospitalResult, setHospitalResult] = useState<any>(null);
  const [modalStep, setModalStep] = useState<null | 'view' | 'claim' | 'success'>(null);
  const [claimData, setClaimData] = useState({ name: '', phone: '', city: '' });
  const [formSuccess, setFormSuccess] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  // 2D Echo section state
  const [echoLocation, setEchoLocation] = useState('');
  const [echoFormData, setEchoFormData] = useState({
    name: '',
    mobile: '',
    address: '',
    society: '',
    date: '',
    timeSlot: '',
    location: ''
  });
  const [echoSubmitting, setEchoSubmitting] = useState(false);
  const [echoSuccess, setEchoSuccess] = useState(false);
  const [echoError, setEchoError] = useState<string | null>(null);

  // Other locations form state
  const [otherLocationData, setOtherLocationData] = useState({
    name: '',
    mobile: '',
    city: ''
  });
  const [otherLocationSubmitting, setOtherLocationSubmitting] = useState(false);
  const [otherLocationSuccess, setOtherLocationSuccess] = useState(false);
  
  // Toggle state for service selection
  const [selectedService, setSelectedService] = useState<'medical' | 'home'>('home');

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



  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setLoading(true);

    try {
      const response = await fetch('https://fixrrahul.app.n8n.cloud/webhook/sandeh', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'form_submission',
          reasonForHospitalization: formData.reasonForHospitalization,
          patientName: formData.patientName,
          mobileNumber: formData.mobileNumber,
          email: formData.email,
          city: formData.city,
          paymentType: formData.paymentType,
          currentPrice: formData.currentPrice,
          timestamp: new Date().toISOString(),
        }),
      });

      if (response.ok) {
        // Show success message and WhatsApp option
        setFormSuccess(true);
        setIsSubmitting(false);
        setLoading(false);
        // Reset form data
        setFormData({
          reasonForHospitalization: '',
          patientName: '',
          mobileNumber: '',
          email: '',
          city: '',
          paymentType: '',
          currentPrice: '',
        });
        // Reset uploaded files
        setUploadedFiles([]);
      } else {
        setError('Form submission failed. Please try again later.');
        setIsSubmitting(false);
        setLoading(false);
      }
    } catch (error) {
      setError('Network error. Please check your connection or try again later.');
      setIsSubmitting(false);
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setUploadedFiles(prev => [...prev, ...files]);
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const [contactSubmitting, setContactSubmitting] = useState(false);
  const [contactSuccess, setContactSuccess] = useState(false);
  const [contactError, setContactError] = useState<string | null>(null);

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setContactSubmitting(true);
    setContactError(null);

    try {
      const response = await fetch('https://fixrrahul.app.n8n.cloud/webhook/sandeh', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'contact_form_submission',
          name: contactData.name,
          email: contactData.email,
          phone: contactData.phone,
          subject: contactData.subject,
          message: contactData.message,
          urgency: contactData.urgency,
          timestamp: new Date().toISOString(),
        }),
      });

      if (response.ok) {
        setContactSuccess(true);
        setContactSubmitting(false);
        // Reset form data
        setContactData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: '',
          urgency: 'normal',
        });
      } else {
        setContactError('Message submission failed. Please try again later.');
        setContactSubmitting(false);
      }
    } catch (error) {
      setContactError('Network error. Please check your connection or try again later.');
      setContactSubmitting(false);
    }
  };

  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setContactData({
      ...contactData,
      [e.target.name]: e.target.value,
    });
  };

  // 2D Echo form handlers
  const handleEchoFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEchoSubmitting(true);
    setEchoError(null);

    try {
      const response = await fetch('https://fixrrahul.app.n8n.cloud/webhook/sandeh', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: '2d_echo_booking',
          ...echoFormData,
          timestamp: new Date().toISOString(),
        }),
      });

      if (response.ok) {
        setEchoSuccess(true);
        setEchoSubmitting(false);
        // Reset form data
        setEchoFormData({
          name: '',
          mobile: '',
          address: '',
          society: '',
          date: '',
          timeSlot: '',
          location: ''
        });
      } else {
        setEchoError('Booking failed. Please try again later.');
        setEchoSubmitting(false);
      }
    } catch (error) {
      setEchoError('Network error. Please check your connection or try again later.');
      setEchoSubmitting(false);
    }
  };

  const handleEchoInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setEchoFormData({
      ...echoFormData,
      [e.target.name]: e.target.value,
    });
  };

  // Other locations form handler
  const handleOtherLocationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setOtherLocationSubmitting(true);

    try {
      const response = await fetch('https://fixrrahul.app.n8n.cloud/webhook/sandeh', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'other_location_enquiry',
          ...otherLocationData,
          timestamp: new Date().toISOString(),
        }),
      });

      if (response.ok) {
        setOtherLocationSuccess(true);
        setOtherLocationSubmitting(false);
        // Reset form data
        setOtherLocationData({
          name: '',
          mobile: '',
          city: ''
        });
      } else {
        setOtherLocationSubmitting(false);
      }
    } catch (error) {
      setOtherLocationSubmitting(false);
    }
  };

  const handleOtherLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOtherLocationData({
      ...otherLocationData,
      [e.target.name]: e.target.value,
    });
  };

  const stats = [
    { number: '2,500+', label: 'Families Helped', description: 'Across India' },
    { number: '₹5.2Cr', label: 'Money Saved', description: 'For patients' },
    { number: '150+', label: 'Partner Hospitals', description: 'Verified quality' },
    { number: '98%', label: 'Families Satisfied', description: 'With our help' },
  ];

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

  const leadership = [
    {
      name: 'Dr. Rohit Gokhale',
      role: 'MD Medicine',
      image: drRohit,
      bio: 'Specialized in internal medicine with extensive experience in patient care and medical diagnosis.',
    },
    {
      name: 'Dr. Swapnil Wahane',
      role: 'MS General Surgery',
      image: drSwapnil,
      bio: 'Expert general surgeon with advanced training in minimally invasive surgical techniques.',
    },
    {
      name: 'Dr. Maneesh Singh',
      role: 'MBBS',
      image: drManeesh,
      bio: 'Comprehensive medical practitioner with broad experience in primary healthcare and patient management.',
    },
  ];

  const values = [
    {
      icon: Heart,
      title: 'Compassionate Care',
      description: 'We treat every patient with empathy and understanding, recognizing that healthcare decisions are deeply personal.',
    },
    {
      icon: Shield,
      title: 'Transparency',
      description: 'Complete honesty in all our dealings, from cost estimates to treatment options, building trust through openness.',
    },
    {
      icon: Users,
      title: 'Patient Empowerment',
      description: 'We believe informed patients make better decisions. We provide the tools and knowledge needed for confident choices.',
    },
    {
      icon: TrendingUp,
      title: 'Continuous Improvement',
      description: 'We constantly evolve our services based on patient feedback and emerging healthcare trends.',
    },
  ];

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section 
        id="hero" 
        className="py-24 text-center relative overflow-hidden min-h-screen flex items-center cursor-pointer hover:bg-opacity-95 transition-all duration-300" 
        style={{ background: 'linear-gradient(135deg, #f8d6d8 0%, #fff 50%, #f0f9ff 100%)' }}
        onClick={() => document.getElementById('tools')?.scrollIntoView({ behavior: 'smooth' })}
      >
        {/* Hover overlay effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-blue-500/5 opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
        
        {/* Enhanced animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Large floating circles */}
          <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-br from-red-100 to-red-200 rounded-full opacity-30 animate-pulse blur-sm"></div>
          <div className="absolute bottom-20 right-10 w-24 h-24 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full opacity-20 animate-bounce blur-sm" style={{ animationDelay: '1s', animationDuration: '3s' }}></div>
          <div className="absolute top-1/3 right-1/4 w-20 h-20 bg-gradient-to-br from-green-100 to-green-200 rounded-full opacity-20 animate-ping blur-sm" style={{ animationDelay: '2s', animationDuration: '4s' }}></div>
          <div className="absolute bottom-1/3 left-1/4 w-16 h-16 bg-gradient-to-br from-purple-100 to-purple-200 rounded-full opacity-30 animate-pulse blur-sm" style={{ animationDelay: '0.5s', animationDuration: '2.5s' }}></div>
          
          {/* Additional floating elements */}
          <div className="absolute top-1/2 left-1/6 w-12 h-12 bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-full opacity-25 animate-bounce blur-sm" style={{ animationDelay: '1.5s', animationDuration: '3.5s' }}></div>
          <div className="absolute top-1/4 right-1/6 w-8 h-8 bg-gradient-to-br from-pink-100 to-pink-200 rounded-full opacity-20 animate-ping blur-sm" style={{ animationDelay: '3s', animationDuration: '5s' }}></div>
        </div>

        {/* Enhanced floating particles with different sizes and speeds */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/5 w-3 h-3 bg-red-300 rounded-full animate-ping" style={{ animationDelay: '0s', animationDuration: '2s' }}></div>
          <div className="absolute top-1/2 right-1/3 w-2 h-2 bg-blue-300 rounded-full animate-ping" style={{ animationDelay: '1.5s', animationDuration: '3s' }}></div>
          <div className="absolute bottom-1/4 left-1/3 w-2.5 h-2.5 bg-green-300 rounded-full animate-ping" style={{ animationDelay: '3s', animationDuration: '2.5s' }}></div>
          <div className="absolute top-3/4 right-1/4 w-1.5 h-1.5 bg-purple-300 rounded-full animate-ping" style={{ animationDelay: '2s', animationDuration: '4s' }}></div>
          <div className="absolute top-1/6 right-1/2 w-1 h-1 bg-yellow-300 rounded-full animate-ping" style={{ animationDelay: '4s', animationDuration: '3s' }}></div>
        </div>

        {/* Floating medical icons */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/5 left-1/10 animate-bounce" style={{ animationDelay: '0s', animationDuration: '4s' }}>
            <Heart className="h-8 w-8 text-red-400 opacity-20" />
          </div>
          <div className="absolute top-1/3 right-1/8 animate-bounce" style={{ animationDelay: '2s', animationDuration: '3s' }}>
            <Shield className="h-6 w-6 text-blue-400 opacity-20" />
          </div>
          <div className="absolute bottom-1/4 left-1/6 animate-bounce" style={{ animationDelay: '1s', animationDuration: '5s' }}>
            <Users className="h-7 w-7 text-green-400 opacity-20" />
          </div>
          <div className="absolute bottom-1/3 right-1/5 animate-bounce" style={{ animationDelay: '3s', animationDuration: '4s' }}>
            <CheckCircle className="h-5 w-5 text-purple-400 opacity-20" />
          </div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full group">
          {/* Logo with enhanced animation */}
          <div className="flex justify-center mb-6 sm:mb-10 px-4 sm:px-0">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-red-200 to-blue-200 rounded-full blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500"></div>
              <img 
                src={logo} 
                alt="SANDEH NGO Logo" 
                className="relative h-48 sm:h-60 lg:h-72 w-auto object-contain drop-shadow-2xl hover:scale-110 transition-all duration-700 transform hover:rotate-1" 
              />
            </div>
          </div>
          
          {/* Enhanced animated mission badge with glow effect */}
          <div className="flex justify-center mb-10 sm:mb-12">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-600 rounded-full blur-lg opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
              <div 
                style={{ backgroundColor: '#b91f26' }} 
                className="relative text-white px-8 sm:px-16 lg:px-20 py-6 sm:py-8 lg:py-10 rounded-full font-bold text-xl sm:text-2xl lg:text-4xl shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-1 border-2 border-red-400"
              >
                आपका संदेह हम दूर करेंगे
              </div>
            </div>
          </div>
          
          {/* Enhanced main headline with animated gradient */}
          <div className="mb-8 lg:mb-12">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-4 lg:mb-6">
              <span className="bg-gradient-to-r from-red-600 via-blue-600 to-green-600 bg-clip-text text-transparent animate-pulse" style={{ animationDuration: '3s' }}>
                Healthcare Savings Made Simple
              </span>
            </h1>
            
            {/* Animated subtitle */}
            <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 max-w-5xl mx-auto leading-relaxed px-4 animate-fade-in" style={{ animationDelay: '0.5s' }}>
              SANDEH helps families access quality healthcare without financial stress. 
              <span className="font-semibold text-red-600"> Choose your path to better healthcare rates.</span>
            </p>
          </div>

          {/* Enhanced Promise Cards with staggered animations and improved layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-16 lg:mb-20 max-w-7xl mx-auto px-4">
            {/* Insurance Promise Card with enhanced animations */}
            <div className="group bg-white rounded-3xl p-6 sm:p-8 lg:p-10 shadow-2xl border-2 border-blue-200 hover:shadow-3xl transition-all duration-700 transform hover:-translate-y-3 flex flex-col h-full relative overflow-hidden">
              {/* Background gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10">
                <div className="text-center mb-6 lg:mb-8">
                  <div className="bg-gradient-to-br from-blue-100 to-blue-200 p-4 sm:p-6 rounded-full w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6 flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-500 transform hover:scale-110 group-hover:rotate-12">
                    <Heart className="h-8 w-8 sm:h-10 sm:w-10 text-blue-600 animate-pulse" style={{ animationDuration: '2s' }} />
                  </div>
                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-2 lg:mb-3 group-hover:text-blue-700 transition-colors duration-300">If you have Insurance</h2>
                  <p className="text-sm sm:text-base lg:text-lg text-gray-600">Complete coverage with zero additional costs</p>
                </div>
                
                <div className="space-y-3 sm:space-y-5 mb-8 lg:mb-10 flex-grow">
                  {[
                    '0 Co-payment',
                    '0 Sub-limit', 
                    '0 Out of pocket expenses',
                    '0 Follow up charges'
                  ].map((benefit, index) => (
                    <div 
                      key={index} 
                      className="flex items-center gap-3 sm:gap-4 p-2 sm:p-3 rounded-xl hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 hover:translate-x-2"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="bg-green-100 p-1.5 sm:p-2 rounded-full group-hover:bg-green-200 transition-colors duration-300">
                        <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" />
                      </div>
                      <span className="text-sm sm:text-base lg:text-xl font-semibold text-gray-900">{benefit}</span>
                    </div>
                  ))}
                </div>
                
                <button
                  onClick={() => document.getElementById('tools')?.scrollIntoView({ behavior: 'smooth' })}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 sm:py-4 lg:py-5 rounded-xl font-bold text-base sm:text-lg lg:text-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-500 shadow-lg transform hover:scale-105 hover:-translate-y-1 mt-auto group-hover:shadow-2xl"
                >
                  Tell Us About Your Procedure
                </button>
              </div>
            </div>

            {/* Out of Pocket Promise Card with enhanced animations */}
            <div className="group bg-white rounded-3xl p-6 sm:p-8 lg:p-10 shadow-2xl border-2 border-red-200 hover:shadow-3xl transition-all duration-700 transform hover:-translate-y-3 flex flex-col h-full relative overflow-hidden">
              {/* Background gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-red-50 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10">
                <div className="text-center mb-6 lg:mb-8">
                  <div className="bg-gradient-to-br from-red-100 to-red-200 p-4 sm:p-6 rounded-full w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6 flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-500 transform hover:scale-110 group-hover:rotate-12">
                    <Heart className="h-8 w-8 sm:h-10 sm:w-10 text-red-600 animate-pulse" style={{ animationDuration: '2s' }} />
                  </div>
                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-2 lg:mb-3 group-hover:text-red-700 transition-colors duration-300">If you don't have Insurance</h2>
                  <p className="text-sm sm:text-base lg:text-lg text-gray-600">Massive savings on quality healthcare</p>
                </div>
                
                <div className="text-center mb-8 lg:mb-10 flex-grow">
                  <div className="bg-gradient-to-br from-red-50 to-red-100 border-2 border-red-200 rounded-3xl p-4 sm:p-6 lg:p-8 shadow-lg hover:shadow-xl transition-all duration-500 transform hover:scale-105 group-hover:border-red-300">
                    <div className="text-4xl sm:text-5xl lg:text-6xl font-bold text-red-600 mb-2 lg:mb-3 animate-pulse group-hover:animate-bounce" style={{ animationDuration: '2s' }}>50% OFF</div>
                    <div className="text-sm sm:text-base lg:text-xl font-semibold text-gray-900 mb-1 lg:mb-2">Flat discount on</div>
                    <div className="text-lg sm:text-xl lg:text-2xl font-bold text-red-600 group-hover:text-red-700 transition-colors duration-300">50+ Procedures</div>
                  </div>
                </div>
                
                <button
                  onClick={() => document.getElementById('tools')?.scrollIntoView({ behavior: 'smooth' })}
                  className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-3 sm:py-4 lg:py-5 rounded-xl font-bold text-base sm:text-lg lg:text-xl hover:from-red-700 hover:to-red-800 transition-all duration-500 shadow-lg transform hover:scale-105 hover:-translate-y-1 mt-auto group-hover:shadow-2xl"
                >
                  Tell Us About Your Procedure
                </button>
              </div>
            </div>
          </div>

          {/* Enhanced animated trust indicators with staggered animations */}
          <div className="flex flex-wrap justify-center gap-8 sm:gap-10 text-lg text-gray-600">
            {[
              { icon: Shield, text: 'Verified Hospitals', bgColor: 'bg-red-100', iconColor: '#b91f26' },
              { icon: Users, text: '2,500+ Families Helped', bgColor: 'bg-blue-100', iconColor: '#b91f26' },
              { icon: CheckCircle, text: 'Always Free Service', bgColor: 'bg-green-100', iconColor: '#b91f26' }
            ].map((item, index) => (
              <div 
                key={index}
                className="flex items-center gap-3 hover:scale-110 transition-all duration-500 transform hover:-translate-y-1 group"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className={`${item.bgColor} p-3 rounded-full group-hover:shadow-lg transition-all duration-300 transform group-hover:rotate-12`}>
                  <item.icon className="h-6 w-6" style={{ color: item.iconColor }} />
                </div>
                <span className="font-semibold group-hover:text-red-600 transition-colors duration-300">{item.text}</span>
              </div>
            ))}
          </div>

          {/* Enhanced Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="flex flex-col items-center space-y-2">
              <div className="text-sm font-semibold text-gray-600 bg-white/80 px-4 py-2 rounded-full shadow-lg">
                Click anywhere to get started
              </div>
              <div className="w-6 h-10 border-2 border-red-500 rounded-full flex justify-center bg-white/50">
                <div className="w-1 h-3 bg-red-500 rounded-full mt-2 animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Statement */}
      <section className="bg-red-600 py-24 text-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-4xl lg:text-6xl font-bold mb-8">
            Healthcare Shouldn't Bankrupt Families
          </h2>
          <p className="text-2xl text-red-100 mb-12 leading-relaxed max-w-4xl mx-auto">
            Every day, families across India face impossible choices: get the medical care they need 
            or protect their life savings. Hospital bills are confusing, prices are hidden, 
            and families often pay 2-3 times more than necessary.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/10 rounded-2xl p-8 backdrop-blur-sm">
              <div className="text-4xl font-bold mb-4">70%</div>
              <div className="text-xl">of families go into debt for medical care</div>
            </div>
            <div className="bg-white/10 rounded-2xl p-8 backdrop-blur-sm">
              <div className="text-4xl font-bold mb-4">3x</div>
              <div className="text-xl">higher costs due to lack of transparency</div>
            </div>
            <div className="bg-white/10 rounded-2xl p-8 backdrop-blur-sm">
              <div className="text-4xl font-bold mb-4">0</div>
              <div className="text-xl">easy ways to compare hospital prices</div>
            </div>
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section id="tools" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-8">
              Our Services
            </h2>
            <p className="text-2xl text-gray-600 mb-12 max-w-4xl mx-auto">
              Choose the service that best fits your healthcare needs
            </p>
            
            {/* Service Toggle */}
            <div className="flex justify-center mb-12">
              <div className="bg-gray-100 p-2 rounded-2xl flex space-x-2">
                <button
                  onClick={() => setSelectedService('medical')}
                  className={`px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 ${
                    selectedService === 'medical'
                      ? 'bg-red-600 text-white shadow-lg transform scale-105'
                      : 'text-gray-600 hover:text-gray-800 hover:bg-gray-200'
                  }`}
                >
                  Medical Procedures
                </button>
                <button
                  onClick={() => setSelectedService('home')}
                  className={`px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 ${
                    selectedService === 'home'
                      ? 'bg-red-600 text-white shadow-lg transform scale-105'
                      : 'text-gray-600 hover:text-gray-800 hover:bg-gray-200'
                  }`}
                >
                  @Home Services
                </button>
              </div>
            </div>
          </div>
          
          <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 transition-all duration-500 ${
            selectedService === 'medical' ? 'lg:grid-cols-[2fr_1fr]' : 'lg:grid-cols-[1fr_2fr]'
          }`}>
            {/* Left Column - Hospital Rates */}
            <div className={`bg-white rounded-3xl p-8 shadow-xl transition-all duration-500 ${
              selectedService === 'medical' 
                ? 'transform scale-105 shadow-2xl ring-4 ring-red-200' 
                : 'opacity-60 blur-sm transform scale-95'
            }`}>
              <div className="text-center mb-8">
                <div className="bg-red-50 p-6 rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center">
                  <FormInput className="h-12 w-12 text-red-600" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-4">
                  Get Better Hospital Rates
                </h3>
                <p className="text-xl text-gray-600">
                  Tell us about your procedure. Our AI finds you better hospital rates in seconds.
                </p>
              </div>

            <form onSubmit={handleFormSubmit} className="space-y-8">
              <div>
                <label className="block text-lg font-bold text-gray-900 mb-4">
                  Reason for Hospitalization *
                </label>
                <input
                  type="text"
                  name="reasonForHospitalization"
                  value={formData.reasonForHospitalization}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter reason for hospitalization"
                  className="w-full px-6 py-4 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-red-100 focus:border-red-500 text-lg"
                />
              </div>

              <div>
                <label className="block text-lg font-bold text-gray-900 mb-4">
                  Name of Patient *
                </label>
                <input
                  type="text"
                  name="patientName"
                  value={formData.patientName}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter patient name"
                  className="w-full px-6 py-4 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-red-100 focus:border-red-500 text-lg"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-lg font-bold text-gray-900 mb-4">
                    Mobile Number *
                  </label>
                  <input
                    type="tel"
                    name="mobileNumber"
                    value={formData.mobileNumber}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter mobile number"
                    className="w-full px-6 py-4 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-red-100 focus:border-red-500 text-lg"
                  />
                </div>

                <div>
                  <label className="block text-lg font-bold text-gray-900 mb-4">
                    City *
                  </label>
                  <select
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                    className="w-full px-6 py-4 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-red-100 focus:border-red-500 text-lg"
                  >
                    <option value="">Select city</option>
                    <option value="mumbai-mmr">Mumbai MMR region</option>
                    <option value="out-of-mumbai">Out of mumbai (currently unservicable)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-lg font-bold text-gray-900 mb-4">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter email address"
                  className="w-full px-6 py-4 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-red-100 focus:border-red-500 text-lg"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

                <div>
                  <label className="block text-lg font-bold text-gray-900 mb-4">
                    Payment Type *
                  </label>
                  <div className="space-y-3">
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="radio"
                        name="paymentType"
                        value="insurance"
                        checked={formData.paymentType === 'insurance'}
                        onChange={handleInputChange}
                        required
                        className="w-5 h-5 text-red-600 border-gray-300 focus:ring-red-500"
                      />
                      <span className="text-lg text-gray-900">Insurance Claim needed</span>
                    </label>
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="radio"
                        name="paymentType"
                        value="out-of-pocket"
                        checked={formData.paymentType === 'out-of-pocket'}
                        onChange={handleInputChange}
                        required
                        className="w-5 h-5 text-red-600 border-gray-300 focus:ring-red-500"
                      />
                      <span className="text-lg text-gray-900">Out of Pocket</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* File Upload Section */}
              <div className="bg-red-50 bg-opacity-50 border-2 border-red-200 rounded-2xl p-6 space-y-4">
                <div className="text-center">
                  <h3 className="text-xl font-bold text-red-800 mb-2">📋 Upload Medical Documents (optional)</h3>
                  <p className="text-red-700">Prescriptions, medical reports, blood tests, X-rays, MRI scans, discharge summaries</p>
                </div>

                {/* Upload Area */}
                <label className="cursor-pointer block">
                  <div className="relative border-3 border-dashed border-red-300 rounded-2xl p-12 text-center hover:border-red-500 transition-all duration-300 bg-white bg-opacity-80 hover:bg-white min-h-[200px] flex items-center justify-center">
                    {/* Translucent Heart Background */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-10">
                      <Heart className="h-32 w-32 text-red-500" />
                    </div>
                    
                    <div className="relative z-10 space-y-4">
                      <div className="flex justify-center">
                        <div className="bg-red-100 p-4 rounded-full">
                          <Upload className="h-8 w-8 text-red-600" />
                        </div>
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-red-800 mb-2">Drag & Drop Files Here</h4>
                        <p className="text-red-700">or click to browse</p>
                      </div>
                      <p className="text-sm text-red-600">
                        PDF, JPG, PNG, DOC, DOCX (Max 10MB)
                      </p>
                    </div>
                    
                    <input
                      type="file"
                      multiple
                      accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </div>
                </label>

                {/* Uploaded Files List */}
                {uploadedFiles.length > 0 && (
                  <div className="space-y-3">
                    <h4 className="text-lg font-bold text-red-800">Uploaded Documents ({uploadedFiles.length})</h4>
                    <div className="space-y-2">
                      {uploadedFiles.map((file, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-white bg-opacity-90 border border-red-200 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <FileText className="h-5 w-5 text-red-600" />
                            <div>
                              <p className="font-semibold text-red-800">{file.name}</p>
                              <p className="text-sm text-red-600">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeFile(index)}
                            className="text-red-600 hover:text-red-800 p-1"
                          >
                            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
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

            {formSuccess && (
              <div className="max-w-2xl mx-auto my-8 p-8 bg-green-50 border-2 border-green-200 rounded-2xl text-center">
                <div className="mb-6">
                  <div className="bg-green-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-green-800 mb-2">Form Submitted Successfully!</h3>
                  <p className="text-green-700 text-lg">
                    Thank you for sharing your details. Our team will analyze your requirements and get back to you shortly.
                  </p>
                </div>
                
                <div className="space-y-4">
                  <p className="text-gray-700 font-semibold">Want to connect with Dr. Manish directly?</p>
                  <a
                    href="https://wa.me/919029466003?text=Hi%20Dr.%20Manish,%20i%20have%20shared%20my%20details%20on%20the%20website%20sandehindia.org,%20looking%20forward%20to%20your%20kind%20advise"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center bg-green-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-green-700 transition-all duration-300 shadow-lg transform hover:scale-105"
                  >
                    <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                    </svg>
                    Connect on WhatsApp
                  </a>
                </div>
                
                <button
                  onClick={() => setFormSuccess(false)}
                  className="mt-6 text-gray-600 hover:text-gray-800 font-semibold underline"
                >
                  Submit Another Request
                </button>
              </div>
            )}
            
            {error === 'competitive-offer' && (
              <div className="max-w-2xl mx-auto my-8 p-4 bg-green-100 text-green-800 rounded-xl text-center font-semibold border border-green-300">
                You already have a competitive offer for this procedure! Best of luck.
              </div>
            )}
            {error && error !== 'competitive-offer' && (
              <div className="max-w-2xl mx-auto my-8 p-4 bg-red-100 text-red-700 rounded-xl text-center font-semibold">
                {error}
              </div>
            )}
            {loading && (
              <div className="max-w-2xl mx-auto my-8 p-4 bg-blue-100 text-blue-700 rounded-xl text-center font-semibold">
                Finding the best hospital rates for you...
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              {benefits.map((benefit, index) => (
                <div key={index} className="text-center">
                  <div className="bg-red-50 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <benefit.icon className="h-8 w-8 text-red-600" />
                  </div>
                  <h5 className="text-lg font-bold text-gray-900 mb-2">{benefit.title}</h5>
                  <p className="text-gray-600">{benefit.description}</p>
                </div>
              ))}
            </div>
            </div>
            
            {/* Right Column - 2D Echo Complete Booking */}
            <div className={`bg-white rounded-3xl p-8 shadow-xl transition-all duration-500 ${
              selectedService === 'home' 
                ? 'transform scale-105 shadow-2xl ring-4 ring-red-200' 
                : 'opacity-60 blur-sm transform scale-95'
            }`}>
              <div className="text-center mb-8">
                <div className="bg-red-50 p-6 rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center">
                  <Heart className="h-12 w-12 text-red-600" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-4">
                  2D Echo at Home – Thane Exclusive
                </h3>
                <p className="text-xl text-gray-600 mb-6">
                  Doctor-supervised heart checkup at your doorstep. Reports delivered within 6 hours.
                </p>
                
                {/* Price Display */}
                <div className="bg-red-50 rounded-2xl p-6 border-2 border-red-200 mb-6">
                  <div className="text-center">
                    <div className="text-lg text-gray-500 line-through mb-1">₹7000 MRP</div>
                    <div className="text-3xl font-bold text-red-600 mb-1">₹3999</div>
                    <div className="text-sm text-green-600 font-semibold">(Intro Offer)</div>
                    <div className="text-sm text-gray-600 mt-2">Limited time offer - Save ₹3001</div>
                  </div>
                </div>
              </div>

              {/* Location Selection */}
              <div className="mb-8">
                <h4 className="text-xl font-bold text-gray-900 mb-4 text-center">Select Your Location</h4>
                <p className="text-gray-600 text-center mb-4">Choose your area to see availability and pricing</p>
                <select 
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-red-100 focus:border-red-500 text-lg font-semibold"
                  value={echoLocation}
                  onChange={(e) => setEchoLocation(e.target.value)}
                >
                  <option value="">Select Location</option>
                  <option value="ghodbunder-road">Ghodbunder Road, Thane</option>
                  <option value="other-location">Other Location</option>
                </select>
              </div>

              {/* Booking Form */}
              <div className="mb-8">
                <h4 className="text-xl font-bold text-gray-900 mb-4 text-center">Book Your 2D Echo</h4>
                <p className="text-gray-600 text-center mb-6">Fill in your details to reserve your slot</p>
                
                <form onSubmit={handleEchoFormSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-gray-900 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={echoFormData.name}
                        onChange={handleEchoInputChange}
                        required
                        placeholder="Enter your full name"
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-red-100 focus:border-red-500 text-sm"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-bold text-gray-900 mb-2">
                        Mobile Number *
                      </label>
                      <input
                        type="tel"
                        name="mobile"
                        value={echoFormData.mobile}
                        onChange={handleEchoInputChange}
                        required
                        placeholder="Enter mobile number"
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-red-100 focus:border-red-500 text-sm"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-bold text-gray-900 mb-2">
                        Complete Address *
                      </label>
                      <textarea
                        name="address"
                        value={echoFormData.address}
                        onChange={handleEchoInputChange}
                        required
                        rows={2}
                        placeholder="Enter your complete address with landmarks"
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-red-100 focus:border-red-500 text-sm resize-none"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-bold text-gray-900 mb-2">
                        Society/Building Name *
                      </label>
                      <input
                        type="text"
                        name="society"
                        value={echoFormData.society}
                        onChange={handleEchoInputChange}
                        required
                        placeholder="Enter society or building name"
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-red-100 focus:border-red-500 text-sm"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-bold text-gray-900 mb-2">
                        Preferred Date *
                      </label>
                      <input
                        type="date"
                        name="date"
                        value={echoFormData.date}
                        onChange={handleEchoInputChange}
                        required
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-red-100 focus:border-red-500 text-sm"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-bold text-gray-900 mb-2">
                        Time Slot *
                      </label>
                      <select
                        name="timeSlot"
                        value={echoFormData.timeSlot}
                        onChange={handleEchoInputChange}
                        required
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-red-100 focus:border-red-500 text-sm"
                      >
                        <option value="">Select time slot</option>
                        <option value="9-11">9:00 AM - 11:00 AM</option>
                        <option value="11-1">11:00 AM - 1:00 PM</option>
                        <option value="2-4">2:00 PM - 4:00 PM</option>
                        <option value="4-6">4:00 PM - 6:00 PM</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-bold text-gray-900 mb-2">
                        Location *
                      </label>
                      <select
                        name="location"
                        value={echoFormData.location}
                        onChange={handleEchoInputChange}
                        required
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-red-100 focus:border-red-500 text-sm"
                      >
                        <option value="">Select location</option>
                        <option value="ghodbunder-road">Ghodbunder Road, Thane</option>
                      </select>
                    </div>
                  </div>
                  
                  <button
                    type="submit"
                    disabled={echoSubmitting}
                    className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-4 rounded-xl font-bold text-lg hover:from-red-700 hover:to-red-800 transition-all duration-300 shadow-lg flex items-center justify-center space-x-3 disabled:opacity-50 disabled:cursor-not-allowed mt-6"
                  >
                    {echoSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        <span>Booking...</span>
                      </>
                    ) : (
                      <>
                        <span>Book Now</span>
                        <ArrowRight className="h-5 w-5" />
                      </>
                    )}
                  </button>
                </form>

                {/* Success/Error Messages for Echo Booking */}
                {echoSuccess && (
                  <div className="max-w-md mx-auto my-6 p-6 bg-green-50 border-2 border-green-200 rounded-2xl text-center">
                    <div className="mb-4">
                      <div className="bg-green-100 p-3 rounded-full w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                        <CheckCircle className="h-6 w-6 text-green-600" />
                      </div>
                      <h3 className="text-lg font-bold text-green-800 mb-2">Booking Confirmed!</h3>
                      <p className="text-green-700 text-sm">
                        Your 2D Echo appointment has been booked successfully. We'll contact you shortly to confirm the details.
                      </p>
                    </div>
                    <button
                      onClick={() => setEchoSuccess(false)}
                      className="text-gray-600 hover:text-gray-800 font-semibold underline text-sm"
                    >
                      Book Another Appointment
                    </button>
                  </div>
                )}

                {echoError && (
                  <div className="max-w-md mx-auto my-6 p-4 bg-red-100 text-red-700 rounded-xl text-center font-semibold text-sm">
                    {echoError}
                  </div>
                )}
              </div>

              {/* Benefits Section */}
              <div className="mt-8 space-y-4">
                <div className="bg-green-50 border-2 border-green-200 rounded-xl p-4">
                  <div className="flex items-center space-x-3">
                    <div className="bg-green-100 p-2 rounded-full">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <h5 className="font-bold text-green-800 text-sm">Always Free</h5>
                      <p className="text-green-700 text-xs">Get your first hospital option completely free, no payment required</p>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4">
                  <div className="flex items-center space-x-3">
                    <div className="bg-blue-100 p-2 rounded-full">
                      <Shield className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h5 className="font-bold text-blue-800 text-sm">Verified Hospitals</h5>
                      <p className="text-blue-700 text-xs">All our partner hospitals are verified for quality and safety</p>
                    </div>
                  </div>
                </div>

                <div className="bg-purple-50 border-2 border-purple-200 rounded-xl p-4">
                  <div className="flex items-center space-x-3">
                    <div className="bg-purple-100 p-2 rounded-full">
                      <Heart className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <h5 className="font-bold text-purple-800 text-sm">Real Savings</h5>
                      <p className="text-purple-700 text-xs">Families save an average of ₹85,000 on their medical bills</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-8">
              Real Families, Real Savings
            </h2>
            <p className="text-2xl text-gray-600">
              Every number represents a family that didn't have to choose between health and money
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="bg-gray-50 rounded-3xl p-8 text-center shadow-lg hover:shadow-xl transition-shadow">
                <div className="text-5xl font-bold text-red-600 mb-4">{stat.number}</div>
                <div className="text-xl font-semibold text-gray-900 mb-2">{stat.label}</div>
                <div className="text-gray-600">{stat.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-red-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold mb-8">Our Mission is Simple</h2>
            <p className="text-2xl text-red-100 max-w-4xl mx-auto">
              No family should face financial ruin because they couldn't find affordable healthcare options
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="bg-white/10 rounded-2xl p-8 backdrop-blur-sm">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-2xl mb-6">
                  <Target className="h-10 w-10 text-red-600" />
                </div>
                <h3 className="text-2xl font-bold mb-4">What We Do</h3>
                <p className="text-red-100 text-lg">
                  We use AI to read prescriptions and instantly find families better hospital rates, 
                  saving them thousands of rupees on quality healthcare.
                </p>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-white/10 rounded-2xl p-8 backdrop-blur-sm">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-2xl mb-6">
                  <Eye className="h-10 w-10 text-red-600" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
                <p className="text-red-100 text-lg">
                  An India where every family can access quality healthcare without fear of bankruptcy, 
                  where prices are transparent and options are clear.
                </p>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-white/10 rounded-2xl p-8 backdrop-blur-sm">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-2xl mb-6">
                  <Award className="h-10 w-10 text-red-600" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Our Promise</h3>
                <p className="text-red-100 text-lg">
                  We will always provide our basic service free to families in need, 
                  because healthcare guidance should never be a luxury.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-8">How We Work</h2>
            <p className="text-2xl text-gray-600">
              Every decision we make is guided by our commitment to families
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-red-50 rounded-3xl p-12 hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-start space-x-6">
                  <div className="flex-shrink-0">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-red-600 rounded-2xl">
                      <value.icon className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{value.title}</h3>
                    <p className="text-xl text-gray-600">{value.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How We Help Your Family - Short, Horizontal, Dual Option */}
      <section id="services" className="py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">How We Help Your Family</h2>
            <p className="text-xl text-gray-600">Simple, fast, and always focused on saving you money</p>
          </div>
          <div className="flex flex-col md:flex-row justify-center items-stretch gap-8">
            <div className="flex-1 bg-white rounded-2xl p-8 shadow-md flex flex-col items-center">
              <Camera className="h-10 w-10 text-red-600 mb-4" />
              <h3 className="text-xl font-bold mb-2 text-gray-900">Upload Prescription</h3>
              <p className="text-gray-600 mb-4 text-center">Snap a photo or upload your doctor's prescription. Our AI reads it instantly and finds you better hospital rates.</p>
            </div>
            <div className="flex-1 bg-white rounded-2xl p-8 shadow-md flex flex-col items-center">
              <FormInput className="h-10 w-10 text-red-600 mb-4" />
              <h3 className="text-xl font-bold mb-2 text-gray-900">Fill Details</h3>
              <p className="text-gray-600 mb-4 text-center">No prescription? Just fill in your procedure details and we'll do the rest—get instant hospital options and savings.</p>
            </div>
            <div className="flex-1 bg-white rounded-2xl p-8 shadow-md flex flex-col items-center">
              <CheckCircle className="h-10 w-10 text-green-600 mb-4" />
              <h3 className="text-xl font-bold mb-2 text-gray-900">Get Results</h3>
              <p className="text-gray-600 mb-4 text-center">Receive verified hospital options with negotiated rates—see exactly how much you can save, instantly.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-20 bg-gradient-to-br from-red-50 via-white to-blue-50 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 to-blue-500/5"></div>
        <div className="absolute top-10 left-10 w-20 h-20 bg-red-100 rounded-full opacity-30 animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-blue-100 rounded-full opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
        
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* Header with Urgency */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center bg-red-100 text-red-700 px-4 py-2 rounded-full text-sm font-semibold mb-6 animate-pulse">
              <Clock className="w-4 h-4 mr-2" />
              Available 24/7 for Emergency Consultations
            </div>
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-red-600 to-blue-600 bg-clip-text text-transparent mb-6">
              Expert Medical Team
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              Board-certified specialists ready to provide immediate guidance for your healthcare needs
            </p>
          </div>

          {/* Team Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {leadership.map((member, index) => (
              <div key={index} className="group relative">
                {/* Card */}
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-white/50 hover:border-red-200 hover:-translate-y-2">
                  {/* Status Badge */}
                  <div className="absolute -top-3 -right-3 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold animate-pulse">
                    Available
                  </div>
                  
                  {/* Doctor Image */}
                  <div className="relative mb-6">
                    <div className="w-28 h-28 mx-auto relative">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full rounded-full object-cover object-center border-4 border-white shadow-lg group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-red-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  </div>
                  
                  {/* Doctor Info */}
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-red-600 transition-colors duration-300">
                      {member.name}
                    </h3>
                    <div className="inline-flex items-center bg-gradient-to-r from-red-500 to-blue-500 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
                      {member.role}
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {member.bio}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>



      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gradient-to-br from-blue-50 via-white to-red-50 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-red-500/5"></div>
        <div className="absolute top-20 right-20 w-24 h-24 bg-blue-100 rounded-full opacity-30 animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-28 h-28 bg-red-100 rounded-full opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
        
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* Header with Urgency */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center bg-red-100 text-red-700 px-4 py-2 rounded-full text-sm font-semibold mb-6 animate-pulse">
              <Phone className="w-4 h-4 mr-2" />
              Immediate Response Guaranteed
            </div>
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-red-600 bg-clip-text text-transparent mb-6">
              Get Help Now
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              Our medical experts are standing by to provide immediate guidance for your healthcare needs
            </p>
          </div>

          {/* Quick Contact Options */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {/* Emergency Contact */}
            <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-2xl p-8 text-white shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-2">
              <div className="flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-6 mx-auto">
                <Phone className="h-8 w-8" />
              </div>
              <h3 className="text-2xl font-bold text-center mb-4">Emergency</h3>
              <p className="text-center text-red-100 mb-6">24/7 Urgent Medical Support</p>
              <a
                href="tel:+919029466003"
                className="block w-full bg-white text-red-600 py-4 px-6 rounded-xl font-bold text-center hover:bg-gray-100 transition-colors duration-300"
              >
                Call Now
              </a>
            </div>

            {/* General Support */}
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-8 text-white shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-2">
              <div className="flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-6 mx-auto">
                <Mail className="h-8 w-8" />
              </div>
              <h3 className="text-2xl font-bold text-center mb-4">General</h3>
              <p className="text-center text-blue-100 mb-6">Questions & Information</p>
              <a
                href="mailto:hospeezy1@outlook.com"
                className="block w-full bg-white text-blue-600 py-4 px-6 rounded-xl font-bold text-center hover:bg-gray-100 transition-colors duration-300"
              >
                Email Us
              </a>
            </div>

            {/* Location */}
            <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-8 text-white shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-2">
              <div className="flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-6 mx-auto">
                <MapPin className="h-8 w-8" />
              </div>
              <h3 className="text-2xl font-bold text-center mb-4">Location</h3>
              <p className="text-center text-green-100 mb-6">Mumbai MMR Region</p>
              <a
                href="https://share.google/Yfa8Ft8IO5GWsRXAp"
                className="block w-full bg-white text-green-600 py-4 px-6 rounded-xl font-bold text-center hover:bg-gray-100 transition-colors duration-300"
              >
                Find Us
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/50">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold text-gray-900 mb-4">Send us a Message</h3>
              <p className="text-gray-600">Get personalized medical guidance from our expert team</p>
            </div>
            
            <form onSubmit={handleContactSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={contactData.name}
                    onChange={handleContactChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300"
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
                    value={contactData.email}
                    onChange={handleContactChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300"
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
                    value={contactData.phone}
                    onChange={handleContactChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300"
                    placeholder="Enter your phone number"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Urgency Level
                  </label>
                  <select
                    name="urgency"
                    value={contactData.urgency}
                    onChange={handleContactChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300"
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
                  value={contactData.subject}
                  onChange={handleContactChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300"
                  placeholder="What can we help you with?"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message *
                </label>
                <textarea
                  name="message"
                  value={contactData.message}
                  onChange={handleContactChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none transition-all duration-300"
                  placeholder="Tell us more about your healthcare needs..."
                />
              </div>

              <button
                type="submit"
                disabled={contactSubmitting}
                className="w-full bg-gradient-to-r from-red-500 to-blue-500 text-white py-4 px-6 rounded-xl font-bold text-lg hover:from-red-600 hover:to-blue-600 focus:ring-4 focus:ring-red-200 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center shadow-lg hover:shadow-xl"
              >
                {contactSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                    Sending Message...
                  </>
                ) : (
                  <>
                    <Send className="h-5 w-5 mr-3" />
                    Send Message
                  </>
                )}
              </button>

              {contactSuccess && (
                <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                  <div className="flex items-center">
                    <CheckCircle className="h-6 w-6 text-green-600 mr-4" />
                    <div>
                      <h4 className="text-green-800 font-bold text-lg">Message Sent Successfully!</h4>
                      <p className="text-green-700 mt-1">
                        We'll get back to you within 24 hours. For urgent matters, please call us directly.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {contactError && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                  <div className="flex items-center">
                    <div className="h-6 w-6 bg-red-600 rounded-full mr-4"></div>
                    <div>
                      <h4 className="text-red-800 font-bold text-lg">Error Sending Message</h4>
                      <p className="text-red-700 mt-1">{contactError}</p>
                      <button
                        type="button"
                        onClick={() => setContactError(null)}
                        className="mt-3 text-red-600 hover:text-red-800 font-medium"
                      >
                        Try Again
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-red-600 text-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-4xl lg:text-6xl font-bold mb-8">
            Your Family Deserves Better Healthcare Prices
          </h2>
          <p className="text-2xl text-red-100 mb-12 max-w-4xl mx-auto">
            Don't let confusing hospital bills and hidden costs stress your family. 
            Fill in your procedure details now and see how much you can save.
          </p>
          <div className="flex flex-col lg:flex-row gap-6 justify-center items-center">
            <button
              onClick={() => document.getElementById('tools')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-white text-red-600 px-12 py-6 rounded-2xl font-bold text-2xl hover:bg-gray-100 transition-all duration-300 shadow-lg flex items-center space-x-4"
            >
              <FormInput className="h-8 w-8" />
              <span>Fill Details Now</span>
            </button>
            <div className="text-red-100 text-lg">
              ✓ No registration required ✓ Instant results ✓ Always free
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      {modalStep && hospitalResult && hospitalResult.hospital && (() => {
        // Convert rates and savings to numbers for display
        const originalRate = Number(hospitalResult.hospital.original_rate);
        const discountedRate = Number(hospitalResult.hospital.discounted_rate);
        const savings = Number(hospitalResult.hospital.savings);
        const procedure = hospitalResult.hospital.procedure || '—';
        return (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-lg w-full relative">
              <button
                onClick={() => setModalStep(null)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl font-bold"
                aria-label="Close"
              >
                ×
              </button>
              {modalStep === 'view' && (
                <div className="flex flex-col items-center gap-6">
                  {hospitalResult.hospital.logo ? (
                    <img src={hospitalResult.hospital.logo} alt={hospitalResult.hospital.name} className="w-24 h-24 object-contain rounded-2xl border border-gray-200" />
                  ) : (
                    <div className="w-24 h-24 flex items-center justify-center bg-gray-100 rounded-2xl border border-gray-200 text-gray-400">No Image</div>
                  )}
                  <h2 className="text-2xl font-bold text-gray-900 mb-1">{hospitalResult.hospital.name}</h2>
                  {hospitalResult.hospital.location && (
                    <div className="text-gray-600 mb-1">{hospitalResult.hospital.location}</div>
                  )}
                  <div className="mb-1"><span className="font-semibold">Procedure:</span> {procedure}</div>
                  <div className="flex items-center gap-4 mb-1">
                    <span className="text-lg text-gray-400 line-through">
                      ₹{originalRate ? originalRate.toLocaleString() : ''}
                    </span>
                    <span className="text-xl font-bold text-green-600">
                      ₹{discountedRate ? discountedRate.toLocaleString() : ''}
                    </span>
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full font-semibold text-sm">
                      Save ₹{savings ? savings.toLocaleString() : ''}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={`text-lg ${i < Math.floor(hospitalResult.hospital.rating) ? 'text-yellow-400' : 'text-gray-300'}`}>★</span>
                    ))}
                    <span className="text-gray-600 ml-2">({hospitalResult.hospital.rating})</span>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {hospitalResult.hospital.features?.map((feature: string, idx: number) => (
                      <span key={idx} className="bg-red-50 text-red-800 text-xs px-3 py-1 rounded-full">{feature}</span>
                    ))}
                  </div>
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex flex-col items-center gap-2 mb-2 w-full">
                    <span className="font-bold text-blue-700 text-lg">🎉 {hospitalResult.insurance_offer?.title}</span>
                    <span className="text-blue-700 text-center">{hospitalResult.insurance_offer?.description}</span>
                  </div>
                  <button
                    type="button"
                    className="w-full bg-blue-600 text-white px-8 py-3 rounded-xl font-bold text-lg hover:bg-blue-700 transition-all duration-300 shadow-lg"
                    onClick={e => {
                      e.stopPropagation();
                      setModalStep('claim');
                    }}
                  >
                    {hospitalResult.insurance_offer?.cta}
                  </button>
                </div>
              )}
              {modalStep === 'claim' && (
                <form
                  className="flex flex-col gap-6 items-center"
                  onSubmit={e => {
                    e.preventDefault();
                    setModalStep('success');
                  }}
                >
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Claim Free Support</h3>
                  <input
                    type="text"
                    required
                    placeholder="Full Name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200"
                    value={claimData.name}
                    onChange={e => setClaimData({ ...claimData, name: e.target.value })}
                  />
                  <input
                    type="tel"
                    required
                    placeholder="Phone Number"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200"
                    value={claimData.phone}
                    onChange={e => setClaimData({ ...claimData, phone: e.target.value })}
                  />
                  <input
                    type="text"
                    required
                    placeholder="City"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200"
                    value={claimData.city}
                    onChange={e => setClaimData({ ...claimData, city: e.target.value })}
                  />
                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white px-8 py-3 rounded-xl font-bold text-lg hover:bg-blue-700 transition-all duration-300 shadow-lg"
                  >
                    Submit
                  </button>
                </form>
              )}
              {modalStep === 'success' && (
                <div className="flex flex-col items-center gap-6">
                  <div className="text-green-600 text-4xl">✓</div>
                  <h3 className="text-2xl font-bold text-green-700">Support Claimed Successfully!</h3>
                  <p className="text-gray-700 text-center">Our team will contact you soon to help you with your insurance and mediclaim process.</p>
                  <button
                    className="w-full bg-red-600 text-white px-8 py-3 rounded-xl font-bold text-lg hover:bg-red-700 transition-all duration-300 shadow-lg mb-2"
                    onClick={() => window.open('https://donate-link.com', '_blank')}
                  >
                    {(() => {
                      const original = Number(formData.currentPrice);
                      const discounted = Number(hospitalResult.hospital.discounted_rate);
                      const savings = isNaN(original) || isNaN(discounted) ? 0 : Math.max(0, original - discounted);
                      return `Donate${savings ? ` ₹${Math.round(savings * 0.05).toLocaleString()}` : ''} (5% of your savings)`;
                    })()}
                  </button>
                  <div className="flex gap-4 mt-2">
                    <a
                      href={`https://twitter.com/intent/tweet?text=I%20just%20saved%20money%20on%20my%20hospital%20bill%20with%20SANDEH!%20Check%20it%20out%20at%20https://sandeh.org`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      Share on Twitter
                    </a>
                    <a
                      href={`https://www.facebook.com/sharer/sharer.php?u=https://sandeh.org`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-700 hover:underline"
                    >
                      Share on Facebook
                    </a>
                    <a
                      href={`https://wa.me/?text=I%20just%20saved%20money%20on%20my%20hospital%20bill%20with%20SANDEH!%20Check%20it%20out%20at%20https://sandeh.org`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-600 hover:underline"
                    >
                      Share on WhatsApp
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      })()}
    </div>
  );
};

export default Home;