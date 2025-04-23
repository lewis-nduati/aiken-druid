import React from "react";
import {
  DruidArg,
  InputField,
  DropdownField,
  DropdownOption,
  BytesField,
  IntField,
} from "../utils/args";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Box from "@mui/material/Box";

// Type guard
function isInputField(arg: DruidArg): arg is InputField {
  return !(arg instanceof DropdownField || arg instanceof DropdownOption);
}

interface ArgFieldProps {
  arg: DruidArg;
  onChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | { target: { value: string; name?: string } }>
  ) => void;
}

export const ArgField = ({ arg, onChange }: ArgFieldProps) => {
  const { children, label, uuid } = arg;

  // Basic input: string or number
  if (isInputField(arg)) {
    const inputType =
      arg instanceof BytesField ? "text" :
      arg instanceof IntField ? "number" :
      "text";

    return (
      <Box mb={3}>
        <TextField
          fullWidth
          id={uuid}
          name={uuid}
          type={inputType}
          label={label}
          value={arg.fieldValue}
          placeholder={arg.hintText}
          onChange={onChange}
          variant="outlined"
        />
      </Box>
    );
  }

  // Dropdown with nested children
  if (arg instanceof DropdownField) {
    const selectedChild = arg.getChildById(arg.selection);

    return (
      <Box mb={3}>
        <FormControl fullWidth variant="outlined">
          <InputLabel id={`${uuid}-label`}>{label}</InputLabel>
          <Select
            labelId={`${uuid}-label`}
            id={uuid}
            name={uuid}
            value={arg.selection}
            onChange={(e) =>
              onChange({
                target: { value: e.target.value, name: uuid }
              } as unknown as React.ChangeEvent<{ target: { value: string; name?: string } }>)
            }
            label={label}
          >
            {children.map((child) => (
              <MenuItem key={child.uuid} value={child.uuid}>
                {child.label || "Unnamed Option"}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Render nested children recursively */}
        {selectedChild?.children?.map((nestedArg) => (
          <ArgField key={nestedArg.uuid} arg={nestedArg} onChange={onChange} />
        ))}
      </Box>
    );
  }

  // Individual dropdown option (shouldn't render alone)
  if (arg instanceof DropdownOption) {
    return <MenuItem value={uuid}>{label || "Unnamed Option"}</MenuItem>;
  }

  return null;
};
