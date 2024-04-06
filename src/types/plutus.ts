export type PlutusVal = PlutusDataVal | PlutusPrimVal | PlutusAlgVal;

export type PlutusDataVal = {
  data: string
}

export type PlutusAlgVal = {
  "constructor": number,
  "fields": PlutusVal[]
}

export type PlutusPrimVal = PlutusIntVal | PlutusBytesVal;

export type PlutusIntVal = {
  "int": number;
}

export type PlutusBytesVal = {
  "bytes": string;
};