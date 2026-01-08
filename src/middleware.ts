import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

// Public routes (no auth required)
const PUBLIC_ROUTES = [
    "/",
    "/sobre",
    "/servicos",
    "/portfolio",
    "/collection",
    "/philosophy",
    "/admissao",
    "/contacto",
    "/login",
    "/registar",
    "/recuperar-senha",
];

// Routes by role
const ROLE_ROUTES: Record<string, string[]> = {
    client: ["/my-vesatio"],
    technician: ["/core/projetos", "/core/tarefas"],
    project_manager: ["/core/projetos", "/core/crm", "/core/inventario"],
    financial: ["/core/financeiro", "/core/bi"],
    procurement: ["/core/compras", "/core/inventario", "/core/fornecedores"],
    production: ["/core/producao", "/core/inventario"],
    admin: ["/core"],
    super_admin: ["/core", "/my-vesatio"],
};

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Check if public route
    const isPublicRoute = PUBLIC_ROUTES.some(
        (route) => pathname === route || pathname.startsWith(`${route}/`)
    );

    // API routes handled separately
    if (pathname.startsWith("/api")) {
        return NextResponse.next();
    }

    // Static assets
    if (
        pathname.startsWith("/_next") ||
        pathname.startsWith("/images") ||
        pathname.startsWith("/fonts") ||
        pathname.includes(".")
    ) {
        return NextResponse.next();
    }

    let response = NextResponse.next({
        request: {
            headers: request.headers,
        },
    });

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                get(name: string) {
                    return request.cookies.get(name)?.value;
                },
                set(name: string, value: string, options: CookieOptions) {
                    request.cookies.set({ name, value, ...options });
                    response = NextResponse.next({
                        request: { headers: request.headers },
                    });
                    response.cookies.set({ name, value, ...options });
                },
                remove(name: string, options: CookieOptions) {
                    request.cookies.set({ name, value: "", ...options });
                    response = NextResponse.next({
                        request: { headers: request.headers },
                    });
                    response.cookies.set({ name, value: "", ...options });
                },
            },
        }
    );

    // If public route, allow access
    if (isPublicRoute) {
        return response;
    }

    const {
        data: { user },
    } = await supabase.auth.getUser();

    // Protected route without user
    if (!user) {
        const redirectUrl = new URL("/login", request.url);
        redirectUrl.searchParams.set("redirect", pathname);
        return NextResponse.redirect(redirectUrl);
    }

    // Get user role
    const { data: profile } = await supabase
        .from("profiles")
        .select("role, is_active")
        .eq("id", user.id)
        .single();

    if (!profile || !profile.is_active) {
        await supabase.auth.signOut();
        return NextResponse.redirect(new URL("/login?error=inactive", request.url));
    }

    // Check route permission
    const userRole = profile.role as string;
    const allowedRoutes = ROLE_ROUTES[userRole] || [];

    const hasAccess =
        userRole === "super_admin" ||
        userRole === "admin" ||
        allowedRoutes.some((route) => pathname.startsWith(route));

    if (!hasAccess) {
        return NextResponse.redirect(new URL("/acesso-negado", request.url));
    }

    // Add user info headers
    response.headers.set("x-user-id", user.id);
    response.headers.set("x-user-role", userRole);

    return response;
}

export const config = {
    matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
