import { supabase } from "~/server/config/supabase";

export default defineEventHandler(async (event) => {
  const query = await getQuery<{ id: string }>(event);

  const file = await supabase.storage.from("documents").getPublicUrl(query.id);

  return file.data.publicUrl;
});