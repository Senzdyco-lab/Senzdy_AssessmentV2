import { createClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL;
const key = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = url && key ? createClient(url, key) : null;

function requireClient() {
  if (!supabase) {
    throw new Error(
      "Supabase is not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY."
    );
  }
}

// ---------- Public submissions ----------

export async function saveResult({ ageGroup, answers, scores, contact }) {
  requireClient();
  const { error } = await supabase.from("assessment_results").insert([
    {
      age_group: ageGroup,
      answers,
      scores,
      contact: contact?.trim() || null,
    },
  ]);
  if (error) throw error;
}

// ---------- Auth ----------

export async function signIn(email, password) {
  requireClient();
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw error;
  return data.session;
}

export async function signOut() {
  requireClient();
  await supabase.auth.signOut();
}

export async function getSession() {
  if (!supabase) return null;
  const { data } = await supabase.auth.getSession();
  return data.session;
}

export function onAuthChange(cb) {
  if (!supabase) return () => {};
  const { data } = supabase.auth.onAuthStateChange((_event, session) => {
    cb(session);
  });
  return () => data.subscription.unsubscribe();
}

// Returns true if the current authenticated user is in `admins`.
// Uses the `is_admin()` SQL function via RPC.
export async function checkIsAdmin() {
  requireClient();
  const { data, error } = await supabase.rpc("is_admin");
  if (error) {
    console.error("is_admin RPC failed:", error);
    return false;
  }
  return data === true;
}

// ---------- Admin queries ----------

// Filters: { search?: string (contact ilike), ageGroup?: '3-12'|'13+'|'all' }
export async function listResults({ search, ageGroup } = {}) {
  requireClient();
  let q = supabase
    .from("assessment_results")
    .select("id, created_at, age_group, contact, scores, answers")
    .order("created_at", { ascending: false })
    .limit(500);
  if (ageGroup && ageGroup !== "all") q = q.eq("age_group", ageGroup);
  if (search?.trim()) q = q.ilike("contact", `%${search.trim()}%`);
  const { data, error } = await q;
  if (error) throw error;
  return data ?? [];
}

export async function deleteResult(id) {
  requireClient();
  const { error } = await supabase
    .from("assessment_results")
    .delete()
    .eq("id", id);
  if (error) throw error;
}
