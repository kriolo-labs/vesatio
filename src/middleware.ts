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

  // Environment variable validation
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    console.error("Middleware Error: Missing Supabase environment variables");
    // Allow public routes to proceed even if env vars are missing (optional, but safer to fail if auth is critical)
    // But for debugging, let's return a clear error if we are on a protected route or just strictly fail.
    // Given this is a 500 error debugging, let's allow public routes if possible, but the client creation happens before.
    // We must return a response.
    return NextResponse.json(
      { error: "Configuration Error: Missing Supabase Environment Variables" },
      { status: 500 }
    );
  }

  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  try {
    const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
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
    });

    // If public route, allow access
    if (isPublicRoute) {
      return response;
    }

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError) {
      // If there's an auth error (e.g. invalid token), redirect to login
      // causing a 500 is bad.
      console.error("Middleware Auth Error:", authError);
      const redirectUrl = new URL("/login", request.url);
      return NextResponse.redirect(redirectUrl);
    }

    // Protected route without user
    if (!user) {
      const redirectUrl = new URL("/login", request.url);
      redirectUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(redirectUrl);
    }

    // Get user role
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("role, is_active")
      .eq("id", user.id)
      .single();

    if (profileError) {
      console.error("Middleware Profile Error:", profileError);
      // Verify if profile exists. If not, maybe sign out?
      await supabase.auth.signOut();
      return NextResponse.redirect(new URL("/login?error=profile_error", request.url));
    }

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
  } catch (e) {
    console.error("Middleware Unexpected Error:", e);
    return NextResponse.json(
      { error: "Internal Server Error in Middleware", details: String(e) },
      { status: 500 }
    );
  }
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
