import { useState } from 'react';
import { useNavigate , Link } from "react-router-dom";

import { ArrowRight, Check, Users, Calendar, MessageSquare, Search, Star, Zap, Shield, Award } from 'lucide-react';
import  skill1 from "../assets/images/skill1.png"
import  skill2 from "../assets/images/skill2.png"
import Footer from '../components/Footer';
const Home = () => {
  const [activeTab, setActiveTab] = useState('client');

  return (
    <div className="font-sans">
       
      <section className="relative bg-white min-h-screen flex items-center justify-center px-4 text-center overflow-hidden">
        {/* Floating Images */}
        <div className="absolute top-20 left-10 w-32 rounded-xl shadow-lg rotate-[-12deg] transition-transform duration-1000 ease-in-out hover:scale-105 bg-white p-3">
           <img src = {skill1} ></img>
        </div>
        
        <div className="absolute top-20 right-10 w-28 rounded-xl shadow-lg rotate-[10deg] transition-transform duration-1000 ease-in-out hover:scale-105 bg-white p-3">
          <div className="text-xs font-medium">Moving Help</div>
          <div className="flex items-center justify-center mt-1">
            <Star className="h-3 w-3 text-yellow-500" fill="currentColor" />
            <span className="text-xs ml-1">4.8</span>
          </div>
        </div>
        
        <div className="absolute bottom-20 left-12 w-32 rounded-xl shadow-lg rotate-[8deg] transition-transform duration-1000 ease-in-out hover:scale-105 bg-white p-3">
          <div className="text-xs font-medium">Math Tutoring</div>
          <div className="flex items-center justify-center mt-1">
            <Star className="h-3 w-3 text-yellow-500" fill="currentColor" />
            <span className="text-xs ml-1">5.0</span>
          </div>
        </div>
        
        <div className="absolute bottom-20 right-12 w-28 rounded-xl shadow-lg rotate-[-8deg] transition-transform duration-1000 ease-in-out hover:scale-105 bg-white p-3">
        <img src = {skill2} ></img>
        </div>

        {/* Main Content */}
        <div className="max-w-3xl z-10">
          <h1 className="text-4xl sm:text-5xl font-semibold leading-tight text-gray-900">
            Unlock Your Community's Potential. 
            <span className="bg-purple-100 text-purple-800 px-2 rounded-md">
              Share Skills
            </span>
            ,{' '}
            <br />
            <span className="px-2 border-neutral-600 rounded-md">
              Make <span className='bg-purple-100 text-purple-800'>Connections.</span>
            </span>
          </h1>
          <p className="mt-4 text-gray-600 text-sm sm:text-base">
            Find trusted help for cooking, moving, tutoring, and more—right in your neighborhood.
          </p>
          <div className="mt-6 flex justify-center gap-4">
           <Link to="/signup"> <button className="px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-all duration-300 flex items-center">
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </button>
            </Link>
            {/* <button className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-all duration-300">
              Learn More
            </button> */}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id='Works' className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">How It Works</h2>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
              Our platform connects neighbors with skills to those who need them. 
              Choose your path as a service provider or client.
            </p>
            
            {/* Tabs */}
            <div className="flex justify-center mt-8 border-b border-gray-200">
              <button 
                className={`px-4 py-2 font-medium text-sm ${activeTab === 'client' ? 'text-purple-600 border-b-2 border-purple-600' : 'text-gray-500 hover:text-gray-700'}`}
                onClick={() => setActiveTab('client')}
              >
                For Clients
              </button>
              <button 
                className={`px-4 py-2 font-medium text-sm ${activeTab === 'provider' ? 'text-purple-600 border-b-2 border-purple-600' : 'text-gray-500 hover:text-gray-700'}`}
                onClick={() => setActiveTab('provider')}
              >
                For Service Providers
              </button>
            </div>
          </div>

          {/* Steps */}
          {activeTab === 'client' ? (
            <div className="grid md:grid-cols-3 gap-8 mt-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                  <Search className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="font-semibold text-xl mb-2">Search Services</h3>
                <p className="text-gray-600">
                  Browse through available services in your neighborhood or search for specific skills you need.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                  <MessageSquare className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="font-semibold text-xl mb-2">Request & Connect</h3>
                <p className="text-gray-600">
                  Send service requests to providers and discuss details through our secure messaging system.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                  <Star className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="font-semibold text-xl mb-2">Complete & Review</h3>
                <p className="text-gray-600">
                  After your service is completed, leave a review to help others in the community.
                </p>
              </div>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-8 mt-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="font-semibold text-xl mb-2">Create Your Profile</h3>
                <p className="text-gray-600">
                  Set up your profile highlighting your skills, availability, and service areas.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                  <Calendar className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="font-semibold text-xl mb-2">Manage Requests</h3>
                <p className="text-gray-600">
                  Receive and manage service requests from clients in your neighborhood.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                  <Award className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="font-semibold text-xl mb-2">Grow Your Reputation</h3>
                <p className="text-gray-600">
                  Provide excellent service to build your reputation and grow your client base.
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Future Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Future Features</h2>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
              We're continuously improving our platform to make skill-sharing even more accessible and rewarding.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
              <div className="flex items-start">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                  <Zap className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-xl mb-2">Premium Provider Profiles</h3>
                  <p className="text-gray-600 mb-3">
                    Stand out with featured listings that increase visibility and attract more clients.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      <span className="text-sm text-gray-600">Priority placement in search results</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      <span className="text-sm text-gray-600">Enhanced profile customization</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      <span className="text-sm text-gray-600">Special badges for verified providers</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
              <div className="flex items-start">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                  <Shield className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-xl mb-2">Secure Payment System</h3>
                  <p className="text-gray-600 mb-3">
                    Convenient, secure in-app payments for seamless transactions between clients and providers.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      <span className="text-sm text-gray-600">Multiple payment options</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      <span className="text-sm text-gray-600">Escrow protection for both parties</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      <span className="text-sm text-gray-600">Automated invoicing system</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
              <div className="flex items-start">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                  <Calendar className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-xl mb-2">Advanced Scheduling</h3>
                  <p className="text-gray-600 mb-3">
                    Powerful scheduling tools to manage availability and bookings with ease.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      <span className="text-sm text-gray-600">Calendar integration</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      <span className="text-sm text-gray-600">Automated reminders</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      <span className="text-sm text-gray-600">Recurring appointment options</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
              <div className="flex items-start">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                  <Users className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-xl mb-2">Community Groups</h3>
                  <p className="text-gray-600 mb-3">
                    Create and join skill-sharing groups focused on specific interests or neighborhoods.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      <span className="text-sm text-gray-600">Group discussions and events</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      <span className="text-sm text-gray-600">Skill exchange programs</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      <span className="text-sm text-gray-600">Community-led workshops</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            {/* <button className="px-6 py-3 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-all duration-300 shadow-md flex items-center mx-auto">
              Join the Waitlist for Early Access
              <ArrowRight className="ml-2 h-4 w-4" />
            </button> */}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-purple-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to share your skills?</h2>
          <p className="max-w-2xl mx-auto mb-8">
            Join our growing community of neighbors helping neighbors. Share your skills or find the help you need today.
          </p>
          <div className="flex justify-center gap-4">
         <Link to="/signup">   <button className="px-6 py-3 bg-white text-purple-700 font-medium rounded-md hover:bg-gray-100 transition-all duration-300">
              Sign Up Now
            </button></Link>
            <button className="px-6 py-3 border border-white text-white font-medium rounded-md hover:bg-purple-600 transition-all duration-300">
              Browse Services
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
    <Footer></Footer>
    </div>
  );
};

export default Home;