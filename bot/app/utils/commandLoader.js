import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

/**
 * Charge toutes les commandes depuis le dossier commands
 * @param {string} baseDir - Le répertoire de base (généralement __dirname du fichier appelant)
 * @returns {Promise<Array>} - Un tableau contenant les commandes chargées
 */
export async function loadCommands(baseDir) {
  const commands = [];

  const foldersPath = path.join(baseDir, "commands");
  const commandFolders = fs.readdirSync(foldersPath);

  for (const folder of commandFolders) {
    // Récupère tous les fichiers de commandes du répertoire commands
    const commandsPath = path.join(foldersPath, folder);
    const commandFiles = fs
      .readdirSync(commandsPath)
      .filter((file) => file.endsWith(".js"));

    // Charge chaque commande
    for (const file of commandFiles) {
      const filePath = path.join(commandsPath, file);

      try {
        // Import dynamique (ESM only)
        const { default: command } = await import(`${filePath}`);

        if (!command) {
          console.log(`No command found at ${filePath}`);
          continue;
        }

        if ("data" in command && "execute" in command) {
          commands.push(command);
        } else {
          console.log(
            `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
          );
        }
      } catch (error) {
        console.error(`[ERROR] Failed to load command at ${filePath}:`, error);
      }
    }
  }

  return commands;
}

/**
 * Utilitaire pour obtenir le répertoire de base à partir d'un fichier ESM
 * @param {string} importMetaUrl - import.meta.url du fichier appelant
 * @returns {string} - Le répertoire du fichier
 */
export function getDirname(importMetaUrl) {
  const __filename = fileURLToPath(importMetaUrl);
  return path.dirname(__filename);
}
