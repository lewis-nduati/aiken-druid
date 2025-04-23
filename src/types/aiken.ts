export type PlutusJSON = {
  preamble: AikenPreamble;
  validators: AikenScript[];
  definitions: AikenDefinitions;
};

export type AikenPreamble = {
  title: string;
  description: string;
  version: string;
  plutusVersion: string;
  compiler: { name: string; version: string };
  license: string;
};

export interface AikenScript {
  compiledCode: string;
  datum?: AikenParam; // Optional: represents the datum, if any
  hash: string;
  parameters?: AikenParam[]; // Optional: represents parameters, if any
  redeemer: AikenParam;
  title: string;
}

export type AikenParam = {
  title: string;
  schema: AikenSchema;
};

export type AikenSchema = {
  $ref: string; // Reference to another schema, possibly external
};

export type AikenDefinitions = {
  [key: string]: AikenVal; // A mapping of definition names to their corresponding values
};

export type AikenVal = AikenDataVal | AikenPrimVal | AikenAlgVal;

export type AikenDataVal = {
  title: "Data";
  description: "Any Plutus data."; // Generic description of data
};

export type AikenPrimVal = {
  dataType: "bytes" | "integer"; // Data type of the primitive value
};

export type AikenAlgVal = {
  title: string;
  description: string;
  anyOf: AikenConstructor[]; // Array of constructors for this value type
};

export type AikenConstructor = {
  title?: string; // Optional title for the constructor
  dataType: string; // The data type this constructor represents
  index: number; // Index of the constructor
  fields: AikenField[]; // List of fields for the constructor
};

export type AikenField = {
  title: string; // Title of the field
  $ref: string; // Reference to the schema of the field
};
