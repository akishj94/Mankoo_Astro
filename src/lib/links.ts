export type SanityInternalReference = {
  _type?: string;
  slug?: string | { current?: string } | null;
  isHomepage?: boolean;
};

export type SanityLinkObject = {
  label?: string;
  linkType?: "internal" | "external";
  externalUrl?: string | null;
  internalLink?: SanityInternalReference | null;
  openInNewTab?: boolean;
};

function getSlug(ref?: SanityInternalReference | null): string {
  if (!ref?.slug) return "";

  return typeof ref.slug === "string"
    ? ref.slug
    : ref.slug.current ?? "";
}

/**
 * Resolves a Sanity document reference to its frontend URL.
 */
export function getInternalUrl(
  ref?: SanityInternalReference | null
): string | undefined {
  if (!ref) return undefined;

  const slug = getSlug(ref);

  if (!slug) return undefined;

  switch (ref._type) {
    case "product":
      return `/product/${slug}`;

    case "post":
      return `/blog/${slug}`;

    case "page":
      return ref.isHomepage || slug === "home" ? "/" : `/${slug}`;

    default:
      return undefined;
  }
}

/**
 * Resolves a reusable Sanity linkObject to its frontend URL.
 */
export function getLinkUrl(
  link?: SanityLinkObject | null
): string | undefined {
  if (!link) return undefined;

  if (link.linkType === "external") {
    return link.externalUrl?.trim() || undefined;
  }

  if (link.linkType === "internal") {
    return getInternalUrl(link.internalLink);
  }

  return undefined;
}