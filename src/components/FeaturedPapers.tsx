"use client"
import QuestionPaperCard from './QuestionPaperCard';
import Wrapper from './Wrapper';

const samplePapers = [
  {
    id: '1',
    title: 'Check Paper',
    subject: 'Computer Science Engineering',
    university: 'IIT Delhi',
    year: 2023,
    semester: 'Semester 4',
    notionUrl: '210564c5dee2808eac5adbcf67fa4df1',
    hasAnswers: true
  },
  {
    id: '2',
    title: 'Digital Signal Processing',
    subject: 'Electronics & Communication',
    university: 'NIT Trichy',
    year: 2023,
    semester: 'Semester 6',
    notionUrl: 'https://notion.so/sample-dsp-paper',
    hasAnswers: true
  },
  {
    id: '3',
    title: 'Engineering Mathematics III',
    subject: 'Engineering Mathematics',
    university: 'Mumbai University',
    year: 2023,
    semester: 'Semester 3',
    notionUrl: 'https://notion.so/sample-math-paper',
    hasAnswers: false
  },
  {
    id: '4',
    title: 'Thermodynamics',
    subject: 'Mechanical Engineering',
    university: 'Anna University',
    year: 2022,
    semester: 'Semester 4',
    notionUrl: 'https://notion.so/sample-thermo-paper',
    hasAnswers: true
  },
  {
    id: '5',
    title: 'Power Systems',
    subject: 'Electrical Engineering',
    university: 'VTU',
    year: 2023,
    semester: 'Semester 7',
    notionUrl: 'https://notion.so/sample-power-paper',
    hasAnswers: true
  },
  {
    id: '6',
    title: 'Structural Analysis',
    subject: 'Civil Engineering',
    university: 'BITS Pilani',
    year: 2023,
    semester: 'Semester 5',
    notionUrl: 'https://notion.so/sample-structural-paper',
    hasAnswers: false
  }
];

const FeaturedPapers = () => {

  return (
    <div className="py-16 bg-gray-50">
      <Wrapper>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Recently Added Papers</h2>
          <p className="text-lg text-gray-600">Latest question papers with detailed solutions</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {samplePapers.map((paper) => (
            <QuestionPaperCard key={paper.id} paper={paper} />
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium">
            Browse All Papers
          </button>
        </div>
      </Wrapper>
    </div>
  );
};

export default FeaturedPapers;