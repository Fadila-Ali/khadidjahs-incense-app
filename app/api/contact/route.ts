import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, email, subject, message } = body;

        // Validate input
        if (!name || !email || !subject || !message) {
            return NextResponse.json(
                { error: "All fields are required" },
                { status: 400 }
            );
        }

        // Send email to you (the business owner)
        const { data, error } = await resend.emails.send({
            from: "onboarding@resend.dev", // Use your verified domain in production
            to: "khadidjahsincense@gmail.com", // Your email
            replyTo: email, // Customer's email so you can reply directly
            subject: `Contact Form: ${subject}`,
            html: `
                <!DOCTYPE html>
                <html>
                    <head>
                        <style>
                            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                            .header { background-color: #4F46E5; color: white; padding: 20px; border-radius: 8px 8px 0 0; }
                            .content { background-color: #f9fafb; padding: 20px; border-radius: 0 0 8px 8px; }
                            .info-row { margin: 10px 0; padding: 10px; background-color: white; border-radius: 4px; }
                            .label { font-weight: bold; color: #4F46E5; }
                            .message-box { background-color: white; padding: 15px; border-left: 4px solid #4F46E5; margin-top: 15px; }
                        </style>
                    </head>
                    <body>
                        <div class="container">
                            <div class="header">
                                <h2 style="margin: 0;">New Contact Form Submission</h2>
                            </div>
                            <div class="content">
                                <div class="info-row">
                                    <span class="label">From:</span> ${name}
                                </div>
                                <div class="info-row">
                                    <span class="label">Email:</span> ${email}
                                </div>
                                <div class="info-row">
                                    <span class="label">Subject:</span> ${subject}
                                </div>
                                <div class="message-box">
                                    <p class="label">Message:</p>
                                    <p>${message.replace(/\n/g, '<br>')}</p>
                                </div>
                                <p style="margin-top: 20px; font-size: 14px; color: #6b7280;">
                                    You can reply directly to this email to respond to ${name}.
                                </p>
                            </div>
                        </div>
                    </body>
                </html>
            `,
        });

        if (error) {
            console.error("Error sending contact form email:", error);
            return NextResponse.json(
                { error: "Failed to send message" },
                { status: 500 }
            );
        }

        // Optional: Send confirmation email to the customer
        await resend.emails.send({
            from: "onboarding@resend.dev",
            to: email,
            subject: "We received your message - Khadidjahs Incense",
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
                                <h1 style="margin: 0;">Thank You for Contacting Us</h1>
                            </div>
                            <div class="content">
                                <p>Hi ${name},</p>
                                <p>Thank you for reaching out to Khadidjahs Incense. We have received your message and will get back to you within 24-48 hours.</p>
                                <p><strong>Your message:</strong></p>
                                <p style="background-color: white; padding: 15px; border-left: 4px solid #4F46E5;">
                                    ${message.replace(/\n/g, '<br>')}
                                </p>
                                <p style="margin-top: 20px;">
                                    If you have any urgent concerns, please feel free to call us at +1 (718) 427-3164.
                                </p>
                                <p>
                                    Best regards,<br>
                                    <strong>Khadidjahs Incense Team</strong>
                                </p>
                            </div>
                        </div>
                    </body>
                </html>
            `,
        });

        return NextResponse.json(
            { success: true, message: "Message sent successfully" },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error in contact form:", error);
        return NextResponse.json(
            { error: "An error occurred while sending your message" },
            { status: 500 }
        );
    }
}