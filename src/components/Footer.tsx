import React from 'react'
import Wrapper from './Wrapper'

const Footer = () => {
  return (
      <footer className="bg-gray-900 text-white py-12">
        <Wrapper>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">PaperHub</h3>
              <p className="text-gray-400 text-sm">
                Your one-stop destination for engineering question papers and solutions.
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Browse Papers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Universities</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Subjects</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Latest Papers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Submit Paper</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Report Issue</a></li>
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
            <p>&copy; 2024 PaperHub. All rights reserved.</p>
            <p>
              <a
                href="/admin"
                className="text-blue-400 underline hover:text-white"
              >
                Admin: Add Paper
              </a>
            </p>
          </div>
        </Wrapper>
      </footer>
  )
}

export default Footer