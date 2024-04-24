import { PlutusExport, PlutusScriptVersion } from "../types/export.ts";
const fs = require('fs').promises
import { Constr, Data } from "lucid-cardano"
import { PlutusAlgVal, PlutusBytesVal, PlutusDataVal, PlutusIntVal, PlutusVal } from "../types/plutus.ts"

export function plutusValToLucidData(plutusVal: PlutusVal): Data {
  const bytes = (plutusVal as PlutusBytesVal).bytes
  if (bytes) {
    return bytes
  }
  const int = (plutusVal as PlutusIntVal).int
  if (int) {
    return BigInt(int) 
  }
  const data = (plutusVal as PlutusDataVal).data
  if (data) {
    return data
  }
  const {constructor, fields} = (plutusVal as PlutusAlgVal)
  if (constructor) {
    return new Constr(constructor, fields.map(plutusValToLucidData))
  }
  throw new Error("Error converting PlutusVal to Lucid Data")
}

export async function exportPlutusFile(
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
