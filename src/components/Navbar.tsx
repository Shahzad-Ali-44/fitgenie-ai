import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    const observerOptions = {
      root: null,
      rootMargin: "-50% 0px -50% 0px",
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    const sections = ["home", "features", "how-it-works", "testimonials"];
    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      sections.forEach((id) => {
        const element = document.getElementById(id);
        if (element) observer.unobserve(element);
      });
    };
  }, []);

  const handleGetStarted = () => {
    navigate('/plan');
    setIsMenuOpen(false);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const navLinks = [
    { id: "home", label: "Home" },
    { id: "features", label: "Features" },
    { id: "how-it-works", label: "How It Works" },
    { id: "testimonials", label: "Testimonials" },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-slate-900/95 backdrop-blur-lg shadow-lg shadow-indigo-500/10 border-b border-slate-700/50"
            : "bg-slate-900/30 backdrop-blur-md border-b border-slate-700/30"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`flex items-center justify-between transition-all duration-300 ${
              scrolled ? "h-20" : "h-24"
            }`}
          >
            <div className="flex items-center space-x-4 cursor-pointer group" onClick={() => scrollToSection('home')}>
              <div className="relative">
                <img 
                  src="/logo.png" 
                  alt="FitGenie AI Logo" 
                  className={`transition-all duration-300 ${scrolled ? "w-10 h-10" : "w-12 h-12"} rounded-full`}
                />
                <div className="absolute -inset-1 bg-indigo-500/20 rounded-full blur-md -z-10"></div>
              </div>
              <h1
                className={`font-bold bg-gradient-to-r from-indigo-400 to-indigo-300 text-transparent bg-clip-text transition-all duration-300 ${
                  scrolled ? "text-2xl" : "text-3xl"
                }`}
              >
                FitGenie AI
              </h1>
            </div>

            <div className="hidden md:flex items-center space-x-2">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className="relative px-5 py-3 text-base text-slate-200 hover:text-indigo-400 transition-colors duration-200 group"
                >
                  <span className="relative z-10 font-medium">{link.label}</span>
                  <span
                    className={`absolute bottom-0 left-0 w-full h-0.5 bg-indigo-400 transform origin-left transition-transform duration-300 ${
                      activeSection === link.id ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  ></span>
                </button>
              ))}
            </div>

            <div className="hidden md:block">
              <Button
                onClick={handleGetStarted}
                className="bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white px-8 py-3 text-base rounded-full shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-all duration-300 transform hover:scale-105"
              >
                Get Started
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>

            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-white hover:text-indigo-400 transition-colors p-2"
                aria-label="Toggle menu"
              >
                <Menu size={28} className={`transition-transform duration-300 ${isMenuOpen ? "rotate-90 opacity-0" : "rotate-0 opacity-100"}`} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300"
          onClick={() => setIsMenuOpen(false)}
        ></div>
      )}

      <div
        className={`fixed top-0 right-0 h-full w-80 bg-slate-900/98 backdrop-blur-xl border-l border-slate-700/50 shadow-2xl z-50 md:hidden transform transition-transform duration-300 ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-7 border-b border-slate-700/50">
            <div className="flex items-center space-x-3">
              <img 
                src="/logo.png" 
                alt="FitGenie AI Logo" 
                className="w-10 h-10 rounded-full"
              />
              <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-indigo-300 text-transparent bg-clip-text">
                FitGenie AI
              </h2>
            </div>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="text-slate-400 hover:text-white transition-colors p-2"
              aria-label="Close menu"
            >
              <X size={24} />
            </button>
          </div>

          <div className="flex-1 px-6 py-8 space-y-2">
            {navLinks.map((link, index) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className={`w-full text-left px-4 py-4 rounded-lg transition-all duration-200 ${
                  activeSection === link.id
                    ? "bg-indigo-500/20 text-indigo-400 border-l-4 border-indigo-400"
                    : "text-slate-300 hover:bg-slate-800/50 hover:text-white border-l-4 border-transparent"
                }`}
                style={{
                  animationDelay: `${index * 50}ms`,
                  animation: isMenuOpen ? "slideIn 0.3s ease-out forwards" : "none"
                }}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="p-6 border-t border-slate-700/50">
            <Button
              onClick={handleGetStarted}
              className="w-full bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white py-4 rounded-xl shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-all duration-300 transform hover:scale-105"
            >
              Get Started
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </>
  );
};

export default Navbar;
