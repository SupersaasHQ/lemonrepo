interface TelegramNotificationPayload {
  totalAmount: string;
  customerName: string;
  customerEmail: string;
  discount: string;
  productName: string;
}

export const sendTelegramNotification = async (
  payload: TelegramNotificationPayload
) => {
  const message = `
  *New Order for ${payload.productName}*\n
  - Total amount: ${payload.totalAmount}
  - Name: ${payload.customerName}
  - Email: ${payload.customerEmail}
  - Discount: ${payload.discount}
  `;
  const token = useRuntimeConfig().telegramBotToken;
  const chatId = useRuntimeConfig().telegramChatId;
  if (!token || !chatId) {
    throw new Error("Telegram bot token or chat ID is not set");
  }
  try {
    const data = await $fetch(
      `https://api.telegram.org/bot${token}/sendMessage`,
      {
        method: "POST",
        body: {
          chat_id: chatId,
          text: message,
          parse_mode: "Markdown",
        },
      }
    );
    return data;
  } catch (error) {
    console.error(error);
  }
};
