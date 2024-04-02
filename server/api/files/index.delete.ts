import { supabase } from "~/server/config/supabase";

export default defineEventHandler(async (event) => {
  const body = await readBody<{ fileName: string }>(event);

  const { data, error } = await supabase.storage.from("documents").remove([body.fileName]);

  if (error) {
    return error.message;
  }

  return data;
});
