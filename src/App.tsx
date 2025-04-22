import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import axios from "axios";
import { Loader2 } from "lucide-react";

const App = () => {
  const [formData, setFormData] = useState({
    dietary_preferences: "",
    fitness_goals: "",
    lifestyle_factors: "",
    dietary_restrictions: "",
    health_conditions: "",
    specific_concerns_or_questions: "",
  });
  
  const placeholders: Record<keyof typeof formData, string> = {
    dietary_preferences: "e.g., vegetarian, vegan",
    fitness_goals: "e.g., weight loss, muscle gain",
    lifestyle_factors: "e.g., sedentary, active",
    dietary_restrictions: "e.g., gluten-free, lactose-intolerant",
    health_conditions: "e.g., diabetes, hypertension",
    specific_concerns_or_questions: "Ask anything specific...",
  };

  const [recommendations, setRecommendations] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post("https://fitgenie-ai-backend.vercel.app/recommendations", formData);
      setRecommendations(response.data);
    } catch (error) {
      console.error("Error fetching recommendations:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white flex flex-col items-center justify-start py-10 px-4">
      <header className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-indigo-400 drop-shadow-md">FitGenie AI</h1>
        <p className="text-lg text-slate-400 mt-2">AI-powered Fitness & Nutrition Guidance</p>
      </header>
    
      <Card className="w-full max-w-2xl p-8 bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-3xl transition-all">
        <h2 className="text-2xl font-bold text-center text-indigo-300 mb-6">Get Your Custom Plan</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {Object.entries(formData).map(([key, value]) => (
            <div key={key}>
              <label className="block text-sm font-medium text-slate-300 mb-1 capitalize">
                {key.replace(/_/g, " ")}
              </label>
              <Input
                name={key}
                value={value}
                onChange={handleInputChange}
                required
                autoComplete="true"
                placeholder={placeholders[key as keyof typeof placeholders]}
                className="w-full rounded-xl bg-white/10 text-white placeholder:text-slate-400 border border-white/20 px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>
          ))}

          <Button
            type="submit"
            className="w-full py-3 mt-2 rounded-xl bg-indigo-500 hover:bg-indigo-600 transition text-white font-semibold"
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 className="animate-spin h-5 w-5" /> Generating...
              </span>
            ) : (
              "Generate Recommendations"
            )}
          </Button>
        </form>
      </Card>
     
      {recommendations && (
        <Card className="w-full max-w-2xl mt-10 p-8 bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl rounded-3xl">
          <h3 className="text-2xl font-bold text-center text-green-400 mb-4">Your Personalized Plan</h3>
          <div className="space-y-5 text-slate-200">
            {Object.entries(recommendations).map(([section, items]: any) => (
              <div key={section}>
                <h4 className="text-lg font-semibold text-indigo-300 mb-2">
                  {section.replace(/_/g, " ").toUpperCase()}
                </h4>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  {Array.isArray(items) ? (
                    items.map((item: string, index: number) => (
                      <li key={index}>{item}</li>
                    ))
                  ) : (
                    <li>{String(items)}</li>
                  )}
                </ul>
              </div>
            ))}
          </div>
        </Card>
      )}
    
      <footer className="mt-16 text-lg text-slate-200 text-center">
        &copy; {new Date().getFullYear()} FitGenie AI | All rights reserved | Developed by <a className="underline" href="https://shahzadali.vercel.app/" target="_blank" rel="noopener noreferrer">Shahzad Ali</a>

      </footer>
    </div>
  );
};

export default App;
