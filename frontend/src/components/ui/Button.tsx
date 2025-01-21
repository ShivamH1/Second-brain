import { ReactElement } from 'react';

interface ButtonProps {
  variant: 'primary' | 'secondary';
  text: string;
  // size: 'sm' | 'md' | 'lg';
  startIcon?: ReactElement;
  endIcon?: ReactElement;
}

const variantClasses = {
  primary: 'bg-purple-600 text-white hover:bg-purple-700',
  secondary: 'bg-purple-300 text-purple-600 hover:bg-purple-300',
};

// const sizeClasses = {
//   sm: 'text-xs p-2 rounded-sm',
//   md: 'text-base p-3 rounded-md',
//   lg: 'text-lg p-4 rounded-lg',
// };

const defaultStyle = "px-4 py-2 rounded-md font-light flex items-center"

function Button({
  variant,
  text,
  // size,
  startIcon,
  endIcon,
}: ButtonProps) {
  return (
    <button
      type="button"
      className={`${variantClasses[variant]} ${defaultStyle}`}
    >
      <div className='pr-2'>{startIcon}</div>
      {text}
    </button>
  );
}

export default Button;

