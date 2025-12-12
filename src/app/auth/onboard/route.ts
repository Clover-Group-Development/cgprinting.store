import { OnboardUserRequest } from "@/dto/req/onboard-user";

export async function POST(request: Request) {
    const req: OnboardUserRequest = await request.json();
    return new Response(`Onboarding user with email: ${req.identityProvider}`);
}
