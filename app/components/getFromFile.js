import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __folderpath = getDirname(import.meta.url);

export async function getFromFiles(nameOfTheFile) {
  const commands = [];
  const filePath = path.join(__folderpath, nameOfTheFile);

  const fileContent = await fs.promises.readFile(filePath, "utf-8");
  const lines = fileContent.split(/\r?\n/);

  for (const line of lines) {
    if (line.trim() !== "") {
      commands.push(line);
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
