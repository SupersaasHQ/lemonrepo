interface OrderPayload {
  totalAmount: string;
  customerName: string;
  customerEmail: string;
  discount: string;
  productName: string;
}

interface LicenseActivationPayload {
  licenseKey: string;
  username: string;
}

interface TelegramMessage {
  title: string;
  details: Record<string, string>;
}

const sendTelegramNotification = async (message: TelegramMessage) => {
  const escapeMarkdown = (text: string) => {
    return text.replace(/[_*[\]()~`>#+=|{}.!-]/g, '\\$&');
  };

  const formattedMessage = `*${escapeMarkdown(message.title)}*\n\n${
    Object.entries(message.details)
      .map(([key, value]) => `• ${escapeMarkdown(key)}: ${escapeMarkdown(value)}`)
      .join('\n')
  }`;

  const token = useRuntimeConfig().telegramBotToken;
  const chatId = useRuntimeConfig().telegramChatId;

  if (!token || !chatId) {
    console.warn("Telegram bot token or chat ID is not set. Skipping notification.");
    return;
  }

  try {
    return await $fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      body: {
        chat_id: chatId,
        text: formattedMessage,
        parse_mode: "MarkdownV2",
      },
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const sendOrderNotification = (payload: OrderPayload) =>
  sendTelegramNotification({
    title: `New Order for ${payload.productName}`,
    details: {
      "Total amount": payload.totalAmount,
      Name: payload.customerName,
      Email: payload.customerEmail,
      Discount: payload.discount,
    },
  });

export const sendLicenseActivationNotification = (
  payload: LicenseActivationPayload
) =>
  sendTelegramNotification({
    title: "License Activation",
    details: {
      "License key": payload.licenseKey,
      Username: payload.username,
    },
  });
