import { Lemon } from "@@/server/utils/lemon-squeezy";

export default defineEventHandler(async (event) => {
  const { user } = await requireUserSession(event);
  if (!user.admin) {
    throw createError({
      statusCode: 403,
      message: "You are not authorized to perform this action",
    });
  }
  const { data } = await Lemon.getOrders();
  const { data: allLicenseKeys } = await Lemon.getLicenseKeys();
  const licenseKeys = allLicenseKeys?.data?.map((licenseKey) => {
    return {
      id: licenseKey.id,
      customer_id: licenseKey.attributes.customer_id,
      name: licenseKey.attributes.user_name,
      key: licenseKey.attributes.key_short,
      activation_limit: licenseKey.attributes.activation_limit,
      status: licenseKey.attributes.status_formatted,
    };
  });
  const ordersData = data?.data.map((order) => {
    const customerLicenseKey = licenseKeys?.find(
      (licenseKey) => licenseKey.customer_id == order.attributes.customer_id
    );
    return {
      id: order.id,
      store_id: order.attributes.store_id,
      customer_id: order.attributes.customer_id,
      order_number: order.attributes.order_number,
      user_name: order.attributes.user_name,
      user_email: order.attributes.user_email,
      currency: order.attributes.currency,
      status: order.attributes.status_formatted,
      amount: order.attributes.subtotal,
      discount: order.attributes.discount_total_formatted,
      total: order.attributes.total,
      total_amount: order.attributes.total_formatted,
      tax_paid: order.attributes.tax_formatted,
      receipt: order.attributes.urls.receipt,
      created_at: order.attributes.created_at,
      updated_at: order.attributes.updated_at,
      licenseKey: customerLicenseKey ? customerLicenseKey.key : null,
      licenseKeyStatus: customerLicenseKey ? customerLicenseKey.status : null,
      url: order.links.self,
    };
  });
  return ordersData;
});
