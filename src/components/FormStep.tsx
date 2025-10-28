import { ReactNode } from "react";

interface FormStepProps {
  title: string;
  description: string;
  children: ReactNode;
  stepNumber: number;
  totalSteps: number;
}

const FormStep = ({ title, description, children, stepNumber, totalSteps }: FormStepProps) => {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm font-medium mb-4">
          Step {stepNumber} of {totalSteps}
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          {title}
        </h2>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          {description}
        </p>
      </div>

      <div className="bg-white/5 backdrop-blur-2xl border border-white/20 rounded-3xl p-8 shadow-xl">
        {children}
      </div>
    </div>
  );
};

export default FormStep;
