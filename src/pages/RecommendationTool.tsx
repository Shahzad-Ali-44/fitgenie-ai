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
  const [errors, setErrors] = useState<Record<string, string>>({});

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
    fitness_goals: "",
    health_conditions: "",
    allergies: "",
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
    fitness_goals: "Weight loss, Muscle gain, Endurance, etc.",
    health_conditions: "Diabetes, Hypertension, etc.",
    allergies: "Food allergies, etc.",
  };

  const stepFields = {
    1: ['name', 'age', 'gender', 'height', 'weight'],
    2: ['activity_level', 'current_fitness_level', 'target_weight'],
    3: ['dietary_preferences', 'dietary_restrictions', 'fitness_goals'],
    4: ['health_conditions', 'allergies']
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

  const validateField = (name: string, value: string): string => {
    const trimmedValue = value.trim();
    
    switch (name) {
      case 'name':
        if (!trimmedValue) return 'Name is required';
        if (trimmedValue.length < 2) return 'Name must be at least 2 characters';
        if (!/^[a-zA-Z\s]+$/.test(trimmedValue)) return 'Name can only contain letters and spaces';
        return '';
        
      case 'age':
        if (!trimmedValue) return 'Age is required';
        const age = parseInt(trimmedValue);
        if (isNaN(age) || age < 10 || age > 100) return 'Age must be between 10 and 100';
        return '';
        
      case 'gender':
        if (!trimmedValue) return 'Gender is required';
        const validGenders = ['Male', 'Female', 'Other'];
        if (!validGenders.includes(trimmedValue)) return 'Gender must be Male, Female, or Other';
        return '';
        
      case 'height':
        if (!trimmedValue) return 'Height is required';
        const heightPattern = /^(\d+'\d+"?|\d+cm)$/;
        if (!heightPattern.test(trimmedValue)) return 'Height format: 5\'8" or 173cm';
        return '';
        
      case 'weight':
        if (!trimmedValue) return 'Weight is required';
        const weightPattern = /^\d+(kg|lbs)$/;
        if (!weightPattern.test(trimmedValue)) return 'Weight format: 70kg or 154lbs';
        return '';
        
      case 'activity_level':
        if (!trimmedValue) return 'Activity level is required';
        const validActivityLevels = ['Sedentary', 'Lightly Active', 'Moderately Active', 'Very Active'];
        if (!validActivityLevels.includes(trimmedValue)) return 'Activity level must be one of: Sedentary, Lightly Active, Moderately Active, Very Active';
        return '';
        
      case 'current_fitness_level':
        if (!trimmedValue) return 'Fitness level is required';
        const validFitnessLevels = ['Beginner', 'Intermediate', 'Advanced'];
        if (!validFitnessLevels.includes(trimmedValue)) return 'Fitness level must be Beginner, Intermediate, or Advanced';
        return '';
        
      case 'target_weight':
        if (!trimmedValue) return 'Target weight is required';
        const targetWeightPattern = /^\d+(kg|lbs)$/;
        if (!targetWeightPattern.test(trimmedValue)) return 'Target weight format: 65kg or 143lbs';
        return '';
        
      case 'dietary_preferences':
        if (!trimmedValue) return 'Dietary preferences are required';
        if (trimmedValue.length < 3) return 'Dietary preferences must be at least 3 characters';
        return '';
        
      case 'dietary_restrictions':
        return '';
        
      case 'fitness_goals':
        if (!trimmedValue) return 'Fitness goals are required';
        if (trimmedValue.length < 5) return 'Fitness goals must be at least 5 characters';
        return '';
        
      case 'health_conditions':
      case 'allergies':
        return '';
        
      default:
        return '';
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    const error = validateField(name, value);
    setErrors({ ...errors, [name]: String(error) });
  };

  const validateCurrentStep = () => {
    const currentFields = stepFields[currentStep as keyof typeof stepFields];
    const newErrors: Record<string, string> = {};
    
    currentFields.forEach(field => {
      const value = formData[field as keyof typeof formData];
      const error = validateField(field, value);
      if (error) {
        newErrors[field] = String(error);
      }
    });
    
    setErrors({ ...errors, ...newErrors });
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (currentStep < 4) {
      if (validateCurrentStep()) {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    if (!validateCurrentStep()) {
      return;
    }
    
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
    return currentFields.every(field => {
      const value = formData[field as keyof typeof formData].trim();
      const error = errors[field];
      return value !== '' && !error;
    });
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
                autoComplete="on"
                className={`w-full rounded-lg bg-white/10 text-white placeholder:text-gray-400 border px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none ${
                  errors[field] ? 'border-red-400' : 'border-white/20'
                }`}
              />
              {errors[field] && (
                <p className="text-red-400 text-sm mt-1">{String(errors[field])}</p>
              )}
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
                <>
                  <span className="block sm:hidden">Generate</span>
                  <span className="hidden sm:block">Generate My Plan</span>
                </>
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
