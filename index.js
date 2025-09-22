// index.js
const mineflayer = require("mineflayer");

let firstJoin = true;
const PASSWORD = "2211133445"; // AuthMe password

function createBot() {
  const bot = mineflayer.createBot({
    host: "play.crazymc.net", // Java server
    username: "mr_trolling",
    version: false,           // auto-detect
    viewDistance: "normal"    // 16 chunks
  });

  // Show all chat in your console
  bot.on("chat", (username, message) => {
    if (username === bot.username) return;
    console.log(`[CHAT] <${username}> ${message}`);
  });

  bot.on("spawn", () => {
    console.log("✅ Bot spawned on the server!");

    if (firstJoin) {
      setTimeout(() => {
        console.log("↪ Registering...");
        bot.chat(`/register ${PASSWORD} ${PASSWORD}`);
      }, 2000);
      firstJoin = false;
    } else {
      setTimeout(() => {
        console.log("↪ Logging in...");
        bot.chat(`/login ${PASSWORD}`);
      }, 2000);
    }

    // chain commands after login/register
    setTimeout(() => {
      console.log("↪ Sending /lifesteal");
      bot.chat("/lifesteal");

      setTimeout(() => {
        console.log("↪ Sending /tpa pro_itz");
        bot.chat("/tpa pro_itz");

        setTimeout(() => {
          console.log("↪ Sneaking (crouch forever)");
          bot.setControlState("sneak", true);
        }, 15000);

      }, 5000);

    }, 5000);
  });

  bot.on("kicked", (reason) => {
    console.log("❌ Kicked from server:", reason);
  });

  bot.on("error", (err) => {
    console.log("❌ Error:", err);
  });

  bot.on("end", () => {
    console.log("🔄 Bot disconnected, reconnecting in 5s...");
    setTimeout(createBot, 5000);
  });
}

createBot();

// Tiny web server (for Render/keep alive)
const http = require("http");
http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Bot is running\n");
}).listen(process.env.PORT || 3000);
