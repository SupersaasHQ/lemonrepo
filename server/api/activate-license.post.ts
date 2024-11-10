import { z } from "zod";
import { validateLicenseKey, activateLicenseKey } from "@@/server/utils/lemon-squeezy";
import { getUser, inviteToRepository } from "@@/server/utils/github";
import { sendLicenseActivationNotification } from "~~/server/utils/telegram";

const config = useRuntimeConfig();

const inputSchema = z.object({
  licenseKey: z.string().length(36),
  username: z.string().min(1).max(39),
});

export default defineEventHandler(
  async (event): Promise<{ activated: boolean; activationsTotal: number }> => {
    try {
      // Validate input
      const { licenseKey, username } = await readValidatedBody(
        event,
        inputSchema.parse
      );

      // Check license validity and availability
      await validateLicenseKey(licenseKey);

      // Validate GitHub user
      await validateGitHubUser(username);

      // Invite user to GitHub repository
      await inviteToGitHubRepository(username);

      // Activate license
      const activatedLicenseKey = await activateLicenseKey(
        licenseKey,
        username
      );

      await sendLicenseActivationNotification({
        licenseKey,
        username,
      });

      return {
        activated: true,
        activationsTotal:
          activatedLicenseKey.data?.license_key.activation_usage ?? 0,
      };
    } catch (error) {
      console.error('License activation failed:', error);
      throw error; // Re-throw to maintain the error response
    }
  }
);

async function validateGitHubUser(username: string) {
  try {
    const ghUser = await getUser(username);
    if (!ghUser || ghUser.type !== "User") {
      throw createError({ statusCode: 400, message: "GitHub user not found." });
    }
  } catch (error) {
    console.error('GitHub user validation failed:', error);
    throw error;
  }
}

async function inviteToGitHubRepository(username: string) {
  try {

    const invited = await inviteToRepository(
      config.githubOwner,
      config.githubRepo,
      username
    );

    const invitedToEssentials = await inviteToRepository(
      config.githubOwner,
      "essentials-nuxthub",
      username
    );
  } catch (error) {
    console.error('GitHub repository invitation failed:', error);
    throw createError({
      statusCode: 500,
      message: "Failed to invite user to GitHub repository"
    });
  }
}
