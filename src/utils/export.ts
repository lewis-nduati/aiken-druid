import { PlutusExport, PlutusScriptVersion } from "./types.ts";
const fs = require('fs').promises

export async function exportPlutusJSON(
  filename: string,
  type: PlutusScriptVersion,
  description: string,
  cborHex: string,
): Promise<void> {
  const plutusExport: PlutusExport = {
    type,
    description,
    cborHex,
  };

  const plutusScriptsVar = process.env.PLUTUS_SCRIPTS_PATH;
  const plutusScriptsPath = plutusScriptsVar ? plutusScriptsVar : ".artifacts";

  try {
    await fs.writeFile(
      `${plutusScriptsPath}/${filename}.plutus`,
      JSON.stringify(plutusExport, null, 2),
    );
    console.log("JSON file saved successfully.");
  } catch (error) {
    console.error("Error saving JSON file:", error);
  }
}
