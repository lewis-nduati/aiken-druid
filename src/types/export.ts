export enum PlutusScriptVersion {
  PlutusScriptV1 = "PlutusScriptV1",
  PlutusScriptV2 = "PlutusScriptV2",
  PlutusScriptV3 = "PlutusScriptV3",
}

export interface PlutusExport {
  type: PlutusScriptVersion;
  description: string;
  cborHex: string;
}
