import React from 'react';
import { Linkedin, Twitter, Mail, Award, Users, Heart, Shield } from 'lucide-react';

const Team = () => {
  const leadership = [
    {
      name: 'Dr. Rajesh Sharma',
      role: 'Founder & CEO',
      image: 'https://images.pexels.com/photos/5327921/pexels-photo-5327921.jpeg?auto=compress&cs=tinysrgb&w=400',
      bio: 'A cardiologist with 15+ years of experience, Dr. Sharma founded SANDEH after witnessing the financial struggles of his patients. He holds an MD from AIIMS and MBA from IIM Bangalore.',
      expertise: ['Healthcare Administration', 'Cardiac Surgery', 'Healthcare Policy'],
      social: {
        linkedin: '#',
        twitter: '#',
        email: 'rajesh@sandeh.org',
      },
    },
    {
      name: 'Priya Patel',
      role: 'Chief Operating Officer',
      image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400',
      bio: 'Former healthcare consultant with McKinsey & Company, Priya brings 12 years of experience in healthcare operations and strategy. She holds an MBA from Wharton.',
      expertise: ['Operations Management', 'Healthcare Economics', 'Strategic Planning'],
      social: {
        linkedin: '#',
        twitter: '#',
        email: 'priya@sandeh.org',
      },
    },
    {
      name: 'Dr. Amit Kumar',
      role: 'Medical Director',
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400',
      bio: 'Orthopedic surgeon and healthcare quality expert with 18 years of experience. Dr. Kumar leads our medical advisory team and hospital partnership program.',
      expertise: ['Orthopedic Surgery', 'Healthcare Quality', 'Medical Ethics'],
      social: {
        linkedin: '#',
        twitter: '#',
        email: 'amit@sandeh.org',
      },
    },
    {
      name: 'Anjali Reddy',
      role: 'Director of Patient Services',
      image: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=400',
      bio: 'Social worker and patient advocate with 10+ years in healthcare navigation. Anjali leads our patient support team and develops our service protocols.',
      expertise: ['Patient Advocacy', 'Social Work', 'Healthcare Navigation'],
      social: {
        linkedin: '#',
        twitter: '#',
        email: 'anjali@sandeh.org',
      },
    },
  ];

  const advisors = [
    {
      name: 'Dr. Sanjay Gupta',
      role: 'Senior Medical Advisor',
      affiliation: 'Former Director, AIIMS',
      image: 'https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg?auto=compress&cs=tinysrgb&w=300',
    },
    {
      name: 'Meera Chopra',
      role: 'Healthcare Policy Advisor',
      affiliation: 'Former Secretary, Ministry of Health',
      image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=300',
    },
    {
      name: 'Ravi Krishnan',
      role: 'Technology Advisor',
      affiliation: 'Former CTO, Practo',
      image: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=300',
    },
    {
      name: 'Dr. Sunita Devi',
      role: 'Public Health Advisor',
      affiliation: 'WHO Consultant',
      image: 'https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&w=300',
    },
  ];

  const values = [
    {
      icon: Heart,
      title: 'Compassion',
      description: 'We approach every patient with empathy and understanding.',
    },
    {
      icon: Shield,
      title: 'Integrity',
      description: 'We maintain the highest ethical standards in all our operations.',
    },
    {
      icon: Users,
      title: 'Collaboration',
      description: 'We work together with patients, families, and healthcare providers.',
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'We strive for the highest quality in our services and outcomes.',
    },
  ];

  const stats = [
    { number: '25+', label: 'Team Members' },
    { number: '50+', label: 'Years Combined Experience' },
    { number: '15+', label: 'Medical Specialties' },
    { number: '8+', label: 'Languages Spoken' },
  ];

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="bg-white py-20 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Meet Our Team
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A dedicated group of healthcare professionals, patient advocates, and technology experts 
              working together to make quality healthcare accessible and affordable for everyone.
            </p>
          </div>
        </div>
      </section>

      {/* Team Stats */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-red-600 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Leadership Team
            </h2>
            <p className="text-xl text-gray-600">
              Experienced leaders driving our mission forward.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {leadership.map((member, index) => (
              <div key={index} className="bg-white rounded-lg p-8 shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-200">
                <div className="flex items-start space-x-6">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-24 h-24 rounded-full object-cover flex-shrink-0"
                  />
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                    <p className="text-red-600 font-semibold mb-3">{member.role}</p>
                    <p className="text-gray-600 mb-4 text-sm leading-relaxed">{member.bio}</p>
                    
                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-900 mb-2">Expertise:</h4>
                      <div className="flex flex-wrap gap-2">
                        {member.expertise.map((skill, skillIndex) => (
                          <span key={skillIndex} className="bg-red-50 text-red-800 text-xs px-2 py-1 rounded-full">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex space-x-3">
                      <a href={member.social.linkedin} className="text-red-600 hover:text-red-700">
                        <Linkedin className="h-5 w-5" />
                      </a>
                      <a href={member.social.twitter} className="text-red-600 hover:text-red-700">
                        <Twitter className="h-5 w-5" />
                      </a>
                      <a href={`mailto:${member.social.email}`} className="text-gray-600 hover:text-gray-700">
                        <Mail className="h-5 w-5" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Advisory Board */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Advisory Board
            </h2>
            <p className="text-xl text-gray-600">
              Distinguished experts guiding our strategic direction.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {advisors.map((advisor, index) => (
              <div key={index} className="text-center">
                <img
                  src={advisor.image}
                  alt={advisor.name}
                  className="w-32 h-32 rounded-full object-cover mx-auto mb-4 shadow-lg"
                />
                <h3 className="text-lg font-bold text-gray-900 mb-1">{advisor.name}</h3>
                <p className="text-red-600 font-semibold mb-2">{advisor.role}</p>
                <p className="text-gray-600 text-sm">{advisor.affiliation}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-red-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Our Values
            </h2>
            <p className="text-xl text-red-100">
              The principles that guide everything we do.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-lg mb-6">
                  <value.icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold mb-4">{value.title}</h3>
                <p className="text-red-100">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Our Team */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Join Our Mission
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            We're always looking for passionate individuals who share our vision of accessible, 
            affordable healthcare for all. Whether you're a healthcare professional, technology expert, 
            or patient advocate, we'd love to hear from you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="bg-red-600 text-white px-8 py-4 rounded-md font-semibold text-lg hover:bg-red-700 transition-all duration-300"
            >
              View Open Positions
            </a>
            <a
              href="/contact"
              className="border-2 border-red-600 text-red-600 px-8 py-4 rounded-md font-semibold text-lg hover:bg-red-600 hover:text-white transition-all duration-300"
            >
              Volunteer With Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Team;