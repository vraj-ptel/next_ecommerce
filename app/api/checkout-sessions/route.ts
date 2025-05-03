import { productType } from "@/types";
import {NextRequest,NextResponse} from "next/server"
import Stripe from 'stripe';
const stripe=new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY!);

export async function POST(req:NextRequest){
    const body=await req.json();
    const {items,email} :{items:productType[],email:string}= body;
    // console.log("item",items);
    // console.log("email",email);

    const arrengedItem=items.map((i)=>({
        price_data:{
            currency:'usd',
            product_data:{
                name:i.title,
                images:[i.image]
            },
            unit_amount:Math.floor(i.price*79)
        },
        quantity:1
    }))
    const session=await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        shipping_address_collection:{
            allowed_countries:['GB','US','CA']
        },
        line_items:arrengedItem,
        mode:'payment',
        success_url: `${req.headers.get('origin')}/success`,
        cancel_url: `${req.headers.get('origin')}/checkout`,
        metadata:{
            email,
            images:JSON.stringify(items.map(<T extends productType>(item:T)=>item.image))
        }
    })

    return NextResponse.json({"success":true,id:session.id})
}
