// index.js
const mineflayer = require("mineflayer");

let firstJoin = true;
const PASSWORD = "2211133445"; // AuthMe password
let retryDelay = 60 * 1000; // start at 1 min
const maxDelay = 5 * 60 * 1000; // cap at 5 min

function createBot() {
  const bot = mineflayer.createBot({
    host: "play.crazymc.net",
    username: "mr_trollerz",
    version: "1.21",
    viewDistance: "16"
  });

  bot.on("spawn", () => {
    console.log("✅ Bot spawned!");
    retryDelay = 60 * 1000; // reset delay when it works

    if (firstJoin) {
      setTimeout(() => {
        console.log("↪ Registering...");
        bot.chat(`/register ${PASSWORD} ${PASSWORD}`);
      }, 1000);
      firstJoin = false;
    } else {
      setTimeout(() => {
        console.log("↪ Logging in...");
        bot.chat(`/login ${PASSWORD}`);
      }, 1000);
    }

    // Commands after login
    setTimeout(() => {
      bot.chat("/lifesteal");
      setTimeout(() => {
        bot.chat("/tpa itzfrizzyy");
        setTimeout(() => bot.setControlState("sneak", true), 15000);
      }, 5000);
    }, 5000);

    // Move a little
    setInterval(() => {
      bot.setControlState("forward", true);
      setTimeout(() => bot.setControlState("forward", false), 500);
    }, 8000);
  });

  bot.on("chat", (username, message) => {
    if (username !== bot.username) {
      console.log(`[CHAT] <${username}> ${message}`);
    }
  });

  bot.on("kicked", (reason) => {
    console.log("❌ Kicked:", reason);
    reconnect();
  });

  bot.on("error", (err) => {
    console.log("❌ Error:", err);
    reconnect();
  });

  bot.on("end", () => {
    console.log("🔄 Disconnected.");
    reconnect();
  });

  function reconnect() {
    console.log(`⏳ Reconnecting in ${retryDelay / 1000}s...`);
    setTimeout(createBot, retryDelay);

    // increase delay for next time (exponential backoff)
    retryDelay = Math.min(retryDelay + 60 * 1000, maxDelay);
  }
}

createBot();

// Tiny web server
const http = require("http");
http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Bot is running\n");
}).listen(process.env.PORT || 3000);
