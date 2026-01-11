import * as React from 'react';

interface OrderConfirmationEmailProps {
    customerName: string;
    orderNumber: string;
    orderDate: string;
    items: Array<{
        name: string;
        quantity: number;
        price: number;
    }>;
    total: number;
    shippingAddress?: string;
}

export const OrderConfirmationEmail: React.FC<OrderConfirmationEmailProps> = ({
    customerName,
    orderNumber,
    orderDate,
    items,
    total,
    shippingAddress,
}) => (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '0 auto' }}>
        <div style={{ backgroundColor: '#4F46E5', padding: '20px', textAlign: 'center' }}>
            <h1 style={{ color: 'white', margin: 0 }}>Order Confirmation</h1>
        </div>
        
        <div style={{ padding: '20px', backgroundColor: '#f9fafb' }}>
            <p style={{ fontSize: '16px', color: '#374151' }}>
                Hi {customerName},
            </p>
            <p style={{ fontSize: '16px', color: '#374151' }}>
                Thank you for your order! We're excited to get your products to you.
            </p>
            
            <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', marginTop: '20px' }}>
                <h2 style={{ color: '#1f2937', fontSize: '18px' }}>Order Details</h2>
                <p style={{ color: '#6b7280', margin: '5px 0' }}>
                    <strong>Order Number:</strong> {orderNumber}
                </p>
                <p style={{ color: '#6b7280', margin: '5px 0' }}>
                    <strong>Order Date:</strong> {orderDate}
                </p>
                
                <div style={{ marginTop: '20px' }}>
                    <h3 style={{ color: '#1f2937', fontSize: '16px' }}>Items</h3>
                    {items.map((item, index) => (
                        <div key={index} style={{ 
                            borderBottom: '1px solid #e5e7eb', 
                            padding: '10px 0',
                            display: 'flex',
                            justifyContent: 'space-between'
                        }}>
                            <div>
                                <p style={{ margin: '0', color: '#1f2937' }}>{item.name}</p>
                                <p style={{ margin: '5px 0 0 0', color: '#6b7280', fontSize: '14px' }}>
                                    Quantity: {item.quantity}
                                </p>
                            </div>
                            <p style={{ margin: '0', color: '#1f2937', fontWeight: 'bold' }}>
                                ${(item.price * item.quantity).toFixed(2)}
                            </p>
                        </div>
                    ))}
                    
                    <div style={{ 
                        marginTop: '20px', 
                        paddingTop: '20px', 
                        borderTop: '2px solid #1f2937',
                        textAlign: 'right'
                    }}>
                        <p style={{ margin: '0', fontSize: '18px', fontWeight: 'bold', color: '#1f2937' }}>
                            Total: ${total.toFixed(2)}
                        </p>
                    </div>
                </div>
                
                {shippingAddress && (
                    <div style={{ marginTop: '20px' }}>
                        <h3 style={{ color: '#1f2937', fontSize: '16px' }}>Shipping Address</h3>
                        <p style={{ color: '#6b7280', margin: '5px 0' }}>{shippingAddress}</p>
                    </div>
                )}
            </div>
            
            <p style={{ fontSize: '14px', color: '#6b7280', marginTop: '20px' }}>
                We'll send you another email when your order ships.
            </p>
        </div>
        
        <div style={{ backgroundColor: '#f3f4f6', padding: '20px', textAlign: 'center' }}>
            <p style={{ color: '#6b7280', fontSize: '12px', margin: 0 }}>
                © {new Date().getFullYear()} Khadidjas Incense. All rights reserved.
            </p>
        </div>
    </div>
);

interface ShippingUpdateEmailProps {
    customerName: string;
    orderNumber: string;
    trackingNumber: string;
    carrier: string;
    trackingUrl?: string;
}

