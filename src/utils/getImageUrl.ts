const BASE_URL = import.meta.env.VITE_SUPABASE_URL;

export const getImageUrl = (path: string | null | undefined): string => {
  if (!path) return "";

  return `${BASE_URL}/storage/v1/object/public/company-assets/${path}`;
};
