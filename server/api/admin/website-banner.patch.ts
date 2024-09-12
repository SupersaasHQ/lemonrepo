export default defineEventHandler(async (event) => {
  const { user } = await requireUserSession(event);
  if (!user.admin) {
    throw createError({
      statusCode: 403,
      message: "You are not authorized to perform this action",
    });
  }
  const { enabled, title, subtitle } = await readBody(event);
  await hubKV().setItem("website_banner", { enabled, title, subtitle });
  return {
    success: true,
  };
});