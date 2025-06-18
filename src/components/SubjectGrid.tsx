
import { BookOpen, Cpu, Zap, Cog, Code, Calculator } from 'lucide-react';
import Wrapper from './Wrapper';

const subjects = [
  {
    id: 'cse',
    name: 'Computer Science',
    icon: Code,
    count: 2500,
    color: 'bg-blue-500',
    description: 'Programming, Algorithms, Data Structures'
  },
  {
    id: 'ece',
    name: 'Electronics & Communication',
    icon: Cpu,
    count: 1800,
    color: 'bg-purple-500',
    description: 'Digital Electronics, Signal Processing'
  },
  {
    id: 'ee',
    name: 'Electrical Engineering',
    icon: Zap,
    count: 1600,
    color: 'bg-yellow-500',
    description: 'Power Systems, Control Systems'
  },
  {
    id: 'me',
    name: 'Mechanical Engineering',
    icon: Cog,
    count: 1900,
    color: 'bg-green-500',
    description: 'Thermodynamics, Manufacturing'
  },
  {
    id: 'ce',
    name: 'Civil Engineering',
    icon: BookOpen,
    count: 1400,
    color: 'bg-orange-500',
    description: 'Structural Engineering, Surveying'
  },
  {
    id: 'math',
    name: 'Engineering Mathematics',
    icon: Calculator,
    count: 800,
    color: 'bg-red-500',
    description: 'Calculus, Linear Algebra, Statistics'
  }
];

const SubjectGrid =  () => {
  return (
    <div className="py-16 bg-white">
      <Wrapper>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Browse by Subject</h2>
          <p className="text-lg text-gray-600">Choose your engineering branch to access relevant question papers</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {subjects.map((subject) => {
            const IconComponent = subject.icon;
            return (
              <div
                key={subject.id}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow cursor-pointer border border-gray-100 p-6 group"
              >
                <div className="flex items-center mb-4">
                  <div className={`${subject.color} rounded-lg p-3 mr-4 group-hover:scale-110 transition-transform`}>
                    <IconComponent className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{subject.name}</h3>
                    <p className="text-sm text-gray-500">{subject.count} papers available</p>
                  </div>
                </div>
                <p className="text-gray-600 text-sm mb-4">{subject.description}</p>
                <button className="text-blue-600 font-medium text-sm hover:text-blue-700 transition-colors">
                  View Papers →
                </button>
              </div>
            );
          })}
        </div>
      </Wrapper>
    </div>
  );
};

export default SubjectGrid;