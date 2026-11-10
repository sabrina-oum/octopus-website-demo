export const comingSoonPath = "/coming-soon";

export type NavLink = {
  label: string;
  href: string;
};

export const categoryLinks: readonly NavLink[] = [
  { label: "Kitchen", href: comingSoonPath },
  { label: "Home Security", href: comingSoonPath },
  { label: "Hair Care", href: comingSoonPath },
  { label: "Accessories", href: comingSoonPath },
];

export const whereToBuyLink: NavLink = {
  label: "Where to buy",
  href: comingSoonPath,
};

export const learnLinks: readonly NavLink[] = [
  whereToBuyLink,
  { label: "Contact us", href: comingSoonPath },
];

export const legalLink: NavLink = {
  label: "Policies & Terms",
  href: comingSoonPath,
};
