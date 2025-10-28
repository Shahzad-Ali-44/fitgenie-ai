import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/plan');
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-900">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900"></div>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%2310b981%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mt-25">
        <div className="mb-8">
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6">
            Your Personal
            <span className="block text-indigo-400">
              Fitness AI
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Get personalized diet plans, workout routines, and health recommendations powered by advanced AI. 
            Transform your fitness journey with science-backed insights tailored just for you.
          </p>
        </div>

        <div className="flex justify-center items-center mb-12">
          <Button 
            onClick={handleGetStarted}
            className="bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white px-8 py-3 rounded-full shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-all duration-300 transform hover:scale-105"
          >
            Start Your Journey
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="text-3xl font-bold text-indigo-400 mb-2">10K+</div>
            <div className="text-slate-300">Happy Users</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-indigo-400 mb-2">95%</div>
            <div className="text-slate-300">Success Rate</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-indigo-400 mb-2">24/7</div>
            <div className="text-slate-300">AI Support</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
