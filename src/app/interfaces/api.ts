export interface Api {
  _embedded: Embedded;
  _links: Links;
  page: Page;
  buyButton: Offer;
}

export interface Embedded {
  kinguinOffer: Offer[];
}

export interface Offer {
  id: string;
  productId: string;
  productName: string;
  productImageUrl: string;
  popularityValue: number | null;
  isPreorder: boolean;
  sellerId: number | string;
  type: string;
  price: Price;
  seller: Seller;
  activeStockNumber: number;
  kinguinOffer: KinguinOffer;
  checkoutTypes: string[];
  broker: string;
  spaActive: boolean;
}

export interface Price {
  amount: number;
  currency: string;
}

export interface Seller {
  id: number;
  name: string;
  isC2C: boolean;
  rating: number;
  completedOrders: number;
  feedback: Feedback;
  merchantRating: number;
}

export interface Feedback {
  positive: number;
  neutral: number;
  negative: number;
}

export interface KinguinOffer {
  kinguinCategoryId: string | null;
  kinguinProductId: string | null;
}

export interface Links {
  self: Link;
}

export interface Link {
  href: string;
}

export interface Page {
  size: number;
  totalElements: number;
  totalPages: number;
  number: number;
}
