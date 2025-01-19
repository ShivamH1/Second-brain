import { ReactElement } from "react";

interface ButtonInterface {
  title: string;
  size: "lg" | "md" | "sm";
  variant: "primary" | "secondary";
  startIcon?: ReactElement;
  endIcon?: ReactElement;
}

const sizeStyle = {
  lg: "px-8 py-4 text-xl rounded-lg",
  md: "px-6 py-3 text-base rounded-md",
  sm: "px-4 py-2 text-sm rounded-sm",
};

const variantStyle = {
  primary: "bg-purple-600 text-white",
  secondary: "bg-purple-400 text-purple-600",
};

export function Button(props: ButtonInterface) {
  return (
    <button
      className={`${sizeStyle[props.size]} ${variantStyle[props.variant]}`}
    >
      <div className="flex items-center gap-2">
        <span className="text-xs">{props.startIcon}</span>
        <span className="pl-2 pr-2">{props.title}</span>
        <span className="text-xs">{props.endIcon}</span>
      </div>
    </button>
  );
}
