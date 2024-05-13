import { authMiddleware } from "@clerk/nextjs/server";


export default authMiddleware({
    publicRoutes: ["/", '/assets/icons/upload.svg', '/assets/icons/location-grey.svg','/assets/icons/calendar.svg', '/assets/icons/dollar.svg', '/assets/icons/link.svg', '/assets/images/logo.svg','/events/:id', '/api/webhook/clerk', '/api/webhook/stripe', 'api/uploadthing', '/events/create'],
    ignoredRoutes: ['/api/webhook/clerk', '/api/webhook/stripe', 'api/uploadthing']
});

export const config = {
  matcher: ["/((?!.+.[w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};