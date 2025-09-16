import React from 'react';
import { Heart, Users, Shield, TrendingUp, Target, Eye, Award } from 'lucide-react';

const About = () => {
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

  const achievements = [
    { number: '2,500+', label: 'Patients Served', description: 'Across 15 states in India' },
    { number: '₹5.2Cr', label: 'Total Savings', description: 'In healthcare costs' },
    { number: '150+', label: 'Partner Hospitals', description: 'Verified and trusted' },
    { number: '98%', label: 'Success Rate', description: 'Patient satisfaction' },
  ];

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="bg-white py-20 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-8">
              Our Story: Why SANDEH Exists
            </h1>
            <p className="text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Every family deserves access to quality healthcare without going into debt. 
              We started SANDEH because we believe no parent should have to choose between 
              their child's health and their family's financial future.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl font-bold text-gray-900">The Problem We Saw</h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                In 2020, our founder Dr. Rajesh Sharma watched a patient's family sell their home 
                to pay for heart surgery. The same procedure was available at another quality hospital 
                for 40% less cost - but the family had no way to know this.
              </p>
              <p className="text-xl text-gray-600 leading-relaxed">
                That day, we realized that healthcare pricing in India is broken. Hospitals don't 
                publish their rates, families can't compare options, and people pay 2-3 times more 
                than necessary simply because they don't know better alternatives exist.
              </p>
            </div>
            <div className="relative">
              <div className="bg-red-50 rounded-3xl p-8 shadow-2xl">
                <img
                  src="https://images.pexels.com/photos/4386464/pexels-photo-4386464.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Families getting healthcare help"
                  className="rounded-2xl w-full"
                />
              </div>
              <div className="absolute -bottom-8 -right-8 bg-white rounded-2xl p-8 shadow-xl border-4 border-red-100">
                <div className="text-center">
                  <div className="text-3xl font-bold text-red-600">2,500+</div>
                  <div className="text-gray-600 font-semibold">Families Helped</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="py-24 bg-red-600 text-white">
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
          <div className="space-y-12">
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
        </div>
      </section>

      {/* Achievements */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-8">Real Impact on Real Families</h2>
            <p className="text-2xl text-gray-600 max-w-4xl mx-auto">
              These aren't just numbers - they represent families who didn't have to choose 
              between health and financial security
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {achievements.map((achievement, index) => (
              <div key={index} className="text-center bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                <div className="text-5xl font-bold text-red-600 mb-4">{achievement.number}</div>
                <div className="text-2xl font-bold text-gray-900 mb-2">{achievement.label}</div>
                <div className="text-gray-600 text-lg">{achievement.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How We Work */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-8">How We Help Your Family</h2>
            <p className="text-2xl text-gray-600">
              Simple, fast, and always focused on saving you money
            </p>
          </div>
          <div className="space-y-16">
            <div className="bg-red-50 rounded-3xl p-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="bg-red-600 p-4 rounded-2xl">
                      <span className="text-2xl font-bold text-white">1</span>
                    </div>
                    <h3 className="text-3xl font-bold text-gray-900">Upload Your Prescription</h3>
                  </div>
                  <p className="text-xl text-gray-600 leading-relaxed">
                    Take a photo of your doctor's prescription or upload the document. 
                    Our AI reads it instantly and understands exactly what treatment you need.
                  </p>
                </div>
                <div className="bg-white rounded-2xl p-8 shadow-lg">
                  <img
                    src="https://images.pexels.com/photos/4386464/pexels-photo-4386464.jpeg?auto=compress&cs=tinysrgb&w=600"
                    alt="Upload prescription"
                    className="rounded-xl w-full"
                  />
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-3xl p-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="lg:order-2">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="bg-red-600 p-4 rounded-2xl">
                      <span className="text-2xl font-bold text-white">2</span>
                    </div>
                    <h3 className="text-3xl font-bold text-gray-900">Get Instant Results</h3>
                  </div>
                  <p className="text-xl text-gray-600 leading-relaxed">
                    Within minutes, receive verified hospital options with negotiated rates. 
                    See exactly how much you can save compared to standard pricing.
                  </p>
                </div>
                <div className="lg:order-1 bg-white rounded-2xl p-8 shadow-lg">
                  <img
                    src="https://images.pexels.com/photos/263402/pexels-photo-263402.jpeg?auto=compress&cs=tinysrgb&w=600"
                    alt="Get results"
                    className="rounded-xl w-full"
                  />
                </div>
              </div>
            </div>
            
            <div className="bg-red-50 rounded-3xl p-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="bg-red-600 p-4 rounded-2xl">
                      <span className="text-2xl font-bold text-white">3</span>
                    </div>
                    <h3 className="text-3xl font-bold text-gray-900">Get Ongoing Support</h3>
                  </div>
                  <p className="text-xl text-gray-600 leading-relaxed">
                    From booking appointments to insurance claims, our team supports your family 
                    through the entire healthcare journey. You're never alone.
                  </p>
                </div>
                <div className="bg-white rounded-2xl p-8 shadow-lg">
                  <img
                    src="https://images.pexels.com/photos/4386465/pexels-photo-4386465.jpeg?auto=compress&cs=tinysrgb&w=600"
                    alt="Ongoing support"
                    className="rounded-xl w-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-red-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-8">
            Help Us Help More Families
          </h2>
          <p className="text-2xl text-red-100 mb-12">
            Every donation helps us provide free services to families who can't afford to pay. 
            Together, we can ensure no family faces financial ruin for healthcare.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/tools"
              className="bg-white text-red-600 px-12 py-6 rounded-2xl font-bold text-2xl hover:bg-gray-100 transition-all duration-300"
            >
              Upload Your Prescription
            </a>
            <a
              href="/donate"
              className="border-4 border-white text-white px-12 py-6 rounded-2xl font-bold text-2xl hover:bg-white hover:text-red-600 transition-all duration-300"
            >
              Support Our Mission
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;