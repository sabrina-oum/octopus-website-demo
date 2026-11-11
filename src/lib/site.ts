export const siteName = "Octopus";

function vercelHost(): string | undefined {
  if (process.env.VERCEL_ENV === "production") {
    return process.env.VERCEL_PROJECT_PRODUCTION_URL;
  }

  return process.env.VERCEL_BRANCH_URL ?? process.env.VERCEL_URL;
}

/**
 * Absolute origin that Open Graph URLs resolve against: the production domain
 * in production, the deployment's own URL on Vercel previews, and the local
 * server anywhere else.
 */
export function getSiteUrl(): URL {
  const host = vercelHost();

  return new URL(
    host ? `https://${host}` : `http://localhost:${process.env.PORT ?? 3000}`,
  );
}
