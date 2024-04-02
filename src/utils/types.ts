export type Preamble = {
  title: string;
  description: string;
  version: string;
  plutusVersion: string;
  compiler: { name: string; version: string };
  license: string;
};

export type AikenType = AnyType | PrimType | AlgType

export type Definitions = {
  [key: string]: AikenType;
};

export type AnyType = {
  title: "Data";
  description: "Any Plutus data.";
};

export type UnitType = {
  title: string;
  description?: string;
  anyOf: [
    {
      dataType: "constructor";
      index: number;
      fields: [];
    },
  ];
};

export type PrimType = {
  dataType: "bytes" | "integer";
};

export type AlgType = {
  title: string;
  description: string;
  anyOf: Constructor[];
};

export type Constructor = {
  title?: string;
  dataType: string;
  index: number;
  fields: Field[];
};

export type Field = {
  title: string;
  $ref: string;
};

export type PlutusAnyVal = {
  data: string
  uuid: string,
}

export type PlutusAlgVal = {
  constructors: PlutusConstructor[];
  label: string;
  uuid: string;
};

export type PlutusConstructor = {
  label?: string;
  constructor: number;
  fields: PlutusVal[];
};

export type PlutusVal = PlutusAnyVal | PlutusPrimVal | PlutusAlgVal;
export type PlutusPrimVal = PlutusInt | PlutusBytes;

export type PlutusInt = {
  int: number;
  label: string;
  uuid: string;
};

export type PlutusBytes = {
  bytes: string;
  label: string;
  uuid: string
};

export type PlutusJSON = {
  preamble: Preamble;
  validators: AikenScript[];
  definitions: Definitions;
};

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

export type Schema = {
  $ref: string;
};

export type Param = {
  title: string;
  schema: Schema;
};

export interface AikenScript {
  compiledCode: string;
  datum?: Param;
  hash: string;
  parameters?: Param[];
  redeemer: Param;
  title: string;
}

export interface TempScriptContents {
  compiledCode: string;
  datum?: PlutusVal;
  hash: string;
  parameters?: PlutusVal[];
  redeemer: PlutusVal;
}

export enum ScriptComplexity {
  Simple = "Simple",
  Param = "Param",
}

export interface DruidScript {
  compiledCode: string;
  complexity: ScriptComplexity;
  datum?: PlutusVal;
  hash: string;
  parameters?: PlutusVal[];
  redeemer: PlutusVal;
}

export interface DruidScripts {
  [key: string]: { [key: string]: DruidScript };
}
