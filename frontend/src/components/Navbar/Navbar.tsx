import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs';
import Link from 'next/link';
import { Button } from '../ui/button';
import { Activity } from 'lucide-react';

const Navbar = async () => {
  return (
    <div>
        <nav className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Link href={"/"}><div className="flex items-center">
              <Activity className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">Uptime</span>
            </div>
            </Link>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">Features</a>
              <Link href="/monitors" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">Status</Link>
              
              <SignedOut>
                <div className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition">
                  <SignInButton  /> 
                </div>
                <div className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition">
                  <SignUpButton /> 
                </div>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
              
            </div>
          </div>
        </div>
      </nav>
    </div>
    
  )
}

export default Navbar