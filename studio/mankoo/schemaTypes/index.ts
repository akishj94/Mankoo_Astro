
import { seo } from "./objects/seo";
import { navigationItem } from "./objects/navigationItem";
import { productSpecifications } from './objects/productSpecifications';
import {
  cta,
  specification,
  heroSection,
  richTextSection,
  imageTextSection,
  featureGridSection,
  productGridSection,
  gallerySection,
  ctaBannerSection,
  pageSections,
  splitGridSection,
  newsSection
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
  cta,
  specification,

  // Page-builder blocks
  heroSection,
  richTextSection,
  imageTextSection,
  featureGridSection,
  productGridSection,
  gallerySection,
  ctaBannerSection,
  pageSections,
  splitGridSection,
  productSpecifications,
  newsSection,
  // Documents
  siteSettings,
  page,
  product,
  post,
  // productCategory,
  blogCategory,
  redirect,
];
