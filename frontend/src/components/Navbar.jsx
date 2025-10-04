import { Link } from "react-router-dom";
import { GitBranch, TrendingUp, Bell, User } from "lucide-react";
import logo from "../assets/tata-logo.jpg";
const Navbar = () => {
  return (
    <nav className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-b border-slate-700/50 shadow-2xl fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center space-x-12">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="h-12 w-12 rounded-full flex items-center justify-center shadow-lg shadow-blue-500/30 group-hover:shadow-blue-500/50 transition-all duration-300">
                <img src={logo} alt="Logo" className=" object-contain" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-white tracking-tight">
                  TATA MOTORS
                </span>
                <span className="text-[10px] text-slate-400 font-medium tracking-wider uppercase">
                  Supply Chain
                </span>
              </div>
            </Link>

            <div className="hidden lg:flex items-center space-x-2">
              <Link
                to="/"
                className="flex items-center px-4 py-2 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-700/50 transition-all duration-200"
              >
                <GitBranch className="h-4 w-4 mr-2" />
                Supplier Network
              </Link>
              <Link
                to="/sales"
                className="flex items-center px-4 py-2 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-700/50 transition-all duration-200"
              >
                <TrendingUp className="h-4 w-4 mr-2" />
                Analytics
              </Link>
              <Link
                to="/news"
                className="px-4 py-2 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-700/50 transition-all duration-200"
              >
                News
              </Link>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button className="relative p-2 text-slate-400 hover:text-white hover:bg-slate-700/50 rounded-lg transition-all duration-200">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-2 w-2 bg-cyan-500 rounded-full"></span>
            </button>
            <div className="h-8 w-px bg-slate-700"></div>
            <button className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-700/50 rounded-lg transition-all duration-200">
              <div className="h-7 w-7 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                <User className="h-4 w-4 text-white" />
              </div>
              <span className="hidden md:inline">Admin</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
