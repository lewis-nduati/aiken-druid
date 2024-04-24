import { DruidArg, InputField, DropdownField, DropdownOption, BytesField, IntField } from "../utils/args"

type InputType = "number" | "text" | "textarea"

function isInputField(arg: DruidArg): arg is InputField {
  return !(arg instanceof DropdownField || arg instanceof DropdownOption)
}

interface ArgFieldProps {
  arg: DruidArg
  onChange: React.ChangeEventHandler<HTMLInputElement | HTMLSelectElement>
}

export const ArgField = ({ arg, onChange }: ArgFieldProps) => {
  const { children, label, uuid } = arg
  if (isInputField(arg)) {
    const inputType: InputType = (arg instanceof BytesField) ? "text" :
      (arg instanceof IntField) ? "number" : "textarea"
    return (<>
      <label htmlFor={uuid}>{label}</label>
      <input
        type={inputType}
        id={uuid}
        value={arg.fieldValue}
        placeholder={arg.hintText}
        onChange={onChange}
      /></>)
  }
  if (arg instanceof DropdownField) {
    const numChildren = arg.children.length
    if (numChildren == 1) {
      const child = arg.children[0]
      return (<>
        {child.children.length !== 0 ? (<><p>{label}</p>{child.children.map((c) => {
         return (
          <ArgField arg={c} onChange={onChange} key={c.uuid} />
          )
         })}</>) : <p>()</p>}
      </>)
    }
    return (<><select id={uuid} value={arg.selection}
      onChange={onChange}
    >
      {children.map((child) => <ArgField arg={child} onChange={onChange} key={child.uuid}/>)}
    </select>
    {arg.getChildById(arg.selection)?.children.map((c) => <ArgField arg={c} onChange={onChange} key={c.uuid}/>)}
    </>)
  }
  if (arg instanceof DropdownOption) {
    return (<option value={uuid}>{label}</option>)
  }
}
