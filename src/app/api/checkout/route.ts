import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
    try {
        const cartItems = await req.json();
        // console.log(cartItems)

        const headersList = await headers();
        const origin = headersList.get("origin") || "http://localhost:3000";

        const session = await stripe.checkout.sessions.create({
            submit_type: "pay",
            mode: "payment",
            payment_method_types: ["card"],
            billing_address_collection: "auto",
            shipping_options: [
                { shipping_rate: "shr_1Rflx6FQcRd3GCgGt3MSIG3n" },
                { shipping_rate: "shr_1RnOsVFQcRd3GCgG0HIv5WZi" },
                { shipping_rate: "shr_1RnOtgFQcRd3GCgGMIuhRc4p" },
            ],
            line_items: cartItems.map((item) => {
                const img = item.image[0].asset._ref;
                const newImage = img.replace('image-', "https://cdn.sanity.io/images/7z45sfh6/production/").replace('-webp', '.webp')

                console.log('Image is :', newImage)

                return {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: item.name,
                            images: [newImage],

                        },
                        unit_amount: item.price * 100,
                    },
                    adjustable_quantity: {
                        enabled: true,
                        minimum: 1
                    },
                    quantity: item.quantity,
                }
            }),
            success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${origin}/?canceled=true`,
        });

        return NextResponse.json(session, { status: 200 });

    } catch (error: unknown) {
        console.error(error);
        if (error instanceof Error) {
            return NextResponse.json({ message: error.message }, { status: 500 });
        }
        return NextResponse.json(
            { message: "Unexpected error occurred" },
            { status: 500 }
        );
    }
}
