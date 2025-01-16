import {
  AikenScript,
  AikenDefinitions,
} from "../types/aiken.ts"
import { DruidArgs, aikenParamToDruidArg } from "./args.ts"
import { loadPlutusJSON } from "./loadPlutus.ts"
import { v4 as uuidv4 } from 'uuid'
import { DruidScripts } from "../types/script.ts"

function splitScriptTitle(title: string): [string, string] {
  const titleParts = title.split(".")
  const scriptName = titleParts.pop()
  const modulePath = `${titleParts}.ak`
  return [modulePath, scriptName ?? ""]
}

function aikenToDruid(definitions: AikenDefinitions) {
  return function (acc: DruidScripts, aikenScript: AikenScript): DruidScripts {
    const { compiledCode, datum, hash, parameters, redeemer, title } = aikenScript
    const apToPv = aikenParamToDruidArg(definitions)
    const args: DruidArgs = {
      datum: datum ? apToPv(datum) : undefined,
      redeemer: apToPv(redeemer),
      parameters: parameters ? parameters.map(apToPv) : undefined
    }
    const [module, scriptTitle] = splitScriptTitle(title)
    const oldModuleContents = acc[module] ? acc[module] : {}
    const newModuleContents = {
      ...oldModuleContents,
      [scriptTitle]: { args, compiledCode, hash, uuid: uuidv4(), name: scriptTitle },
    }
    return { ...acc, [module]: newModuleContents }
  }
}

export async function processScripts(
  filePath: string,
): Promise<DruidScripts | undefined> {
  const plutusJSON = await loadPlutusJSON(filePath)
  return (plutusJSON?.validators.reduce(aikenToDruid(plutusJSON.definitions), {}))
}

