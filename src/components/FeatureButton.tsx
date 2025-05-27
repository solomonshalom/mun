import { Button } from "@/components/ui/button";
import { ReactNode } from "react";

interface FeatureButtonProps {
  icon: ReactNode;
  children: ReactNode;
}

export default function FeatureButton({ icon, children }: FeatureButtonProps) {
  return (
    <Button className="bg-black/50 backdrop-blur-sm border border-white/10 text-white rounded-none py-6 flex items-center gap-2 hover:bg-black/70 hover:border-white/20 shadow-[0_0_10px_rgba(255,255,255,0.1)]">
      {icon}
      {children}
    </Button>
  );
}
