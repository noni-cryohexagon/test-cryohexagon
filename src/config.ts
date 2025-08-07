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
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxxYmx4YnBydXRrdHF5dndmZmV6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ1NzQ4NjYsImV4cCI6MjA3MDE1MDg2Nn0.E5LIbhJ9qA8AtrPXIE2EAGCrHut6whKD1kwIXuL0rEM";
export const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
