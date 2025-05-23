import { Attribute, AttributeValue, Category, Customer, Order, Product } from "../types/src/index";

const mockCategories: Category[] = [
  {
    id: "cat-001",
    name: "Toddler Clothing",
    parent_id: null,
    parent: undefined,
    children: [],
    products: [],
    image_url: "https://example.com/images/categories/toddler-clothing.jpg",
    description: "Cute and comfy clothes for toddlers.",
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: "cat-002",
    name: "Kids Footwear",
    parent_id: null,
    parent: undefined,
    children: [],
    products: [],
    image_url: "https://example.com/images/categories/kids-footwear.jpg",
    description: "Stylish shoes for kids.",
    created_at: new Date(),
    updated_at: new Date(),
  }
];

const mockAttributes: Attribute[] = [
  {
    id: "attr-001",
    name: "Color",
    display_order: 1,
    created_at: new Date(),
    updated_at: new Date(),
    values: [],
  },
  {
    id: "attr-002",
    name: "Material",
    display_order: 2,
    created_at: new Date(),
    updated_at: new Date(),
    values: [],
  }
];

const mockAttributeValues: AttributeValue[] = [
  {
    id: "attrval-001",
    attribute_id: "attr-001",
    value: "Blue",
    display_order: 1,
    created_at: new Date(),
    updated_at: new Date(),
    variants: [],
    attribute: mockAttributes[0],
  },
  {
    id: "attrval-002",
    attribute_id: "attr-001",
    value: "Red",
    display_order: 2,
    created_at: new Date(),
    updated_at: new Date(),
    variants: [],
    attribute: mockAttributes[0],
  },
  {
    id: "attrval-003",
    attribute_id: "attr-002",
    value: "Cotton",
    display_order: 1,
    created_at: new Date(),
    updated_at: new Date(),
    variants: [],
    attribute: mockAttributes[1],
  }
];

export const products: Product[] = [
  {
    id: "prod-001",
    name: "Blue Toddler Shirt",
    description: "Soft cotton blue shirt for toddlers.",
    category_id: "cat-001",
    category: mockCategories[0],
    thumbnail_image_url: "https://example.com/images/products/blue-shirt-thumb.jpg",
    images_url: [
      "https://example.com/images/products/blue-shirt-1.jpg",
      "https://example.com/images/products/blue-shirt-2.jpg",
    ],
    variants: [
      {
        id: "var-001",
        product_id: "prod-001",
        sku: "SKU-BLUE-4T",
        price: 29.99,
        sale_price: 24.99,
        stock: 10,
        size: {
          label: "4T",
          system: "US",
          equivalent: { eu: "104", uk: "3-4Y" },
          description: "Fits 4-5 year olds",
        },
        image_url: "https://example.com/images/products/blue-shirt-4t.jpg",
        barcode: "1234567890123",
        attribute_values: [mockAttributeValues[0]!],
        created_at: new Date(),
        updated_at: new Date(),
        product: undefined,
      }
    ],
    attributes: [
      {
        product_id: "prod-001",
        attribute_id: "attr-001",
        attribute: mockAttributes[0]!,
        values: [mockAttributeValues[0]!, mockAttributeValues[1]!],
      }
    ],
    brand_id: "brand-001",
    meta_title: "Blue Toddler Shirt",
    meta_description: "Shop soft blue shirts for toddlers!",
    slug: "blue-toddler-shirt",
    related_products: ["prod-002", "prod-003"],
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: "prod-002",
    name: "Red Toddler Shirt",
    description: "Bright red shirt perfect for active toddlers.",
    category_id: "cat-001",
    category: mockCategories[0],
    thumbnail_image_url: "https://example.com/images/products/red-shirt-thumb.jpg",
    images_url: [
      "https://example.com/images/products/red-shirt-1.jpg",
      "https://example.com/images/products/red-shirt-2.jpg",
    ],
    variants: [
      {
        id: "var-002",
        product_id: "prod-002",
        sku: "SKU-RED-4T",
        price: 27.99,
        sale_price: 22.99,
        stock: 8,
        size: {
          label: "4T",
          system: "US",
          equivalent: { eu: "104", uk: "3-4Y" },
          description: "Fits 4-5 year olds",
        },
        image_url: "https://example.com/images/products/red-shirt-4t.jpg",
        barcode: "9876543210987",
        attribute_values: [mockAttributeValues[1]!],
        created_at: new Date(),
        updated_at: new Date(),
        product: undefined,
      }
    ],
    attributes: [
      {
        product_id: "prod-002",
        attribute_id: "attr-001",
        attribute: mockAttributes[0]!,
        values: [mockAttributeValues[0]!, mockAttributeValues[1]!],
      }
    ],
    brand_id: "brand-002",
    meta_title: "Red Toddler Shirt",
    meta_description: "Find bright red shirts for toddlers!",
    slug: "red-toddler-shirt",
    related_products: ["prod-001", "prod-003"],
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: "prod-003",
    name: "Kids Sneakers",
    description: "Durable sneakers perfect for playtime.",
    category_id: "cat-002",
    category: mockCategories[1],
    thumbnail_image_url: "https://example.com/images/products/kids-sneakers-thumb.jpg",
    images_url: [
      "https://example.com/images/products/kids-sneakers-1.jpg",
      "https://example.com/images/products/kids-sneakers-2.jpg",
    ],
    variants: [
      {
        id: "var-003",
        product_id: "prod-003",
        sku: "SKU-SNEAKERS-5",
        price: 49.99,
        sale_price: null,
        stock: 5,
        size: {
          label: "5",
          system: "US",
          equivalent: { eu: "22", uk: "4.5" },
        },
        image_url: "https://example.com/images/products/kids-sneakers.jpg",
        barcode: "4567890123456",
        attribute_values: [],
        created_at: new Date(),
        updated_at: new Date(),
        product: undefined,
      }
    ],
    attributes: [],
    brand_id: "brand-003",
    meta_title: "Kids Sneakers",
    meta_description: "Durable sneakers for energetic kids!",
    slug: "kids-sneakers",
    related_products: ["prod-001", "prod-002"],
    created_at: new Date(),
    updated_at: new Date(),
  }
];






