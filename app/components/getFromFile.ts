import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __folderpath = getDirname(import.meta.url);

/**
 * Lit un fichier et retourne toutes les lignes non vides
 * @param nameOfTheFile - Nom du fichier relatif au répertoire courant
 * @returns Un tableau de chaînes de caractères correspondant aux lignes du fichier
 */
export async function getFromFiles(nameOfTheFile: string): Promise<string[]> {
  const commands: string[] = [];
  const filePath = path.join(__folderpath, `../../assets/${nameOfTheFile}`);

  const fileContent = await fs.promises.readFile(filePath, "utf-8");
  const lines = fileContent.split(/\r?\n/);

  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed !== "") {
      commands.push(trimmed);
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
