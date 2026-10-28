
/* --------------------------------------------------
   Homepage query
-------------------------------------------------- */

export const homepageQuery = `*[
  _type == "page" &&
  isHomepage == true
][0] {
  title,
  "slug": slug.current,
  sections[] {
    _type,
    _key,

    _type == "heroSection" => {
      eyebrow,
      heading,
      imageAlt,
      "image": image.asset->{
        _id,
        url,
        metadata {
          dimensions,
          lqip
        }
      },
      "videoUrl": video.asset->url,
      primaryCta {
        label,
        linkType,
        "href": href->slug.current,
        url,
        openInNewTab
      }
    },

    _type == "splitGridSection" => {
      introText,
      highlightText,
      statistic,
      statisticLabel,
      link {
        label,
        linkType,
        "href": href->slug.current,
        url,
        openInNewTab
      },
      smallImage {
        alt,
        "asset": asset->{
          _id,
          url,
          metadata {
            dimensions,
            lqip
          }
        }
      },
      largeImage {
        alt,
        "asset": asset->{
          _id,
          url,
          metadata {
            dimensions,
            lqip
          }
        }
      }
    }
  },
  seo {
    metaTitle,
    metaDescription,
    ogTitle,
    ogDescription,
    ogImage {
      alt,
      "url": asset->url
    },
    canonicalUrl,
    noIndex
  }
}`;


/* --------------------------------------------------
   Site settings query
   Default SEO fallback
-------------------------------------------------- */

export const siteSettingsQuery = `*[
  _type == "siteSettings"
][0] {
  siteName,
  "logoUrl": logo.asset->url,
  logoAlt,
  defaultSeo {
    metaTitle,
    metaDescription,
    ogTitle,
    ogDescription,
    ogImage {
      alt,
      "url": asset->url
    },
    canonicalUrl,
    noIndex
  }
}`;


/* --------------------------------------------------
   Products listing page
-------------------------------------------------- */

export const productsListingPageQuery = `*[
  _type == "page" &&
  pageType == "productsListing" &&
  slug.current == "products"
][0] {
  title,
  "slug": slug.current,
  listingTitle,
  listingDescription,
  itemsPerPage,
  seo {
    metaTitle,
    metaDescription,
    ogTitle,
    ogDescription,
    ogImage {
      alt,
      "url": asset->url
    },
    canonicalUrl,
    noIndex
  }
}`;


/* --------------------------------------------------
   Products listing: total count
-------------------------------------------------- */

export const productsCountQuery = `count(
  *[
    _type == "product" &&
    defined(slug.current)
  ]
)`;


/* --------------------------------------------------
   Products listing: paginated products
-------------------------------------------------- */

export const paginatedProductsQuery = `*[
  _type == "product" &&
  defined(slug.current)
] | order(displayOrder asc, name asc) [$start...$end] {
  _id,
  name,
  "slug": slug.current,
  shortDescription,
  "cover_image": featuredImage.asset->url,
  "cover_alt": featuredImage.alt
}`;


/* Single product page */
export const productBySlugQuery = `*[
  _type == "product" &&
  slug.current == $slug
][0] {
  _id,
  name,
  "slug": slug.current,
  shortDescription,

  // Basic information
  featuredImage {
    alt,
    "url": asset->url,
    "dimensions": asset->metadata.dimensions,
    "lqip": asset->metadata.lqip
  },

  // Block 1: Hero
  hero {
    eyebrow,
    heading,
    tagline,
    subLine,
    "backgroundVideo": backgroundVideo.asset->url,
    primaryCtaLabel,
    primaryCtaUrl,
    brochureCtaLabel
  },

  // Block 2: Pillar cards
  introText,
  highlightText,
  pillars[] {
    _key,
    heading,
    copy,
    image {
      alt,
      "url": asset->url,
      "dimensions": asset->metadata.dimensions,
      "lqip": asset->metadata.lqip
    }
  },

  // Block 3: Product stats / engineering statement
  productStats {
    label,
    heading,
    copy,
    image {
      alt,
      "url": asset->url,
      "dimensions": asset->metadata.dimensions,
      "lqip": asset->metadata.lqip
    }
  },

  // Block 4: Key numbers
  keyNumbers[] {
    _key,
    label,
    value
  },

  // Blocks 5–6: Feature blocks
  featureBlocks[] {
    _key,
    featureType,
    heading,
    hook,
    copy,
    image {
      alt,
      "url": asset->url,
      "dimensions": asset->metadata.dimensions,
      "lqip": asset->metadata.lqip
    }
  },

  // Block 7: Tonnage selector
  tonnageBands[] {
    _key,
    title,
    models,
    lead,
    copy,
    image {
      alt,
      "url": asset->url,
      "dimensions": asset->metadata.dimensions,
      "lqip": asset->metadata.lqip
    }
  },

  // Block 8: Applications carousel
  applications[] {
    _key,
    heading,
    copy,
    image {
      alt,
      "url": asset->url,
      "dimensions": asset->metadata.dimensions,
      "lqip": asset->metadata.lqip
    }
  },

  // Block 9: Technical specifications
  specifications {
  heading,
  subtitle,
  capacities[] {
    _key,
    modelName,
    keySpecifications[] {
      _key,
      label,
      unit,
      value
    },
    specificationGroups[] {
      _key,
      title,
      specifications[] {
        _key,
        label,
        unit,
        value
      }
    }
  }
},

  // Block 10: Downloads
  downloads {
    brochureLabel,
    foundationDrawingLabel,
    foundationDrawingUrl
  },

  // Block 10: Final CTA band
  finalCta {
    heading,
    copy,
    buttonLabel,
    buttonUrl,
    backgroundImage {
      alt,
      "url": asset->url,
      "dimensions": asset->metadata.dimensions,
      "lqip": asset->metadata.lqip
    }
  },

  // Existing product details
  description[] {
    ...,
    _type == "image" => {
      ...,
      "url": asset->url,
      "alt": alt,
      "dimensions": asset->metadata.dimensions,
      "lqip": asset->metadata.lqip
    }
  },

  brochures[] {
    _key,
    "url": asset->url,
    "filename": asset->originalFilename
  },

  featured,
  displayOrder,

  // SEO
  seo {
    metaTitle,
    metaDescription,
    ogTitle,
    ogDescription,
    ogImage {
      alt,
      "url": asset->url
    },
    canonicalUrl,
    noIndex
  }
}`;


