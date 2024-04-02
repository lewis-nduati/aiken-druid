import { v4 as uuidv4 } from 'uuid'
import {
  AikenType,
  AlgType,
  AnyType,
  Constructor,
  Definitions,
  Field,
  Param,
  PlutusAlgVal,
  PlutusConstructor,
  PlutusPrimVal,
  PlutusVal,
  PrimType,
  UnitType,
} from "./types"

function refToDef(refString: string): string {
  const parts = refString.split("/definitions/");
  // Get the last part of the split string
  const lastPart = parts[parts.length - 1];
  // Replace any '~1' with '/'
  return lastPart.replace(/~1/g, "/");
}

function isAnyType(aikenType: AikenType): aikenType is AnyType {
  const asAnyType = aikenType as AnyType
  return asAnyType?.title == "Data" && asAnyType?.description == "Any Plutus data."
}

function isPrimType(aikenType: AikenType): aikenType is PrimType {
  const dataType = (aikenType as PrimType)?.dataType
  return dataType == "bytes" || dataType == "integer"
}

function isAlgType(aikenType: AikenType): aikenType is AlgType {
  return (aikenType as AlgType)?.anyOf !== undefined;
}

export function paramToVal(definitions: Definitions) {
  return function (param: Param): PlutusVal {
    const label = param.title;
    console.log(refToDef(param.schema.$ref));
    const def = definitions[refToDef(param.schema.$ref)];
    console.log(JSON.stringify(def), isAlgType(def));
    if (isAnyType(def)) {
      return anyTypeToVal(def)
    }
    if (isPrimType(def)) {
      return primTypeToVal(label, def);
    }
    return algTypeToVal(definitions, label, def);
  };
}

function fieldToVal(
  definitions: Definitions,
): (field: Field) => PlutusVal {
  return function (field: Field): PlutusVal {
    const def = definitions[refToDef(field.$ref)];
    const label = field.title;
    if (isPrimType(def)) {
      return primTypeToVal(label, def);
    }
    if (isAlgType(def)) {
      return algTypeToVal(definitions, label, def);
    }
    return anyTypeToVal(def)
  };
}

function toPlutusConstructor(definitions: Definitions) {
  return function (constr: Constructor): PlutusConstructor {
    const constructor = constr.index;
    const fields = constr.fields.map(fieldToVal(definitions));
    const pConstr: PlutusConstructor = { constructor, fields };
    return constr.title ? { label: constr.title, ...pConstr } : pConstr;
  };
}

function primTypeToVal(label: string, primType: PrimType): PlutusPrimVal {
  const uuid = uuidv4()
  if (primType?.dataType == "bytes") {
    return { bytes: "", label, uuid };
  }
  return { int: 0, label, uuid };
}

function algTypeToVal(
  definitions: Definitions,
  label: string,
  algType: AlgType,
): PlutusAlgVal {
  return {
    constructors: algType.anyOf.map(toPlutusConstructor(definitions)),
    label,
    uuid: uuidv4()
  };
}

function anyTypeToVal(anyType: AnyType) {
  return {
    data: "",
    uuid: uuidv4()
  }
}
