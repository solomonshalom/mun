import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HTMLAttributes } from "react";
import { cn } from "../lib/utils";

export interface BoothCardProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  description: string;
  members: string[];
  blurContent?: boolean;
  linkText?: string;
}

export default function BoothCard({
  title,
  description,
  members,
  className,
  blurContent = false,
  linkText,
  ...props
}: BoothCardProps) {
  const truncatedDescription =
    description.length > 300 ? description.slice(0, 300) + "..." : description;

  return (
    <div
      className={cn(
        "h-full flex flex-col",
        className,
        blurContent && "pointer-events-none select-none blur-sm"
      )}
      {...props}
    >
      <div className="transition-colors text-white max-w-md rounded mt-4 md:p-8 w-full flex flex-col flex-grow duration-300">
        <div className="flex-1">
          <h3
            className="text-[1.5rem] font-tiempos mb-2 text-white"
            style={{
              lineHeight: "1.15",
            }}
          >
            {title}
          </h3>
          <p className="mb-4 text-zinc-100">{members.join(", ")}</p>
          <p className="text-sm text-zinc-400">{truncatedDescription}</p>
        </div>

        <div className="mt-4">
          {linkText && (
            <div className="min-h-[40px]">
              <Accordion type="single" collapsible>
                <AccordionItem value="links" className="border-zinc-800">
                  <AccordionTrigger className="text-xs text-zinc-400 py-2 cursor-pointer">
                    Links
                  </AccordionTrigger>
                  <AccordionContent className="text-xs text-zinc-400 flex flex-col items-start pt-2">
                    {linkText}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
