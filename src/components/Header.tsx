import { categoryLinks, whereToBuyLink } from "@/navigation";
import { ButtonLink } from "./Button";
import { HeaderLogoLink } from "./HeaderLogoLink";
import { MobileMenu } from "./MobileMenu";

export function Header() {
  return (
    <header className="page-container pointer-events-none sticky top-0 z-40 py-navbar-offset">
      <div className="navbar-surface pointer-events-auto flex min-h-navbar items-center justify-between desktop:py-3 desktop:pr-3 desktop:pl-5">
        <HeaderLogoLink />
        <nav aria-label="Main" className="hidden desktop:block">
          <ul className="flex items-center gap-2">
            {categoryLinks.map((link) => (
              <li key={link.label}>
                <ButtonLink variant="ghost" href={link.href}>
                  {link.label}
                </ButtonLink>
              </li>
            ))}
            <li>
              <ButtonLink href={whereToBuyLink.href}>
                {whereToBuyLink.label}
              </ButtonLink>
            </li>
          </ul>
        </nav>
        <div className="desktop:hidden">
          <MobileMenu links={categoryLinks} cta={whereToBuyLink} />
        </div>
      </div>
    </header>
  );
}
