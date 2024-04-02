import {
  AikenScript,
  Definitions,
  DruidScripts,
  PlutusJSON,
  ScriptComplexity,
  TempScriptContents,
} from "./types.ts";
import { loadPlutusJSON } from "./loadPlutus.ts";
import { paramToVal } from "./convertRef.ts"

function splitScriptTitle(title: string): [string, string] {
  const titleParts = title.split(".");
  const scriptName = titleParts.pop();
  const modulePath = `${titleParts}.ak`;
  return [modulePath, scriptName ?? ""];
}

function aikenToDruid(definitions: Definitions) {
  return function (acc: DruidScripts, aikenScript: AikenScript): DruidScripts {
    const { compiledCode, hash, redeemer, title, ...otherContents } = aikenScript;
    const scriptContents: TempScriptContents = { compiledCode, hash, redeemer: paramToVal(definitions)(redeemer)} 
    if (otherContents.datum) {
      scriptContents["datum"] = paramToVal(definitions)(otherContents.datum)
    }
    if (otherContents.parameters) {
      scriptContents["parameters"] = otherContents.parameters.map(paramToVal(definitions))
    }
    const [module, scriptTitle] = splitScriptTitle(title);
    const oldModuleContents = acc[module] ? acc[module] : {};
    const complexity = aikenScript.parameters
      ? ScriptComplexity.Param
      : ScriptComplexity.Simple;
    const newModuleContents = {
      ...oldModuleContents,
      [scriptTitle]: { ...scriptContents, complexity},
    };
    return { ...acc, [module]: newModuleContents };
  };
}

export async function processScripts(
  filePath: string,
): Promise<DruidScripts | undefined> {
  const plutusJSON = await loadPlutusJSON(filePath);
  return (plutusJSON?.validators.reduce(aikenToDruid(plutusJSON.definitions), {}));
}
