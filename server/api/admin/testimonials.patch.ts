export default defineEventHandler(async (event) => {
  const { user } = await requireUserSession(event);
  if (!user.admin) {
    throw createError({
      statusCode: 403,
      message: "You are not authorized to perform this action",
    });
  }
  const { testimonials = [] } = await readBody(event);

  await hubKV().setItem("testimonials", testimonials);
  return {
    success: true,
  };
})
