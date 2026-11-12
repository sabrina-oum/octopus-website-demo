import Image from "next/image";
import Link from "next/link";
import type { ComponentProps } from "react";
import { cx } from "@/lib/cx";

type HeaderLogoLinkProps = Omit<
  ComponentProps<typeof Link>,
  "href" | "children"
>;

export function HeaderLogoLink({ className, ...props }: HeaderLogoLinkProps) {
  return (
    <Link
      href="/"
      aria-label="Octopus home"
      className={cx("focus-ring rounded-sm", className)}
      {...props}
    >
      <Image
        src="/images/logos/octopus-mark-red.svg"
        alt=""
        width={32}
        height={32}
        unoptimized
        loading="eager"
        className="tablet:hidden"
      />
      <Image
        src="/images/logos/octopus-wordmark-red.svg"
        alt=""
        width={108}
        height={32}
        unoptimized
        loading="eager"
        className="hidden tablet:block"
      />
    </Link>
  );
}
