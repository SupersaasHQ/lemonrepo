export default eventHandler(async (event) => {
  if (!process.env.ADMIN_PASSWORD) {
    throw createError({
      statusCode: 500,
      message: "Missing ADMIN_PASSWORD environment variable",
    });
  }
  const { password } = (await readBody(event)) || {};
  if (password !== process.env.ADMIN_PASSWORD) {
    throw createError({
      statusCode: 401,
      message: "Wrong password",
    });
  }
  await setUserSession(event, {
    user: { admin: true },
  });
  return { ok: true };
});
