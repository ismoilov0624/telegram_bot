// === Tosh-Qaychi-Qog'oz Telegram Bot ===

const TelegramBot = require("node-telegram-bot-api");

// 🔑 O'zingning bot tokeningni shu yerga yoz:
const token = "7170452492:AAG6mB-wo2Wlkqw31JzanYyy4lBfBmOnvuY";

// Botni ishga tushiramiz
const bot = new TelegramBot(token, { polling: true });

console.log("🤖 Bot ishga tushdi! Telegramni ochib /start yozing.");

// O'yin variantlari
const options = ["🪨 Tosh", "✂️ Qaychi", "📄 Qog‘oz"];

// O'yinni boshlash
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;

  bot.sendMessage(
    chatId,
    `Salom, ${
      msg.from.first_name || "do‘st"
    }! 👋\nKeling, "Tosh–Qaychi–Qog‘oz" o‘yinini o‘ynaymiz!`,
    {
      reply_markup: {
        keyboard: [[options[0], options[1], options[2]]],
        resize_keyboard: true,
        one_time_keyboard: false,
      },
    }
  );
});

// Asosiy o‘yin logikasi
bot.on("message", (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  if (!options.includes(text)) return; // faqat o'yin tugmalarini qayta ishlaymiz

  const userChoice = text;
  const botChoice = options[Math.floor(Math.random() * options.length)];

  let result = "";

  if (userChoice === botChoice) {
    result = "🤝 Durrang!";
  } else if (
    (userChoice === "🪨 Tosh" && botChoice === "✂️ Qaychi") ||
    (userChoice === "✂️ Qaychi" && botChoice === "📄 Qog‘oz") ||
    (userChoice === "📄 Qog‘oz" && botChoice === "🪨 Tosh")
  ) {
    result = "🎉 Siz yutdingiz!";
  } else {
    result = "😅 Men yutdim!";
  }

  bot.sendMessage(
    chatId,
    `Siz tanladingiz: ${userChoice}\nMen tanladim: ${botChoice}\n\n${result}`,
    {
      reply_markup: {
        keyboard: [[options[0], options[1], options[2]]],
        resize_keyboard: true,
      },
    }
  );
});