/* All product slugs — used by Astro getStaticPaths() */
export const allProductSlugsQuery = `*[
  _type == "product" &&
  defined(slug.current)
] {
  "slug": slug.current
}`;


/* --------------------------------------------------
   All products
   Retained for existing code that uses this query
-------------------------------------------------- */

export const allProductsQuery = `*[
  _type == "product" &&
  defined(slug.current)
] {
  _id,
  name,
  "slug": slug.current,
  "cover_image": featuredImage.asset->url,
  "cover_alt": featuredImage.alt,
  shortDescription,
  title,
  excerpt
}`;


/* --------------------------------------------------
   Blog listing page
-------------------------------------------------- */

export const blogListingPageQuery = `*[
  _type == "page" &&
  pageType == "blogListing" &&
  slug.current == "blog"
][0] {
  title,
  "slug": slug.current,
  listingTitle,
  listingDescription,
  itemsPerPage,
  seo {
    metaTitle,
    metaDescription,
    ogTitle,
    ogDescription,
    ogImage {
      alt,
      "url": asset->url
    },
    canonicalUrl,
    noIndex
  }
}`;


/* --------------------------------------------------
   Blog listing: total post count
-------------------------------------------------- */

export const blogPostsCountQuery = `count(
  *[
    _type == "post" &&
    defined(slug.current)
  ]
)`;


/* --------------------------------------------------
   Blog listing: paginated posts
-------------------------------------------------- */

export const paginatedBlogPostsQuery = `*[
  _type == "post" &&
  defined(slug.current)
] | order(publishedAt desc, _createdAt desc) [$start...$end] {
  _id,
  title,
  "slug": slug.current,
  excerpt,
  publishedAt,
  mainImage {
    alt,
    "url": asset->url
  },
  categories[]-> {
    title,
    "slug": slug.current
  }
}`;


/* --------------------------------------------------
   Single blog post
-------------------------------------------------- */

export const blogPostBySlugQuery = `*[
  _type == "post" &&
  slug.current == $slug
][0] {
  _id,
  title,
  "slug": slug.current,
  excerpt,
  publishedAt,

  author-> {
    name,
    "image": image.asset->url
  },

  mainImage {
    alt,
    "url": asset->url,
    "dimensions": asset->metadata.dimensions,
    "lqip": asset->metadata.lqip
  },

  body[] {
    ...,
    _type == "image" => {
      ...,
      "url": asset->url,
      "alt": alt
    },
    markDefs[] {
      ...,
      _type == "internalLink" => {
        ...,
        "slug": reference->slug.current
      }
    }
  },

  categories[]-> {
    title,
    "slug": slug.current
  },

  seo {
    metaTitle,
    metaDescription,
    ogTitle,
    ogDescription,
    ogImage {
      alt,
      "url": asset->url
    },
    canonicalUrl,
    noIndex
  }
}`;


/* --------------------------------------------------
   All blog slugs
   Used for static route generation
-------------------------------------------------- */

export const allBlogSlugsQuery = `*[
  _type == "post" &&
  defined(slug.current)
] {
  "slug": slug.current
}`;
