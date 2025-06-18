
import React from 'react';
import { Search, BookOpen, Users, Star } from 'lucide-react';
import Wrapper from './Wrapper';

const Hero = () => {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 pt-20 pb-16">
      <Wrapper>
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Your Complete
            <span className="text-blue-600 block">Question Paper Hub</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Access thousands of previous year question papers with detailed solutions. 
            Everything you need for exam preparation, organized by subject and year.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search subjects, universities, or years..."
                className="pl-10 pr-4 py-3 w-full sm:w-96 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium">
              Search Papers
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="text-center">
              <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-lg">
                <BookOpen className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">10,000+ Papers</h3>
              <p className="text-gray-600">Comprehensive collection across all engineering branches</p>
            </div>
            
            <div className="text-center">
              <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">500+ Universities</h3>
              <p className="text-gray-600">Papers from top engineering colleges nationwide</p>
            </div>
            
            <div className="text-center">
              <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Star className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Detailed Solutions</h3>
              <p className="text-gray-600">Step-by-step solutions hosted on Notion</p>
            </div>
          </div>
        </div>
      </Wrapper>
    </div>
  );
};

export default Hero;