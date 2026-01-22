import { Check } from 'lucide-react';

const ProgressBar = ({ currentStep = 1, steps }) => {
  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Progress Steps */}
      <div className="flex items-center justify-between mb-2">
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isActive = stepNumber === currentStep;
          const isCompleted = stepNumber < currentStep;

          return (
            <div key={step} className="flex items-center flex-1">
              {/* Step Circle */}
              <div className="flex items-center gap-3">
                <div
                  className={`
                    w-8 h-8 rounded-full flex items-center justify-center
                    transition-all duration-200 font-medium text-sm
                    ${
                      isCompleted
                        ? 'bg-primary-600 text-white'
                        : isActive
                        ? 'bg-primary-600 text-white ring-4 ring-primary-100'
                        : 'bg-gray-100 text-gray-400'
                    }
                  `}
                >
                  {isCompleted ? (
                    <Check className="h-4 w-4" strokeWidth={3} />
                  ) : (
                    stepNumber
                  )}
                </div>
                <span
                  className={`
                    text-sm font-medium whitespace-nowrap
                    ${
                      isActive
                        ? 'text-gray-900'
                        : isCompleted
                        ? 'text-gray-600'
                        : 'text-gray-400'
                    }
                  `}
                >
                  {step}
                </span>
              </div>

              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="flex-1 h-0.5 mx-4">
                  <div
                    className={`
                      h-full transition-all duration-300
                      ${isCompleted ? 'bg-primary-600' : 'bg-gray-200'}
                    `}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProgressBar;
