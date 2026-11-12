export const siteName = "Octopus";

function vercelHost(): string | undefined {
  if (process.env.VERCEL_ENV === "production") {
    return process.env.VERCEL_PROJECT_PRODUCTION_URL;
  }

  return process.env.VERCEL_BRANCH_URL ?? process.env.VERCEL_URL;
}

/** Origin for Open Graph URLs: production domain, Vercel preview, or localhost. */
export function getSiteUrl(): URL {
  const host = vercelHost();

  return new URL(
    host ? `https://${host}` : `http://localhost:${process.env.PORT ?? 3000}`,
  );
}
