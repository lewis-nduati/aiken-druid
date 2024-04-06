import { DruidVal } from "./druid"
import { DruidArgs } from "../utils/args"

export interface TempScriptContents {
  args: {
    datum?: DruidVal
    parameters?: DruidVal[]
    redeemer: DruidVal
  }
  compiledCode: string
  hash: string
}

export interface DruidScript {
  args: DruidArgs
  compiledCode: string
  hash: string
  uuid: string,
}

export interface DruidScripts {
  [key: string]: { [key: string]: DruidScript }
}