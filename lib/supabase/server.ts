import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    // Use your public anon/publishable key
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY! ?? process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          // cookieStore is a ReadonlyRequestCookies, but getAll() is available
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          // In Server Components, set() may be read-only; safe-guard it.
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options);
            });
          } catch {
            // Ignore in environments where cookies are readonly (e.g., RSC render).
          }
        },
      },
    }
  );
}
