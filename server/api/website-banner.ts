export default defineEventHandler(async (event) => {
  return await hubKV().getItem("website_banner");
});