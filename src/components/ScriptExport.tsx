import { ChangeEvent, FormEvent, useState } from "react"
import { DropdownOption, DruidArg } from "../utils/args"
import cloneDeep from "lodash.clonedeep"
import { DruidScript } from "../types/script"
import { ArgField } from "./ArgField"
// import { applyDoubleCborEncoding, applyParamsToScript } from "@lucid-evolution/utils"
import { applyParamsToScript } from "@meshsdk/core-csl"
import { plutusValToMeshData, saveScriptFile } from "../utils/export"
import { PlutusScriptVersion } from "../types/export"
// import { decode, encode } from "cbor-web"

interface ScriptExportProps {
  druidScript: DruidScript
}

export const ScriptExport = ({ druidScript }: ScriptExportProps) => {
  const [paramsState, setParamsState] = useState<DruidArg[] | undefined>(druidScript.args.parameters)
  const [filename, setFilename] = useState<string>(druidScript.name)
  const [description, setDescription] = useState<string>("")

  const handleParams = (index: number, uuid: string, newValue: string) => {
    const paramsClone = cloneDeep(paramsState)
    const childArg = paramsClone?.[index].getChildById(uuid)
    if (childArg instanceof DropdownOption) {
      return
    }
    childArg?.setFieldVal(newValue)
    setParamsState(paramsClone)
  }

  const handleFilename = (e: ChangeEvent<HTMLInputElement>) => {
    setFilename(e.target.value)
  }

  const handleDescription = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value)
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    console.log("submitted")
    const compiledCode = druidScript.compiledCode // toHex(encode(fromHex(druidScript.compiledCode))).substring(4)
    // *Lucid Version* (doesn't work!)
    // const cborHex = applyDoubleCborEncoding(paramsState ?
      // applyParamsToScript(druidScript.compiledCode, paramsState.map(
      //   (druidArg) => {
      //    const lucidData = plutusValToLucidData(druidArg.toPlutusVal())
      //    console.log(lucidData.toString())
      //    return lucidData
      //   }
      // ),) : compiledCode)
    const cborHex = paramsState ? applyParamsToScript(compiledCode, paramsState?.map(
      (druidArg) => {
        const meshData = plutusValToMeshData(druidArg.toPlutusVal())
        console.log(meshData.toString())
        return meshData
      }
    )) : compiledCode

    saveScriptFile(filename, PlutusScriptVersion.PlutusScriptV2, description, cborHex)
  }

  return (<form className="craft" onSubmit={handleSubmit}>
    {paramsState && (
      <div id={`${druidScript.uuid}_params`}>
        <h3>Custom Parameters</h3>
        {paramsState.map((arg, index) => <ArgField
          arg={arg} onChange={(e) => {
            handleParams(index, e.target.id, e.target.value)
          }} key={arg.uuid} />)}
      </div>
    )}
    <label htmlFor="filename">filename</label>
    <input
      type="text"
      id="filename"
      value={filename}
      onChange={handleFilename}
    />
    <label htmlFor="description">description</label>
    <textarea
      id="description"
      value={description}
      onChange={handleDescription}
    />
    <button type="submit">craft script</button>
  </form>
  )
}