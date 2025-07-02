import { BookOpen, Menu } from "lucide-react";
import Wrapper from "./Wrapper";
import Link from "next/link";
import { ThemeButton } from "./theme-button";
import { Button } from "./ui/button";

const Header = () => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 left-0 right-0 z-2  w-full">
      <Wrapper className="flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
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
            href="/papers"
            className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
          >
            All Papers
          </Link>
          <Link
            href="/subjects"
            className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
          >
            All Subjects
          </Link>
          <Link

            href="/about"
            className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
          >
            About
          </Link>
          <Link

            href="/community"
            className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
          >
            Community
          </Link>
        </nav>

        {/* Search and Menu */}
        <div className="flex items-center gap-2 md:gap-0">
          <div  className="flex items-center bg-white">
            <ThemeButton/>
          </div>
          <Button variant={"ghost"} className="md:hidden dark:bg-white">
            <Menu className="h-6 w-6 text-gray-700" />
          </Button>
        </div>
      </Wrapper>
    </header>
  );
};

export default Header;
