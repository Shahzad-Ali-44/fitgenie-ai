import { Brain, Target, Zap, Shield, Clock, Users } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Analysis",
      description: "Advanced machine learning algorithms analyze your data to provide personalized recommendations tailored to your unique needs."
    },
    {
      icon: Target,
      title: "Goal-Oriented Plans",
      description: "Whether you want to lose weight, build muscle, or improve endurance, our AI creates targeted plans for your specific goals."
    },
    {
      icon: Zap,
      title: "Real-Time Adaptation",
      description: "Your plan evolves with you. As you progress, our AI adjusts recommendations to keep you on track for optimal results."
    },
    {
      icon: Shield,
      title: "Health-Safe Approach",
      description: "All recommendations are based on medical best practices and consider your health conditions and dietary restrictions."
    },
    {
      icon: Clock,
      title: "Time-Efficient",
      description: "Get comprehensive fitness and nutrition plans in minutes, not hours. No more endless research or guesswork."
    },
    {
      icon: Users,
      title: "Expert-Backed",
      description: "Our AI is trained on data from certified nutritionists, fitness trainers, and medical professionals worldwide."
    }
  ];

  return (
    <section id="features" className="py-20 bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Why Choose <span className="text-indigo-400">FitGenie AI</span>?
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Experience the future of fitness with our cutting-edge AI technology that understands you better than any human trainer.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-slate-800/50 border border-slate-700/50 rounded-2xl p-8 hover:bg-slate-800/70 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-indigo-500/10"
            >
              <div className="relative z-10">
                <div className="w-16 h-16 bg-indigo-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-xl font-bold text-white mb-4 group-hover:text-indigo-400 transition-colors">
                  {feature.title}
                </h3>
                
                <p className="text-slate-300 leading-relaxed group-hover:text-white transition-colors">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
