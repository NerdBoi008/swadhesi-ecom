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

import React from 'react'

const OrdersTable = () => {
  return (
    <div>
      
    </div>
  )
}

export default OrdersTable