
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
    _type == "newsSection" => {
  title,
  "posts": *[
    _type == "post" &&
    defined(publishedAt) &&
    publishedAt <= now() &&
    defined(slug.current)
  ] | order(publishedAt desc)[0...3] {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    publishedAt,
    "categories": categories[]->{
      title,
      "slug": slug.current
    },
    "image": featuredImage {
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
    metaKeywords,
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

  "footerLogoUrl": footerLogo.asset->url,
  "footerLogoAlt": FooterlogoAlt,

  whatsAppLink,

  footerNavigation[] {
    _key,
    title,
    menuType,
    links[] {
      _key,
      label,
      linkType,
      externalUrl,
      "internalLink": internalLink->{
        _type,
        "slug": slug.current
      }
    }
  },

  socialLinks[] {
    _key,
    label,
    url
  },

  email,
  phone,
  address,

  copyrightText,

  legalLinks[] {
    _key,
    label,
    "internalLink": internalLink->{
      _type,
      "slug": slug.current
    }
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
metaKeywords,
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
    primaryCtaLinkType,
    primaryCtaInternalLink->{
      _type,
      name,
      title,
      slug
    },
    primaryCtaExternalUrl,
    brochureCtaLabel
  },

  "brochures": brochures[] {
    _key,
    label,
    "file": file {
      "asset": asset-> {
        _id,
        url,
        originalFilename,
        mimeType
      }
    }
  },

  downloads {
    foundationDrawingLabel,
    foundationDrawingUrl
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

  // Blocks 5â€“6: Feature blocks
  featureBlocks[] {
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
  featured,
  displayOrder,

  // SEO
  seo {
    metaTitle,
    metaDescription,
metaKeywords,
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


/* All product slugs â€” used by Astro getStaticPaths() */
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
   Blog listing page settings
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
    metaKeywords,
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
   Blog listing: published post count
   GROQ excludes drafts from normal queries by default.
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
  featuredImage {
    alt,
    "url": asset->url
  },
  categories[]-> {
    _id,
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
  updatedAt,

  featuredImage {
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
      "dimensions": asset->metadata.dimensions,
      "lqip": asset->metadata.lqip
    },
    markDefs[] {
      ...,
      _type == "link" => {
        ...,
        href,
        blank
      }
    }
  },

  categories[]-> {
    _id,
    title,
    "slug": slug.current
  },

  tags,

  relatedProducts[]-> {
    _id,
    name,
    "slug": slug.current,
    shortDescription,
    "image": featuredImage {
      alt,
      "url": asset->url
    }
  },

  seo {
    metaTitle,
    metaDescription,
    metaKeywords,
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
   All published blog slugs
   Used by Astro getStaticPaths()
-------------------------------------------------- */

export const allBlogSlugsQuery = `*[
  _type == "post" &&
  defined(slug.current)
] {
  "slug": slug.current
}`;