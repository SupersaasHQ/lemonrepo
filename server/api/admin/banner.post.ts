export default defineEventHandler(async (event) => {
  const { text, url } = (await readBody(event)) || {};
  await hubKV().set("banner-text", text);
  await hubKV().set("banner-url", url);
  return { ok: true };
});
