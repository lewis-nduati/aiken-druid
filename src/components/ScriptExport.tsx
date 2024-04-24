import { useState } from "react"
import { DropdownOption, DruidArg } from "../utils/args"
import cloneDeep from "lodash.clonedeep"
import { DruidScript } from "../types/script"
import { ArgField } from "./ArgField"
import { applyParamsToScript, fromHex, toHex } from "lucid-cardano"
import { exportPlutusFile, plutusValToLucidData } from "../utils/export"
import { PlutusScriptVersion } from "../types/export"
import { encode } from "cbor"

interface ScriptExportProps {
  druidScript: DruidScript
}

export const ScriptExport = ({ druidScript }: ScriptExportProps) => {
  const [paramsState, setParamsState] = useState<DruidArg[] | undefined>(druidScript.args.parameters)
  const [filename, setFileName] = useState<string>(druidScript.name)
  const [description, setDescription] = useState<string>("")

  const handleParams = (index: number, uuid: string, newValue: string) => {
    const paramsClone = cloneDeep(paramsState)
    console.log(JSON.stringify(paramsClone))
    const childArg = paramsClone?.[index].getChildById(uuid)
    if (childArg instanceof DropdownOption) {
      return
    }
    childArg?.setFieldVal(newValue)
    setParamsState(paramsClone)
  }
  const handleSubmit = () => {
    const compiledCode = toHex(encode(fromHex(druidScript.compiledCode)))
    const cborHex = paramsState ?
      applyParamsToScript(compiledCode, paramsState.map(
        (druidArg) => plutusValToLucidData(druidArg.toPlutusVal())
      )) : compiledCode
    exportPlutusFile(filename, PlutusScriptVersion.PlutusScriptV2, description, cborHex)
  }

  return (<form onSubmit={handleSubmit}>
    <input type="text">Filename</input>
    {paramsState && (
      <div id={`${druidScript.uuid}_params`}>
        <h3>Custom Parameters</h3>
        {paramsState.map((arg, index) => <ArgField
          arg={arg} onChange={(e) => {
            handleParams(index, e.target.id, e.target.value)
          }} key={arg.uuid} />)}
      </div>
    )}</form>
  )
}