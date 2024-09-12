import { Lemon } from "@@/server/utils/lemon-squeezy";

export default defineEventHandler(async (event) => {
  const { user } = await requireUserSession(event);
  if (!user.admin) {
    throw createError({
      statusCode: 403,
      message: "You are not authorized to perform this action",
    });
  }
  const { data } = await Lemon.getStoreData();
  return {
    id: data?.data.id,
    name: data?.data.attributes.name,
    slug: data?.data.attributes.slug,
    url: data?.data.attributes.url,
    avatar_url: data?.data.attributes.avatar_url,
    total_sales: data?.data.attributes.total_sales,
    total_revenue: data?.data.attributes.total_revenue,
    thirty_day_sales: data?.data.attributes.thirty_day_sales,
    thirty_day_revenue: data?.data.attributes.thirty_day_revenue,
  };
});
