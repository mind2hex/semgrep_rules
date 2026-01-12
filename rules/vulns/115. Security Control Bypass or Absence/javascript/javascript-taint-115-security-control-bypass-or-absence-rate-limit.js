// EXAMPLE 1
import { RateLimiterMemory } from "rate-limiter-flexible";
const rateLimiter = new RateLimiterMemory({foo:123});
export async function POST(request: NextRequest) {
    const ip =
    request.headers.get("x-forwarded-ip");

    try {
        await rateLimiter.consume(`${ip}`);
    } catch (ex: any) {
        return new Response("Too many requests, try again later.", { status: 429 });
    }
}