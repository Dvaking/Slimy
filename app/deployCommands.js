import { REST, Routes } from "discord.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import "dotenv/config";

// Grab all the command folders from the commands directory you created earlier

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const foldersPath = path.join(__dirname, "commands");
const commandFolders = fs.readdirSync(foldersPath);

const commands = [];

for (const folder of commandFolders) {
  // Grab all the command files from the commands directory
  const commandsPath = path.join(foldersPath, folder);
  const commandFiles = fs
    .readdirSync(commandsPath)
    .filter((file) => file.endsWith(".js"));

  // Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    console.log(`Loading command at ${filePath}`);
    // Import dynamique (ESM only)
    const { default: command } = await import(`${filePath}`);
    if (!command) {
      console.log(`No command found at ${filePath}`);
      continue;
    }
    if ("data" in command && "execute" in command) {
      commands.push(command.data.toJSON());
    } else {
      console.log(
        `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
      );
    }
  }
}

// Construct and prepare an instance of the REST module
if (!process.env.DEVTOKEN) {
  console.log(
    `No TOKEN found in environment variables ${process.env.DEVTOKEN}.`
  );
  process.exit(1);
}
const rest = new REST().setToken(process.env.DEVTOKEN);

// and deploy your commands!
(async () => {
  try {
    console.log(
      `Started refreshing ${commands.length} application (/) commands.`
    );
    if (!process.env.DEVAPPID) {
      console.log("No DEVAPPID found in environment variables.");
      return;
    }
    // The put method is used to fully refresh all commands in the guild with the current set
    const data = await rest.put(
      Routes.applicationGuildCommands(
        process.env.DEVAPPID,
        "1278800132954914836"
      ),
      { body: commands }
    );

    console.log(
      `Successfully reloaded ${data.length} application (/) commands.`
    );
  } catch (error) {
    // And of course, make sure you catch and log any errors!
    console.error(error);
  }
})();
