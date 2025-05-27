import BlueGuy from "@/components/svg/blueguy.svg";
import { ExternalLink } from "lucide-react";
import { HTMLAttributes } from "react";
import { cn } from "../lib/utils";

export interface DemoCardProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  author: string;
  description: string;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  href: string;
  blurContent?: boolean;
}

export default function DemoCard({
  title,
  author,
  description,
  href,
  icon: Icon = BlueGuy,
  className,
  blurContent,
  ...props
}: DemoCardProps) {
  const domain = href ? new URL(href).hostname.replace(/^www\./, "") : "";

  return (
    <div
      className={cn(
        "",
        className,
        blurContent && "pointer-events-none select-none blur-sm"
      )}
      {...props}
    >
      <a href={href} target="_blank" className="">
        <Icon className="w-28" />
      </a>

      <div className="text-white max-w-md rounded-lg mt-4 md:py-4">
        <a
          target="_blank"
          href={href}
          className="text-[1.7rem] font-tiempos mb-2 text-white block"
          style={{
            lineHeight: "1.15",
          }}
        >
          {title}
        </a>
        <p className="mb-4 text-zinc-100">{author}</p>
        <p className="text-sm text-zinc-400">{description}</p>
        <a
          href={href}
          target="_blank"
          className="flex items-center gap-2 mt-3 cursor-pointer"
        >
          <ExternalLink className="w-4 h-4" />
          <p className="text-sm text-zinc-400">{domain}</p>
        </a>
      </div>
    </div>
  );
}
