import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import StepIndicator from "@/components/StepIndicator";
import FormStep from "@/components/FormStep";
import axios from "axios";

const RecommendationTool = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    height: "",
    weight: "",
    activity_level: "",
    current_fitness_level: "",
    target_weight: "",
    dietary_preferences: "",
    dietary_restrictions: "",
    meal_frequency: "",
    cooking_skill: "",
    fitness_goals: "",
    timeline: "",
    lifestyle_factors: "",
    sleep_schedule: "",
    health_conditions: "",
    medications: "",
    allergies: "",
    specific_concerns_or_questions: "",
  });

  const steps = ["Basic Info", "Health & Fitness", "Diet & Goals", "Health Info"];

  const placeholders: Record<keyof typeof formData, string> = {
    name: "Enter your name",
    age: "e.g., 25",
    gender: "Male, Female, Other",
    height: "e.g., 5'8\" or 173cm",
    weight: "e.g., 70kg or 154lbs",
    activity_level: "Sedentary, Lightly Active, Moderately Active, Very Active",
    current_fitness_level: "Beginner, Intermediate, Advanced",
    target_weight: "e.g., 65kg or 143lbs",
    dietary_preferences: "Vegetarian, Vegan, Omnivore, Keto, etc.",
    dietary_restrictions: "Gluten-free, Lactose-intolerant, etc.",
    meal_frequency: "2-3 meals, 4-5 meals, 6+ meals",
    cooking_skill: "Beginner, Intermediate, Advanced",
    fitness_goals: "Weight loss, Muscle gain, Endurance, etc.",
    timeline: "1 month, 3 months, 6 months, 1 year",
    lifestyle_factors: "Desk job, Physical work, Student, etc.",
    sleep_schedule: "e.g., 10 PM - 6 AM",
    health_conditions: "Diabetes, Hypertension, etc.",
    medications: "List any medications",
    allergies: "Food allergies, etc.",
    specific_concerns_or_questions: "Any specific questions...",
  };

  const stepFields = {
    1: ['name', 'age', 'gender', 'height', 'weight'],
    2: ['activity_level', 'current_fitness_level', 'target_weight'],
    3: ['dietary_preferences', 'dietary_restrictions', 'meal_frequency', 'cooking_skill', 'fitness_goals', 'timeline', 'lifestyle_factors', 'sleep_schedule'],
    4: ['health_conditions', 'medications', 'allergies', 'specific_concerns_or_questions']
  };

  const stepTitles = {
    1: "Basic Information",
    2: "Health & Fitness",
    3: "Diet & Goals",
    4: "Health Information"
  };

  const stepDescriptions = {
    1: "Let's start with some basic information about you",
    2: "Tell us about your current health and fitness level",
    3: "Help us understand your dietary preferences and fitness goals",
    4: "Share any health conditions or concerns we should know about"
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/recommendations`,
        formData
      );
      navigate('/results', { state: { recommendations: response.data } });
    } catch (error) {
      console.error('Error generating recommendations:', error);
    } finally {
      setLoading(false);
    }
  };

  const isStepValid = () => {
    const currentFields = stepFields[currentStep as keyof typeof stepFields];
    return currentFields.every(field => formData[field as keyof typeof formData].trim() !== '');
  };

  const renderStepContent = () => {
    const currentFields = stepFields[currentStep as keyof typeof stepFields];
    
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {currentFields.map((field) => (
            <div key={field}>
              <label className="block text-sm font-medium text-gray-300 mb-2 capitalize">
                {field.replace(/_/g, " ")}
              </label>
              <Input
                name={field}
                value={formData[field as keyof typeof formData]}
                onChange={handleInputChange}
                required
                placeholder={placeholders[field as keyof typeof placeholders]}
                className="w-full rounded-lg bg-white/10 text-white placeholder:text-gray-400 border border-white/20 px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>
          ))}
        </div>

        <div className="flex justify-between pt-6">
          <Button
            type="button"
            onClick={handlePrevious}
            disabled={currentStep === 1}
            className="bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white px-8 py-3 rounded-full shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>

          {currentStep < 4 ? (
            <Button
              type="button"
              onClick={handleNext}
              disabled={!isStepValid()}
              className="bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white px-8 py-3 rounded-full shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button
              type="button"
              onClick={handleSubmit}
              disabled={!isStepValid() || loading}
              className="bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white px-8 py-3 rounded-full shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                "Generate My Plan"
              )}
            </Button>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-900 pb-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        <StepIndicator
          currentStep={currentStep}
          totalSteps={4}
          steps={steps}
        />

        <FormStep
          title={stepTitles[currentStep as keyof typeof stepTitles]}
          description={stepDescriptions[currentStep as keyof typeof stepDescriptions]}
          stepNumber={currentStep}
          totalSteps={4}
        >
          {renderStepContent()}
        </FormStep>
      </div>
    </div>
  );
};

export default RecommendationTool;
