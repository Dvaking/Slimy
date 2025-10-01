import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Remonte de 2 niveaux pour arriver à la racine du projet
const projectRoot = path.resolve(__dirname, "../..");

export const paths = {
  commands: path.join(projectRoot, "app", "commands"),
  components: path.join(projectRoot, "app", "components"),
  config: path.join(projectRoot, "app", "config"),
  database: path.join(projectRoot, "database"),
};

// Fonction helper pour créer des chemins relatifs
export function createImportPath(category, ...pathSegments) {
  const basePath = paths[category];
  if (!basePath) {
    throw new Error(`Category "${category}" not found in paths`);
  }
  return path.join(basePath, ...pathSegments);
}
