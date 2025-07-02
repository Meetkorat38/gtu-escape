
import { BookOpen, Users, Star } from 'lucide-react';
import Wrapper from './Wrapper';
import SearchBar from './SearchBar';

const Hero = () => {
  return (
    <div className="bg-gradient-to-br from-blue-50 dark:from-gray-900 dark:to-gray-900 dark:border-b dark:border-white/20 to-indigo-100 pt-20 pb-16 ">
      <Wrapper>
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 dark:text-white select-none">
            Your Complete
            <span className="text-blue-600 block">Question Paper Hub</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto dark:text-white/80">
            Access numberous of previous year question papers with detailed solutions. 
            Everything you need for exam preparation, organized by subject and year.
          </p>
          
          <div className="flex  gap-4 justify-center mb-12">
            <div className="relative">
              <SearchBar/>
            </div>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="text-center">
              <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-lg ">
                <BookOpen className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2 dark:text-white">100+ Papers</h3>
              <p className="text-gray-600 dark:text-white/80">Comprehensive collection across all engineering branches</p>
            </div>
            
            <div className="text-center">
              <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-lg ">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2 dark:text-white">50+ Subjects</h3>
              <p className="text-gray-600 dark:text-white/80">Papers from top engineering colleges nationwide</p>
            </div>
            
            <div className="text-center">
              <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-lg ">
                <Star className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2 dark:text-white">Detailed Solutions</h3>
              <p className="text-gray-600 dark:text-white/80">Step-by-step solutions hosted on Notion</p>
            </div>
          </div>
        </div>
      </Wrapper>
    </div>
  );
};

export default Hero;