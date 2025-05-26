import { Testimonial } from "@/types"

export const supportPhone = '+1 (123) 456-7890'

export const supportEmail = 'inquiry@swadhesi.com'

// i.e. yogesh.patel.123
export const instagramHandle = 'shop.swadhesi'

export const supportAddress = [
    '123 Main St, City, Country',
    'Vadodara - 895122',
    'India'
]

export const instagramLink: string = 'https://instagram.com';

export const facebookLink: string = 'https://facebook.com';

/* ⚠ Remove this on 20/4/2025 if nothing in code breaks ⚠ */
// export const socialLinks: Array<{
//     social: string
//     link: string
// }> = [
//     { social: 'Facebook', link: 'https://facebook.com' },
//     { social: 'Instagram', link: 'https://instagram.com' },
//     { social: 'Twitter', link: 'https://twitter.com' },
//     { social: 'Pinterest', link: 'https://pinterest.com' },
//     { social: 'LinkedIn', link: 'https://linkedin.com' },
// ]

export const footerLinks: Array<{
    heading: string
    links: Array<{ name: string; path: string }>
}> = [
    {
        heading: 'Main Menu',
        links: [
            { name: 'Home', path: '/' },
            { name: 'About', path: '/about' },
            { name: 'Products', path: '/products' },
            { name: 'Tops', path: '/tops' },
            { name: 'Dresses', path: '/dresses' },
            { name: 'Co-ords', path: '/co-ords' },
        ],
    },
    {
        heading: 'Support',
        links: [
            { name: 'Contact Us', path: '/' },
            { name: 'Privacy Policy', path: '/about' },
            { name: 'Return & Refund Policy', path: '/products' },
            { name: 'Shipping Policy', path: '/tops' },
            { name: 'Terms & Conditions', path: '/dresses' },
        ],
    },
]

export const faqQuestions: Array<{
    question: string;
    answer: string;
}> = [
    {
        question: "What sizes do you offer for kids' clothing?",
        answer: "We offer sizes ranging from newborn (0-3 months) to 12 years. Check our size guide for detailed measurements."
    },
    {
        question: "What materials are your clothes made from?",
        answer: "Our clothes are made from high-quality, breathable fabrics like 100% cotton, organic cotton, and soft blends to ensure comfort for your child."
    },
    {
        question: "Do you offer international shipping?",
        answer: "Yes, we offer worldwide shipping. Shipping fees and delivery times vary based on your location."
    },
    {
        question: "How do I track my order?",
        answer: "Once your order is shipped, you will receive a tracking link via email or SMS to monitor your shipment in real-time."
    },
    {
        question: "What is your return and exchange policy?",
        answer: "We offer a 30-day return and exchange policy. Items must be unworn, unwashed, and in their original packaging with tags attached."
    },
    {
        question: "Are your clothes safe for sensitive skin?",
        answer: "Yes! Our clothing is made from hypoallergenic and chemical-free materials, making them safe for kids with sensitive skin."
    },
    {
        question: "Do you have seasonal discounts or sales?",
        answer: "Yes, we offer seasonal discounts and exclusive sales. Subscribe to our newsletter to stay updated on the latest offers!"
    },
    {
        question: "Can I customize or personalize clothing items?",
        answer: "Yes! We offer personalized embroidery and print options on select items. Check our 'Customize' section for more details."
    },
    {
        question: "How should I wash and care for my kids' clothes?",
        answer: "We recommend washing in cold water with mild detergent and air drying to maintain the quality and longevity of the fabric."
    },
    {
        question: "Do you offer gift wrapping services?",
        answer: "Yes, we provide beautiful gift wrapping options at checkout, perfect for birthdays, baby showers, and special occasions."
    }
];
  
export const testimonials: Testimonial[] = [
    {
      id: "t-1",
      quote: "These clothes are unbelievably soft! My 3-year-old refuses to wear anything else now. The organic cotton pajamas survived 20+ washes without fading – worth every penny!",
      author: "Priya M.",
      location: "Mumbai",
      rating: 5,
      tags: ["quality", "durability"],
      productFeatured: "Organic Cotton Pajama Set",
      photoUrl: "/images/testimonials/pajama-mom.jpg",
      cta: {
        text: "Shop Organic Collection",
        link: "/shop/organic"
      }
    },
    {
      id: "t-2",
      quote: "Finally – kids' fashion that doesn't look like every other store! The dinosaur print tee gets compliments every time my son wears it to preschool.",
      author: "Rohan K.",
      location: "Delhi",
      rating: 5,
      tags: ["style", "unique"],
      productFeatured: "Dinosaur Print T-Shirt",
      cta: {
        text: "Shop This Look",
        link: "/products/dino-tshirt"
      }
    },
    {
      id: "t-3",
      quote: "Sent the rainbow tutu dress as a birthday gift. My niece's mom called crying because it was the only present she didn't want to take off at bedtime!",
      author: "Ananya S.",
      location: "Bangalore",
      rating: 5,
      tags: ["gifts", "special occasions"],
      productFeatured: "Rainbow Tutu Dress"
    },
    {
      id: "t-4",
      quote: "After 4 months of playground abuse, the denim overalls still look new. Even the knees aren't frayed – and that's saying something for my wild toddler!",
      author: "Vikram P.",
      location: "Pune",
      rating: 4,
      tags: ["durability", "value"],
      productFeatured: "Denim Overalls",
      photoUrl: "/images/testimonials/overalls-boy.jpg"
    },
    {
      id: "t-5",
      quote: "When the unicorn hoodie shipped late, their team upgraded to express delivery AND included free animal socks. Now that's how you earn loyal customers!",
      author: "Neha G.",
      location: "Hyderabad",
      rating: 5,
      tags: ["customer service"],
      productFeatured: "Unicorn Hoodie"
    },
    {
      id: "t-6",
      quote: "Compared to big brands, the quality is better at half the price. The 5-pack bodysuits became our daycare essential – no more 'outfit changes' stress!",
      author: "Arjun T.",
      location: "Chennai",
      rating: 5,
      tags: ["value", "essentials"],
      productFeatured: "Organic Cotton Bodysuits (5-Pack)"
    }
];

export const instagramImgSrcs: Array<string> = [
    "/cdn-imgs/hero_img_5.jpg",
    "/cdn-imgs/hero_img_5.jpg",
    "/cdn-imgs/hero_img_5.jpg",
    "/cdn-imgs/hero_img_5.jpg",
    "/cdn-imgs/hero_img_5.jpg",
]