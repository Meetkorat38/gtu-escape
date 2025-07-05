"use client";
import { Menu, Rocket } from "lucide-react";
import Wrapper from "./Wrapper";
import Link from "next/link";
import { ThemeButton } from "./theme-button";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetClose } from "./ui/sheet";
import { useState } from "react";

const navLinks = [
  { href: "/papers", label: "All Papers" },
  { href: "/subjects", label: "All Subjects" },
  { href: "/community", label: "Community" },
  { href: "/about", label: "About" },
];

const Header = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 left-0 right-0 z-20 w-full">
      <Wrapper className="flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <Link href={"/"} className="flex justify-between items-center h-16 cursor-pointer" onClick={() => setSidebarOpen(false)} >
            <div className="bg-blue-600 rounded-lg p-2 mr-3">
              <Rocket className="size-6 text-white"/>
            </div>
            <div>
              <h1 className=" text-base sm:text-xl font-bold text-gray-900 leading-relaxed">GTU <span className="leading-relaxed font-mono">Solutions</span></h1>
              <p className="text-xs text-gray-500">
                Survive GTU, One Paper at a Time
              </p>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Search and Menu */}
        <div className="flex items-center gap-2 md:gap-0">
          <div className="flex items-center bg-white">
            <ThemeButton />
          </div>
          {/* Mobile Menu Button */}
          <Button
            variant={"ghost"}
            className="md:hidden dark:bg-white"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="h-6 w-6 text-gray-700" />
          </Button>
        </div>
      </Wrapper>

      {/* Mobile Sidebar using shadcn/ui Sheet */}
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetContent side="left" className="p-0 w-64">
          <SheetHeader className="border-b border-gray-200 dark:border-gray-700 px-6 py-4">
            <SheetTitle>
              <div className="flex items-center">
                <Rocket className="h-6 w-6 text-blue-600 mr-2" />
                <span className="font-bold leading-relaxed text-base sm:text-lg text-gray-900 dark:text-white">GTU Solutions</span>
              </div>
            </SheetTitle>
            <SheetClose />
             
          </SheetHeader>
          <nav className="flex flex-col px-6 py-4 space-y-4">
            {navLinks.map((link) => (
              <SheetClose asChild key={link.href}>
                <Link
                  href={link.href}
                  className="text-gray-700 dark:text-white hover:text-blue-600 font-medium transition-colors"
                >
                  {link.label}
                </Link>
              </SheetClose>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
    </header>
  );
};

export default Header;