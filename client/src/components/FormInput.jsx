import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

const FormInput = ({ 
  label, 
  name, 
  type = 'text', 
  register, 
  error, 
  className = '',
  ...props 
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';

  const getInputStyles = () => {
    const baseStyles = 'w-full px-4 py-2 rounded-lg bg-white/70 backdrop-blur-sm border transition-all duration-200 focus:outline-none focus:ring-2';
    if (error) {
      return `${baseStyles} border-red-500 focus:ring-red-500`;
    }
    return `${baseStyles} border-gray-200 focus:ring-blue-500 focus:border-blue-500`;
  };

  return (
    <div className={`space-y-1 ${className}`}>
      <label className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="relative">
        <input
          type={isPassword && showPassword ? 'text' : type}
          {...register(name)}
          className={getInputStyles()}
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        )}
      </div>
      {error && (
        <p className="text-sm text-red-500 mt-1">{error.message}</p>
      )}
    </div>
  );
};

export default FormInput;
