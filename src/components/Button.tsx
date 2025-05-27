import { HTMLAttributes, ReactNode } from "react";
import { cn } from "../lib/utils";

interface ButtonProps extends HTMLAttributes<HTMLDivElement> {
  icon?: ReactNode;
  text: string;
}

export const Button = ({ icon, text, className, ...props }: ButtonProps) => {
  return (
    <div
      className={cn(
        "glassmorphic-button border-[1px] border-[#FFFFFF52] bg-zinc-950 gap-3 justify-center px-12",
        className
      )}
      {...props}
    >
      {icon}
      <div className="text-[#F5F1E2] tracking-widest font-5by7 font-bold uppercase text-[11px] sm:text-[16px]">
        {text}
      </div>
    </div>
  );
};
