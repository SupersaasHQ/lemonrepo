export default defineEventHandler(async () => {
  const count = (await hubKV().getItem("purchase_count")) || 0;
  return count;
});
