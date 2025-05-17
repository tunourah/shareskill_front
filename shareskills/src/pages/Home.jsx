import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

import { ArrowRight, Check, Users, Calendar, MessageSquare, Search, Star, Zap, Shield, Award } from 'lucide-react';
// Assuming skill1.png will be placed in the referenced assets directory
import skill1 from "../assets/images/skill1.png"; 
import skill2 from "../assets/images/skill4.png"; 
import skill3 from "../assets/images/skill5.png"; 
import skill4 from "../assets/images/skill6.png"; 

 
import Footer from '../components/Footer';

// Helper component for scroll-triggered animations
const AnimatedSection = ({ children, className, threshold = 0.1, fullHeight = false }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold, triggerOnce: true });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [controls, inView]);

  const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <motion.section
      ref={ref}
      animate={controls}
      initial="hidden"
      variants={variants}
      className={`${className} ${fullHeight ? 'min-h-screen' : ''}`}
    >
      {children}
    </motion.section>
  );
};

const Home = () => {
  const [activeTab, setActiveTab] = useState('client');

  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: (i) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: i * 0.2,
        duration: 0.5,
        ease: "easeOut"
      },
    }),
  };

  const ctaButtonVariants = {
    hover: {
      scale: 1.05,
      transition: { duration: 0.3 }
    },
    tap: {
      scale: 0.95
    }
  };

  const cornerElementVariants = {
    hidden: { opacity: 0, scale: 0.5, y: 20 },
    visible: (custom) => ({
      opacity: 1,
      scale: 1,
      y: 0,
      rotate: custom.rotate,
      transition: { duration: 0.8, delay: custom.delay, ease: "easeOut" }
    }),
    bobbing: (custom) => ({
      y: [0, custom.yAmount, 0, -custom.yAmount, 0],
      transition: {
        duration: 4 + Math.random() * 2, // Randomize duration slightly
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "loop",
        delay: Math.random() * 1 // Randomize start of bobbing
      }
    })
  };

  const cornerElementsData = [
    { id: 1, positionClasses: 'top-20 left-20', rotate: 5, delay: 0.1, yAmount: 10, image: skill1 },
    { id: 2, positionClasses: 'top-20 right-20', rotate: -5, delay: 0.2, yAmount: 12, image: skill2 },
    { id: 3, positionClasses: 'bottom-20 left-20', rotate: 3, delay: 0.3, yAmount: 15, image: skill3 },
    { id: 4, positionClasses: 'bottom-20 right-20', rotate: -3, delay: 0.4, yAmount: 10, image: skill4 },
  ];

  return (
    <div className="font-sans">
      <style>
        {`
          html {
            scroll-behavior: smooth;
          }
          .hero-bg-four-corners {
            background-color: #FFFFFF; /* White background for this version */
          }
        `}
      </style>
       
      {/* Hero Section with Four Corner Animations */}
      <section className="hero-bg-four-corners relative flex flex-col items-center justify-center min-h-screen px-4 text-center overflow-hidden pt-20 pb-10 md:pt-24 md:pb-16">
        
        {/* Four Corner Animated Elements */}
        {cornerElementsData.map(el => (
          <motion.div
            key={el.id}
            className={`absolute w-24 h-auto sm:w-28 md:w-32 rounded-xl shadow-lg bg-white p-2 sm:p-3 z-0 hidden md:block ${el.positionClasses}`}
            variants={cornerElementVariants}
            initial="hidden"
            animate={["visible", "bobbing"]}
            custom={{ rotate: el.rotate, delay: el.delay, yAmount: el.yAmount }}
            whileHover={{ scale: 1.15, rotate: el.rotate > 0 ? el.rotate - 2 : el.rotate + 2, transition: { duration: 0.3 } }}
          >
            <img  src={el.image}
  alt={`Animated skill card ${el.id}`}className="rounded-md w-full h-full object-cover"/>
          </motion.div>
        ))}

        {/* Main Text Content */}
        <motion.div 
          className="max-w-3xl z-10 relative"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          <h1 className="text-4xl sm:text-5xl font-semibold leading-tight text-gray-900">
            Unlock Your Community's Potential.{" "}
            <span className="text-purple-700 bg-purple-200 ">
              Share Skills
            </span>
            , 
            <br />
            Make <span className='text-purple-700 bg-purple-200 '>Connections.</span>
          </h1>
          <motion.p 
            className="mt-4 text-gray-600 text-sm sm:text-base max-w-xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          >
            Find trusted help for cooking, moving, tutoring, and more—right in your neighborhood.
          </motion.p>
          <motion.div 
            className="mt-8 flex justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          >
           <Link to="/signup"> 
            <motion.button 
              className="px-8 py-3 bg-black text-white rounded-md hover:bg-gray-800 transition-all duration-300 flex items-center text-lg font-medium"
              variants={ctaButtonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              Get Started
            </motion.button>
            </Link>
          </motion.div>
        </motion.div>
        {/* No central illustration in this version */}
      </section>

      {/* How It Works Section (remains the same) */}
      <AnimatedSection id='Works' className="py-16 bg-gray-50" threshold={0.2}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">How It Works</h2>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
              Our platform connects neighbors with skills to those who need them. 
              Choose your path as a service provider or client.
            </p>
            
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

          <motion.div 
            key={activeTab} 
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
            className="grid md:grid-cols-3 gap-8 mt-8"
          >
            {(activeTab === 'client' ? 
              [
                { icon: <Search className="h-6 w-6 text-purple-600" />, title: "Search Services", desc: "Browse through available services in your neighborhood or search for specific skills you need." },
                { icon: <MessageSquare className="h-6 w-6 text-purple-600" />, title: "Request & Connect", desc: "Send service requests to providers and discuss details through our secure messaging system." },
                { icon: <Star className="h-6 w-6 text-purple-600" />, title: "Complete & Review", desc: "After your service is completed, leave a review to help others in the community." }
              ] : 
              [
                { icon: <Users className="h-6 w-6 text-purple-600" />, title: "Create Your Profile", desc: "Set up your profile highlighting your skills, availability, and service areas." },
                { icon: <Calendar className="h-6 w-6 text-purple-600" />, title: "Manage Requests", desc: "Receive and manage service requests from clients in your neighborhood." },
                { icon: <Award className="h-6 w-6 text-purple-600" />, title: "Grow Your Reputation", desc: "Provide excellent service to build your reputation and grow your client base." }
              ]
            ).map((item, index) => (
              <motion.div 
                key={item.title} 
                className="bg-white p-6 rounded-lg shadow-md"
                variants={cardVariants}
                custom={index} 
              >
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                  {item.icon}
                </div>
                <h3 className="font-semibold text-xl mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </AnimatedSection>

      {/* Future Features Section (remains the same) */}
      <AnimatedSection className="py-16 bg-white" threshold={0.2}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Future Features</h2>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
              We're continuously improving our platform to make skill-sharing even more accessible and rewarding.
            </p>
          </div>

          <motion.div 
            className="grid md:grid-cols-2 gap-8"
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
          >
            {[
              {
                icon: <Zap className="h-6 w-6 text-purple-600" />,
                title: "Premium Provider Profiles",
                desc: "Stand out with featured listings that increase visibility and attract more clients.",
                points: [
                  "Priority placement in search results",
                  "Enhanced profile customization",
                  "Special badges for verified providers"
                ]
              },
              {
                icon: <Shield className="h-6 w-6 text-purple-600" />,
                title: "Secure Payment System",
                desc: "Convenient, secure in-app payments for seamless transactions between clients and providers.",
                points: [
                  "Multiple payment options",
                  "Escrow protection for both parties",
                  "Automated invoicing system"
                ]
              },
              {
                icon: <Calendar className="h-6 w-6 text-purple-600" />,
                title: "Advanced Scheduling",
                desc: "Powerful scheduling tools to manage availability and bookings with ease.",
                points: [
                  "Calendar integration",
                  "Automated reminders",
                  "Recurring appointment options"
                ]
              },
              {
                icon: <Users className="h-6 w-6 text-purple-600" />,
                title: "Community Groups",
                desc: "Create and join skill-sharing groups focused on specific interests or neighborhoods.",
                points: [
                  "Group discussions and events",
                  "Skill exchange programs",
                  "Community-led workshops"
                ]
              }
            ].map((feature, index) => (
              <motion.div 
                key={feature.title}
                className="bg-gray-50 p-6 rounded-lg border border-gray-100"
                variants={cardVariants}
                custom={index}
              >
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-xl mb-2">{feature.title}</h3>
                    <p className="text-gray-600 mb-3">{feature.desc}</p>
                    <ul className="space-y-2">
                      {feature.points.map(point => (
                        <li key={point} className="flex items-center">
                          <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                          <span className="text-sm text-gray-600">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </AnimatedSection>

      {/* Call to Action (remains the same) */}
      <AnimatedSection className="py-16 bg-purple-700 text-white" threshold={0.3}>
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to share your skills?</h2>
          <p className="max-w-2xl mx-auto mb-8">
            Join our growing community of neighbors helping neighbors. Share your skills or find the help you need today.
          </p>
          <div className="flex justify-center gap-4">
            <Link to="/signup">
              <motion.button 
                className="px-6 py-3 bg-white text-purple-700 font-medium rounded-md hover:bg-gray-100 transition-all duration-300"
                variants={ctaButtonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                Sign Up Now
              </motion.button>
            </Link>
            <motion.button 
              className="px-6 py-3 border border-white text-white font-medium rounded-md hover:bg-purple-600 transition-all duration-300"
              variants={ctaButtonVariants}
              whileHover="hover"
              whileTap="tap"
              onClick={() => { 
                const worksSection = document.getElementById('Works');
                if (worksSection) {
                  worksSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              Browse Services
            </motion.button>
          </div>
        </div>
      </AnimatedSection>
      <Footer />
    </div>
  );
};

export default Home;

