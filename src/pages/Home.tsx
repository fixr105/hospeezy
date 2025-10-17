import React, { useState } from 'react';
import { Upload, Heart, Shield, Users, ArrowRight, CheckCircle, Camera, FileText, FormInput, Send, Phone, Mail, MapPin, Clock, Award, TrendingUp, Eye, Target } from 'lucide-react';
import logo from "../logo.png";
import drRohit from "../components/Dr rohit.jpg";
import drSwapnil from "../components/Dr swapnil.jpg";
import drManeesh from "../components/Dr maneesh.JPG";

const Home = () => {
  // Tools section state
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
  interface HospitalResult {
    hospital: {
      name: string;
      location?: string;
      original_rate: number;
      discounted_rate: number;
      savings: number;
      rating: number;
      features?: string[];
      procedure?: string;
      logo?: string;
    };
    insurance_offer?: {
      title: string;
      description: string;
      cta: string;
    };
  }
  
  const [hospitalResult] = useState<HospitalResult | null>(null);
  const [modalStep, setModalStep] = useState<null | 'view' | 'claim' | 'success'>(null);
  const [claimData, setClaimData] = useState({ name: '', phone: '', city: '' });
  const [formSuccess, setFormSuccess] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  // 2D Echo section state
  const [echoLocation, setEchoLocation] = useState('');
  const [echoFormData, setEchoFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    address: '',
    society: '',
    date: '',
    timeSlot: '',
    location: ''
  });
  const [echoSubmitting, setEchoSubmitting] = useState(false);
  const [echoSuccess, setEchoSuccess] = useState(false);
  const [echoError, setEchoError] = useState<string | null>(null);

  
  // Toggle state for service selection
  const [selectedService, setSelectedService] = useState<'medical' | 'home'>('home');




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
    } catch {
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
    } catch {
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
      // Create DateTime in the specified format
      const appointmentDateTime = `${echoFormData.date}T${echoFormData.timeSlot}:00.000+00:00`;
      
      const response = await fetch('https://fixrrahul.app.n8n.cloud/webhook/sandeh', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: '2d_echo_booking',
          name: echoFormData.name,
          mobile: echoFormData.mobile,
          email: echoFormData.email,
          address: echoFormData.address,
          society: echoFormData.society,
          date: echoFormData.date,
          timeSlot: echoFormData.timeSlot,
          location: echoFormData.location,
          DateTime: appointmentDateTime,
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
          email: '',
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
    } catch {
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


  const stats = [
    { number: '2,500+', label: 'Families Helped', description: 'Across India' },
    { number: '₹5.2Cr', label: 'Money Saved', description: 'For patients' },
    { number: '150+', label: 'Partner Hospitals', description: 'Verified quality' },
    { number: '98%', label: 'Families Satisfied', description: 'With our help' },
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
    <main className="overflow-hidden">
      {/* Hero Section */}
      <header 
        id="hero" 
        className="section-spacing text-center relative overflow-hidden min-h-screen flex items-center cursor-pointer hover:bg-opacity-95 transition-all duration-300" 
        style={{ background: 'linear-gradient(135deg, var(--color-primary-50) 0%, var(--color-cream-light) 50%, var(--color-secondary-50) 100%)' }}
        onClick={() => document.getElementById('tools')?.scrollIntoView({ behavior: 'smooth' })}
        role="banner"
        aria-label="Hero section - Click to get started"
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

        <div className="relative z-10 content-width w-full group">
          {/* Logo with enhanced animation */}
          <div className="flex justify-center mb-6 sm:mb-10 px-4 sm:px-0">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-primary-200 to-secondary-200 rounded-full blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500"></div>
              <div className="relative h-48 sm:h-60 lg:h-72 w-64 sm:w-80 lg:w-96 rounded-full overflow-hidden drop-shadow-2xl hover:scale-110 transition-all duration-700 transform hover:rotate-1 bg-white">
                <img 
                  src={logo} 
                  alt="HOSPEEZY Logo" 
                  className="h-full w-full object-contain p-4" 
                />
              </div>
            </div>
          </div>
          
          {/* Enhanced animated mission badge with glow effect */}
          <div className="flex justify-center mb-10 sm:mb-12">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full blur-lg opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
              <div 
                className="relative text-white px-8 sm:px-16 lg:px-20 py-6 sm:py-8 lg:py-10 rounded-full font-bold text-xl sm:text-2xl lg:text-4xl shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-1 border-2 border-primary-400"
                style={{ backgroundColor: 'var(--color-primary)' }}
              >
                Your Healthcare Savings Partner
              </div>
            </div>
          </div>
          
          {/* Enhanced main headline with animated gradient */}
          <div className="mb-8 lg:mb-12">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-4 lg:mb-6">
              <span className="bg-gradient-to-r from-primary-600 via-secondary-600 to-success-600 bg-clip-text text-transparent animate-pulse" style={{ animationDuration: '3s' }}>
                Healthcare Savings Made Simple
              </span>
            </h1>
            
            {/* Animated subtitle */}
            <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 text-width leading-relaxed px-4 animate-fade-in" style={{ animationDelay: '0.5s' }}>
              HOSPEEZY helps families access quality healthcare without financial stress. 
              <span className="font-semibold text-primary-600"> Choose your path to better healthcare rates.</span>
            </p>
          </div>

          {/* Enhanced Promise Cards with staggered animations and improved layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-16 lg:mb-20 content-width px-4">
            {/* Insurance Promise Card with enhanced animations */}
            <div className="group card border-2 border-secondary-200 hover:shadow-3xl transition-all duration-700 transform hover:-translate-y-3 flex flex-col h-full relative overflow-hidden">
              {/* Background gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-secondary-50 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10">
                <div className="text-center mb-6 lg:mb-8">
                  <div className="bg-gradient-to-br from-secondary-100 to-secondary-200 p-4 sm:p-6 rounded-full w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6 flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-500 transform hover:scale-110 group-hover:rotate-12">
                    <Heart className="h-8 w-8 sm:h-10 sm:w-10 text-secondary-600 animate-pulse" style={{ animationDuration: '2s' }} />
                  </div>
                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-2 lg:mb-3 group-hover:text-secondary-700 transition-colors duration-300">If you have Insurance</h2>
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
                  className="btn-secondary w-full py-3 sm:py-4 lg:py-5 text-base sm:text-lg lg:text-xl transform hover:scale-105 hover:-translate-y-1 mt-auto group-hover:shadow-2xl"
                >
                  Tell Us About Your Procedure
                </button>
              </div>
            </div>

            {/* Out of Pocket Promise Card with enhanced animations */}
            <div className="group card border-2 border-primary-200 hover:shadow-3xl transition-all duration-700 transform hover:-translate-y-3 flex flex-col h-full relative overflow-hidden">
              {/* Background gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary-50 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10">
                <div className="text-center mb-6 lg:mb-8">
                  <div className="bg-gradient-to-br from-primary-100 to-primary-200 p-4 sm:p-6 rounded-full w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6 flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-500 transform hover:scale-110 group-hover:rotate-12">
                    <Heart className="h-8 w-8 sm:h-10 sm:w-10 text-primary-600 animate-pulse" style={{ animationDuration: '2s' }} />
                  </div>
                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-2 lg:mb-3 group-hover:text-primary-700 transition-colors duration-300">If you don't have Insurance</h2>
                  <p className="text-sm sm:text-base lg:text-lg text-gray-600">Massive savings on quality healthcare</p>
                </div>
                
                <div className="text-center mb-8 lg:mb-10 flex-grow">
                  <div className="bg-gradient-to-br from-primary-50 to-primary-100 border-2 border-primary-200 rounded-3xl p-4 sm:p-6 lg:p-8 shadow-lg hover:shadow-xl transition-all duration-500 transform hover:scale-105 group-hover:border-primary-300">
                    <div className="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary-600 mb-2 lg:mb-3 animate-pulse group-hover:animate-bounce" style={{ animationDuration: '2s' }}>50% OFF</div>
                    <div className="text-sm sm:text-base lg:text-xl font-semibold text-gray-900 mb-1 lg:mb-2">Flat discount on</div>
                    <div className="text-lg sm:text-xl lg:text-2xl font-bold text-primary-600 group-hover:text-primary-700 transition-colors duration-300">50+ Procedures</div>
                  </div>
                </div>
                
                <button
                  onClick={() => document.getElementById('tools')?.scrollIntoView({ behavior: 'smooth' })}
                  className="btn-primary w-full py-3 sm:py-4 lg:py-5 text-base sm:text-lg lg:text-xl transform hover:scale-105 hover:-translate-y-1 mt-auto group-hover:shadow-2xl"
                >
                  Tell Us About Your Procedure
                </button>
              </div>
            </div>
          </div>

          {/* Enhanced animated trust indicators with staggered animations */}
          <div className="flex flex-wrap justify-center gap-8 sm:gap-10 text-lg text-gray-600">
            {[
              { icon: Shield, text: 'Verified Hospitals', bgColor: 'bg-primary-100', iconColor: 'var(--color-primary)' },
              { icon: Users, text: '2,500+ Families Helped', bgColor: 'bg-secondary-100', iconColor: 'var(--color-primary)' },
              { icon: CheckCircle, text: 'Always Free Service', bgColor: 'bg-success-100', iconColor: 'var(--color-primary)' }
            ].map((item, index) => (
              <div 
                key={index}
                className="flex items-center gap-3 hover:scale-110 transition-all duration-500 transform hover:-translate-y-1 group"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className={`${item.bgColor} p-3 rounded-full group-hover:shadow-lg transition-all duration-300 transform group-hover:rotate-12`}>
                  <item.icon className="h-6 w-6" style={{ color: item.iconColor }} />
                </div>
                <span className="font-semibold group-hover:text-primary-600 transition-colors duration-300">{item.text}</span>
              </div>
            ))}
          </div>

          {/* Enhanced Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="flex flex-col items-center space-y-2">
              <div className="text-sm font-semibold text-gray-600 bg-white/80 px-4 py-2 rounded-full shadow-lg">
                Click anywhere to get started
              </div>
              <div className="w-6 h-10 border-2 border-primary-500 rounded-full flex justify-center bg-white/50">
                <div className="w-1 h-3 bg-primary-500 rounded-full mt-2 animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Section Divider */}
      <div className="section-divider"></div>

      {/* Problem Statement */}
      <section className="section-spacing" style={{ backgroundColor: 'var(--color-primary)' }}>
        <div className="content-width text-center">
          <h2 className="text-4xl lg:text-6xl font-bold mb-8 text-white">
            Healthcare Shouldn't Bankrupt Families
          </h2>
          <p className="text-2xl text-white/90 mb-12 leading-relaxed text-width">
            Every day, families across India face impossible choices: get the medical care they need 
            or protect their life savings. Hospital bills are confusing, prices are hidden, 
            and families often pay 2-3 times more than necessary.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/10 rounded-2xl p-8 backdrop-blur-sm">
              <div className="text-4xl font-bold mb-4 text-white">70%</div>
              <div className="text-xl text-white">of families go into debt for medical care</div>
            </div>
            <div className="bg-white/10 rounded-2xl p-8 backdrop-blur-sm">
              <div className="text-4xl font-bold mb-4 text-white">3x</div>
              <div className="text-xl text-white">higher costs due to lack of transparency</div>
            </div>
            <div className="bg-white/10 rounded-2xl p-8 backdrop-blur-sm">
              <div className="text-4xl font-bold mb-4 text-white">0</div>
              <div className="text-xl text-white">easy ways to compare hospital prices</div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Divider */}
      <div className="section-divider"></div>

      {/* Tools Section */}
      <section id="tools" className="section-spacing bg-gray-50">
        <div className="content-width">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-8">
              Our Services
            </h2>
            <p className="text-2xl text-gray-600 mb-12 text-width">
              Choose the service that best fits your healthcare needs
            </p>
            
            {/* Service Toggle */}
            <div className="flex justify-center mb-12">
              <div className="bg-gray-100 p-2 rounded-2xl flex space-x-2">
                <button
                  onClick={() => setSelectedService('medical')}
                  className={`px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 ${
                    selectedService === 'medical'
                      ? 'bg-primary-600 text-white shadow-lg transform scale-105'
                      : 'text-gray-600 hover:text-gray-800 hover:bg-gray-200'
                  }`}
                >
                  Medical Procedures
                </button>
                <button
                  onClick={() => setSelectedService('home')}
                  className={`px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 ${
                    selectedService === 'home'
                      ? 'bg-primary-600 text-white shadow-lg transform scale-105'
                      : 'text-gray-600 hover:text-gray-800 hover:bg-gray-200'
                  }`}
                >
                  @Home Services
                </button>
              </div>
            </div>
          </div>
          
          <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 transition-all duration-500 ${
            selectedService === 'medical' ? 'lg:grid-cols-[2fr_1fr]' : 'lg:grid-cols-[1fr_2fr]'
          }`}>
            {/* Left Column - Hospital Rates */}
            <div className={`card transition-all duration-500 ${
              selectedService === 'medical' 
                ? 'transform scale-105 shadow-2xl ring-4 ring-primary-200' 
                : 'opacity-60 blur-sm transform scale-95 lg:block hidden'
            }`}>
              <div className="text-center mb-6">
                <div className="bg-primary-50 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <FormInput className="h-8 w-8 text-primary-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Get Better Hospital Rates
                </h3>
                <p className="text-lg text-gray-600">
                  Tell us about your procedure. Our AI finds you better hospital rates in seconds.
                </p>
              </div>

            <form onSubmit={handleFormSubmit} className="space-y-6">
              {/* Step 1: Basic Info - Always Visible */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
                  <h4 className="text-lg font-semibold text-gray-900">Basic Information</h4>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Reason for Hospitalization *
                    </label>
                    <input
                      type="text"
                      name="reasonForHospitalization"
                      value={formData.reasonForHospitalization}
                      onChange={handleInputChange}
                      required
                      placeholder="e.g., Heart surgery, Knee replacement"
                      className="form-input w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Patient Name *
                    </label>
                    <input
                      type="text"
                      name="patientName"
                      value={formData.patientName}
                      onChange={handleInputChange}
                      required
                      placeholder="Full name"
                      className="form-input w-full"
                    />
                  </div>
                </div>
              </div>

              {/* Step 2: Contact & Location - Reveals when Step 1 is complete */}
              {(formData.reasonForHospitalization && formData.patientName) && (
                <div className="space-y-4 animate-fade-in">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
                    <h4 className="text-lg font-semibold text-gray-900">Contact & Location</h4>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Mobile Number *
                      </label>
                      <input
                        type="tel"
                        name="mobileNumber"
                        value={formData.mobileNumber}
                        onChange={handleInputChange}
                        required
                        placeholder="10-digit mobile number"
                        className="form-input w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        City *
                      </label>
                      <select
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                        className="form-input w-full"
                      >
                        <option value="">Select city</option>
                        <option value="mumbai-mmr">Mumbai MMR region</option>
                        <option value="out-of-mumbai">Out of mumbai (currently unservicable)</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      placeholder="your.email@example.com"
                      className="form-input w-full"
                    />
                  </div>
                </div>
              )}

              {/* Step 3: Financial Details - Reveals when Step 2 is complete */}
              {(formData.mobileNumber && formData.city && formData.email) && (
                <div className="space-y-4 animate-fade-in">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
                    <h4 className="text-lg font-semibold text-gray-900">Financial Details</h4>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Current Quoted Price *
                      </label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">₹</span>
                        <input
                          type="number"
                          name="currentPrice"
                          value={formData.currentPrice}
                          onChange={handleInputChange}
                          required
                          placeholder="Enter amount"
                          className="form-input w-full pl-10"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
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
                            className="w-5 h-5 text-primary-600 border-gray-300 focus:ring-primary-500"
                          />
                          <span className="text-sm text-gray-900">Insurance Claim</span>
                        </label>
                        <label className="flex items-center space-x-3 cursor-pointer">
                          <input
                            type="radio"
                            name="paymentType"
                            value="out-of-pocket"
                            checked={formData.paymentType === 'out-of-pocket'}
                            onChange={handleInputChange}
                            required
                            className="w-5 h-5 text-primary-600 border-gray-300 focus:ring-primary-500"
                          />
                          <span className="text-sm text-gray-900">Out of Pocket</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* File Upload Section - Reveals when Step 3 is complete */}
              {(formData.currentPrice && formData.paymentType) && (
                <div className="bg-primary-50 bg-opacity-50 border-2 border-primary-200 rounded-2xl p-6 space-y-4 animate-fade-in">
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-primary-800 mb-2">📋 Upload Medical Documents (optional)</h3>
                    <p className="text-primary-700">Prescriptions, medical reports, blood tests, X-rays, MRI scans, discharge summaries</p>
                  </div>

                  {/* Upload Area */}
                  <label className="cursor-pointer block">
                    <div className="relative border-3 border-dashed border-primary-300 rounded-2xl p-12 text-center hover:border-primary-500 transition-all duration-300 bg-white bg-opacity-80 hover:bg-white min-h-[200px] flex items-center justify-center">
                      {/* Translucent Heart Background */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-10">
                        <Heart className="h-32 w-32 text-primary-500" />
                      </div>
                      
                      <div className="relative z-10 space-y-4">
                        <div className="flex justify-center">
                          <div className="bg-primary-100 p-4 rounded-full">
                            <Upload className="h-8 w-8 text-primary-600" />
                          </div>
                        </div>
                        <div>
                          <h4 className="text-lg font-bold text-primary-800 mb-2">Drag & Drop Files Here</h4>
                          <p className="text-primary-700">or click to browse</p>
                        </div>
                        <p className="text-sm text-primary-600">
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
              )}

              {/* Submit Button - Only appears when all required fields are complete */}
              {(formData.reasonForHospitalization && formData.patientName && formData.mobileNumber && formData.city && formData.email && formData.currentPrice && formData.paymentType) && (
                <div className="animate-fade-in">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary w-full py-4 text-xl flex items-center justify-center space-x-3 disabled:opacity-50 disabled:cursor-not-allowed"
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
                </div>
              )}
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
                    href="https://wa.me/919029466003?text=Hi%20Dr.%20Manish,%20i%20have%20shared%20my%20details%20on%20the%20website%20hospeezy.org,%20looking%20forward%20to%20your%20kind%20advise"
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

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="text-center">
                  <div className="bg-primary-50 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <benefit.icon className="h-8 w-8 text-primary-600" />
                  </div>
                  <h5 className="text-lg font-bold text-gray-900 mb-2">{benefit.title}</h5>
                  <p className="text-gray-600">{benefit.description}</p>
                </div>
              ))}
            </div>
            </div>
            
            {/* Right Column - 2D Echo Complete Booking */}
            <div className={`card transition-all duration-500 ${
              selectedService === 'home' 
                ? 'transform scale-105 shadow-2xl ring-4 ring-primary-200' 
                : 'opacity-60 blur-sm transform scale-95 lg:block hidden'
            }`}>
              <div className="text-center mb-6">
                <div className="bg-primary-50 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Heart className="h-8 w-8 text-primary-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  2D Echo at Home – Thane Exclusive
                </h3>
                <p className="text-lg text-gray-600 mb-4">
                  Doctor-supervised heart checkup at your doorstep. Reports delivered within 6 hours.
                </p>
                
                {/* Price Display */}
                <div className="bg-primary-50 rounded-xl p-4 border-2 border-primary-200 mb-4">
                  <div className="text-center">
                    <div className="text-sm text-gray-500 line-through mb-1">₹7000 MRP</div>
                    <div className="text-2xl font-bold text-primary-600 mb-1">₹3999</div>
                    <div className="text-xs text-success-600 font-semibold">(Intro Offer)</div>
                    <div className="text-xs text-gray-600 mt-1">Limited time offer - Save ₹3001</div>
                  </div>
                </div>
              </div>

              {/* Only show form if not in success state */}
              {!echoSuccess && (
                <>
                  {/* Location Selection */}
                  <div className="mb-6">
                    <h4 className="text-lg font-bold text-gray-900 mb-2 text-center">Select Your Location</h4>
                    <p className="text-sm text-gray-600 text-center mb-3">Choose your area to see availability and pricing</p>
                    <select 
                      className="form-input w-full text-sm font-semibold"
                      value={echoLocation}
                      onChange={(e) => setEchoLocation(e.target.value)}
                    >
                      <option value="">Select Location</option>
                      <option value="ghodbunder-road">Ghodbunder Road, Thane</option>
                      <option value="other-location">Other Location</option>
                    </select>
                  </div>

                  {/* Booking Form */}
                  <div className="mb-6">
                    <h4 className="text-lg font-bold text-gray-900 mb-2 text-center">Book Your 2D Echo</h4>
                    <p className="text-sm text-gray-600 text-center mb-4">Fill in your details to reserve your slot</p>
                    
                    <form onSubmit={handleEchoFormSubmit} className="space-y-6">
                  {/* Step 1: Basic Info - Always Visible */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
                      <h4 className="text-lg font-semibold text-gray-900">Basic Information</h4>
                    </div>
                    
                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={echoFormData.name}
                          onChange={handleEchoInputChange}
                          required
                          placeholder="Enter your full name"
                          className="form-input w-full"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Mobile Number *
                        </label>
                        <input
                          type="tel"
                          name="mobile"
                          value={echoFormData.mobile}
                          onChange={handleEchoInputChange}
                          required
                          placeholder="Enter mobile number"
                          className="form-input w-full"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={echoFormData.email}
                          onChange={handleEchoInputChange}
                          required
                          placeholder="your.email@example.com"
                          className="form-input w-full"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Step 2: Address Details - Reveals when Step 1 is complete */}
                  {(echoFormData.name && echoFormData.mobile && echoFormData.email) && (
                    <div className="space-y-4 animate-fade-in">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
                        <h4 className="text-lg font-semibold text-gray-900">Address Details</h4>
                      </div>
                      
                      <div className="grid grid-cols-1 gap-4">
                    
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Complete Address *
                          </label>
                          <textarea
                            name="address"
                            value={echoFormData.address}
                            onChange={handleEchoInputChange}
                            required
                            rows={3}
                            placeholder="Enter your complete address with landmarks"
                            className="form-input w-full resize-none"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Society/Building Name *
                          </label>
                          <input
                            type="text"
                            name="society"
                            value={echoFormData.society}
                            onChange={handleEchoInputChange}
                            required
                            placeholder="Enter society or building name"
                            className="form-input w-full"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 3: Appointment Details - Reveals when Step 2 is complete */}
                  {(echoFormData.address && echoFormData.society) && (
                    <div className="space-y-4 animate-fade-in">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
                        <h4 className="text-lg font-semibold text-gray-900">Appointment Details</h4>
                      </div>
                      
                      <div className="grid grid-cols-1 gap-4">
                    
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Preferred Date *
                          </label>
                          <input
                            type="date"
                            name="date"
                            value={echoFormData.date}
                            onChange={handleEchoInputChange}
                            required
                            className="form-input w-full"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Exact Appointment Time *
                          </label>
                          <select
                            name="timeSlot"
                            value={echoFormData.timeSlot}
                            onChange={handleEchoInputChange}
                            required
                            className="form-input w-full"
                          >
                            <option value="">Select exact time</option>
                            <option value="09:00">9:00 AM</option>
                            <option value="10:00">10:00 AM</option>
                            <option value="11:00">11:00 AM</option>
                            <option value="12:00">12:00 PM</option>
                            <option value="13:00">1:00 PM</option>
                            <option value="14:00">2:00 PM</option>
                            <option value="15:00">3:00 PM</option>
                            <option value="16:00">4:00 PM</option>
                            <option value="17:00">5:00 PM</option>
                            <option value="18:00">6:00 PM</option>
                          </select>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Location *
                          </label>
                          <select
                            name="location"
                            value={echoFormData.location}
                            onChange={handleEchoInputChange}
                            required
                            className="form-input w-full"
                          >
                            <option value="">Select location</option>
                            <option value="ghodbunder-road">Ghodbunder Road, Thane</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* Submit Button - Only appears when all required fields are complete */}
                  {(echoFormData.name && echoFormData.mobile && echoFormData.email && echoFormData.address && echoFormData.society && echoFormData.date && echoFormData.timeSlot && echoFormData.location) && (
                    <div className="animate-fade-in">
                      <button
                        type="submit"
                        disabled={echoSubmitting}
                        className="btn-primary w-full py-4 text-lg flex items-center justify-center space-x-3 disabled:opacity-50 disabled:cursor-not-allowed"
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
                    </div>
                  )}
                    </form>
                  </div>
                </>
              )}

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

              {/* Benefits Section */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                {benefits.map((benefit, index) => (
                  <div key={index} className="text-center">
                    <div className="bg-primary-50 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                      <benefit.icon className="h-8 w-8 text-primary-600" />
                    </div>
                    <h5 className="text-lg font-bold text-gray-900 mb-2">{benefit.title}</h5>
                    <p className="text-gray-600">{benefit.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Divider */}
      <div className="section-divider"></div>

      {/* Impact Stats */}
      <section className="section-spacing bg-white">
        <div className="content-width">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-8">
              Real Families, Real Savings
            </h2>
            <p className="text-2xl text-gray-600 text-width">
              Every number represents a family that didn't have to choose between health and money
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="bg-gray-50 rounded-3xl p-8 text-center shadow-lg hover:shadow-xl transition-shadow">
                <div className="text-5xl font-bold text-primary-600 mb-4">{stat.number}</div>
                <div className="text-xl font-semibold text-gray-900 mb-2">{stat.label}</div>
                <div className="text-gray-600">{stat.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Divider */}
      <div className="section-divider"></div>

      {/* About Section */}
      <section id="about" className="section-spacing" style={{ backgroundColor: 'var(--color-primary)' }}>
        <div className="content-width">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold mb-8 text-white">Our Mission is Simple</h2>
            <p className="text-2xl text-white/90 text-width">
              No family should face financial ruin because they couldn't find affordable healthcare options
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="bg-white/10 rounded-2xl p-8 backdrop-blur-sm">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-2xl mb-6">
                  <Target className="h-10 w-10 text-primary-600" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white">What We Do</h3>
                <p className="text-white/90 text-lg">
                  We use AI to read prescriptions and instantly find families better hospital rates, 
                  saving them thousands of rupees on quality healthcare.
                </p>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-white/10 rounded-2xl p-8 backdrop-blur-sm">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-2xl mb-6">
                  <Eye className="h-10 w-10 text-primary-600" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white">Our Vision</h3>
                <p className="text-white/90 text-lg">
                  An India where every family can access quality healthcare without fear of bankruptcy, 
                  where prices are transparent and options are clear.
                </p>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-white/10 rounded-2xl p-8 backdrop-blur-sm">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-2xl mb-6">
                  <Award className="h-10 w-10 text-primary-600" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white">Our Promise</h3>
                <p className="text-white/90 text-lg">
                  We will always provide our basic service free to families in need, 
                  because healthcare guidance should never be a luxury.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Divider */}
      <div className="section-divider"></div>

      {/* Values */}
      <section className="section-spacing bg-white">
        <div className="content-width">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-8">How We Work</h2>
            <p className="text-2xl text-gray-600 text-width">
              Every decision we make is guided by our commitment to families
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-primary-50 rounded-3xl p-12 hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-start space-x-6">
                  <div className="flex-shrink-0">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-600 rounded-2xl">
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

      {/* Section Divider */}
      <div className="section-divider"></div>

      {/* How We Help Your Family - Short, Horizontal, Dual Option */}
      <section id="services" className="section-spacing-sm bg-gray-50">
        <div className="content-width">
          <div className="text-center mb-10">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">How We Help Your Family</h2>
            <p className="text-xl text-gray-600 text-width">Simple, fast, and always focused on saving you money</p>
          </div>
          <div className="flex flex-col md:flex-row justify-center items-stretch gap-8">
            <div className="flex-1 rounded-2xl p-8 shadow-md flex flex-col items-center" style={{ backgroundColor: 'var(--color-cream-medium)' }}>
              <Camera className="h-10 w-10 text-primary-600 mb-4" />
              <h3 className="text-xl font-bold mb-2 text-gray-900">Upload Prescription</h3>
              <p className="text-gray-600 mb-4 text-center">Snap a photo or upload your doctor's prescription. Our AI reads it instantly and finds you better hospital rates.</p>
            </div>
            <div className="flex-1 rounded-2xl p-8 shadow-md flex flex-col items-center" style={{ backgroundColor: 'var(--color-cream-medium)' }}>
              <FormInput className="h-10 w-10 text-primary-600 mb-4" />
              <h3 className="text-xl font-bold mb-2 text-gray-900">Fill Details</h3>
              <p className="text-gray-600 mb-4 text-center">No prescription? Just fill in your procedure details and we'll do the rest—get instant hospital options and savings.</p>
            </div>
            <div className="flex-1 rounded-2xl p-8 shadow-md flex flex-col items-center" style={{ backgroundColor: 'var(--color-cream-medium)' }}>
              <CheckCircle className="h-10 w-10 text-success-600 mb-4" />
              <h3 className="text-xl font-bold mb-2 text-gray-900">Get Results</h3>
              <p className="text-gray-600 mb-4 text-center">Receive verified hospital options with negotiated rates—see exactly how much you can save, instantly.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section Divider */}
      <div className="section-divider"></div>

      {/* Team Section */}
      <section id="team" className="section-spacing-sm bg-gradient-to-br from-primary-50 via-white to-secondary-50 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary-500/5 to-secondary-500/5"></div>
        <div className="absolute top-10 left-10 w-20 h-20 bg-primary-100 rounded-full opacity-30 animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-secondary-100 rounded-full opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
        
        <div className="content-width relative">
          {/* Header with Urgency */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-semibold mb-6 animate-pulse">
              <Clock className="w-4 h-4 mr-2" />
              Available 24/7 for Emergency Consultations
            </div>
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent mb-6">
              Expert Medical Team
            </h2>
            <p className="text-xl text-gray-700 text-width leading-relaxed">
              Board-certified specialists ready to provide immediate guidance for your healthcare needs
            </p>
          </div>

          {/* Team Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {leadership.map((member, index) => (
              <div key={index} className="group relative">
                {/* Card */}
                <div className="backdrop-blur-sm rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-white/50 hover:border-primary-200 hover:-translate-y-2" style={{ backgroundColor: 'var(--color-cream-accent)' }}>
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
                      <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary-500/20 to-secondary-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  </div>
                  
                  {/* Doctor Info */}
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors duration-300">
                      {member.name}
                    </h3>
                    <div className="inline-flex items-center bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
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

      {/* Section Divider */}
      <div className="section-divider"></div>

      {/* Contact Section */}
      <section id="contact" className="section-spacing-sm bg-gradient-to-br from-secondary-50 via-white to-primary-50 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-r from-secondary-500/5 to-primary-500/5"></div>
        <div className="absolute top-20 right-20 w-24 h-24 bg-secondary-100 rounded-full opacity-30 animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-28 h-28 bg-primary-100 rounded-full opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
        
        <div className="content-width relative">
          {/* Header with Urgency */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-semibold mb-6 animate-pulse">
              <Phone className="w-4 h-4 mr-2" />
              Immediate Response Guaranteed
            </div>
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-secondary-600 to-primary-600 bg-clip-text text-transparent mb-6">
              Get Help Now
            </h2>
            <p className="text-xl text-gray-700 text-width leading-relaxed">
              Our medical experts are standing by to provide immediate guidance for your healthcare needs
            </p>
          </div>

          {/* Quick Contact Options */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {/* Emergency Contact */}
            <div className="bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl p-8 text-white shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-2">
              <div className="flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-6 mx-auto">
                <Phone className="h-8 w-8" />
              </div>
              <h3 className="text-2xl font-bold text-center mb-4">Emergency</h3>
              <p className="text-center text-white/90 mb-6">24/7 Urgent Medical Support</p>
              <a
                href="tel:+919029466003"
                className="block w-full text-primary-600 py-4 px-6 rounded-xl font-bold text-center transition-colors duration-300"
                style={{ backgroundColor: 'var(--color-cream-medium)' }}
                onMouseEnter={(e) => e.target.style.backgroundColor = 'var(--color-cream-dark)'}
                onMouseLeave={(e) => e.target.style.backgroundColor = 'var(--color-cream-medium)'}
              >
                Call Now
              </a>
            </div>

            {/* General Support */}
            <div className="bg-gradient-to-br from-secondary-500 to-secondary-600 rounded-2xl p-8 text-white shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-2">
              <div className="flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-6 mx-auto">
                <Mail className="h-8 w-8" />
              </div>
              <h3 className="text-2xl font-bold text-center mb-4">General</h3>
              <p className="text-center text-white/90 mb-6">Questions & Information</p>
              <a
                href="mailto:hospeezy1@outlook.com"
                className="block w-full text-secondary-600 py-4 px-6 rounded-xl font-bold text-center transition-colors duration-300"
                style={{ backgroundColor: 'var(--color-cream-medium)' }}
                onMouseEnter={(e) => e.target.style.backgroundColor = 'var(--color-cream-dark)'}
                onMouseLeave={(e) => e.target.style.backgroundColor = 'var(--color-cream-medium)'}
              >
                Email Us
              </a>
            </div>

            {/* Location */}
            <div className="bg-gradient-to-br from-success-500 to-success-600 rounded-2xl p-8 text-white shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-2">
              <div className="flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-6 mx-auto">
                <MapPin className="h-8 w-8" />
              </div>
              <h3 className="text-2xl font-bold text-center mb-4">Location</h3>
              <p className="text-center text-white/90 mb-6">Mumbai MMR Region</p>
              <a
                href="https://share.google/Yfa8Ft8IO5GWsRXAp"
                className="block w-full text-success-600 py-4 px-6 rounded-xl font-bold text-center transition-colors duration-300"
                style={{ backgroundColor: 'var(--color-cream-medium)' }}
                onMouseEnter={(e) => e.target.style.backgroundColor = 'var(--color-cream-dark)'}
                onMouseLeave={(e) => e.target.style.backgroundColor = 'var(--color-cream-medium)'}
              >
                Find Us
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div className="backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/50" style={{ backgroundColor: 'var(--color-cream-accent)' }}>
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
                    className="form-input w-full"
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
                    className="form-input w-full"
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
                    className="form-input w-full"
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
                    className="form-input w-full"
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
                className="btn-primary w-full py-4 px-6 text-lg flex items-center justify-center shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
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

      {/* Section Divider */}
      <div className="section-divider"></div>

      {/* Final CTA */}
      <section className="section-spacing" style={{ backgroundColor: 'var(--color-primary)' }}>
        <div className="content-width text-center">
          <h2 className="text-4xl lg:text-6xl font-bold mb-8 text-white">
            Your Family Deserves Better Healthcare Prices
          </h2>
          <p className="text-2xl text-white/90 mb-12 text-width">
            Don't let confusing hospital bills and hidden costs stress your family. 
            Fill in your procedure details now and see how much you can save.
          </p>
          <div className="flex flex-col lg:flex-row gap-6 justify-center items-center">
            <button
              onClick={() => document.getElementById('tools')?.scrollIntoView({ behavior: 'smooth' })}
              className="text-primary-600 px-12 py-6 rounded-2xl font-bold text-2xl transition-all duration-300 shadow-lg flex items-center space-x-4"
              style={{ backgroundColor: 'var(--color-white-pure)' }}
              onMouseEnter={(e) => e.target.style.backgroundColor = 'var(--color-white-warm)'}
              onMouseLeave={(e) => e.target.style.backgroundColor = 'var(--color-white-pure)'}
            >
              <FormInput className="h-8 w-8" />
              <span>Fill Details Now</span>
            </button>
            <div className="text-white/90 text-lg">
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
            <div className="rounded-3xl shadow-2xl p-8 max-w-lg w-full relative" style={{ backgroundColor: 'var(--color-white-pure)' }}>
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
                      href={`https://twitter.com/intent/tweet?text=I%20just%20saved%20money%20on%20my%20hospital%20bill%20with%20HOSPEEZY!%20Check%20it%20out%20at%20https://hospeezy.org`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      Share on Twitter
                    </a>
                    <a
                      href={`https://www.facebook.com/sharer/sharer.php?u=https://hospeezy.org`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-700 hover:underline"
                    >
                      Share on Facebook
                    </a>
                    <a
                      href={`https://wa.me/?text=I%20just%20saved%20money%20on%20my%20hospital%20bill%20with%20HOSPEEZY!%20Check%20it%20out%20at%20https://hospeezy.org`}
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
    </main>
  );
};

export default Home;