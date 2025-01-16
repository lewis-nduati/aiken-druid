import { PlutusExport, PlutusScriptVersion } from "../types/export.ts";
import { Constr, Data as LucidData } from "@lucid-evolution/plutus"
import { Data as MeshData } from "@meshsdk/common"
import { PlutusAlgVal, PlutusBytesVal, PlutusDataVal, PlutusIntVal, PlutusVal } from "../types/plutus.ts"
import { DruidArg } from "./args.ts"

export function plutusValToMeshData(plutusVal: PlutusVal): MeshData {
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
    return ({alternative: constructor, fields: fields.map(plutusValToMeshData)})
  }
  throw new Error("Error converting PlutusVal to Mesh Data")
}

export function plutusValToLucidData(plutusVal: PlutusVal): LucidData {
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

export function saveScriptFile(
  filename: string, 
  type: PlutusScriptVersion,
  description: string, 
  cborHex: string) {
    const fileContent: PlutusExport = {
      type,
      description,
      cborHex,
    };
    saveFile(filename, "plutus", JSON.stringify(fileContent, null, 2))
  }

export function saveArgFile(
  filename: string,
  druidArg: DruidArg
) {
  saveFile(filename, "json", JSON.stringify(druidArg.toPlutusVal(), null, 2))
}

export function saveFile(filename: string, extension: string, fileContent: string): void {
  const blob = new Blob([fileContent], { type: 'text/plain' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `${filename}.${extension}`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};