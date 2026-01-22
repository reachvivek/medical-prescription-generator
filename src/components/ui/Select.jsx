import { forwardRef } from 'react';
import { cn } from '../../utils/helpers';

const Select = forwardRef(
  (
    {
      label,
      error,
      helperText,
      options = [],
      className = '',
      containerClassName = '',
      required = false,
      placeholder = 'Select an option',
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'w-full px-3 py-2 border rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed appearance-none bg-white';

    const errorStyles = error
      ? 'border-red-500 focus:ring-red-500'
      : 'border-gray-300 hover:border-gray-400';

    return (
      <div className={cn('flex flex-col gap-1', containerClassName)}>
        {label && (
          <label className="text-sm font-medium text-gray-700">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        <div className="relative">
          <select
            ref={ref}
            className={cn(baseStyles, errorStyles, className)}
            {...props}
          >
            <option value="">{placeholder}</option>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg
              className="fill-current h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>
        {error && <span className="text-sm text-red-600">{error}</span>}
        {helperText && !error && (
          <span className="text-sm text-gray-500">{helperText}</span>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';

export default Select;
