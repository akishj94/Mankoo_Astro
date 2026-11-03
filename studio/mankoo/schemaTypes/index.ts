
import { seo } from "./objects/seo";
import { navigationItem } from "./objects/navigationItem";
import { linkObject } from "./objects/linkObject";
import { productSpecifications } from './objects/productSpecifications';
import {
  cta,
  specification,
  heroSection,
  richTextSection,
  mediaBlock,
  featureGridSection,
  productGridSection,
  gallerySection,
  ctaBannerSection,
  pageSections,
  splitGridSection,
  newsSection,
  testimonialSection,
  featuredProductSection,
  featureHighlightsSection,
  imageTransitionSection,
  productSliderSection,
  timelineSection,
} from "./objects/pageSections";

import { siteSettings } from "./documents/siteSettings";
import { page } from "./documents/page";
import { product } from "./documents/product";

import { post } from "./documents/post";
// import { productCategory } from "./documents/productCategory";
import { blogCategory } from "./documents/blogCategory";

import { redirect } from "./documents/redirect";

export const schemaTypes = [
  // Shared objects
  seo,
  navigationItem,
  linkObject,
  cta,
  specification,

  // Page-builder blocks
  heroSection,
  richTextSection,
  mediaBlock,
  featureGridSection,
  productGridSection,
  gallerySection,
  ctaBannerSection,
  pageSections,
  splitGridSection,
  productSpecifications,
  newsSection,
  testimonialSection,
  featureHighlightsSection,
  featuredProductSection,
  imageTransitionSection,
  productSliderSection,
  timelineSection,
  // Documents
  siteSettings,
  page,
  product,
  post,
  // productCategory,
  blogCategory,
  redirect,
];
