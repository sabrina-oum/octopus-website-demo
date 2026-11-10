import Image from "next/image";
import Link from "next/link";
import { useId } from "react";
import { cx } from "@/lib/cx";
import {
  categoryLinks,
  learnLinks,
  legalLink,
  type NavLink,
} from "@/navigation";

const focusRingClasses =
  "rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white";

const linkClasses = cx(
  "block w-fit text-cta font-medium text-trim-cap underline-offset-4 hover:underline",
  focusRingClasses,
);

type FooterColumnProps = {
  title: string;
  links: readonly NavLink[];
  listClassName: string;
};

function FooterColumn({ title, links, listClassName }: FooterColumnProps) {
  const titleId = useId();

  return (
    <div className="flex flex-col gap-10 tablet:gap-8">
      <h2 id={titleId} className="text-body font-bold">
        {title}
      </h2>
      <ul aria-labelledby={titleId} className={cx("grid gap-6", listClassName)}>
        {links.map((link) => (
          <li key={link.label}>
            <Link href={link.href} className={linkClasses}>
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="bg-footer text-white">
      <div className="page-container flex flex-col gap-12 pt-12 pb-6 desktop:gap-15 desktop:pt-15">
        <div className="flex flex-col gap-12 tablet:flex-row tablet:items-start tablet:justify-between">
          <Link
            href="/"
            aria-label="Octopus home"
            className={cx("self-start", focusRingClasses)}
          >
            <Image
              src="/images/logos/octopus-stacked-white.svg"
              alt=""
              width={100}
              height={105}
              unoptimized
            />
          </Link>
          <nav
            aria-label="Footer"
            className="flex flex-col gap-12 tablet:flex-row tablet:gap-15"
          >
            <FooterColumn
              title="Our Products"
              links={categoryLinks}
              listClassName="tablet:auto-cols-(--spacing-footer-column) tablet:grid-flow-col tablet:grid-rows-2 tablet:gap-x-6 tablet:gap-y-4"
            />
            <FooterColumn
              title="Learn"
              links={learnLinks}
              listClassName="tablet:w-footer-column tablet:gap-4"
            />
          </nav>
        </div>
        <div className="flex flex-col gap-4 text-label font-book tablet:flex-row tablet:justify-between">
          <p>Copyright {new Date().getFullYear()} Octopus - All rights reserved</p>
          <Link
            href={legalLink.href}
            className={cx(
              "w-fit underline-offset-4 hover:underline",
              focusRingClasses,
            )}
          >
            {legalLink.label}
          </Link>
        </div>
      </div>
    </footer>
  );
}
