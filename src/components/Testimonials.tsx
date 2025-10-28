import { Star, Quote } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Fitness Enthusiast",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
      content: "FitGenie AI completely transformed my approach to fitness. The personalized recommendations are spot-on, and I've never felt better!",
      rating: 5
    },
    {
      name: "Mike Chen",
      role: "Weight Loss Success",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      content: "I lost 30 pounds in 3 months following FitGenie's plan. The AI understood my lifestyle and created a sustainable routine that actually works.",
      rating: 5
    },
    {
      name: "Emily Rodriguez",
      role: "Busy Professional",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      content: "As a working mom, I never had time for complex fitness plans. FitGenie gave me a simple, effective routine that fits my schedule perfectly.",
      rating: 5
    }
  ];

  return (
    <section id="testimonials" className="py-20 bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            What Our <span className="text-indigo-400">Users Say</span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Join thousands of satisfied users who have transformed their lives with FitGenie AI.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="group bg-slate-800/50 border border-slate-700/50 rounded-2xl p-8 hover:bg-slate-800/70 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-indigo-500/10"
            >
              <div className="flex items-center mb-6">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="text-white font-semibold">{testimonial.name}</h4>
                  <p className="text-slate-300 text-sm">{testimonial.role}</p>
                </div>
              </div>

              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>

              <div className="relative">
                <Quote className="absolute -top-2 -left-2 w-8 h-8 text-indigo-500/30" />
                <p className="text-slate-300 leading-relaxed pl-6 group-hover:text-white transition-colors">
                  "{testimonial.content}"
                </p>
              </div>
            </div>
          ))}
        </div>

        
      </div>
    </section>
  );
};

export default Testimonials;
