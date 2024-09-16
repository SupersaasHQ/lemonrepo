import { z } from "zod";
import { Lemon } from "@@/server/utils/lemon-squeezy";
import { Github } from "@@/server/utils/github";
import { sendLicenseActivationNotification } from "~~/server/utils/telegram";

const config = useRuntimeConfig();

const inputSchema = z.object({
  licenseKey: z.string().length(36),
  username: z.string().min(1).max(39),
});

export default defineEventHandler(
  async (event): Promise<{ activated: boolean; activationsTotal: number }> => {
    // Validate input
    const { licenseKey, username } = await readValidatedBody(
      event,
      inputSchema.parse
    );

    // Check license validity and availability
    await Lemon.validateLicenseKey(licenseKey);

    // Validate GitHub user
    await validateGitHubUser(username);

    // Invite user to GitHub repository
    await inviteToGitHubRepository(username);

    // Activate license
    const activatedLicenseKey = await Lemon.activateLicenseKey(
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
  }
);

async function validateGitHubUser(username: string) {
  const ghUser = await Github.getUser(username);
  if (!ghUser || ghUser.type !== "User") {
    throw createError({ statusCode: 400, message: "GitHub user not found." });
  }
}

async function inviteToGitHubRepository(username: string) {
  const invited = await Github.inviteToRepository(
    config.githubOwner,
    config.githubRepo,
    username
  );
  console.log(invited);
}
