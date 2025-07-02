import React from 'react'
import Wrapper from './Wrapper'
import Link from 'next/link'

const Footer = () => {
  return (
      <footer className="bg-gray-900 text-white py-12 dark:border-t dark:border-white/20">
        <Wrapper>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <Link href={"/admin/login"} className="text-lg font-semibold mb-4">PaperHub</Link>
              <p className="text-gray-400 text-sm">
                Your one-stop destination for engineering question papers and solutions.
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/papers" className="hover:text-white transition-colors">Browse Papers</Link></li>
                <li><Link href="/subjects" className="hover:text-white transition-colors">Subjects</Link></li>
                <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="#" className="hover:text-white transition-colors">Contact Us</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">FAQ</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Submit Paper</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Report Issue</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-4">Connect</h4>
              <p className="text-gray-400 text-sm mb-2">
                Join thousands of engineering students preparing for exams.
              </p>
              <p className="text-gray-400 text-sm">
                Built with ❤️ for students
              </p>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
            <p>&copy; {new Date().getFullYear()} PaperHub. All rights reserved.</p>
       
          </div>
        </Wrapper>
      </footer>
  )
}

export default Footer