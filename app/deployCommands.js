import { REST, Routes } from "discord.js";
import "dotenv/config";
import { loadCommands, getDirname } from "./utils/commandLoader.js";

// Grab all the command folders from the commands directory you created earlier

export async function DeployCommand() {
  const __dirname = getDirname(import.meta.url);

  // Charge toutes les commandes en utilisant l'utilitaire centralisé
  const loadedCommands = await loadCommands(__dirname);

  // Convertit les commandes en format JSON pour le déploiement
  const commands = loadedCommands.map((command) => command.data.toJSON());

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
          process.env.GUILDID
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
}
