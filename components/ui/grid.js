import { cn } from "@/lib/utils";
import { Award, LayoutTemplateIcon } from "lucide-react";

export function FeaturesSectionDemo() {
  const features = [
    {
      title: "Competetions",
      description:
        "Competetions are Competetions are the best way to test your friends' skills. Make a competetion and make your friends compete. You will be the judge!",
      icon: <Award />,
    },
    {
        title: "Centralized Blog Viewing Area",
        description:
          `                In the modern digital landscape, consuming content is easier
                than ever, but finding relevant, high-quality blogs remains a
                challenge. Many users struggle with scattered content across
                multiple platforms, leading to a fragmented reading experience.
                A centralized blog viewing system solves this problem by
                offering a unified space where users can explore, engage, and
                interact with blogs efficiently.`,
        icon: <LayoutTemplateIcon />,
      },
      {
        title: "Socialize",
        description:
          `Like somebody's work? Follow them! You can also comment and like on each others' posts.`,
        icon: <LayoutTemplateIcon />,
      }
  ];
  return (
    <div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  relative z-10 py-10 max-w-fit mx-auto">
      {features.map((feature, index) => (
        <Feature key={feature.title} {...feature} index={index} />
      ))}
    </div>
  );
}

const Feature = ({
  title,
  description,
  icon,
  index
}) => {
  return (
    <div
      className={cn(
        "select-none flex flex-col lg:border-r  py-10 relative group/feature dark:border-neutral-800",
        (index === 0 || index === 4) && "lg:border-l dark:border-neutral-800",
        index < 4 && "lg:border-b dark:border-neutral-800"
      )}>
      {index < 4 && (
        <div
          className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}
      {index >= 4 && (
        <div
          className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}
      <div
        className="mb-4 relative z-10 px-10 text-neutral-600 dark:text-neutral-400">
        {icon}
      </div>
      <div className="text-lg font-bold mb-2 relative z-10 px-10">
        <div
          className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-300 dark:bg-neutral-700 group-hover/feature:bg-blue-500 transition-all duration-200 origin-center" />
        <span
          className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-neutral-800 dark:text-neutral-100">
          {title}
        </span>
      </div>
      <p
        className="text-sm text-neutral-600 dark:text-neutral-300 max-w-fit relative z-10 px-10">
        {description}
      </p>
    </div>
  );
};
