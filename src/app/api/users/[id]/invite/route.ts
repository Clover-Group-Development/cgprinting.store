import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/lib/db";
import { IUser, model } from "@/entities/user";

interface InviteParams {
    id: string;
}

export async function POST(_: NextRequest, { params }: { params: InviteParams }) {
    await connect();

    const user = await model.findOne<IUser>({ _id: params.id });

    if (!user)
        return new Response("User not found.", { status: 404 });

    // TODO: Check for user elligibility for invite.

    const payload = JSON.stringify({
        sub: user._id,
        exp: Date.now() + (24 * 60 * 60 * 1000) // 24 hours
    });

    const hmac = crypto.createHmac("sha256", process.env.INVITE_SECRET!);
    hmac.update(payload);

    return NextResponse.json({
        token: `${Buffer.from(payload).toString("base64url")}.${hmac.digest("base64url")}`
    });
}
