export declare type Testimonial = {
    id: string;
    quote: string;
    author: string;
    location: string;
    rating: number;
    tags: string[];
    productFeatured?: string;
    photoUrl?: string;
    cta?: {
      text: string;
      link: string;
    };
}