if (!import.meta.env.VITE_SUPABASE_ANON_KEY) {
  alert(`🚨  ${import.meta.env}`);
  alert(`🚨  ${import.meta.env.SUPABASE_ANON_KEY}`);
  alert(`🚨  ${import.meta.env.VITE_SUPABASE_ANON_KEY}`);

  alert("VITE_SUPABASE_ANON_KEY is requiredqqqqq");
  throw new Error("VITE_SUPABASE_ANON_KEY is requiredddddccccdddeeeee");
}
if (!import.meta.env.VITE_SUPABASE_URL) {
  alert(`🚨  ${import.meta.env}`);
  alert(`🚨  ${import.meta.env.SUPABASE_ANON_KEY}`);
  alert(`🚨  ${import.meta.env.VITE_SUPABASE_ANON_KEY}`);
  alert("VITE_SUPABASE_URL is required");
  throw new Error("VITE_SUPABASE_URL is requiredddddcccczzzz");
}

console.log(import.meta.env.VITE_SUPABASE_ANON_KEY);
console.log(import.meta.env.VITE_SUPABASE_URL);
export const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdodnhwc3JkbHd6aHBvYmx2bGlwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMxNzgyMzQsImV4cCI6MjA2ODc1NDIzNH0.A8raTVOW4ScyxbzJqlL9C2D2OlI6WTAvOXRZi3Ty4qE";
export const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
