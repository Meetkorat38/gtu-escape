"use client";
import { BookOpen } from "lucide-react";
import Wrapper from "./Wrapper";
import { useEntityNameById } from "@/features/admin/hooks/useEntityNameById";

const SubjectGrid = () => {
  const { subjects, getCourseNameById, getBranchNameById } =
    useEntityNameById();

  return (
    <div className="py-16 bg-white">
      <Wrapper>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Browse by Subject
          </h2>
          <p className="text-lg text-gray-600">
            Choose your engineering branch to access relevant question papers
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {subjects?.data.map((subject) => {
            const branchName = getBranchNameById(subject.branchId);
            const courseName = getCourseNameById(subject.courseId);
            return (
              <div
                key={subject.id}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow cursor-pointer border border-gray-100 p-6 group"
              >
                <div className="flex items-center mb-4">
                  <div
                    className={`bg-pink-500 rounded-lg p-3 mr-4 group-hover:scale-110 transition-transform`}
                  >
                    <BookOpen className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {subject.name}
                    </h3>
                  </div>
                </div>
                <div className="flex flex-row gap-3">
                  <h3 className="text-gray-900 text-sm ">
                    {subject.semester}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {subject.subjectCode}
                  </p>
                </div>
                <p className="text-gray-600 text-sm mb-4">{branchName}</p>
                <p className="text-gray-600 text-sm mb-4">{courseName}</p>
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
