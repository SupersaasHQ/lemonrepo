import { Lemon } from "@@/server/utils/lemon-squeezy";

export default defineEventHandler(async (event) => {
  const { user } = await requireUserSession(event);
  if (!user.admin) {
    throw createError({
      statusCode: 403,
      message: "You are not authorized to perform this action",
    });
  }
  const { data } = await Lemon.getCustomers();
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
  const customers = data?.data.map((customer) => {
    const customerLicenseKey = licenseKeys?.find(
      (licenseKey) => licenseKey?.customer_id == customer.id
    );
    return {
      id: customer.id,
      name: customer.attributes.name,
      email: customer.attributes.email,
      city: customer.attributes.city,
      country_formatted: customer.attributes.country_formatted,
      licenseKey: customerLicenseKey ? customerLicenseKey.key : null,
      licenseKeyStatus: customerLicenseKey ? customerLicenseKey.status : null,
    };
  });
  return customers;
});
