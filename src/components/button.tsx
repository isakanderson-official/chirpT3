import React, { MouseEventHandler, ReactNode } from "react";

const Button: React.FC<{
  children?: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  className?: string;
}> = ({ children, ...props }) => {
  return (
    <button
      className="rounded-md bg-slate-800 px-4 py-2 font-semibold"
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
