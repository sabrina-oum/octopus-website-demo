import type { ReactNode } from "react";
import { cx } from "@/lib/cx";

type SectionHeaderProps = {
  title: string;
  subheading: string;
  titleId: string;
  children?: ReactNode;
  className?: string;
};

export function SectionHeader({
  title,
  subheading,
  titleId,
  children,
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cx("flex flex-col items-center gap-8 text-center", className)}
    >
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
