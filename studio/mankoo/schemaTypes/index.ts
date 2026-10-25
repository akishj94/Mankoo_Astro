
import { seo } from "./objects/seo";
import { navigationItem } from "./objects/navigationItem";
import {
  cta,
  specification,
  heroSection,
  richTextSection,
  imageTextSection,
  featureGridSection,
  productGridSection,
  faqSection,
  gallerySection,
  ctaBannerSection,
  pageSections,
} from "./objects/pageSections";

import { siteSettings } from "./documents/siteSettings";
import { page } from "./documents/page";
import { product } from "./documents/product";

import { post } from "./documents/post";
import { productCategory } from "./documents/productCategory";
import { blogCategory } from "./documents/blogCategory";

import { redirect } from "./documents/redirect";

export const schemaTypes = [
  // Shared objects
  seo,
  navigationItem,
  cta,
  specification,

  // Page-builder blocks
  heroSection,
  richTextSection,
  imageTextSection,
  featureGridSection,
  productGridSection,
  faqSection,
  gallerySection,
  ctaBannerSection,
  pageSections,
  
  
  // Documents
  siteSettings,
  page,
  product,
  post,
  productCategory,
  blogCategory,
  redirect,
];
