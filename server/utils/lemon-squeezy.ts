import {
  lemonSqueezySetup,
  activateLicense,
  validateLicense,
  listLicenseKeys,
  listOrders,
  getStore,
  listCustomers,
} from "@lemonsqueezy/lemonsqueezy.js";

// Initialize LemonSqueezy with API credentials
function initLemonSqueezy() {
  const config = useRuntimeConfig();
  const apiKey = config.LEMONSQUEEZY_API_KEY;
  const storeId = config.LEMONSQUEEZY_STORE_ID;
  if (!apiKey || !storeId) {
    throw createError({
      statusCode: 500,
      statusMessage: 'LEMONSQUEEZY_API_KEY and LEMONSQUEEZY_STORE_ID must be set in environment variables'
    });
  }

  lemonSqueezySetup({
    apiKey,
    onError: (error) => console.error("LemonSqueezy API Error:", error),
  });

  return { apiKey, storeId };
}

export async function validateLicenseKey(licenseKey: string) {
  const { data } = await validateLicense(licenseKey);
  const status = data?.license_key.status;
  const activationUsage = data?.license_key.activation_usage ?? 0;
  const activationLimit = data?.license_key.activation_limit ?? 0;

  if (status === "active" && activationUsage >= activationLimit) {
    throw createError({
      statusCode: 400,
      message: "This license has already been used.",
    });
  }
}

export async function activateLicenseKey(licenseKey: string, username: string) {
  const instanceName = username.padStart(3, "_");
  return await activateLicense(licenseKey, instanceName);
}

export async function getLicenseKeys(page = 1, size = 100) {
  const { storeId } = initLemonSqueezy();
  return await listLicenseKeys({
    page: { number: page, size: size },
    filter: { storeId },
  });
}

export async function getStoreData() {
  const { storeId } = initLemonSqueezy();
  try {
    const { error, data, statusCode } = await getStore(storeId);
    return { statusCode, data, error };
  } catch (error) {
    console.error("Error fetching store:", error);
    return { error: error.message };
  }
}

export async function getOrders(page = 1, size = 100) {
  const { storeId } = initLemonSqueezy();
  try {
    const { statusCode, data } = await listOrders({
      page: { number: page, size: size },
      filter: { storeId },
    });
    return { statusCode, data };
  } catch (error) {
    console.error("Error fetching orders:", error);
    return { error: error.message };
  }
}

export async function getCustomers(page = 1, size = 100) {
  const { storeId } = initLemonSqueezy();
  try {
    const { statusCode, data } = await listCustomers({
      page: { number: page, size: size },
      filter: { storeId },
    });
    return { statusCode, data };
  } catch (error) {
    console.error("Error fetching customers:", error);
    return { error: error.message };
  }
}
