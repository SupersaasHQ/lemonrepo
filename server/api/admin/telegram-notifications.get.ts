export default defineEventHandler(async (event) => {
  return await hubKV().getItem("telegram_notifications_enabled");
});
