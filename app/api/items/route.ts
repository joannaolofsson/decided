import { createClient } from "@/lib/supabase/server"

export async function GET() {
  console.log("✅ /api/items hit")

  try {
    const supabase = createClient()
    console.log("✅ Supabase client created")

    const { data, error } = await supabase
      .from("itemsList")
      .select("*")

    console.log("✅ Supabase response:", { data, error })

    if (error) {
      console.error("❌ Supabase error:", error)
      return new Response(JSON.stringify({ error }), { status: 500 })
    }

    return Response.json(data ?? [])
  } catch (err) {
    console.error("❌ API crashed:", err)
    return new Response(JSON.stringify({ error: String(err) }), { status: 500 })
  }
}
