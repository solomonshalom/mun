import { ArrowUpRight } from "lucide-react";
import posthog from "posthog-js";

interface Props {
  title: string;
  description?: string;
  url: string;
}

export const InfoLink = ({ title, description, url }: Props) => {
  const handleClick = () => {
    posthog.capture("info_link_clicked", {
      title,
      url,
    });
  };

  return (
    <a
      href={url}
      target="_blank"
      className="px-4 py-4 hover:bg-white/5 transition-colors block w-full h-full rounded-sm"
      onClick={handleClick}
    >
      <h3 className="font-5by7 font-bold text-lg uppercase tracking-wide flex items-center text-white">
        {title}{" "}
        <span className="ml-2">
          <ArrowUpRight className="size-4" />
        </span>
      </h3>
      {description && (
        <p className="text-zinc-500 uppercase font-bold text-sm font-5by7 mt-0.5 tracking-wide">
          {description}
        </p>
      )}
    </a>
  );
};
