import { supabase } from "~/server/config/supabase";

export default defineEventHandler(async (event) => {
  const body = await readBody<{ name: string; type: string; file: string; fileName: string }>(event);

  const file = await (await fetch(body.file)).blob();
  console.log(file);
  

  const { data, error } = await supabase.storage.from("documents").upload(`public/${Date.now()}-${body.fileName}`, file);

  if (error) {
    return error.message;
  }

  return data.path;
});
