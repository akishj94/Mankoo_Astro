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
      heroMedia {
        image {
          alt,
          "asset": asset-> {
            _id,
            url,
            metadata {
              dimensions,
              lqip
            }
          }
        },
        video {
          "asset": asset-> {
            _id,
            url,
            originalFilename,
            mimeType
          }
        }
      },

      primaryCta {
        // LINK RESOLVER: return the linkObject shape that getLinkUrl() in lib/links.ts expects
        "link": link {
          label,
          linkType,
          externalUrl,
          openInNewTab,
          "internalLink": internalLink->{
            _type,
            "slug": slug.current,
            isHomepage
          }
        }
        // PREVIOUS (flat shape, not resolver compatible):
        // "label": link.label, "linkType": link.linkType,
        // "href": link.internalLink->slug.current,
        // "url": link.externalUrl, "openInNewTab": link.openInNewTab
      }
    },
    _type == "featureHighlightsSection" => {
        heading,
        items[] {
          _key,
          title
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
    _type == "testimonialSection" => {
        quote,
        clientName,
        role,
        company,
        location,

        companyLogo {
          alt,
          "asset": asset-> {
            _id,
            url
          }
        },

        portrait {
          alt,
          "asset": asset-> {
            _id,
            url
          }
        }
      },
      
      _type == "featuredProductSection" => {
        eyebrow,
        heading,
        description,
        "backgroundImage": backgroundImage {
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
        specifications[] {
          _key,
          label,
          value
        },
        cta {
          // LINK RESOLVER: return the linkObject shape that getLinkUrl() in lib/links.ts expects
          "link": link {
            label,
            linkType,
            externalUrl,
            openInNewTab,
            "internalLink": internalLink->{
              _type,
              "slug": slug.current,
              isHomepage
            }
          }
          // PREVIOUS (flat shape, not resolver compatible):
          // "label": link.label, "linkType": link.linkType,
          // "href": link.internalLink->slug.current,
          // "url": link.externalUrl, "openInNewTab": link.openInNewTab
        }
      },
    _type == "imageTransitionSection" => {
        eyebrow,
        heading,
        interval,
        "slides": slides[]{
          _key,
          title,
          description,
          "image": image.asset->{
            _id,
            url,
            metadata {
              dimensions,
              lqip
            }
          },
          "imageAlt": image.alt
        }
      },
      _type == "productSliderSection" => {
          _key,
          _type,
          eyebrow,
          heading,
          "products": products[]->{
            _id,
            name,
            shortDescription,
            "slug": slug.current,
            "featuredImage": featuredImage {
              alt,
              "url": asset->url,
              "dimensions": asset->metadata.dimensions,
              "lqip": asset->metadata.lqip
            }
          }
        },
    _type == "splitGridSection" => {
      introText,
      highlightText,
      statistic,
      statisticLabel,
      link {
        // LINK RESOLVER: return the linkObject shape that getLinkUrl() in lib/links.ts expects
        "link": link {
          label,
          linkType,
          externalUrl,
          openInNewTab,
          "internalLink": internalLink->{
            _type,
            "slug": slug.current,
            isHomepage
          }
        }
        // PREVIOUS (flat shape, not resolver compatible):
        // "label": link.label, "linkType": link.linkType,
        // "href": link.internalLink->slug.current,
        // "url": link.externalUrl, "openInNewTab": link.openInNewTab
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
export const aboutpageQuery = `*[
  _type == "page" &&
  slug.current in ["about", "about-us", "our-story"]
][0] {
  title,
  "slug": slug.current,

  sections[] {
    _type,
    _key,
    _type == "teamSection" => {
      _key,
      _type,
      eyebrow,
      heading,
      "members": members[] {
        _key,
        name,
        role,
        linkedinUrl,
        "image": image {
          alt,
          "url": asset->url,
          "dimensions": asset->metadata.dimensions,
          "lqip": asset->metadata.lqip
        }
      },
      "cta": cta {
        label,
        linkType,
        externalUrl,
        openInNewTab,
        "internalLink": internalLink->{
          _type,
          title,
          name,
          "slug": slug.current,
          isHomepage
        }
      }
    },
    _type == "pageIntro" => {
      _key,
      _type,
      eyebrow,
      heading,
      description,
      introMedia{
        image {
            alt,
            "asset": asset-> {
              _id,
              url,
              metadata {
                dimensions,
                lqip
              }
            }
          },
          video {
            "asset": asset-> {
              _id,
              url,
              originalFilename,
              mimeType
            }
          }
      }
    },
    _type == "mediaBlock" => {
        _key,
        _type,
        video {
          "asset": asset-> {
            _id,
            url,
            originalFilename,
            mimeType
          }
        },
        image {
          alt,
          "asset": asset-> {
            _id,
            url,
            metadata {
              dimensions {
                width,
                height,
                aspectRatio
              },
              lqip
            }
          }
        },
        imageAlt
      },
    _type == "splitGridSection" => {
      introText,
      highlightText,
      statistic,
      statisticLabel,
      link {
        // LINK RESOLVER: return the linkObject shape that getLinkUrl() in lib/links.ts expects
        "link": link {
          label,
          linkType,
          externalUrl,
          openInNewTab,
          "internalLink": internalLink->{
            _type,
            "slug": slug.current,
            isHomepage
          }
        }
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
    },
    _type == "ctaBannerSection" => {
        heading,
        description,
        cta {
          link {
            label,
            linkType,
            externalUrl,
            openInNewTab,
            "internalLink": internalLink->{
              _type,
              "slug": slug.current,
              isHomepage
            }
          }
        },
        backgroundImage {
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
      },
    _type == "timelineSection" => {
      eyebrow,
      heading,
      addPlaceholderData,
      items[] {
        _key,
        year,
        title,
        content
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


export const contactpageQuery = `*[
  _type == "page" &&
  slug.current in ["contact", "contact-us"]
][0] {
  title,
  "slug": slug.current,

  sections[] {
    _type,
    _key,

    _type == "pageIntro" => {
      _key,
      _type,
      eyebrow,
      heading,
      description,
      introMedia {
        image {
          alt,
          "asset": asset-> {
            _id,
            url,
            metadata {
              dimensions,
              lqip
            }
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
  "footerLogoAlt": footerLogoAlt,

  whatsAppLink,

  footerNavigation[] {
  _key,
  title,
  menuType,
  "links": links[] {
    _key,
    "link": link {
      label,
      linkType,
      externalUrl,
      openInNewTab,
      "internalLink": internalLink->{
        _type,
        "slug": slug.current,
        isHomepage
      }
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
  map,
  copyrightText,

  "legalLinks": legalLinks[] {
    _key,
    "link": link {
      label,
      linkType,
      externalUrl,
      openInNewTab,
      "internalLink": internalLink->{
        _type,
        "slug": slug.current,
        isHomepage
      }
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
      backgroundVideo {
        image {
          alt,
          "asset": asset-> {
            _id,
            url,
            metadata {
              dimensions,
              lqip
            }
          }
        },
        video {
          "asset": asset-> {
            _id,
            url,
            originalFilename,
            mimeType
          }
        }
      },
      "primaryCta": primaryCta {
        label,
        linkType,
        externalUrl,
        openInNewTab,
        "internalLink": internalLink->{
          _type,
          name,
          title,
          "slug": slug.current,
          isHomepage
        }
      }
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

  // Blocks 5 and 6: Feature blocks
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

  // Block 7: Interactive Showcase
  interactiveShowcase {
      heading,
      tagline,
      slides[] {
        _key,
        title,
        lead,
        copy,
        image {
          alt,
          "url": asset->url,
          "dimensions": asset->metadata.dimensions,
          "lqip": asset->metadata.lqip
        }
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
    description,
    cta {
      link {
        label,
        linkType,
        externalUrl,
        openInNewTab,
        "internalLink": internalLink->{
          _type,
          "slug": slug.current,
          isHomepage
        }
      }
    },
    backgroundImage {
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