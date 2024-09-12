import {
  lemonSqueezySetup,
  activateLicense,
  validateLicense,
  listLicenseKeys,
  listOrders,
  getStore,
  listCustomers,
} from "@lemonsqueezy/lemonsqueezy.js";

class LemonSqueezy {
  private storeId: string;

  constructor(apiKey: string, storeId: string) {
    if (!apiKey || !storeId) {
      throw new Error("API key and store ID are required");
    }
    this.storeId = storeId;
    lemonSqueezySetup({
      apiKey,
      onError: (error) => console.error("LemonSqueezy API Error:", error),
    });
  }

  async validateLicenseKey(licenseKey: string) {
    const { data } = await validateLicense(licenseKey);
    const status = data?.license_key.status;
    const activationUsage = data?.license_key.activation_usage ?? 0;
    const activationLimit = data?.license_key.activation_limit ?? 0;
    if (status === "active" && activationUsage >= activationLimit) {
      throw createError({
        statusCode: 400,
        message: "License used already.",
      });
    }
  }

  async activateLicenseKey(licenseKey: string, username: string) {
    const instanceName = username.padStart(3, "_");
    return await activateLicense(licenseKey, instanceName);
  }

  async getLicenseKeys(page = 1, size = 100) {
    return await listLicenseKeys({
      page: { number: page, size: size },
      filter: { storeId: this.storeId },
    });
  }

  async getStoreData() {
    try {
      const { error, data, statusCode } = await getStore(this.storeId);
      return { statusCode, data, error };
    } catch (error) {
      console.error("Error fetching store:", error);
      return { error: error.message };
    }
  }

  async getOrders(page = 1, size = 100) {
    try {
      const { statusCode, data } = await listOrders({
        page: { number: page, size: size },
        filter: { storeId: this.storeId },
      });
      return { statusCode, data };
    } catch (error) {
      console.error("Error fetching orders:", error);
      return { error: error.message };
    }
  }

  async getCustomers(page = 1, size = 100) {
    try {
      const { statusCode, data } = await listCustomers({
        page: { number: page, size: size },
        filter: { storeId: this.storeId },
      });
      return { statusCode, data };
    } catch (error) {
      console.error("Error fetching customers:", error);
      return { error: error.message };
    }
  }
}

const apiKey = process.env.LEMONSQUEEZY_API_KEY;
const storeId = process.env.LEMONSQUEEZY_STORE_ID;

if (!apiKey || !storeId) {
  throw new Error(
    "LEMONSQUEEZY_API_KEY and LEMONSQUEEZY_STORE_ID must be set in environment variables"
  );
}

export const Lemon = new LemonSqueezy(apiKey, storeId);
