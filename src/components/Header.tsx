"use client";
import React from "react";
import { BookOpen, Search, Menu } from "lucide-react";
import Wrapper from "./Wrapper";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Header = () => {
  const navigate = useRouter()
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 left-0 right-0 z-2  w-full">
      <Wrapper className="flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center" onDoubleClick={() => navigate.push("/admin")}>
          <Link href={"/"} className="flex justify-between items-center h-16">
            <div className="bg-blue-600 rounded-lg p-2 mr-3">
              <BookOpen className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">PaperHub</h1>
              <p className="text-xs text-gray-500">
                Engineering Question Papers
              </p>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex space-x-8">
          <Link
            href="#"
            className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
          >
            Browse Papers
          </Link>
          <Link
            href="#"
            className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
          >
            Universities
          </Link>
          <Link
            href="#"
            className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
          >
            Subjects
          </Link>
          <Link
            href="#"
            className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
          >
            About
          </Link>
        </nav>

        {/* Search and Menu */}
        <div className="flex items-center space-x-4">
          <button className="hidden sm:flex items-center text-gray-500 hover:text-gray-700 transition-colors">
            <Search className="h-5 w-5" />
          </button>
          <button className="md:hidden">
            <Menu className="h-6 w-6 text-gray-700" />
          </button>
        </div>
      </Wrapper>
    </header>
  );
};

export default Header;
