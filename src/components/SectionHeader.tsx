import type { ReactNode } from "react";

type SectionHeaderProps = {
  title: string;
  subheading: string;
  titleId: string;
  children?: ReactNode;
};

export function SectionHeader({
  title,
  subheading,
  titleId,
  children,
}: SectionHeaderProps) {
  return (
    <div className="flex flex-col items-center gap-8 text-center">
      <div className="flex max-w-hero-text flex-col items-center gap-2">
        <h2 id={titleId} className="section-title">
          {title}
        </h2>
        <p className="subtitle text-text-secondary">{subheading}</p>
      </div>
      {children}
    </div>
  );
}
