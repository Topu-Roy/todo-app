import { memo } from "react";
import { cn } from "../lib/cn";

type ButtonProps = {
  tooltipText: string;
  actionFunction: () => void;
  icon: JSX.Element;
  className?: string;
};

const CustomButton = memo(function CustomButton({
  actionFunction,
  tooltipText,
  icon,
  className = "",
}: ButtonProps) {
  return (
    <button
      onClick={actionFunction}
      className={cn(
        "tooltip inline-flex size-12 items-center justify-center rounded-full font-semibold transition-all active:scale-105",
        className,
      )}
    >
      <span className="tooltiptext">{tooltipText}</span>
      {icon}
    </button>
  );
});

export default CustomButton;
