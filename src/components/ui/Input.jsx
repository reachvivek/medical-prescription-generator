import { forwardRef } from 'react';
import { cn } from '../../utils/helpers';

const Input = forwardRef(
  (
    {
      label,
      error,
      helperText,
      className = '',
      containerClassName = '',
      type = 'text',
      required = false,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'w-full px-3 py-2 border rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed';

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
        <input
          ref={ref}
          type={type}
          className={cn(baseStyles, errorStyles, className)}
          {...props}
        />
        {error && <span className="text-sm text-red-600">{error}</span>}
        {helperText && !error && (
          <span className="text-sm text-gray-500">{helperText}</span>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