export const ShippingUpdateEmail: React.FC<ShippingUpdateEmailProps> = ({
    customerName,
    orderNumber,
    trackingNumber,
    carrier,
    trackingUrl,
}) => (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '0 auto' }}>
        <div style={{ backgroundColor: '#10B981', padding: '20px', textAlign: 'center' }}>
            <h1 style={{ color: 'white', margin: 0 }}>Your Order Has Shipped!</h1>
        </div>
        
        <div style={{ padding: '20px', backgroundColor: '#f9fafb' }}>
            <p style={{ fontSize: '16px', color: '#374151' }}>
                Hi {customerName},
            </p>
            <p style={{ fontSize: '16px', color: '#374151' }}>
                Great news! Your order is on its way to you.
            </p>
            
            <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', marginTop: '20px' }}>
                <h2 style={{ color: '#1f2937', fontSize: '18px' }}>Shipping Information</h2>
                <p style={{ color: '#6b7280', margin: '5px 0' }}>
                    <strong>Order Number:</strong> {orderNumber}
                </p>
                <p style={{ color: '#6b7280', margin: '5px 0' }}>
                    <strong>Carrier:</strong> {carrier}
                </p>
                <p style={{ color: '#6b7280', margin: '5px 0' }}>
                    <strong>Tracking Number:</strong> {trackingNumber}
                </p>
                
                {trackingUrl && (
                    <div style={{ marginTop: '20px', textAlign: 'center' }}>
                        <a 
                            href={trackingUrl}
                            style={{
                                backgroundColor: '#10B981',
                                color: 'white',
                                padding: '12px 24px',
                                textDecoration: 'none',
                                borderRadius: '6px',
                                display: 'inline-block',
                                fontWeight: 'bold'
                            }}
                        >
                            Track Your Package
                        </a>
                    </div>
                )}
            </div>
            
            <p style={{ fontSize: '14px', color: '#6b7280', marginTop: '20px' }}>
                Your order should arrive within 3-5 business days.
            </p>
        </div>
        
        <div style={{ backgroundColor: '#f3f4f6', padding: '20px', textAlign: 'center' }}>
            <p style={{ color: '#6b7280', fontSize: '12px', margin: 0 }}>
                © {new Date().getFullYear()} Khadidjas Incense. All rights reserved.
            </p>
        </div>
    </div>
);

interface ReviewReminderEmailProps {
    customerName: string;
    orderNumber: string;
    items: Array<{
        name: string;
        productId: string;
        slug: string;
    }>;
    reviewUrl: string;
}

export const ReviewReminderEmail: React.FC<ReviewReminderEmailProps> = ({
    customerName,
    orderNumber,
    items,
    reviewUrl,
}) => (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '0 auto' }}>
        <div style={{ backgroundColor: '#F59E0B', padding: '20px', textAlign: 'center' }}>
            <h1 style={{ color: 'white', margin: 0 }}>How Was Your Experience?</h1>
        </div>
        
        <div style={{ padding: '20px', backgroundColor: '#f9fafb' }}>
            <p style={{ fontSize: '16px', color: '#374151' }}>
                Hi {customerName},
            </p>
            <p style={{ fontSize: '16px', color: '#374151' }}>
                We hope you're enjoying your recent purchase! We'd love to hear your thoughts.
            </p>
            
            <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', marginTop: '20px' }}>
                <h2 style={{ color: '#1f2937', fontSize: '18px' }}>Your Recent Order</h2>
                <p style={{ color: '#6b7280', margin: '5px 0' }}>
                    <strong>Order Number:</strong> {orderNumber}
                </p>
                
                <div style={{ marginTop: '20px' }}>
                    <h3 style={{ color: '#1f2937', fontSize: '16px' }}>Items to Review</h3>
                    {items.map((item, index) => (
                        <div key={index} style={{ 
                            borderBottom: '1px solid #e5e7eb', 
                            padding: '15px 0'
                        }}>
                            <p style={{ margin: '0 0 10px 0', color: '#1f2937', fontWeight: 'bold' }}>
                                {item.name}
                            </p>
                            <a 
                                href={`${reviewUrl}/product/${item.slug}`}
                                style={{
                                    backgroundColor: '#F59E0B',
                                    color: 'white',
                                    padding: '8px 16px',
                                    textDecoration: 'none',
                                    borderRadius: '6px',
                                    display: 'inline-block',
                                    fontSize: '14px'
                                }}
                            >
                                Write a Review
                            </a>
                        </div>
                    ))}
                </div>
            </div>
            
            <p style={{ fontSize: '14px', color: '#6b7280', marginTop: '20px' }}>
                Your feedback helps other customers make informed decisions and helps us improve our products.
            </p>
        </div>
        
        <div style={{ backgroundColor: '#f3f4f6', padding: '20px', textAlign: 'center' }}>
            <p style={{ color: '#6b7280', fontSize: '12px', margin: 0 }}>
                © {new Date().getFullYear()} Khadidjas Incense. All rights reserved.
            </p>
        </div>
    </div>
);