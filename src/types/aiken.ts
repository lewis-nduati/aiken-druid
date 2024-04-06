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
  datum?: AikenParam;
  hash: string;
  parameters?: AikenParam[];
  redeemer: AikenParam;
  title: string;
}

export type AikenParam = {
  title: string;
  schema: AikenSchema;
};

export type AikenSchema = {
  $ref: string;
};

export type AikenDefinitions = {
  [key: string]: AikenVal;
};

export type AikenVal = AikenDataVal | AikenPrimVal | AikenAlgVal

export type AikenDataVal = {
  title: "Data";
  description: "Any Plutus data.";
};

export type AikenPrimVal = {
  dataType: "bytes" | "integer";
};

export type AikenAlgVal = {
  title: string;
  description: string;
  anyOf: AikenConstructor[];
};

export type AikenConstructor = {
  title?: string;
  dataType: string;
  index: number;
  fields: AikenField[];
};

export type AikenField = {
  title: string;
  $ref: string;
};