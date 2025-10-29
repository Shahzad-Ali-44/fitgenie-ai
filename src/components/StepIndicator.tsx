import { Check } from "lucide-react";

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
  steps: string[];
}

const StepIndicator = ({ currentStep, totalSteps, steps }: StepIndicatorProps) => {
  return (
    <div className="w-full py-6 sm:py-8 px-2">
      <div className="flex justify-center items-center overflow-x-auto scrollbar-hide">
        {steps.map((step, index) => (
          <div key={index} className="flex items-center flex-shrink-0">
            <div className="flex flex-col items-center relative">
              <div
                className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-xs sm:text-sm font-semibold transition-all duration-300 relative z-10 ${
                  index < currentStep
                    ? "bg-indigo-500 text-white"
                    : index === currentStep - 1
                    ? "bg-indigo-500 text-white ring-2 sm:ring-4 ring-indigo-500/30"
                    : "bg-gray-700 text-gray-400"
                }`}
              >
                {index < currentStep - 1 ? (
                  <Check className="w-4 h-4 sm:w-5 sm:h-5" />
                ) : (
                  index + 1
                )}
              </div>
              <span
                className={`text-[10px] sm:text-xs mt-1.5 sm:mt-2 text-center whitespace-nowrap max-w-[70px] sm:max-w-none ${
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
                className={`w-4 sm:w-12 md:w-16 h-1 mx-2 sm:mx-3 md:mx-4 transition-all duration-300 ${
                  index < currentStep - 1
                    ? "bg-indigo-500"
                    : "bg-gray-600"
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