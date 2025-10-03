import { Link } from "react-router-dom";
import { Package, GitBranch, TrendingUp, Bell, Settings, User, LogIn } from "lucide-react";
import TataLogo from "../assets/tata-logo.jpg"; // Make sure to place the logo in this path

const Navbar = () => {
  return (
    <nav className="bg-black/80 backdrop-blur-lg border-b border-gray-700/50 shadow-xl fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Left side: Logo + Links */}
          <div className="flex items-center space-x-8">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center space-x-3">
              <div className="relative h-12 w-12">
                <img
                  src={TataLogo}
                  alt="TATA Logo"
                  className="h-full w-full object-contain"
                />
              </div>
              <div>
                <div className="text-2xl font-bold text-white tracking-tight">TATA MOTORS</div>
                <div className="text-xs text-gray-300 font-medium tracking-wide">Supply Chain Management</div>
              </div>
            </div>

            {/* Links */}
            <div className="hidden lg:flex items-center space-x-1 ml-8">
              <Link
                to="/"
                className="flex items-center px-4 py-2.5 rounded-lg text-sm font-medium text-white/80 hover:text-white hover:bg-white/10 transition-all duration-200"
              >
                <GitBranch className="h-4 w-4 mr-2" />
                Supplier Network
              </Link>
              <Link
                to="/sales"
                className="flex items-center px-4 py-2.5 rounded-lg text-sm font-medium text-white/80 hover:text-white hover:bg-white/10 transition-all duration-200"
              >
                <TrendingUp className="h-4 w-4 mr-2" />
                Analytics
              </Link>
            </div>
          </div>

          {/* Right side: Buttons */}
          <div className="flex items-center space-x-3">
            <button className="p-2.5 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200">
              <Bell className="h-5 w-5" />
            </button>
            <button className="p-2.5 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200">
              <Settings className="h-5 w-5" />
            </button>
            <div className="h-8 w-px bg-gray-700"></div>
            <button className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200">
              <User className="h-4 w-4" />
              <span className="hidden md:inline">Admin</span>
            </button>
            <button className="flex items-center space-x-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg text-sm font-semibold hover:from-blue-700 hover:to-cyan-700 transition-all duration-200 shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40">
              <LogIn className="h-4 w-4" />
              <span>Sign In</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
