import React, { useCallback } from 'react'
import { DruidScript } from '../types/script'
import { BytesField, DropdownField, DropdownOption, DruidArg, IntField, InputField, DataField } from '../utils/args'
import { useImmer } from 'use-immer'

type InputType = "number" | "text" | "textarea"

function isInputField(arg: DruidArg): arg is InputField {
  return !(arg instanceof DropdownField || arg instanceof DropdownOption)
}

interface ArgFieldProps {
  arg: DruidArg
  onChange: React.ChangeEventHandler<HTMLInputElement | HTMLSelectElement>
}

const ArgField = ({ arg, onChange }: ArgFieldProps) => {
  const { children, label, uuid } = arg
  if (isInputField(arg)) {
    const inputType: InputType = (arg instanceof BytesField) ? "text" :
      (arg instanceof IntField) ? "number" : "textarea"
    return (<input
      type={inputType}
      id={uuid}
      value={arg.showFieldVal()}
      placeholder={arg.hintText}
      onChange={onChange}
    />)
  }
  if (arg instanceof DropdownField) {
    return (<select value={arg.selection}
      onChange={onChange}
    >
      {children.map((child) => ArgField({ arg: child, onChange }))}
    </select>)
  }
  if (arg instanceof DropdownOption) {
    return (<option value={uuid}>{label}</option>)
  }
}

interface ArgsFormProps {
  druidScript: DruidScript
}

export const ArgsForm = ({druidScript}: ArgsFormProps) => {
  const [redeemerState, setRedeemerState] = useImmer<DruidArg>(druidScript.args.redeemer)
  const [paramsState, setParamsState] = useImmer<DruidArg[] | undefined>(druidScript.args.parameters)
  const [datumState, setDatumState] = useImmer<DruidArg | undefined>(druidScript.args.datum)

  const handleDatum = useCallback((uuid: string, newValue: string) => {
    setDatumState((draftArg: DruidArg | undefined) => {
      const childArg = draftArg?.getChildById(uuid)
      if (childArg instanceof DropdownOption) {
        return
      }
      childArg?.setFieldVal(newValue)
    })
  }, [])

  const handleRedeemer = useCallback((uuid: string, newValue: string) => {
    setRedeemerState((draftArg: DruidArg) => {
      const childArg = draftArg?.getChildById(uuid)
      if (childArg instanceof DropdownField || childArg instanceof DataField || childArg instanceof IntField || childArg instanceof BytesField) {
        childArg?.setFieldVal(newValue)
      }
    })
  }, [])

  const handleParams = useCallback((index: number, uuid: string, newValue: string) => {
    setParamsState((draftParams: DruidArg[] | undefined) => {
      if (draftParams) {
        const childArg = draftParams[index].getChildById(uuid)
        // if (childArg instanceof DropdownOption) {
        //   return
        // }
        if (childArg instanceof DropdownField || childArg instanceof DataField || childArg instanceof IntField || childArg instanceof BytesField) {
          childArg.setFieldVal(newValue)
        }
      }
    })
  }, [])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  return (
    <form onSubmit={handleSubmit}>
      {paramsState && (
        <div id={`${druidScript.uuid}_params`}>
          {paramsState.map((arg, index) => ArgField({
            arg, onChange: (e) => {
              handleParams(index, e.target.id, e.target.value)
            }
          }))}
        </div>
      )}
      {datumState && (
        <div id={`${druidScript.uuid}_datum`}>
          {ArgField({
            arg: datumState, onChange: (e) => {
              handleDatum(e.target.id, e.target.value)
            }
          })}
        </div>
      )}
      {ArgField({
        arg: redeemerState, onChange: (e) => {
          handleRedeemer(e.target.id, e.target.value)
        }
      })}
      <button type="submit">Submit</button>
    </form>
  )
}