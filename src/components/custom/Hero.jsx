import React from 'react';
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';

function Hero() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col lg:flex-row items-center justify-between py-20 gap-12">
        {/* Left side - Text content */}
        <div className="flex-1 space-y-8">
          <h1 className="font-extrabold text-4xl md:text-5xl lg:text-6xl leading-tight">
            <span className="text-[#f56551] block">Discover Your Next Adventure</span>
            <span className="block">with AI-Powered Planning</span>
          </h1>
          
          <p className="text-xl text-gray-600 max-w-2xl">
            Your personal trip planner and travel curator, creating custom itineraries 
            tailored to your interests and budget. Let AI transform your travel dreams into reality.
          </p>
          
          <div className="flex items-center gap-4">
            <Link to="/create-trip">
              <Button className="bg-[#f56551] hover:bg-[#e54535] text-white px-8 py-6 rounded-full text-lg">
                Start Planning Now
              </Button>
            </Link>
          </div>
          
          <div className="flex items-center gap-6 text-gray-600">
            <div className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#f56551]" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>AI-Powered</span>
            </div>
            <div className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#f56551]" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Personalized</span>
            </div>
            <div className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#f56551]" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Free to Start</span>
            </div>
          </div>
        </div>

        {/* Right side - Image */}
        <div className="flex-1 relative">
          <img 
            src="/landing.png" 
            alt="Travel Planning Illustration"
            className="w-full h-auto object-cover rounded-2xl shadow-2xl"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-[#f56551]/10 to-transparent rounded-2xl" />
        </div>
      </div>
    </div>
  )
}

export default Hero
