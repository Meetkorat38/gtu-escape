import React from "react";

interface PageHeadingProps{
    name : string;
    solutionName: "Solutions" | "Subjects";
    solutionNumber: number
}

const PageHeading = ({name, solutionName, solutionNumber} : PageHeadingProps) => {
  return (
    <div className="text-center mb-16">
      {/* Title */}
      <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight dark:text-white  mb-3">
        Recently Added <span className="text-blue-600">{name}</span>{" "}
        Papers
      </h2>

      {/* Subtitle */}
      <p className="text-lg text-gray-500 dark:text-white/90 min-w  mx-auto">
        Explore the latest exam papers with detailed solutions and structured
        formats.
      </p>

      {/* Stats */}
      <div className="mt-6 inline-flex items-center justify-center gap-2 bg-zinc-100 rounded-md px-4 py-2 text-sm font-medium text-gray-800">
        <span>Available {solutionName}:</span>
        <span className="text-blue-600 font-bold text-base">
          {solutionNumber}
        </span>
      </div>
    </div>
  );
};

export default PageHeading;
