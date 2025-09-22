// index.js
const mineflayer = require("mineflayer");
const { pathfinder, Movements, goals } = require("mineflayer-pathfinder");
const mcDataLoader = require("minecraft-data");

let firstJoin = true;
const PASSWORD = "2211133445"; // your AuthMe password

function createBot() {
  const bot = mineflayer.createBot({
    host: "play.crazymc.net", // no port needed
    username: "mr_troller",
    version: "1.21",
    viewDistance: "normal" // 16 chunks
  });

  bot.loadPlugin(pathfinder);

  bot.on("spawn", () => {
    if (firstJoin) {
      setTimeout(() => bot.chat(`/register ${PASSWORD} ${PASSWORD}`), 2000);
      firstJoin = false;
    } else {
      setTimeout(() => bot.chat(`/login ${PASSWORD}`), 2000);
    }

    // sequence after login/register
    setTimeout(() => {
      bot.chat("/lifesteal");

      setTimeout(() => {
        bot.chat("/tpa pro_itz");

        setTimeout(() => {
          bot.setControlState("sneak", true); // crouch forever
        }, 15000);

      }, 5000);

    }, 5000);
  });

  bot.on("end", () => setTimeout(createBot, 5000));
  bot.on("kicked", console.log);
  bot.on("error", console.log);
}

createBot();

// --- Tiny web server for Render ---
const http = require("http");
http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Bot is running\n");
}).listen(process.env.PORT || 3000);
