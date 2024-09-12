export default defineEventHandler(async (event) => {
  const { user } = await requireUserSession(event);
  if (!user.admin) {
    throw createError({
      statusCode: 403,
      message: "You are not authorized to perform this action",
    });
  }
  const { enabled } = await readBody(event);
  console.log("enabled", enabled);
  await hubKV().setItem("telegram_notifications_enabled", enabled);
  return {
    success: true,
  };
});
