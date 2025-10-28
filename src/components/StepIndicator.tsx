import { Check } from "lucide-react";

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
  steps: string[];
}

const StepIndicator = ({ currentStep, totalSteps, steps }: StepIndicatorProps) => {
  return (
    <div className="w-full max-w-2xl mx-auto py-8">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={index} className="flex items-center">
            <div className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
                  index < currentStep
                    ? "bg-indigo-500 text-white"
                    : index === currentStep - 1
                    ? "bg-indigo-500 text-white ring-4 ring-indigo-500/30"
                    : "bg-gray-700 text-gray-400"
                }`}
              >
                {index < currentStep - 1 ? (
                  <Check className="w-5 h-5" />
                ) : (
                  index + 1
                )}
              </div>
              <span
                className={`text-xs mt-2 text-center max-w-20 whitespace-nowrap ${
                  index < currentStep
                    ? "text-indigo-400"
                    : index === currentStep - 1
                    ? "text-indigo-400 font-semibold"
                    : "text-gray-500"
                }`}
              >
                {step}
              </span>
            </div>
            {index < totalSteps - 1 && (
              <div
                className={`flex-1 h-0.5 mx-4 transition-all duration-300 ${
                  index < currentStep - 1
                    ? "bg-indigo-500"
                    : "bg-gray-700"
                }`}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default StepIndicator;
