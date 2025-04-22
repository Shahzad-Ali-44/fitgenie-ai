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
      const response = await axios.post(
        "https://fitgenie-ai-backend.vercel.app/recommendations",
        formData
      );
      setRecommendations(response.data);
    } catch (error) {
      console.error("Error fetching recommendations:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white flex flex-col items-center justify-start py-10 px-4">
      <header className="text-center mb-10">
        <h1 className="text-5xl font-extrabold bg-gradient-to-r from-indigo-400 to-pink-400 text-transparent bg-clip-text drop-shadow-lg">
          FitGenie AI
        </h1>
        <p className="text-xl text-slate-300 mt-3">
          Your AI-Powered Fitness & Nutrition Guide
        </p>
      </header>

      <Card className="w-full max-w-2xl p-10 bg-white/5 backdrop-blur-2xl border border-white/20 shadow-xl rounded-3xl">
        <h2 className="text-3xl font-bold text-center text-indigo-200 mb-8">
          Build Your Personalized Plan
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {Object.entries(formData).map(([key, value]) => (
            <div key={key}>
              <label className="block text-sm font-medium text-slate-300 mb-2 capitalize">
                {key.replace(/_/g, " ")}
              </label>
              <Input
                name={key}
                value={value}
                onChange={handleInputChange}
                required
                placeholder={placeholders[key as keyof typeof placeholders]}
                className="w-full rounded-xl bg-white/10 text-white placeholder:text-slate-400 border border-white/20 px-4 py-3 focus:ring-2 focus:ring-pink-500 focus:outline-none"
              />
            </div>
          ))}

          <Button
            type="submit"
            className="w-full py-3 rounded-xl bg-pink-500 hover:bg-pink-600 transition font-semibold text-white shadow-md"
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
        <Card className="w-full max-w-2xl mt-10 p-10 bg-white/5 backdrop-blur-xl border border-white/20 shadow-xl rounded-3xl">
          <h3 className="text-3xl font-bold text-center text-green-400 mb-6">
            Your Personalized Plan
          </h3>
          <div className="space-y-6 text-slate-200">
            {Object.entries(recommendations).map(([section, items]: any) => (
              <div key={section}>
                <h4 className="text-lg font-semibold text-pink-300 mb-2">
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

      <footer className="mt-16 text-base text-slate-400 text-center">
        &copy; {new Date().getFullYear()} FitGenie AI | Crafted by {" "}
        <a
          className="underline hover:text-pink-400"
          href="https://shahzadali.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Shahzad Ali
        </a>
      </footer>
    </div>
  );
};

export default App;
