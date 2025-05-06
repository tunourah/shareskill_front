import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 py-12">
    <div className="container mx-auto px-4">
      <div className="grid md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-white font-semibold text-lg mb-4">Neighborhood Skills</h3>
          <p className="text-sm">
            Connecting neighbors with skills to those who need them, building stronger communities one service at a time.
          </p>
        </div>
        <div>
          <h4 className="text-white font-medium mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-white transition-colors">Home</a></li>
            <li><a href="#Works" className="hover:text-white transition-colors">How It Works</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Browse Services</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Become a Provider</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-medium mb-4">Support</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Safety Guidelines</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-medium mb-4">Stay Connected</h4>
          <p className="text-sm mb-4">Sign up for updates on new features and community events.</p>
          <div className="flex">
            <input type="email" placeholder="Your email" className="px-3 py-2 bg-gray-800 rounded-l text-sm w-full focus:outline-none focus:ring-1 focus:ring-purple-500" />
            <button className="bg-purple-600 hover:bg-purple-700 px-3 py-2 rounded-r text-white transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-800 mt-8 pt-8 text-sm text-center">
        &copy; {new Date().getFullYear()} Neighborhood Skills. All rights reserved.
      </div>
    </div>
  </footer>
  )
}

export default Footer