/* ---------------------------------------- */

export const mockOrders: Order[] = [
  {
    id: '1001',
    customer_id: '501',
    status: 'Delivered',
    total_amount: 89.97,
    shipping_address: {
      recipient_name: "Parent Name",
      street: "123 Kids Street",
      city: "Mumbai",
      state: "Maharashtra",
      postal_code: "400001",
      country: "India",
      contact_number: "+919876543210"
    },
    billing_address: {
      recipient_name: "Parent Name",
      street: "123 Kids Street",
      city: "Mumbai",
      state: "Maharashtra",
      postal_code: "400001",
      country: "India",
      contact_number: "+919876543210"
    },
    payment_status: 'Paid',
    payment_method: 'UPI',
    shipping_cost: 5.99,
    tax_amount: 8.25,
    discount_amount: 10.00,
    tracking_number: "TRK123456789",
    carrier: 'Delhivery',
    notes: "Gift wrapping requested",
    estimated_delivery: new Date('2023-12-20'),
    created_at: new Date('2023-12-10T10:30:00'),
    updated_at: new Date('2023-12-15T14:45:00'),
    coupon_code: "KIDS10",
    items: [
      {
        id: '1',
        order_id: '1001',
        product_id: '2001',
        variant_id: '3001',
        quantity: 2,
        price_at_purchase: 24.99,
        variant_sku: "TSHIRT-BLUE-4T",
        variant_attributes: {
          Size: "4T",
          Color: "Blue"
        },
        product: {
          id:'2001',
          name: "Dinosaur Graphic T-Shirt",
          thumbnail_image_url: "/images/tshirt-blue.jpg",
          description: "A fun dinosaur-themed t-shirt for kids.",
          category_id: '101',
          images_url: ["/images/tshirt-blue.jpg", "/images/tshirt-blue-back.jpg"],
          created_at: new Date('2023-01-01T10:00:00'),
          updated_at: new Date('2023-01-05T15:00:00')
        }
      },
      {
        id: '2',
        order_id: '1001',
        product_id: '2002',
        variant_id: '3002',
        quantity: 1,
        price_at_purchase: 39.99,
        variant_sku: "TSHIRT-BLUE-4T",
        variant_attributes: {
          Size: "4T",
          Color: "Blue"
        },
        product: {
          id: '2002',
          name: "Winter Puffer Jacket",
          thumbnail_image_url: "/images/jacket-red.jpg",
          description: "A warm and stylish puffer jacket for winter.",
          category_id: '102',
          images_url: ["/images/jacket-red.jpg", "/images/jacket-red-back.jpg"],
          created_at: new Date('2023-02-01T10:00:00'),
          updated_at: new Date('2023-02-05T15:00:00')
        }
      }
    ]
  },
  {
    id: '1002',
    customer_id: '502',
    status: 'Processing',
    total_amount: 45.98,
    shipping_address: JSON.stringify({
      recipient_name: "Another Parent",
      street: "456 Playground Lane",
      city: "Bangalore",
      state: "Karnataka",
      postal_code: "560001",
      country: "India",
      contact_number: "+919876543211"
    }),
    payment_status: 'Pending',
    payment_method: 'COD',
    shipping_cost: 4.99,
    tax_amount: 4.50,
    created_at: new Date('2023-12-12T09:15:00'),
    updated_at: new Date('2023-12-12T09:15:00'),
    items: [
      {
        id: '3',
        order_id: '1002',
        product_id: '2003',
        variant_id: '3003',
        quantity: 3,
        price_at_purchase: 12.99,
        variant_sku: "SOCKS-MULTI-2T",
        variant_attributes: {
          Size: "2T",
          Color: "Multicolor"
        }
      }
    ]
  },
  {
    id: '1003',
    customer_id: null, // Guest checkout
    status: 'Shipped',
    total_amount: 67.96,
    shipping_address: JSON.stringify({
      recipient_name: "Guest Customer",
      street: "789 Toy Avenue",
      city: "Delhi",
      state: "Delhi",
      postal_code: "110001",
      country: "India",
      contact_number: "+919876543212"
    }),
    payment_status: 'Paid',
    payment_method: 'Credit_Card',
    shipping_cost: 6.99,
    tax_amount: 6.25,
    tracking_number: "TRK987654321",
    carrier: 'BlueDart',
    estimated_delivery: new Date('2023-12-18'),
    created_at: new Date('2023-12-11T14:20:00'),
    updated_at: new Date('2023-12-14T11:30:00'),
    items: [
      {
        id: '4',
        order_id: '1003',
        product_id: '2004',
        variant_id: '3004',
        quantity: 1,
        price_at_purchase: 29.99,
        variant_sku: "JEANS-DARK-3T",
        variant_attributes: {
          Size: "3T",
          Color: "Dark Blue",
          Fit: "Slim"
        },
        refunded_quantity: 1,
        refund_amount: 29.99
      },
      {
        id: '5',
        order_id: '1003',
        product_id: '2005',
        variant_id: '3005',
        quantity: 2,
        price_at_purchase: 14.99,
        variant_sku: "UNDERSHIRT-WHITE-4T",
        variant_attributes: {
          Size: "4T",
          Color: "White"
        }
      }
    ]
  },
  {
    id: '1004',
    customer_id: '503',
    status: 'Cancelled',
    total_amount: 34.98,
    shipping_address: {
      recipient_name: "Return Customer",
      street: "321 Nursery Road",
      city: "Chennai",
      state: "Tamil Nadu",
      postal_code: "600001",
      country: "India",
      contact_number: "+919876543213"
    },
    payment_status: 'Refunded',
    payment_method: 'Net_Banking',
    shipping_cost: 4.99,
    tax_amount: 3.50,
    created_at: new Date('2023-12-05T16:45:00'),
    updated_at: new Date('2023-12-08T10:15:00'),
    items: [
      {
        id: '6',
        order_id: '1004',
        product_id: '2006',
        variant_id: '3006',
        quantity: 1,
        price_at_purchase: 29.99,
        variant_sku: "DRESS-PINK-5T",
        variant_attributes: {
          Size: "5T",
          Color: "Pink",
          Style: "Party"
        },
        refunded_quantity: 1,
        refund_amount: 29.99
      }
    ]
  }
];


