import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/plan');
  };

  return (
    <footer className="bg-slate-900/95 backdrop-blur-lg border-t border-slate-700/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-4 mb-6">
            <div className="relative">
              <img 
                src="/logo.png" 
                alt="FitGenie AI Logo" 
                className="w-16 h-16 rounded-full"
              />
              <div className="absolute -inset-1 bg-indigo-500/20 rounded-full blur-md -z-10"></div>
            </div>
            <h3 className="text-4xl font-bold bg-gradient-to-r from-indigo-400 to-indigo-300 text-transparent bg-clip-text">
              FitGenie AI
            </h3>
          </div>
          
          <p className="text-slate-300 mb-8 max-w-2xl mx-auto text-lg">
            Your personal AI fitness companion, providing personalized diet plans, workout routines, 
            and health recommendations powered by advanced artificial intelligence.
          </p>
          
          <Button 
            onClick={handleGetStarted}
            className="bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white px-8 py-3 rounded-full shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-all duration-300 transform hover:scale-105 mb-8"
          >Get Started Today
          </Button>
        </div>

        <div className="border-t border-slate-700/50 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-slate-400 text-sm">
              © {new Date().getFullYear()} FitGenie AI. All rights reserved.
            </p>
            <p className="text-slate-400 text-sm mt-4 md:mt-0 flex items-center">
              Developed by
              <a
                href="https://shahzadali.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-400 hover:text-indigo-300 transition-colors ml-1"
              >
                Shahzad Ali
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
