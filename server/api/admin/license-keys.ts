import { Lemon } from "@@/server/utils/lemon-squeezy";

export default defineEventHandler(async (event) => {
  const { user } = await requireUserSession(event);
  if (!user.admin) {
    throw createError({
      statusCode: 403,
      message: "You are not authorized to perform this action",
    });
  }
  return await Lemon.getLicenseKeys();
});
