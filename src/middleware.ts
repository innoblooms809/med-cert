import { NextResponse } from "next/server";

let locales = ['en', 'ar']

// Get the preferred locale, similar to the above or using a library
function getLocale(request: Request): string {
    // Try to get the preferred language from the Accept-Language header
    const acceptLanguage = request.headers.get('accept-language');
    if (acceptLanguage) {
        const preferred = acceptLanguage.split(',')[0].split('-')[0];
        if (locales.includes(preferred)) {
            return preferred;
        }
    }
    // Default to 'en'
    return 'en';
}

export function middleware(request: Request) {
    // Check if there is any supported locale in the pathname
    const url = new URL(request.url)
    const { pathname } = url
    const pathnameHasLocale = locales.some(
        (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    ) 

    if (pathnameHasLocale) return

    const locale = getLocale(request)
    url.pathname = `/${locale}${pathname}`
    // e.g. incoming request is /products
    // The new URL is now /en-US/products
    return NextResponse.redirect(url)
}

export const config = {
    matcher: [
        // Skip all internal paths (_next)
        '/((?!_next).*)',
        // Optional: only run on root (/) URL
        // '/'
    ],
}