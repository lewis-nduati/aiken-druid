import React, { useState } from 'react'
import { DruidScript } from '../types/script'
import { DropdownOption, DruidArg } from '../utils/args'
import cloneDeep from "lodash.clonedeep"
import { ArgField } from './ArgField'

interface ArgsFormProps {
  druidScript: DruidScript
}

export const ArgsForm = ({ druidScript }: ArgsFormProps) => {
  // console.log(`Rendering args form for ${druidScript.uuid}`)
  const [redeemerState, setRedeemerState] = useState<DruidArg>(druidScript.args.redeemer)
  const [paramsState, setParamsState] = useState<DruidArg[] | undefined>(druidScript.args.parameters)
  const [datumState, setDatumState] = useState<DruidArg | undefined>(druidScript.args.datum)

  const handleDatum = (uuid: string, newValue: string) => {
    const datumClone = datumState?.clone()
    console.log(JSON.stringify(datumClone))
    const childArg = datumClone?.getChildById(uuid)
    if (childArg instanceof DropdownOption) {
      return
    }
    childArg?.setFieldVal(newValue)
    setDatumState(datumClone)
  }

  const handleRedeemer = (uuid: string, newValue: string) => {
    const redeemerClone = redeemerState.clone()
    console.log(JSON.stringify(redeemerClone))
    const childArg = redeemerClone.getChildById(uuid)
    if (childArg instanceof DropdownOption) {
      console.log("dropdown option!")
      return
    }
    childArg?.setFieldVal(newValue)
    setRedeemerState(redeemerClone)
  }

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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* {paramsState && (
        <div id={`${druidScript.uuid}_params`}>
          <h3>Custom Parameters</h3>
          {paramsState.map((arg, index) => <ArgField
            arg={arg} onChange={(e) => {
              handleParams(index, e.target.id, e.target.value)
            }} key={arg.uuid} />)}
        </div>
      )} */}
      {datumState && (
        <div id={`${druidScript.uuid}_datum`}>
          <h3>Datum</h3>
          <ArgField
            arg={datumState}
            onChange={(e) => {
              handleDatum(e.target.id, e.target.value)
            }
            } />
        </div>
      )}
      <div id={`${druidScript.uuid}_redeemer`}>
        <h3>Redeemer</h3>
        <ArgField
          arg={redeemerState}
          onChange={(e) => {
            console.log(`target.id: ${e.target.id}`)
            console.log(`target.value: ${e.target.value}`)
            handleRedeemer(e.target.id, e.target.value)
          }
          } />
      </div>
      <button type="submit">Submit</button>
    </form>
  )
}