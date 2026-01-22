import { Check } from 'lucide-react';
import { cn } from '../../utils/helpers';

const ProgressIndicator = ({ currentStep, steps }) => {
  return (
    <div className="w-full py-8">
      <div className="flex items-center justify-between max-w-3xl mx-auto">
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < currentStep;
          const isCurrent = stepNumber === currentStep;

          return (
            <div key={stepNumber} className="flex items-center flex-1">
              {/* Step Circle */}
              <div className="flex flex-col items-center flex-shrink-0">
                <div
                  className={cn(
                    'w-12 h-12 rounded-full flex items-center justify-center font-semibold transition-all duration-300',
                    isCompleted &&
                      'bg-primary-600 text-white ring-4 ring-primary-100',
                    isCurrent &&
                      'bg-primary-600 text-white ring-4 ring-primary-200 scale-110',
                    !isCompleted &&
                      !isCurrent &&
                      'bg-gray-200 text-gray-600'
                  )}
                >
                  {isCompleted ? (
                    <Check className="h-6 w-6" />
                  ) : (
                    <span>{stepNumber}</span>
                  )}
                </div>
                <div className="mt-2 text-center">
                  <p
                    className={cn(
                      'text-sm font-medium',
                      isCurrent && 'text-primary-700',
                      isCompleted && 'text-primary-600',
                      !isCurrent && !isCompleted && 'text-gray-500'
                    )}
                  >
                    {step.title}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5 hidden sm:block">
                    {step.description}
                  </p>
                </div>
              </div>

              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    'flex-1 h-1 mx-4 transition-all duration-300',
                    isCompleted ? 'bg-primary-600' : 'bg-gray-200'
                  )}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProgressIndicator;
