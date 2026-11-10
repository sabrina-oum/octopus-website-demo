"use client";

import * as Dialog from "@radix-ui/react-dialog";
import Link from "next/link";
import { useEffect, useState } from "react";
import { breakpointMedia } from "@/lib/breakpoints";
import { cx } from "@/lib/cx";
import type { NavLink } from "@/navigation";
import { Button, ButtonLink, ghostTextClasses } from "./Button";
import { HeaderLogoLink } from "./HeaderLogoLink";
import { Icon } from "./Icon";

type MobileMenuProps = {
  links: readonly NavLink[];
  cta: NavLink;
};

export function MobileMenu({ links, cta }: MobileMenuProps) {
  const [open, setOpen] = useState(false);

  // The menu is hidden on desktop, so close it if the window widens.
  useEffect(() => {
    if (!open) {
      return;
    }

    const desktop = window.matchMedia(breakpointMedia.desktop);
    const closeOnDesktop = () => {
      if (desktop.matches) {
        setOpen(false);
      }
    };

    desktop.addEventListener("change", closeOnDesktop);

    return () => desktop.removeEventListener("change", closeOnDesktop);
  }, [open]);

  const closeMenu = () => setOpen(false);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <Button variant="ghost" iconOnly aria-label="Open menu">
          <Icon name="hamburger" />
        </Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 desktop:hidden" />
        <Dialog.Content
          aria-describedby={undefined}
          className="navbar-surface fixed inset-x-page-mobile top-navbar-offset z-50 flex flex-col gap-4 tablet:inset-x-page-tablet desktop:hidden"
        >
          <Dialog.Title className="sr-only">Menu</Dialog.Title>
          <div className="flex min-h-navbar-row items-center justify-between">
            <HeaderLogoLink onClick={closeMenu} />
            <Dialog.Close asChild>
              <Button variant="ghost" iconOnly aria-label="Close menu">
                <Icon name="close" />
              </Button>
            </Dialog.Close>
          </div>
          <nav aria-label="Main">
            <ul className="flex flex-col gap-2">
              {links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    onClick={closeMenu}
                    className={cx(
                      "focus-ring flex h-menu-link items-center rounded-button text-cta font-medium transition-colors",
                      ghostTextClasses,
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <ButtonLink
                  href={cta.href}
                  onClick={closeMenu}
                  className="w-full"
                >
                  {cta.label}
                </ButtonLink>
              </li>
            </ul>
          </nav>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
