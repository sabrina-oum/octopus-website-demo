import type { Metadata } from "next";
import { ButtonLink } from "@/components/Button";

export const metadata: Metadata = {
  title: "Coming soon",
  description: "This page of the Octopus demo is not built yet.",
  robots: { index: false },
};

export default function ComingSoonPage() {
  return (
    <main className="page-container flex flex-col items-center gap-6 py-20 text-center desktop:py-30">
      <h1 className="heading-1">Coming soon</h1>
      <p className="subtitle max-w-xl text-text-secondary">
        This page is not part of the demo yet. The homepage and the Countertop
        Blender page are ready to explore.
      </p>
      <ButtonLink href="/">Back to homepage</ButtonLink>
    </main>
  );
}
