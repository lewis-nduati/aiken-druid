import React, { ChangeEvent, useState } from 'react'
import { DruidScript } from '../types/script'
import { DropdownOption, DruidArg } from '../utils/args'
import { ArgField } from './ArgField'
import { saveArgFile } from '../utils/export'

interface ArgsFormProps {
  druidScript: DruidScript
}

export const ArgsForm = ({ druidScript }: ArgsFormProps) => {
  const [datumState, setDatumState] = useState<DruidArg | undefined>(druidScript.args.datum)
  const [datumFilename, setDatumFilename] = useState<string>(datumState ? datumState.label : "")

  const [redeemerState, setRedeemerState] = useState<DruidArg>(druidScript.args.redeemer)
  const [redeemerFilename, setRedeemerFilename] = useState<string>(redeemerState.label)

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

  const handleDatumFilename = (e: ChangeEvent<HTMLInputElement>) => {
    setDatumFilename(e.target.value)
  }

  const handleDatumSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (datumState) {
      saveArgFile(datumFilename, datumState)
    }
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

  const handleRedeemerFilename = (e: ChangeEvent<HTMLInputElement>) => {
    setRedeemerFilename(e.target.value)
  }

  const handleRedeemerSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    saveArgFile(redeemerFilename, redeemerState)
  }

  return (
    <>
      {datumState && (
        <form className="craft" onSubmit={handleDatumSubmit} id={`${druidScript.uuid}_datum`}>
          <h3>datum</h3>
          <ArgField
            arg={datumState}
            onChange={(e) => {
              handleDatum(e.target.id, e.target.value)
            }
            } />
          <label htmlFor="datum-filename">filename</label>
          <input
            type="text"
            id="datum-filename"
            value={datumFilename}
            onChange={handleDatumFilename}
          />
          <button className="accent1" type="submit">craft datum</button>
        </form>
      )}
      <form className="craft" onSubmit={handleRedeemerSubmit} id={`${druidScript.uuid}_redeemer`}>
        <h3>redeemer</h3>
        <ArgField
          arg={redeemerState}
          onChange={(e) => {
            console.log(`target.id: ${e.target.id}`)
            console.log(`target.value: ${e.target.value}`)
            handleRedeemer(e.target.id, e.target.value)
          }
          } />
        <label htmlFor="redeemer-filename">filename</label>
        <input
          type="text"
          id="redeemer-filename"
          value={redeemerFilename}
          onChange={handleRedeemerFilename}
        />
        <button className="accent1" type="submit">craft redeemer</button>
      </form>
    </>
  )
}