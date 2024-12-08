import React from 'react';
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';

function Hero() {
  const howItWorksSteps = [
    {
      icon: "🎯",
      title: "Share Your Preferences",
      description: "Tell us where you want to go, for how long, and your travel style."
    },
    {
      icon: "🤖",
      title: "AI Creates Your Plan",
      description: "Our AI analyzes thousands of possibilities to craft your perfect itinerary."
    },
    {
      icon: "✨",
      title: "Customize & Go",
      description: "Review your plan, make adjustments if needed, and start your adventure!"
    }
  ];

  return (
    <>
      {/* Existing Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between py-24 gap-16">
          {/* Left side - Text content */}
          <div className="flex-1 space-y-8">
            <h1 className="font-bold text-5xl md:text-6xl lg:text-7xl leading-tight">
              <span className="bg-gradient-to-r from-[#f56551] to-[#ff8a7d] text-transparent bg-clip-text block">
                Discover Your Next Adventure
              </span>
              <span className="block mt-2">with AI-Powered Planning</span>
            </h1>
            
            <p className="text-xl text-gray-600 max-w-2xl leading-relaxed">
              Your personal trip planner and travel curator, creating custom itineraries 
              tailored to your interests and budget.
            </p>
            
            <div>
              <Link to="/create-trip">
                <Button className="bg-gradient-to-r from-[#f56551] to-[#ff8a7d] hover:opacity-90 text-white 
                  px-10 py-7 rounded-2xl text-lg font-medium shadow-lg hover:shadow-xl 
                  transition-all duration-300 transform hover:-translate-y-1">
                  Start Planning Now
                </Button>
              </Link>
            </div>
          </div>

          {/* Right side - Image */}
          <div className="flex-1 relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-[#f56551]/30 to-[#ff8a7d]/30 
              rounded-3xl blur-3xl opacity-30" />
            <img 
              src="/landing.png" 
              alt="Travel Planning Illustration"
              className="relative w-full h-auto object-cover rounded-3xl shadow-2xl 
                transform hover:scale-[1.02] transition-transform duration-300"
            />
          </div>
        </div>

        {/* Description Section */}
        <div className="py-20 border-t border-gray-100">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Why Choose AI Travel Planning?</h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              Say goodbye to hours of research and countless browser tabs. Our AI-powered platform 
              creates personalized travel itineraries that match your interests, budget, and travel style. 
              Get local insights, hidden gems, and perfectly timed schedules - all in minutes.
            </p>
          </div>
        </div>

        {/* How It Works Section */}
        <div className="py-20 border-t border-gray-100">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-6">How It Works</h2>
            <p className="text-xl text-gray-600">Three simple steps to your perfect trip</p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {howItWorksSteps.map((step, index) => (
              <div key={index} className="relative group">
                <div className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300
                  border border-gray-100 hover:-translate-y-1">
                  <div className="text-4xl mb-4">{step.icon}</div>
                  <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
                {index < howItWorksSteps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-6 transform -translate-y-1/2">
                    <svg className="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Contact Section */}
        <div className="py-20 border-t border-gray-100">
          <div className="text-center space-y-8">
            <h2 className="text-3xl font-bold text-indigo-900">Get in Touch</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Have questions about our AI travel planner? We're here to help make your travel dreams come true.
            </p>
            <div className="flex justify-center gap-6">
              <a href="mailto:contact@aitravel.com" 
                className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                contact@aitravel.com
              </a>
              <a href="tel:+1234567890" 
                className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                +1 (234) 567-890
              </a>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="py-8 border-t border-gray-100">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-gray-600">
            <div className="flex items-center gap-2">
              <span>© 2024 AI Travel Planner.</span>
              <span>All rights reserved.</span>
            </div>
            <div className="flex gap-6">
              <a href="/privacy" className="hover:text-indigo-600 transition-colors">Privacy Policy</a>
              <a href="/terms" className="hover:text-indigo-600 transition-colors">Terms of Service</a>
              <a href="/cookies" className="hover:text-indigo-600 transition-colors">Cookie Policy</a>
            </div>
            <div className="flex gap-4">
              <a href="https://twitter.com" className="hover:text-indigo-600 transition-colors" aria-label="Twitter">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="https://linkedin.com" className="hover:text-indigo-600 transition-colors" aria-label="LinkedIn">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.784 1.764-1.75 1.764z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Hero;