/* --------------------------------------------------------- */

export const mockCustomers: Customer[] = [
  {
    id: 'cust_1',
    name: 'Priya Sharma',
    first_name: 'Priya',
    last_name: 'Sharma',
    email: 'priya.sharma@example.com',
    password_hash: 'hashed_password_1',
    phone: '+919876543210',
    is_guest: false,
    status: 'active',
    created_at: new Date('2023-01-15T10:30:00'),
    updated_at: new Date('2023-06-20T14:45:00'),
    last_login: new Date('2023-06-25T09:15:00'),
    total_spent: 12500.75,
    order_count: 8,
    addresses: [
      {
        id: 'addr_1',
        recipient_name: 'Priya Sharma',
        street: '123 MG Road',
        city: 'Mumbai',
        state: 'Maharashtra',
        postal_code: '400001',
        country: 'India',
        contact_number: '+919876543210',
        is_default: true,
        type: 'shipping'
      },
      {
        id: 'addr_2',
        recipient_name: 'Priya Sharma (Work)',
        street: '456 Business Park',
        city: 'Mumbai',
        state: 'Maharashtra',
        postal_code: '400002',
        country: 'India',
        contact_number: '+919876543211',
        type: 'billing'
      }
    ],
    notes: 'Prefers email communication'
  },
  {
    id: 'cust_2',
    name: 'Rahul Patel',
    first_name: 'Rahul',
    last_name: 'Patel',
    email: 'rahul.patel@example.com',
    password_hash: 'hashed_password_2',
    phone: '+919876543212',
    is_guest: false,
    status: 'active',
    created_at: new Date('2023-02-10T11:20:00'),
    updated_at: new Date('2023-06-18T16:30:00'),
    last_login: new Date('2023-06-22T15:45:00'),
    total_spent: 8700.50,
    order_count: 5,
    addresses: [
      {
        id: 'addr_3',
        recipient_name: 'Rahul Patel',
        street: '789 Brigade Road',
        city: 'Bangalore',
        state: 'Karnataka',
        postal_code: '560001',
        country: 'India',
        contact_number: '+919876543212',
        is_default: true,
        type: 'shipping'
      }
    ]
  },
  {
    id: 'cust_3',
    name: 'Ananya Gupta',
    first_name: 'Ananya',
    last_name: 'Gupta',
    email: 'ananya.gupta@example.com',
    password_hash: 'hashed_password_3',
    phone: '+919876543213',
    is_guest: false,
    status: 'active',
    created_at: new Date('2023-03-05T09:15:00'),
    updated_at: new Date('2023-06-15T12:20:00'),
    last_login: new Date('2023-06-20T11:30:00'),
    total_spent: 15600.25,
    order_count: 12,
    addresses: [
      {
        id: 'addr_4',
        recipient_name: 'Ananya Gupta',
        street: '321 Connaught Place',
        city: 'Delhi',
        state: 'Delhi',
        postal_code: '110001',
        country: 'India',
        contact_number: '+919876543213',
        is_default: true,
        type: 'shipping'
      },
      {
        id: 'addr_5',
        recipient_name: 'Ananya Gupta (Parents)',
        street: '654 Lajpat Nagar',
        city: 'Delhi',
        state: 'Delhi',
        postal_code: '110024',
        country: 'India',
        contact_number: '+919876543214',
        type: 'shipping'
      }
    ]
  },
  {
    id: 'cust_4',
    name: 'Guest Customer',
    first_name: 'Guest',
    last_name: 'Customer',
    email: 'guest123@example.com',
    password_hash: '',
    is_guest: true,
    status: 'active',
    created_at: new Date('2023-06-10T14:20:00'),
    updated_at: new Date('2023-06-10T14:20:00'),
    total_spent: 3500.00,
    order_count: 1,
    addresses: [
      {
        id: 'addr_6',
        recipient_name: 'Guest Customer',
        street: '987 Park Street',
        city: 'Kolkata',
        state: 'West Bengal',
        postal_code: '700016',
        country: 'India',
        contact_number: '+919876543215',
        is_default: true,
        type: 'shipping'
      }
    ]
  },
  {
    name: 'Vikram Singh',
    first_name: 'Vikram',
    last_name: 'Singh',
    email: 'vikram.singh@example.com',
    id: 'cust_5',
    password_hash: 'hashed_password_4',
    phone: '+919876543216',
    is_guest: false,
    status: 'inactive',
    created_at: new Date('2023-04-20T16:45:00'),
    updated_at: new Date('2023-06-01T10:15:00'),
    last_login: new Date('2023-05-28T14:30:00'),
    total_spent: 4200.75,
    order_count: 3,
    addresses: [
      {
        id: 'addr_7',
        recipient_name: 'Vikram Singh',
        street: '159 Marina Beach Road',
        city: 'Chennai',
        state: 'Tamil Nadu',
        postal_code: '600001',
        country: 'India',
        contact_number: '+919876543216',
        is_default: true,
        type: 'shipping'
      }
    ],
    notes: 'Account deactivated by user request'
  }
];

