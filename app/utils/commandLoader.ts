import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { pathToFileURL } from "url";
import type { SlashCommand } from "@/types"; // ton interface SlashCommand

/**
 * Charge toutes les commandes depuis le dossier commands
 * @param baseDir - Le répertoire de base (généralement __dirname du fichier appelant)
 * @returns Un tableau contenant les commandes chargées
 */
export async function loadCommands(baseDir: string): Promise<SlashCommand[]> {
  const commands: SlashCommand[] = [];

  const foldersPath = path.join(baseDir, "commands");
  const commandFolders = fs
    .readdirSync(foldersPath, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

  for (const folder of commandFolders) {
    const commandsPath = path.join(foldersPath, folder);
    const commandFiles = fs
      .readdirSync(commandsPath)
      .filter((file) => file.endsWith(".js") || file.endsWith(".ts")); // support TS en dev

    for (const file of commandFiles) {
      const filePath = path.join(commandsPath, file);

      try {
        const module = await import(pathToFileURL(filePath).href);
        const command: unknown = module.default;

        if (
          command &&
          typeof command === "object" &&
          "data" in command &&
          "execute" in command
        ) {
          commands.push(command as SlashCommand);
        } else {
          console.warn(
            `[WARNING] The command at ${filePath} is missing "data" or "execute".`
          );
        }
      } catch (err) {
        console.error(`[ERROR] Failed to load command at ${filePath}:`, err);
      }
    }
  }

  return commands;
}

/**
 * Utilitaire pour obtenir le répertoire de base à partir d'un fichier ESM
 * @param importMetaUrl - import.meta.url du fichier appelant
 * @returns Le répertoire du fichier
 */
export function getDirname(importMetaUrl: string): string {
  const __filename = fileURLToPath(importMetaUrl);
  return path.dirname(__filename);
}
