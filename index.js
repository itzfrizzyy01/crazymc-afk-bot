// index.js
const mineflayer = require("mineflayer");

let firstJoin = true;
const PASSWORD = "2211133445"; // AuthMe password

function createBot() {
  const bot = mineflayer.createBot({
    host: "play.crazymc.net",
    username: "mr_trollerz",
    version: 1.21,           // auto-detect
    viewDistance: "16"    // 16 chunks
  });

  bot.on("spawn", () => {
    console.log("✅ Bot spawned!");

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

    // Commands after login/register
    setTimeout(() => {
      console.log("↪ Sending /lifesteal");
      bot.chat("/lifesteal");

      setTimeout(() => {
        console.log("↪ Sending /tpa pro_itz");
        bot.chat("/tpa itzfrizzyy");

        setTimeout(() => {
          console.log("↪ Sneaking (crouch forever)");
          bot.setControlState("sneak", true);
        }, 15000);

      }, 5000);

    }, 5000);

    // Small movement to look real
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
    const delay = 1000 + Math.floor(Math.random() * 4000); // 1–5s random
    console.log(`⏳ Reconnecting in ${delay / 1000}s...`);
    setTimeout(createBot, delay);
  }
}

createBot();

// Tiny web server (for Render/keep alive)
const http = require("http");
http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Bot is running\n");
}).listen(process.env.PORT || 3000);
