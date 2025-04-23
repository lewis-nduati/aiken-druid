// Enum representing different versions of Plutus scripts
export enum PlutusScriptVersion {
  PlutusScriptV1 = "PlutusScriptV1", // Version 1 of Plutus Script
  PlutusScriptV2 = "PlutusScriptV2", // Version 2 of Plutus Script (typically used for more complex logic)
  PlutusScriptV3 = "PlutusScriptV3", // Version 3 of Plutus Script (potentially includes further optimizations and features)
}

// Interface for exporting a Plutus script with metadata and CBOR-encoded content
export interface PlutusExport {
  type: PlutusScriptVersion;  // Type of the Plutus Script version (V1, V2, or V3)
  description?: string;       // Optional description of the script (can be empty if not needed)
  cborHex: string;            // The compiled CBOR-encoded script in hexadecimal format
}
