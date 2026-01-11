import { client } from "@/sanity/lib/client";
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const YOUR_EMAIL = "khadidjahsincense@gmail.com";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { email } = body;

        // Validate email
        if (!email || !email.includes("@")) {
            return NextResponse.json(
                { error: "Valid email address is required" },
                { status: 400 }
            );
        }

        // Check if email already exists
        const existingSubscriber = await client.fetch(
            `*[_type == "newsletter" && email == $email][0]`,
            { email: email.toLowerCase() }
        );

        if (existingSubscriber) {
            if (existingSubscriber.status === "active") {
                return NextResponse.json(
                    { error: "This email is already subscribed to our newsletter" },
                    { status: 400 }
                );
            } else {
                // Reactivate if previously unsubscribed
                await client
                    .patch(existingSubscriber._id)
                    .set({ status: "active", subscribedAt: new Date().toISOString() })
                    .commit();

                return NextResponse.json(
                    { success: true, message: "Welcome back! You've been resubscribed." },
                    { status: 200 }
                );
            }
        }

        // Create new subscriber
        const subscriber = await client.create({
            _type: "newsletter",
            email: email.toLowerCase(),
            subscribedAt: new Date().toISOString(),
            status: "active",
            source: "website_footer",
        });

        // Send welcome email (only to your email with testing domain)
        try {
            await resend.emails.send({
                from: "onboarding@resend.dev",
                to: YOUR_EMAIL,
                subject: "New Newsletter Subscriber",
                html: `
                    <!DOCTYPE html>
                    <html>
                        <head>
                            <style>
                                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                                .header { background-color: #4F46E5; color: white; padding: 20px; text-align: center; }
                                .content { background-color: #f9fafb; padding: 30px; }
                            </style>
                        </head>
                        <body>
                            <div class="container">
                                <div class="header">
                                    <h1 style="margin: 0;">New Newsletter Subscriber!</h1>
                                </div>
                                <div class="content">
                                    <p><strong>Email:</strong> ${email}</p>
                                    <p><strong>Subscribed:</strong> ${new Date().toLocaleString()}</p>
                                    <p><strong>Source:</strong> Website Footer</p>
                                </div>
                            </div>
                        </body>
                    </html>
                `,
            });
        } catch (emailError) {
            console.error("Error sending notification email:", emailError);
            // Don't fail the subscription if email fails
        }

        return NextResponse.json(
            { 
                success: true, 
                message: "Thank you for subscribing! Check your inbox for exclusive offers." 
            },
            { status: 201 }
        );
    } catch (error) {
        console.error("Error subscribing to newsletter:", error);
        return NextResponse.json(
            { error: "Failed to subscribe. Please try again." },
            { status: 500 }
        );
    }
}