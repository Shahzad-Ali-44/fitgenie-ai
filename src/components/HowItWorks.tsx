import { User, FileText, Brain, CheckCircle } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      icon: User,
      title: "Tell Us About Yourself",
      description: "Answer a few questions about your health, fitness level, goals, and lifestyle preferences.",
      number: "01"
    },
    {
      icon: FileText,
      title: "AI Analysis",
      description: "Our advanced AI analyzes your data using machine learning algorithms and medical best practices.",
      number: "02"
    },
    {
      icon: Brain,
      title: "Get Your Plan",
      description: "Receive a comprehensive, personalized diet and workout plan tailored specifically for you.",
      number: "03"
    },
    {
      icon: CheckCircle,
      title: "Track & Improve",
      description: "Monitor your progress and get updated recommendations as you achieve your fitness goals.",
      number: "04"
    }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            How <span className="text-indigo-400">It Works</span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Get your personalized fitness plan in just 4 simple steps. Our AI does the heavy lifting so you can focus on your goals.
          </p>
        </div>

        <div className="relative">
          <div className="hidden lg:block absolute top-24 left-0 right-0 h-0.5 bg-indigo-500"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative group">
                <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-8 text-center hover:bg-slate-800/70 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-indigo-500/10">
                  <div className="relative mb-6">
                    <div className="w-20 h-20 bg-indigo-500 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                      <step.icon className="w-10 h-10 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-indigo-400 rounded-full flex items-center justify-center text-white text-sm font-bold">
                      {step.number}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-4 group-hover:text-indigo-400 transition-colors">
                    {step.title}
                  </h3>
                  
                  <p className="text-slate-300 leading-relaxed group-hover:text-white transition-colors">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

       
      </div>
    </section>
  );
};

export default HowItWorks;
