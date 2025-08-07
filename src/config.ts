if (!import.meta.env.VITE_SUPABASE_ANON_KEY) {
  alert(`🚨  ${import.meta.env}`);
  alert(`🚨  ${import.meta.env.SUPABASE_ANON_KEY}`);
  alert(`🚨  ${import.meta.env.VITE_SUPABASE_ANON_KEY}`);

  alert("VITE_SUPABASE_ANON_KEY is required");
  throw new Error("VITE_SUPABASE_ANON_KEY is requiredddddcccc");
}
if (!import.meta.env.VITE_SUPABASE_URL) {
  alert("VITE_SUPABASE_URL is required");
  throw new Error("VITE_SUPABASE_URL is requiredddddcccc");
}

console.log(import.meta.env.VITE_SUPABASE_ANON_KEY);
console.log(import.meta.env.VITE_SUPABASE_URL);
export const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;
export const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
