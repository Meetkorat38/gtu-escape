"use client"
import React from 'react';
import { ExternalLink, Calendar, University, FileText } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface QuestionPaper {
  id: string;
  title: string;
  subject: string;
  university: string;
  year: number;
  semester: string;
  notionUrl: string;
  hasAnswers: boolean;
}

interface QuestionPaperCardProps {
  paper: QuestionPaper;
}

const QuestionPaperCard: React.FC<QuestionPaperCardProps> = ({ paper }) => {
  const navigate = useRouter();

  const handleViewSolution = () => {
    navigate.push(`/solutions/${encodeURIComponent(paper.notionUrl)}`);
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200 p-6">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{paper.title}</h3>
          <p className="text-blue-600 font-medium text-sm mb-1">{paper.subject}</p>
          <div className="flex items-center text-gray-500 text-sm space-x-4">
            <div className="flex items-center">
              <University className="h-4 w-4 mr-1" />
              <span>{paper.university}</span>
            </div>
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              <span>{paper.year} - {paper.semester}</span>
            </div>
          </div>
        </div>
        {paper.hasAnswers && (
          <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full">
            Solutions Available
          </span>
        )}
      </div>

      <div className="flex space-x-3">
        <button
          rel="noopener noreferrer"
          className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center text-sm font-medium"
          onClick={handleViewSolution}
        >
          <FileText className="h-4 w-4 mr-2" />
          View Paper
          <ExternalLink className="h-4 w-4 ml-2" />
        </button>
        {paper.hasAnswers && (
          <button
            onClick={handleViewSolution}
            className="flex-1 bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 transition-colors flex items-center justify-center text-sm font-medium"
          >
            View Solutions
          </button>
        )}
      </div>
    </div>
  );
};

export default QuestionPaperCard;