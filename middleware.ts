import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher([
  "/sign-up(.*)",
  "/sign-in(.*)",
  "/forgot-password(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth();
  if (!isPublicRoute(req)) {
    await auth.protect();
  }

  if (!userId && !isPublicRoute(req)) {
    return NextResponse.redirect(new URL("/sign-up", req.url));
  }
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
